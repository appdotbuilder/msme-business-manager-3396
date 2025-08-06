<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $costPrice = fake()->randomFloat(2, 10, 500);
        $margin = fake()->randomFloat(2, 1.2, 3.0);
        
        return [
            'name' => fake()->words(3, true),
            'sku' => fake()->unique()->regexify('[A-Z]{2}[0-9]{4}'),
            'description' => fake()->optional(0.8)->paragraph(),
            'category_id' => ProductCategory::factory(),
            'cost_price' => $costPrice,
            'selling_price' => round($costPrice * $margin, 2),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'minimum_stock' => fake()->numberBetween(5, 20),
            'status' => fake()->randomElement(['active', 'inactive']),
            'unit' => fake()->randomElement(['pcs', 'kg', 'liter', 'meter', 'box']),
        ];
    }

    /**
     * Indicate that the product is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the product has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => fake()->numberBetween(0, 5),
            'minimum_stock' => fake()->numberBetween(10, 20),
        ]);
    }
}