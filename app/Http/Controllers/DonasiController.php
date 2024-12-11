<?php

namespace App\Http\Controllers;

use App\Models\Donasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonasiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $donasies = Donasi::all();
        return inertia('Dashboard/Donasi/Index', ['donasies' => $donasies]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Dashboard/Donasi/Add');
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
            'numberPhone' => 'required|string|max:50',
            'komentar' => 'nullable|string',
        ], [
            'name.required' => 'Nama harus diisi.',
            'email.required' => 'Email harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
        ]);

        // Simpan data ke database
        Donasi::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'numberPhone' => $validated['numberPhone'],
            'komentar' => $validated['komentar'],
        ]);

        // Redirect ke halaman dengan pesan sukses
        return redirect()->route('dashboard.donasi')->with('success', 'Data berhasil ditambahkan!');
    }


    /**
     * Display the specified resource.
     */
    public function show(Donasi $donasi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Donasi $donasi)
    {
        return Inertia::render('Dashboard/HappyFood/Edit', [
            'donasi' => $donasi,  // Pass the record to the view
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donasi $donasi)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|string|max:50',
            'numberPhone' => 'required|string|max:50',
            'komentar' => 'nullable|string',
        ], [
            'name.required' => 'Nama harus diisi.',
            'email.required' => 'Email harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
        ]);

        // Simpan data ke database
        $donasi->update($validated);

        // Redirect ke halaman dengan pesan sukses
        return response()->json(['message' => 'Data berhasil diperbarui!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donasi $donasi)
    {
        $donasi->delete();
        return response()->json(['message' => 'Data berhasil dihapus!']);
    }
}