<?php

namespace App\Http\Controllers;

use App\Http\Requests\StockMovementRequest;
use App\Models\Product;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the inventory.
     */
    public function index()
    {
        $products = Product::with('category')
            ->orderBy('stock_quantity')
            ->paginate(15);
            
        $lowStockProducts = Product::lowStock()->with('category')->get();
        
        return Inertia::render('inventory/index', [
            'products' => $products,
            'lowStockProducts' => $lowStockProducts
        ]);
    }

    /**
     * Show stock movements for a product.
     */
    public function show(Product $product)
    {
        $product->load('category');
        
        $stockMovements = StockMovement::where('product_id', $product->id)
            ->with('user')
            ->latest()
            ->paginate(20);
            
        return Inertia::render('inventory/show', [
            'product' => $product,
            'stockMovements' => $stockMovements
        ]);
    }

    /**
     * Store stock movement.
     */
    public function store(StockMovementRequest $request)
    {
        $product = Product::findOrFail($request->validated()['product_id']);
        
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['previous_stock'] = $product->stock_quantity;
        
        if ($data['type'] === 'stock_in') {
            $data['new_stock'] = $product->stock_quantity + $data['quantity'];
        } else {
            $data['new_stock'] = $product->stock_quantity - $data['quantity'];
        }
        
        StockMovement::create($data);
        
        $product->update(['stock_quantity' => $data['new_stock']]);

        return redirect()->route('inventory.show', $product)
            ->with('success', 'Stock movement recorded successfully.');
    }

    /**
     * Show the form for creating a stock movement.
     */
    public function create()
    {
        $products = Product::active()->with('category')->orderBy('name')->get();
        
        return Inertia::render('inventory/create', [
            'products' => $products
        ]);
    }
}