<?php

use App\Http\Controllers\BudgetingSendiriController;
use App\Http\Controllers\CateringHarianController;
use App\Http\Controllers\DonasiController;
use App\Http\Controllers\HappyFoodController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/catering-harian', function () {
    return Inertia::render('CateringHarian/Index');
});
Route::get('/catering-harian/form', function () {
    return Inertia::render('CateringHarian/Form');
});
Route::get('/donasi', function () {
    return Inertia::render('Donasi');
});
Route::get('/budgeting-sendiri', function () {
    return Inertia::render('BudgetingSendiri');
});
Route::get('/happy-food', function () {
    return Inertia::render('HappyFood');
});
Route::get('/news', function () {
    return Inertia::render('News');
});
Route::get('/informasi', function () {
    return Inertia::render('Informasi');
});
Route::get('/kontak', function () {
    return Inertia::render('Kontak');
});

Route::resource('/dashboard/catering-harian', CateringHarianController::class)
    ->names([
        'index' => 'dashboard.cateringHarian',
        'create' => 'dashboard.cateringHarian.create',
        'edit' => 'dashboard.cateringHarian.edit',
        // 'update' => 'dashboard.cateringHarian.update',
        'destroy' => 'dashboard.cateringHarian.destroy',
    ]);
// Route::post('/dashboard/catering-harian/store', [CateringHarianController::class, 'store'])
// ->middleware(['auth', 'verified'])
// ->name('dashboard.cateringHarian.store');

Route::resource('/dashboard/budgeting-sendiri', BudgetingSendiriController::class)
->names([
    'index' => 'dashboard.budgetingSendiri',
    'create' => 'dashboard.budgetingSendiri.create',
    'edit' => 'dashboard.budgetingSendiri.edit',
    // 'update' => 'dashboard.budgetingSendiri.update',
    'destroy' => 'dashboard.budgetingSendiri.destroy',
]);

Route::resource('/dashboard/donasi', DonasiController::class)
    ->names([
        'index' => 'dashboard.donasi',
        'create' => 'dashboard.donasi.create',
        'edit' => 'dashboard.donasi.edit',
        // 'update' => 'dashboard.donasi.update',
        'destroy' => 'dashboard.donasi.destroy',
    ]);

Route::resource('/dashboard/happy-food', HappyFoodController::class)
    ->names([
        'index' => 'dashboard.happyFood',
        'create' => 'dashboard.happyFood.create',
        'edit' => 'dashboard.happyFood.edit',
        // 'update' => 'dashboard.happyFood.update',
        'destroy' => 'dashboard.happyFood.destroy',
    ]);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';