<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $fillable = [
        'name',
        'harga',
        'image',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}