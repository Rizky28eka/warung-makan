<?php

namespace App\Http\Controllers;

use App\Models\BudgetingSendiri;
use Illuminate\Http\Request;
use App\Models\Order;

class BudgetingSendiriController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgetings = BudgetingSendiri::with('orders')->get();
        return inertia('Dashboard/BudgetingSendiri/Index', ['budgetings' => $budgetings]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Dashboard/BudgetingSendiri/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'alamat' => 'required|string|max:50',
            'numberPhone' => 'required|string|max:50',
            'tanggalMulai' => 'nullable|string',
            'catatan' => 'nullable|string',
            'orders' => 'required|array', // Array of orders
            'orders.*.food_id' => 'required', // Validasi food_id
            'orders.*.qty' => 'required|integer|min:1', // Validasi qty
        ], [
            'alamat.required' => 'Alamat harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
            'orders.required' => 'Harap pilih makanan.',
        ]);

        // Simpan data budgeting
        $budgeting = BudgetingSendiri::create([
            'alamat' => $validated['alamat'],
            'numberPhone' => $validated['numberPhone'],
            'tanggalMulai' => $validated['tanggalMulai'],
            'catatan' => $validated['catatan'],
        ]);

        // Simpan data pesanan ke tabel orders
        foreach ($validated['orders'] as $orderData) {
            $budgeting->orders()->create([
                'food_id' => $orderData['food_id'],
                'qty' => $orderData['qty'],
            ]);
        }

        // Redirect ke halaman dengan pesan sukses
        return redirect()->route('dashboard.budgetingSendiri')->with('success', 'Data berhasil ditambahkan!');
    }


    /**
     * Display the specified resource.
     */
    public function show(BudgetingSendiri $budgetingSendiri)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BudgetingSendiri $budgetingSendiri)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BudgetingSendiri $budgetingSendiri)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BudgetingSendiri $budgetingSendiri)
    {
        $budgetingSendiri->delete();
        return response()->json(['message' => 'Data berhasil dihapus!']);
    }
}