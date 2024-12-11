<?php

namespace App\Http\Controllers;

use App\Models\HappyFood;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HappyFoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $happyFoods = HappyFood::all();
        return inertia('Dashboard/HappyFood/Index', ['happyFoods' => $happyFoods]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Dashboard/HappyFood/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|string|max:50',
            'numberPhone' => 'required|string|max:13',
            'alamat' => 'required|string',
            'catatan' => 'nullable|string',
        ], [
            'name.required' => 'Nama harus diisi.',
            'email.required' => 'Email harus diisi.',
            'alamat.required' => 'Alamat harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
        ]);

        // Simpan data ke database
        HappyFood::create($validated);

        // Redirect ke halaman dengan pesan sukses
        return redirect()->route('dashboard.happyFood')->with('success', 'Data berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(HappyFood $happyFood)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HappyFood $happyFood)
    {
        return Inertia::render('Dashboard/HappyFood/Edit', [
            'happyFood' => $happyFood,  // Pass the record to the view
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HappyFood $happyFood)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|string|max:50',
            'numberPhone' => 'required|string|max:13',
            'alamat' => 'required|string',
            'catatan' => 'nullable|string',
        ], [
            'name.required' => 'Nama harus diisi.',
            'email.required' => 'Email harus diisi.',
            'alamat.required' => 'Alamat harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
        ]);

        $happyFood->update($validated);

        return response()->json(['message' => 'Data berhasil diperbarui!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HappyFood $happyFood)
    {
        $happyFood->delete();
        return response()->json(['message' => 'Data berhasil dihapus!']);
    }
}