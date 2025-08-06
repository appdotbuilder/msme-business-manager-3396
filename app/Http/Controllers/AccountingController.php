<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Models\AccountCategory;
use App\Models\Transaction;
use Inertia\Inertia;

class AccountingController extends Controller
{
    /**
     * Display a listing of the transactions.
     */
    public function index()
    {
        $transactions = Transaction::with(['category', 'user'])
            ->latest('transaction_date')
            ->paginate(15);
            
        $monthlyIncome = Transaction::income()
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->sum('amount');
            
        $monthlyExpenses = Transaction::expense()
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->sum('amount');
            
        return Inertia::render('accounting/index', [
            'transactions' => $transactions,
            'monthlyIncome' => number_format($monthlyIncome, 2),
            'monthlyExpenses' => number_format($monthlyExpenses, 2),
            'monthlyProfit' => number_format($monthlyIncome - $monthlyExpenses, 2),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = AccountCategory::orderBy('type')->orderBy('name')->get();
        
        return Inertia::render('accounting/create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['reference_number'] = 'TXN-' . now()->format('YmdHis') . '-' . random_int(1000, 9999);
        
        $transaction = Transaction::create($data);

        return redirect()->route('accounting.show', $transaction)
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        $transaction->load(['category', 'user']);
        
        return Inertia::render('accounting/show', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        $categories = AccountCategory::orderBy('type')->orderBy('name')->get();
        
        return Inertia::render('accounting/edit', [
            'transaction' => $transaction,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        $transaction->update($request->validated());

        return redirect()->route('accounting.show', $transaction)
            ->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        $transaction->delete();

        return redirect()->route('accounting.index')
            ->with('success', 'Transaction deleted successfully.');
    }
}