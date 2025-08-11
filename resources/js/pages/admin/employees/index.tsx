import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Employee {
    id: number;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    location: string;
    monthly_quota: number;
    current_taken_gallons: number;
    remaining_quota: number;
}

interface PaginatedData {
    data: Employee[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    employees: PaginatedData;
    [key: string]: unknown;
}

export default function EmployeesIndex({ employees }: Props) {
    const handleDelete = (employee: Employee) => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone.`)) {
            router.delete(route('admin.employees.destroy', employee.id));
        }
    };

    const getStatusColor = (remaining: number, total: number) => {
        const percentage = (remaining / total) * 100;
        if (percentage > 50) return 'bg-green-100 text-green-800';
        if (percentage > 25) return 'bg-yellow-100 text-yellow-800';
        return 'bg-red-100 text-red-800';
    };

    return (
        <AppShell>
            <Head title="👥 Employee Management - Admin Panel" />
            
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👥 Employee Management</h1>
                        <p className="text-gray-600 mt-1">Manage employee profiles and gallon quotas</p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            onClick={() => router.get(route('admin.reports.download'))}
                            variant="outline"
                        >
                            📊 Download Report
                        </Button>
                        <Link href={route('admin.employees.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ➕ Add Employee
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-blue-600">{employees.total}</p>
                                <p className="text-sm text-gray-600">Total Employees</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                    {employees.data.filter(emp => emp.remaining_quota > emp.monthly_quota * 0.5).length}
                                </p>
                                <p className="text-sm text-gray-600">High Quota (&gt;50%)</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-yellow-600">
                                    {employees.data.filter(emp => emp.remaining_quota <= emp.monthly_quota * 0.5 && emp.remaining_quota > emp.monthly_quota * 0.25).length}
                                </p>
                                <p className="text-sm text-gray-600">Medium Quota (25-50%)</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-red-600">
                                    {employees.data.filter(emp => emp.remaining_quota <= emp.monthly_quota * 0.25).length}
                                </p>
                                <p className="text-sm text-gray-600">Low Quota (&lt;25%)</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Employees Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Employee List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Employee ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Department</TableHead>
                                        <TableHead>Grade</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Quota Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {employees.data.map((employee) => (
                                        <TableRow key={employee.id}>
                                            <TableCell className="font-medium">
                                                {employee.employee_id}
                                            </TableCell>
                                            <TableCell>{employee.name}</TableCell>
                                            <TableCell>{employee.department}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{employee.grade}</Badge>
                                            </TableCell>
                                            <TableCell>{employee.location}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(employee.remaining_quota, employee.monthly_quota)}`}>
                                                        {employee.remaining_quota}/{employee.monthly_quota}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <Link href={route('admin.employees.show', employee.id)}>
                                                        <Button variant="outline" size="sm">
                                                            👁️ View
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('admin.employees.edit', employee.id)}>
                                                        <Button variant="outline" size="sm">
                                                            ✏️ Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleDelete(employee)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        🗑️ Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {employees.last_page > 1 && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-2">
                                    {employees.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}