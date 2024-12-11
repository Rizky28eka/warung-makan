<?php

namespace Database\Seeders;

use App\Models\Food;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        Food::factory()->create([
            'name' => 'Ayam Goreng',
            'harga' => '10000',
            'image' => '/images/ayam-goreng.png',
        ]);

        Food::factory()->create([
            'name' => 'Ayam Geprek',
            'harga' => '12000',
            'image' => '/images/ayam-geprek.png',
        ]);

        Food::factory()->create([
            'name' => 'Tempe',
            'harga' => '2000',
            'image' => '/images/tempe.png',
        ]);

        Food::factory()->create([
            'name' => 'Tahu',
            'harga' => '2000',
            'image' => '/images/tahu.png',
        ]);

        Food::factory()->create([
            'name' => 'Lele Goreng',
            'harga' => '9000',
            'image' => '/images/lele-goreng.png',
        ]);

        Food::factory()->create([
            'name' => 'Nasi Putih',
            'harga' => '3000',
            'image' => '/images/nasi-putih.png',
        ]);

        Food::factory()->create([
            'name' => 'Telur Goreng',
            'harga' => '9000',
            'image' => '/images/telur-goreng.png',
        ]);
    }
}