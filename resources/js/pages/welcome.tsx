import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="💧 PT Tirta Investama - Water Gallon Distribution System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-white p-6 text-gray-900 lg:justify-center lg:p-8">
                <header className="mb-8 w-full max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-lg border border-blue-200 bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                            >
                                🔐 Admin Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg border border-blue-200 bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                <div className="w-full max-w-4xl">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <div className="mb-6">
                            <h1 className="text-5xl font-bold text-gray-900 mb-4">
                                💧 Water Gallon Distribution
                            </h1>
                            <p className="text-xl text-blue-600 font-semibold mb-2">
                                PT Tirta Investama
                            </p>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Smart employee gallon quota management system with barcode scanning and automated tracking
                            </p>
                        </div>

                        {/* Quick Scan Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-blue-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 Quick Employee Scan</h2>
                            <div className="max-w-md mx-auto">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        placeholder="Scan barcode or enter Employee ID"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const input = e.target as HTMLInputElement;
                                                if (input.value.trim()) {
                                                    // Redirect to the main gallon scan page with lookup
                                                    window.location.href = `/?lookup=${encodeURIComponent(input.value.trim())}`;
                                                }
                                            }
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            const input = document.querySelector('input') as HTMLInputElement;
                                            if (input?.value.trim()) {
                                                window.location.href = `/?lookup=${encodeURIComponent(input.value.trim())}`;
                                            }
                                        }}
                                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        🔍 Scan
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-3">
                                    Press Enter or click Scan to look up employee information
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="text-4xl mb-4">📱</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Barcode Scanning</h3>
                            <p className="text-gray-600">
                                Quick employee identification using barcode tags or manual ID entry with instant quota lookup
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Quota Management</h3>
                            <p className="text-gray-600">
                                Automated monthly quota allocation based on employee grade (G7-G13) with real-time tracking
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="text-4xl mb-4">🔐</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Admin Panel</h3>
                            <p className="text-gray-600">
                                Complete employee management, QR code generation, and comprehensive withdrawal reports
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="text-4xl mb-4">🥤</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Smart Withdrawal</h3>
                            <p className="text-gray-600">
                                Automatic quota validation and withdrawal logging with remaining balance updates
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Detailed Reports</h3>
                            <p className="text-gray-600">
                                Download comprehensive withdrawal history in Excel format with date filtering options
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                            <div className="text-4xl mb-4">🔄</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Auto Reset</h3>
                            <p className="text-gray-600">
                                Monthly quota automatically resets at the beginning of each month for all employees
                            </p>
                        </div>
                    </div>

                    {/* Grade Information */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-blue-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📋 Employee Grade Quotas</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            {[
                                { grade: 'G7', quota: 24, color: 'bg-blue-100 text-blue-800' },
                                { grade: 'G8', quota: 24, color: 'bg-blue-100 text-blue-800' },
                                { grade: 'G9', quota: 12, color: 'bg-green-100 text-green-800' },
                                { grade: 'G10', quota: 10, color: 'bg-yellow-100 text-yellow-800' },
                                { grade: 'G11', quota: 7, color: 'bg-red-100 text-red-800' },
                                { grade: 'G12', quota: 7, color: 'bg-red-100 text-red-800' },
                                { grade: 'G13', quota: 7, color: 'bg-red-100 text-red-800' },
                            ].map((item) => (
                                <div key={item.grade} className={`text-center p-4 rounded-lg ${item.color}`}>
                                    <div className="font-bold text-lg">{item.grade}</div>
                                    <div className="text-sm">{item.quota} gallons</div>
                                    <div className="text-xs opacity-75">per month</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-gray-600 mt-6">
                            💡 Quotas are automatically assigned based on employee grade and reset monthly
                        </p>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Scan your employee card above or contact your administrator to set up your account
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-lg"
                            >
                                🔍 Start Scanning Now
                            </button>
                            {!auth.user && (
                                <Link
                                    href={route('login')}
                                    className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg inline-block"
                                >
                                    🔐 Admin Login
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
                        <p>&copy; 2024 PT Tirta Investama. Water Gallon Distribution System v1.0</p>
                        <p className="mt-2">Built with ❤️ for efficient gallon quota management</p>
                    </footer>
                </div>
            </div>
        </>
    );
}