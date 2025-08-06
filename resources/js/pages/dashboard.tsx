import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Props {
    stats: {
        totalCustomers: number;
        activeProducts: number;
        lowStockProducts: number;
        todaysSales: number;
        todaysRevenue: string;
        monthlyRevenue: string;
        monthlyExpenses: string;
        monthlyProfit: string;
    };
    recentSales: Array<{
        id: number;
        invoice_number: string;
        total_amount: string;
        customer: {
            name: string;
        };
        user: {
            name: string;
        };
        sale_date: string;
    }>;
    topProducts: Array<{
        id: number;
        name: string;
        sku: string;
        category: {
            name: string;
        };
        sale_items_count: number;
    }>;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentSales, topProducts }: Props) {
    return (
        <AppShell>
            <Head title="Dashboard - MSME Business Manager" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📊 Business Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's your business overview.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/sales/create">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                💰 New Sale
                            </Button>
                        </Link>
                        <Link href="/products/create">
                            <Button size="sm" variant="outline">
                                📦 Add Product
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Today's Sales</p>
                                <p className="text-2xl font-bold text-blue-900">{stats.todaysSales}</p>
                                <p className="text-sm text-blue-700">₹{stats.todaysRevenue}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">Monthly Revenue</p>
                                <p className="text-2xl font-bold text-green-900">₹{stats.monthlyRevenue}</p>
                                <p className="text-sm text-green-700">Profit: ₹{stats.monthlyProfit}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600">Customers</p>
                                <p className="text-2xl font-bold text-purple-900">{stats.totalCustomers}</p>
                                <p className="text-sm text-purple-700">Total active</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-600">Inventory</p>
                                <p className="text-2xl font-bold text-orange-900">{stats.activeProducts}</p>
                                <p className="text-sm text-red-600">{stats.lowStockProducts} low stock</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">💰 Recent Sales</h3>
                                <Link href="/sales">
                                    <Button size="sm" variant="ghost">View All</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {recentSales.length > 0 ? (
                                recentSales.map((sale) => (
                                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">{sale.invoice_number}</p>
                                            <p className="text-sm text-gray-600">{sale.customer.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(sale.sale_date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-green-600">₹{sale.total_amount}</p>
                                            <p className="text-xs text-gray-500">by {sale.user.name}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>📊 No sales recorded yet</p>
                                    <Link href="/sales/create" className="text-blue-600 hover:text-blue-700">
                                        Create your first sale
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">🏆 Top Products</h3>
                                <Link href="/products">
                                    <Button size="sm" variant="ghost">View All</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            {topProducts.length > 0 ? (
                                topProducts.map((product, index) => (
                                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{product.name}</p>
                                                <p className="text-sm text-gray-600">{product.category.name}</p>
                                                <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold text-blue-600">{product.sale_items_count}</p>
                                            <p className="text-xs text-gray-500">sold this month</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    <p>📦 No products sold yet</p>
                                    <Link href="/products/create" className="text-blue-600 hover:text-blue-700">
                                        Add your first product
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/customers/create">
                            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-2xl">👤</span>
                                <span className="font-medium text-gray-700">Add Customer</span>
                            </div>
                        </Link>
                        
                        <Link href="/inventory/create">
                            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-2xl">📈</span>
                                <span className="font-medium text-gray-700">Stock Update</span>
                            </div>
                        </Link>
                        
                        <Link href="/accounting/create">
                            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-2xl">💳</span>
                                <span className="font-medium text-gray-700">Add Transaction</span>
                            </div>
                        </Link>
                        
                        <Link href="/accounting">
                            <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-2xl">📊</span>
                                <span className="font-medium text-gray-700">View Reports</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Alerts */}
                {stats.lowStockProducts > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h4 className="font-semibold text-red-800">Low Stock Alert</h4>
                                <p className="text-red-700">
                                    {stats.lowStockProducts} product{stats.lowStockProducts !== 1 ? 's' : ''} running low on stock.
                                </p>
                                <Link href="/inventory" className="text-red-800 hover:text-red-900 font-medium">
                                    Manage Inventory →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}