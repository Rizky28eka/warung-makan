<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CateringHarian extends Model
{
    protected $fillable = ['name', 'alamat', 'numberPhone', 'tanggalMulai', 'catatan'];
}