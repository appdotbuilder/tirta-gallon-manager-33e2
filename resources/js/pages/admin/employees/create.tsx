import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputError } from '@/components/input-error';



export default function CreateEmployee() {
    const { data, setData, post, processing, errors } = useForm({
        barcode_tag: '',
        employee_id: '',
        name: '',
        department: '',
        grade: 'G7',
        location: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.employees.store'));
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
            <Head title="➕ Add New Employee - Admin Panel" />
            
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.employees.index')}>
                        <Button variant="outline">
                            ← Back to Employees
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">➕ Add New Employee</h1>
                        <p className="text-gray-600 mt-1">Create a new employee profile with gallon quota</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
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
                                        placeholder="e.g., BC123456"
                                        className={errors.barcode_tag ? 'border-red-300' : ''}
                                    />
                                    <InputError message={errors.barcode_tag} />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Unique barcode for scanning identification
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Employee ID *
                                    </label>
                                    <Input
                                        type="text"
                                        value={data.employee_id}
                                        onChange={(e) => setData('employee_id', e.target.value)}
                                        placeholder="e.g., EMP001"
                                        className={errors.employee_id ? 'border-red-300' : ''}
                                    />
                                    <InputError message={errors.employee_id} />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Manual identification number
                                    </p>
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
                                    placeholder="e.g., John Doe"
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
                                        placeholder="e.g., Human Resources"
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
                                        placeholder="e.g., Jakarta Office"
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
                                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {grades.map((grade) => (
                                        <option key={grade.value} value={grade.value}>
                                            {grade.label}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.grade} />
                                {selectedGrade && (
                                    <p className="text-sm text-blue-600 mt-1">
                                        💧 Monthly quota: {selectedGrade.quota} gallons
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
                                        {processing ? 'Creating...' : '✅ Create Employee'}
                                    </Button>
                                    <Link href={route('admin.employees.index')}>
                                        <Button type="button" variant="outline">
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Grade Information Card */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-lg">📊 Grade Quota Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {grades.map((grade) => (
                                <div 
                                    key={grade.value} 
                                    className={`p-3 rounded-lg border ${data.grade === grade.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                                >
                                    <div className="font-medium">{grade.value}</div>
                                    <div className="text-sm text-gray-600">{grade.quota} gallons/month</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-4">
                            💡 Quotas automatically reset at the beginning of each month
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}