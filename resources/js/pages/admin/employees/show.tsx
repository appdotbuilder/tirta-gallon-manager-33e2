import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Employee {
    id: number;
    barcode_tag: string;
    employee_id: string;
    name: string;
    department: string;
    grade: string;
    location: string;
    monthly_quota: number;
    current_taken_gallons: number;
    remaining_quota: number;
}

interface WithdrawalRecord {
    id: number;
    gallons_withdrawn: number;
    withdrawal_date_time: string;
}

interface Props {
    employee: Employee;
    recentWithdrawals: WithdrawalRecord[];
    qrCodeUrl: string;
    [key: string]: unknown;
}

export default function ShowEmployee({ employee, recentWithdrawals, qrCodeUrl }: Props) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete ${employee.name}? This action cannot be undone and will remove all associated withdrawal history.`)) {
            router.delete(route('admin.employees.destroy', employee.id));
        }
    };

    const getQuotaStatus = () => {
        const percentage = (employee.current_taken_gallons / employee.monthly_quota) * 100;
        if (percentage >= 90) return { color: 'bg-red-500', text: 'Critical' };
        if (percentage >= 75) return { color: 'bg-orange-500', text: 'High' };
        if (percentage >= 50) return { color: 'bg-yellow-500', text: 'Medium' };
        return { color: 'bg-green-500', text: 'Low' };
    };

    const quotaStatus = getQuotaStatus();

    return (
        <AppShell>
            <Head title={`👤 ${employee.name} - Employee Details`} />
            
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <Link href={route('admin.employees.index')}>
                            <Button variant="outline">
                                ← Back to Employees
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">👤 {employee.name}</h1>
                            <p className="text-gray-600 mt-1">Employee ID: {employee.employee_id}</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Link href={route('admin.employees.edit', employee.id)}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                ✏️ Edit Employee
                            </Button>
                        </Link>
                        <Button
                            onClick={handleDelete}
                            variant="outline"
                            className="text-red-600 hover:text-red-800 border-red-200 hover:border-red-300"
                        >
                            🗑️ Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Employee Information */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>📋 Basic Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Employee ID</label>
                                            <p className="font-semibold text-lg">{employee.employee_id}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Full Name</label>
                                            <p className="font-semibold text-lg">{employee.name}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Department</label>
                                            <p className="font-semibold text-lg">{employee.department}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm text-gray-600">Grade</label>
                                            <div className="mt-1">
                                                <Badge variant="secondary" className="text-lg px-3 py-1">
                                                    {employee.grade}
                                                </Badge>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Location</label>
                                            <p className="font-semibold text-lg">{employee.location}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-600">Barcode Tag</label>
                                            <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                {employee.barcode_tag}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quota Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Monthly Quota Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="text-center p-6 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-2">Monthly Quota</p>
                                        <p className="text-4xl font-bold text-blue-600">{employee.monthly_quota}</p>
                                        <p className="text-sm text-gray-500">gallons</p>
                                    </div>
                                    <div className="text-center p-6 bg-orange-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-2">Consumed</p>
                                        <p className="text-4xl font-bold text-orange-600">{employee.current_taken_gallons}</p>
                                        <p className="text-sm text-gray-500">gallons</p>
                                    </div>
                                    <div className="text-center p-6 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600 mb-2">Remaining</p>
                                        <p className="text-4xl font-bold text-green-600">{employee.remaining_quota}</p>
                                        <p className="text-sm text-gray-500">gallons</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-gray-700">Usage Progress</span>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-3 h-3 rounded-full ${quotaStatus.color}`}></div>
                                            <span className="text-sm text-gray-600">{quotaStatus.text} Usage</span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div 
                                            className={`h-4 rounded-full transition-all duration-300 ${quotaStatus.color}`}
                                            style={{ 
                                                width: `${Math.min((employee.current_taken_gallons / employee.monthly_quota) * 100, 100)}%` 
                                            }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>0</span>
                                        <span>{Math.round((employee.current_taken_gallons / employee.monthly_quota) * 100)}%</span>
                                        <span>{employee.monthly_quota} gallons</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Withdrawals */}
                        <Card>
                            <CardHeader>
                                <CardTitle>📋 Recent Withdrawal History</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {recentWithdrawals.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date & Time</TableHead>
                                                    <TableHead>Gallons</TableHead>
                                                    <TableHead>ID</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {recentWithdrawals.map((withdrawal) => (
                                                    <TableRow key={withdrawal.id}>
                                                        <TableCell>
                                                            {new Date(withdrawal.withdrawal_date_time).toLocaleString()}
                                                        </TableCell>
                                                        <TableCell>
                                                            <span className="font-semibold">
                                                                {withdrawal.gallons_withdrawn} gallon{withdrawal.gallons_withdrawn > 1 ? 's' : ''}
                                                            </span>
                                                        </TableCell>
                                                        <TableCell className="text-gray-500 text-sm">
                                                            #{withdrawal.id}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500">No withdrawal history found</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Withdrawals will appear here once the employee starts using their quota
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* QR Code */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>📱 QR Code</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center">
                                <div className="bg-white p-4 rounded-lg border inline-block">
                                    <img 
                                        src={qrCodeUrl} 
                                        alt={`QR Code for ${employee.name}`}
                                        className="w-48 h-48 mx-auto"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-3">
                                    Scan this QR code to quickly access employee information
                                </p>
                                <p className="text-xs text-gray-500 mt-2 font-mono">
                                    Data: {employee.barcode_tag}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>⚡ Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button 
                                    className="w-full"
                                    onClick={() => window.print()}
                                >
                                    🖨️ Print QR Code
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="w-full"
                                    onClick={() => {
                                        const canvas = document.createElement('canvas');
                                        const ctx = canvas.getContext('2d');
                                        const img = new Image();
                                        img.onload = () => {
                                            canvas.width = img.width;
                                            canvas.height = img.height;
                                            ctx?.drawImage(img, 0, 0);
                                            const link = document.createElement('a');
                                            link.download = `qr-code-${employee.employee_id}.png`;
                                            link.href = canvas.toDataURL();
                                            link.click();
                                        };
                                        img.src = qrCodeUrl;
                                    }}
                                >
                                    💾 Download QR Code
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}