<?php

namespace Database\Seeders;

use App\Models\AccountCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AccountCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $incomeCategories = [
            ['name' => 'Product Sales', 'type' => 'income', 'description' => 'Revenue from product sales'],
            ['name' => 'Service Income', 'type' => 'income', 'description' => 'Revenue from services'],
            ['name' => 'Interest Income', 'type' => 'income', 'description' => 'Interest earned on investments'],
            ['name' => 'Other Income', 'type' => 'income', 'description' => 'Miscellaneous income'],
        ];

        $expenseCategories = [
            ['name' => 'Cost of Goods Sold', 'type' => 'expense', 'description' => 'Direct costs of products sold'],
            ['name' => 'Rent', 'type' => 'expense', 'description' => 'Office and store rent'],
            ['name' => 'Utilities', 'type' => 'expense', 'description' => 'Electricity, water, internet, etc.'],
            ['name' => 'Marketing', 'type' => 'expense', 'description' => 'Advertising and promotional expenses'],
            ['name' => 'Office Supplies', 'type' => 'expense', 'description' => 'Office supplies and equipment'],
            ['name' => 'Travel', 'type' => 'expense', 'description' => 'Business travel expenses'],
            ['name' => 'Insurance', 'type' => 'expense', 'description' => 'Business insurance premiums'],
            ['name' => 'Professional Services', 'type' => 'expense', 'description' => 'Legal, accounting, consulting fees'],
            ['name' => 'Other Expenses', 'type' => 'expense', 'description' => 'Miscellaneous business expenses'],
        ];

        $categories = array_merge($incomeCategories, $expenseCategories);

        foreach ($categories as $category) {
            AccountCategory::firstOrCreate(
                ['slug' => Str::slug($category['name'])],
                array_merge($category, ['slug' => Str::slug($category['name'])])
            );
        }
    }
}