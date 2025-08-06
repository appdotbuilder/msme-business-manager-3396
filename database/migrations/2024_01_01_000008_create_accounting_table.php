<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('account_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('type', ['income', 'expense']);
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index('name');
            $table->index('type');
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('reference_number')->unique();
            $table->foreignId('category_id')->constrained('account_categories')->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['income', 'expense']);
            $table->decimal('amount', 12, 2);
            $table->text('description');
            $table->string('payment_method')->nullable(); // cash, bank, card
            $table->string('reference_type')->nullable(); // sale, purchase, other
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->timestamp('transaction_date');
            $table->timestamps();
            
            $table->index('reference_number');
            $table->index('category_id');
            $table->index('user_id');
            $table->index('type');
            $table->index('transaction_date');
            $table->index(['reference_type', 'reference_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
        Schema::dropIfExists('account_categories');
    }
};