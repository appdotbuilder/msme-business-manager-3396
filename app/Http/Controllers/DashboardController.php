<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with key business metrics.
     */
    public function index()
    {
        $totalCustomers = Customer::count();
        $activeProducts = Product::active()->count();
        $lowStockProducts = Product::lowStock()->count();
        
        $todaysSales = Sale::whereDate('sale_date', today())->count();
        $todaysRevenue = Sale::whereDate('sale_date', today())->sum('total_amount');
        
        $monthlyRevenue = Sale::whereMonth('sale_date', now()->month)
            ->whereYear('sale_date', now()->year)
            ->sum('total_amount');
            
        $monthlyExpenses = Transaction::expense()
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->sum('amount');
            
        $recentSales = Sale::with(['customer', 'user'])
            ->latest('sale_date')
            ->take(5)
            ->get();
            
        $topProducts = Product::with('category')
            ->withCount(['saleItems' => function ($query) {
                $query->whereHas('sale', function ($saleQuery) {
                    $saleQuery->whereMonth('sale_date', now()->month)
                        ->whereYear('sale_date', now()->year);
                });
            }])
            ->orderBy('sale_items_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalCustomers' => $totalCustomers,
                'activeProducts' => $activeProducts,
                'lowStockProducts' => $lowStockProducts,
                'todaysSales' => $todaysSales,
                'todaysRevenue' => number_format($todaysRevenue, 2),
                'monthlyRevenue' => number_format($monthlyRevenue, 2),
                'monthlyExpenses' => number_format($monthlyExpenses, 2),
                'monthlyProfit' => number_format($monthlyRevenue - $monthlyExpenses, 2),
            ],
            'recentSales' => $recentSales,
            'topProducts' => $topProducts,
        ]);
    }
}