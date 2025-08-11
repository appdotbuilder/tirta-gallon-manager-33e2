import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    return (
        <AppShell>
            <Head title="💧 Admin Dashboard - Water Gallon System" />
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">💧 Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">PT Tirta Investama - Water Gallon Distribution System</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Employee Management */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                👥 Employee Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Manage employee profiles, quotas, and access QR codes for all staff members.
                            </p>
                            <Link href={route('admin.employees.index')}>
                                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                    Manage Employees
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Quick Add Employee */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ➕ Add New Employee
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Quickly register a new employee with their grade and gallon quota allocation.
                            </p>
                            <Link href={route('admin.employees.create')}>
                                <Button className="w-full" variant="outline">
                                    Add Employee
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Download Reports */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                📊 Download Reports
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Download comprehensive withdrawal history reports in Excel format.
                            </p>
                            <Button 
                                className="w-full"
                                variant="outline"
                                onClick={() => window.location.href = route('admin.reports.download')}
                            >
                                Download Report
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Public Scanner */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🔍 Public Scanner Interface
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Access the public gallon withdrawal interface that employees use.
                            </p>
                            <Button 
                                className="w-full"
                                variant="outline"
                                onClick={() => window.open(route('home'), '_blank')}
                            >
                                Open Scanner
                            </Button>
                        </CardContent>
                    </Card>

                    {/* System Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                ℹ️ System Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <span className="font-medium">System:</span> PT Tirta Investama
                                </div>
                                <div>
                                    <span className="font-medium">Version:</span> 1.0.0
                                </div>
                                <div>
                                    <span className="font-medium">Quota Reset:</span> Monthly (Automatic)
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Help & Support */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                🆘 Help & Support
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div>
                                    <h4 className="font-medium">Grade Quotas:</h4>
                                    <ul className="text-gray-600 space-y-1 ml-2">
                                        <li>• G7-G8: 24 gallons/month</li>
                                        <li>• G9: 12 gallons/month</li>
                                        <li>• G10: 10 gallons/month</li>
                                        <li>• G11-G13: 7 gallons/month</li>
                                    </ul>
                                </div>
                                <p className="text-gray-600">
                                    Contact IT support for technical assistance.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}
