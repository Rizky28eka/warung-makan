<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HappyFood extends Model
{
    protected $fillable = ['name', 'numberPhone', 'email', 'catatan', 'alamat'];
}