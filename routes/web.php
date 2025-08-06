<?php

use App\Http\Controllers\AccountingController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Customer Management
    Route::resource('customers', CustomerController::class);
    
    // Product Management
    Route::resource('products', ProductController::class);
    
    // Sales Management
    Route::resource('sales', SaleController::class);
    
    // Inventory Management
    Route::controller(InventoryController::class)->group(function () {
        Route::get('/inventory', 'index')->name('inventory.index');
        Route::get('/inventory/create', 'create')->name('inventory.create');
        Route::post('/inventory', 'store')->name('inventory.store');
        Route::get('/inventory/{product}', 'show')->name('inventory.show');
    });
    
    // Accounting
    Route::resource('accounting', AccountingController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
