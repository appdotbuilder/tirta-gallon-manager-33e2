import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

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

interface Props {
    employee?: Employee;
    error?: string;
    success?: string;
    initialIdentifier?: string;
    [key: string]: unknown;
}

export default function GallonScan({ employee, error, success, initialIdentifier }: Props) {
    const [identifier, setIdentifier] = useState(initialIdentifier || '');
    const [gallons, setGallons] = useState(1);
    const [isLookingUp, setIsLookingUp] = useState(false);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    // Clear messages after 5 seconds
    useEffect(() => {
        if (error || success) {
            const timer = setTimeout(() => {
                router.get(route('home'), {}, { 
                    preserveState: false,
                    replace: true 
                });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, success]);

    const handleLookup = () => {
        if (!identifier.trim()) return;
        
        setIsLookingUp(true);
        router.post(route('gallon.store'), 
            { identifier: identifier.trim() }, 
            {
                onFinish: () => setIsLookingUp(false),
                preserveState: false
            }
        );
    };

    const handleWithdraw = () => {
        if (!employee || gallons < 1) return;
        
        setIsWithdrawing(true);
        router.put(route('gallon.update'),
            { 
                employee_id: employee.id, 
                gallons: gallons 
            },
            {
                onFinish: () => setIsWithdrawing(false),
                preserveState: false
            }
        );
    };

    const resetForm = () => {
        setIdentifier('');
        setGallons(1);
        router.get(route('home'), {}, { 
            preserveState: false,
            replace: true 
        });
    };



    return (
        <>
            <Head title="💧 Water Gallon Distribution - PT Tirta Investama" />
            <div className="min-h-screen bg-white">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-2">💧 Water Gallon Distribution</h1>
                        <p className="text-blue-100">PT Tirta Investama - Employee Gallon Withdrawal System</p>
                        <div className="mt-4 flex gap-4">
                            <Button 
                                variant="outline" 
                                className="text-blue-600 border-white hover:bg-blue-50"
                                onClick={() => window.location.href = route('login')}
                            >
                                🔐 Admin Login
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-6">
                    {/* Error Message */}
                    {error && (
                        <Alert className="mb-6 border-red-200 bg-red-50">
                            <AlertDescription className="text-red-700">
                                ❌ {error}
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Success Message */}
                    {success && (
                        <Alert className="mb-6 border-green-200 bg-green-50">
                            <AlertDescription className="text-green-700">
                                ✅ {success}
                            </AlertDescription>
                        </Alert>
                    )}

                    {!employee ? (
                        /* Employee Lookup Form */
                        <Card className="mb-6">
                            <CardHeader>
                                <CardTitle className="text-xl text-gray-800">
                                    🔍 Scan Employee Card or Enter ID
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Barcode Tag or Employee ID
                                    </label>
                                    <Input
                                        type="text"
                                        value={identifier}
                                        onChange={(e) => setIdentifier(e.target.value)}
                                        placeholder="Scan barcode or type employee ID (e.g., EMP001)"
                                        className="text-lg p-4"
                                        autoFocus
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleLookup();
                                            }
                                        }}
                                    />
                                </div>
                                <Button
                                    onClick={handleLookup}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                                    disabled={!identifier.trim() || isLookingUp}
                                >
                                    {isLookingUp ? '🔄 Looking up...' : '🔍 Look Up Employee'}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        /* Employee Details and Withdrawal Form */
                        <div className="space-y-6">
                            {/* Employee Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-800">
                                        👤 Employee Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-gray-600">Employee ID</label>
                                                <p className="font-semibold text-lg">{employee.employee_id}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Name</label>
                                                <p className="font-semibold text-lg">{employee.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Department</label>
                                                <p className="font-semibold text-lg">{employee.department}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="text-sm text-gray-600">Grade</label>
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="secondary" className="text-lg px-3 py-1">
                                                        {employee.grade}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-sm text-gray-600">Location</label>
                                                <p className="font-semibold text-lg">{employee.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quota Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-800">
                                        📊 Monthly Quota Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-1">Monthly Quota</p>
                                            <p className="text-3xl font-bold text-blue-600">{employee.monthly_quota}</p>
                                            <p className="text-sm text-gray-500">gallons</p>
                                        </div>
                                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-1">Already Taken</p>
                                            <p className="text-3xl font-bold text-orange-600">{employee.current_taken_gallons}</p>
                                            <p className="text-sm text-gray-500">gallons</p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <p className="text-sm text-gray-600 mb-1">Remaining</p>
                                            <p className="text-3xl font-bold text-green-600">{employee.remaining_quota}</p>
                                            <p className="text-sm text-gray-500">gallons</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-6">
                                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                                            <span>Quota Usage</span>
                                            <span>{Math.round((employee.current_taken_gallons / employee.monthly_quota) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div 
                                                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                                style={{ 
                                                    width: `${Math.min((employee.current_taken_gallons / employee.monthly_quota) * 100, 100)}%` 
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Withdrawal Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl text-gray-800">
                                        🥤 Withdraw Gallons
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Gallons to Withdraw
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setGallons(Math.max(1, gallons - 1))}
                                                disabled={gallons <= 1}
                                            >
                                                -
                                            </Button>
                                            <Input
                                                type="number"
                                                value={gallons}
                                                onChange={(e) => setGallons(Math.max(1, parseInt(e.target.value) || 1))}
                                                min="1"
                                                max={employee.remaining_quota}
                                                className="text-center text-lg font-semibold w-24"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setGallons(Math.min(employee.remaining_quota, gallons + 1))}
                                                disabled={gallons >= employee.remaining_quota}
                                            >
                                                +
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Maximum available: {employee.remaining_quota} gallons
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Button
                                            onClick={handleWithdraw}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg"
                                            disabled={gallons < 1 || gallons > employee.remaining_quota || isWithdrawing}
                                        >
                                            {isWithdrawing ? '⏳ Processing...' : `🥤 Withdraw ${gallons} Gallon${gallons > 1 ? 's' : ''}`}
                                        </Button>
                                        <Button
                                            onClick={resetForm}
                                            variant="outline"
                                            className="px-8 py-4"
                                        >
                                            ↩️ New Scan
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Instructions */}
                    <Card className="mt-8 bg-gray-50">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-gray-800 mb-3">📋 Instructions:</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Scan your employee barcode tag or manually enter your Employee ID</li>
                                <li>• Check your remaining monthly quota</li>
                                <li>• Select the number of gallons you want to withdraw</li>
                                <li>• Quotas reset automatically at the beginning of each month</li>
                                <li>• Contact HR if you need assistance with your account</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}