<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'budgetingSendiri_id', 'food_id', 'qty'
    ];

    public function budgetingSendiri()
    {
        return $this->belongsTo(BudgetingSendiri::class, 'budgetingSendiri_id'); // Relasi belongsTo
    }
}