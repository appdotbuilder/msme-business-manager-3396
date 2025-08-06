<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\AccountCategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string $type
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Transaction> $transactions
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory income()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory expense()
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AccountCategory whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class AccountCategory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'type',
        'description',
    ];

    /**
     * Scope a query to only include income categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeIncome($query)
    {
        return $query->where('type', 'income');
    }

    /**
     * Scope a query to only include expense categories.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeExpense($query)
    {
        return $query->where('type', 'expense');
    }

    /**
     * Get the transactions for the category.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class, 'category_id');
    }
}