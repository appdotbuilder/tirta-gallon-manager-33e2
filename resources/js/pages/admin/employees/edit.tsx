import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputError } from '@/components/input-error';

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
}



interface Props {
    employee: Employee;
    [key: string]: unknown;
}

export default function EditEmployee({ employee }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        barcode_tag: employee.barcode_tag,
        employee_id: employee.employee_id,
        name: employee.name,
        department: employee.department,
        grade: employee.grade,
        location: employee.location,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.employees.update', employee.id));
    };

    const grades = [
        { value: 'G7', label: 'G7 (24 gallons)', quota: 24 },
        { value: 'G8', label: 'G8 (24 gallons)', quota: 24 },
        { value: 'G9', label: 'G9 (12 gallons)', quota: 12 },
        { value: 'G10', label: 'G10 (10 gallons)', quota: 10 },
        { value: 'G11', label: 'G11 (7 gallons)', quota: 7 },
        { value: 'G12', label: 'G12 (7 gallons)', quota: 7 },
        { value: 'G13', label: 'G13 (7 gallons)', quota: 7 },
    ];

    const selectedGrade = grades.find(g => g.value === data.grade);

    return (
        <AppShell>
            <Head title={`✏️ Edit ${employee.name} - Admin Panel`} />
            
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.employees.show', employee.id)}>
                        <Button variant="outline">
                            ← Back to Employee
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Employee</h1>
                        <p className="text-gray-600 mt-1">Update {employee.name}'s information</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Barcode Tag *
                                            </label>
                                            <Input
                                                type="text"
                                                value={data.barcode_tag}
                                                onChange={(e) => setData('barcode_tag', e.target.value)}
                                                className={errors.barcode_tag ? 'border-red-300' : ''}
                                            />
                                            <InputError message={errors.barcode_tag} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Employee ID *
                                            </label>
                                            <Input
                                                type="text"
                                                value={data.employee_id}
                                                onChange={(e) => setData('employee_id', e.target.value)}
                                                className={errors.employee_id ? 'border-red-300' : ''}
                                            />
                                            <InputError message={errors.employee_id} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <Input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={errors.name ? 'border-red-300' : ''}
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Department *
                                            </label>
                                            <Input
                                                type="text"
                                                value={data.department}
                                                onChange={(e) => setData('department', e.target.value)}
                                                className={errors.department ? 'border-red-300' : ''}
                                            />
                                            <InputError message={errors.department} />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Location *
                                            </label>
                                            <Input
                                                type="text"
                                                value={data.location}
                                                onChange={(e) => setData('location', e.target.value)}
                                                className={errors.location ? 'border-red-300' : ''}
                                            />
                                            <InputError message={errors.location} />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Grade *
                                        </label>
                                        <select
                                            value={data.grade}
                                            onChange={(e) => setData('grade', e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                                        >
                                            {grades.map((grade) => (
                                                <option key={grade.value} value={grade.value}>
                                                    {grade.label}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={errors.grade} />
                                        {selectedGrade && data.grade !== employee.grade && (
                                            <p className="text-sm text-blue-600 mt-1">
                                                💧 New monthly quota will be: {selectedGrade.quota} gallons
                                            </p>
                                        )}
                                    </div>

                                    <div className="border-t pt-6">
                                        <div className="flex gap-4">
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-blue-600 hover:bg-blue-700"
                                            >
                                                {processing ? 'Updating...' : '✅ Update Employee'}
                                            </Button>
                                            <Link href={route('admin.employees.show', employee.id)}>
                                                <Button type="button" variant="outline">
                                                    Cancel
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Current Status Card */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>📊 Current Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="text-center p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Current Quota</p>
                                    <p className="text-2xl font-bold text-blue-600">{employee.monthly_quota}</p>
                                    <p className="text-sm text-gray-500">gallons/month</p>
                                </div>
                                
                                <div className="text-center p-4 bg-orange-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Used This Month</p>
                                    <p className="text-2xl font-bold text-orange-600">{employee.current_taken_gallons}</p>
                                    <p className="text-sm text-gray-500">gallons</p>
                                </div>

                                <div className="text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Remaining</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {employee.monthly_quota - employee.current_taken_gallons}
                                    </p>
                                    <p className="text-sm text-gray-500">gallons</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Warning Card */}
                        {data.grade !== employee.grade && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-yellow-600">⚠️ Grade Change Notice</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2 text-sm">
                                        <p>
                                            <strong>Old Grade:</strong> {employee.grade} ({employee.monthly_quota} gallons)
                                        </p>
                                        <p>
                                            <strong>New Grade:</strong> {data.grade} ({selectedGrade?.quota} gallons)
                                        </p>
                                        <p className="text-yellow-700 bg-yellow-50 p-2 rounded mt-3">
                                            💡 The monthly quota will be updated immediately. Current usage will remain unchanged.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}