<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetingSendiri extends Model
{
    use HasFactory;

    protected $fillable = [
        'alamat', 'numberPhone', 'tanggalMulai', 'catatan'
    ];

    public function orders()
    {
        return $this->hasMany(Order::class, 'budgetingSendiri_id'); // Relasi one-to-many
    }
}