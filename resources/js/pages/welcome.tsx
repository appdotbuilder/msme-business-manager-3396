import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <>
            <Head title="MSME Business Manager - Complete Solution for Small & Medium Enterprises" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                {/* Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">MB</span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">MSME Manager</h1>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-gray-600">Welcome, {auth.user.name}</span>
                                        <Link href="/dashboard">
                                            <Button>Go to Dashboard</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-4">
                                        <Link href="/login">
                                            <Button variant="ghost">Login</Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button>Get Started</Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
                            🏢 Complete Business Management
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                for MSME Success
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Streamline your small and medium enterprise with our comprehensive management solution. 
                            Handle sales, inventory, customers, and accounting all in one powerful platform.
                        </p>
                        
                        {!auth.user && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link href="/register">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3">
                                        🚀 Start Free Trial
                                    </Button>
                                </Link>
                                <Link href="#features">
                                    <Button variant="outline" size="lg" className="px-8 py-3">
                                        📋 View Features
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Features Grid */}
                <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                ✨ Everything Your Business Needs
                            </h3>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Comprehensive modules designed specifically for small and medium enterprises
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Sales Management */}
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">💰</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Sales Management</h4>
                                <p className="text-gray-600 mb-4">
                                    Record sales, generate invoices, track payments, and manage customer orders seamlessly.
                                </p>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div>✓ Invoice Generation</div>
                                    <div>✓ Payment Tracking</div>
                                    <div>✓ Sales Analytics</div>
                                </div>
                            </div>

                            {/* Inventory Management */}
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Inventory Control</h4>
                                <p className="text-gray-600 mb-4">
                                    Manage product listings, track stock levels, and get low-stock alerts automatically.
                                </p>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div>✓ Stock Tracking</div>
                                    <div>✓ Low Stock Alerts</div>
                                    <div>✓ Product Categories</div>
                                </div>
                            </div>

                            {/* Customer Management */}
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Customer Directory</h4>
                                <p className="text-gray-600 mb-4">
                                    Maintain detailed customer profiles, purchase history, and build lasting relationships.
                                </p>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div>✓ Customer Profiles</div>
                                    <div>✓ Purchase History</div>
                                    <div>✓ Contact Management</div>
                                </div>
                            </div>

                            {/* Accounting */}
                            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Simple Accounting</h4>
                                <p className="text-gray-600 mb-4">
                                    Track income and expenses, monitor cash flow, and generate financial reports.
                                </p>
                                <div className="text-sm text-gray-500 space-y-1">
                                    <div>✓ Income/Expense Tracking</div>
                                    <div>✓ Financial Reports</div>
                                    <div>✓ Profit Analysis</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Role-Based Access */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                🔐 Role-Based Access Control
                            </h3>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Secure your business with proper access controls for different team members
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">👑</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Business Owner</h4>
                                <p className="text-gray-600">
                                    Full access to all features, user management, and complete business oversight
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">🏆</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Manager</h4>
                                <p className="text-gray-600">
                                    Access to sales, inventory, customers, and accounting - perfect for operations management
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-3xl">👨‍💼</span>
                                </div>
                                <h4 className="text-xl font-semibold text-gray-900 mb-2">Employee</h4>
                                <p className="text-gray-600">
                                    Limited access for daily tasks like recording sales and viewing customer information
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Modern UI Preview */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                🎨 Modern, Clean Interface
                            </h3>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                Built with the latest technologies for a smooth, responsive experience
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h4 className="text-2xl font-semibold text-gray-900 mb-4">
                                        Dashboard Overview
                                    </h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-green-600 text-sm">📈</span>
                                            </div>
                                            <span className="text-gray-700">Real-time sales analytics</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <span className="text-blue-600 text-sm">📊</span>
                                            </div>
                                            <span className="text-gray-700">Financial performance tracking</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <span className="text-purple-600 text-sm">⚡</span>
                                            </div>
                                            <span className="text-gray-700">Quick action shortcuts</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Today's Revenue</span>
                                            <span className="text-2xl font-bold text-green-600">₹12,450</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Products Sold</span>
                                            <span className="text-2xl font-bold text-blue-600">247</span>
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Active Customers</span>
                                            <span className="text-2xl font-bold text-purple-600">1,234</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Ready to Transform Your Business?
                            </h3>
                            <p className="text-xl text-blue-100 mb-8">
                                Join thousands of small businesses already using MSME Manager to streamline their operations
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" variant="secondary" className="px-8 py-3 bg-white text-blue-600 hover:bg-gray-100">
                                        🚀 Start Your Free Trial
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white/10">
                                        🔑 Login to Continue
                                    </Button>
                                </Link>
                            </div>
                            
                            <p className="text-sm text-blue-200 mt-6">
                                No credit card required • 30-day free trial • Setup in minutes
                            </p>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">MB</span>
                                </div>
                                <h4 className="text-xl font-bold">MSME Business Manager</h4>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Empowering small and medium enterprises with comprehensive business management tools
                            </p>
                            <div className="flex justify-center space-x-6 text-sm text-gray-400">
                                <span>© 2024 MSME Manager</span>
                                <span>•</span>
                                <span>Built with ❤️ for Small Businesses</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}