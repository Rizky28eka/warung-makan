<?php

namespace App\Http\Controllers;

use App\Models\CateringHarian;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CateringHarianController extends Controller
{

    public function index()
    {
        $caterings = CateringHarian::all();
        return inertia('Dashboard/CateringHarian/Index', ['caterings' => $caterings]);
    }

    public function create()
    {
        return inertia('Dashboard/CateringHarian/Add');
    }

    public function store(Request $request)
    {
        // Validasi data
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'alamat' => 'required|string|max:50',
            'numberPhone' => 'required|string|max:50',
            'tanggalMulai' => 'required|date',
            'catatan' => 'nullable|string',
        ], [
            'name.required' => 'Nama harus diisi.',
            'alamat.required' => 'Alamat harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
            'tanggalMulai.required' => 'Tanggal mulai harus diisi.',
            'tanggalMulai.date' => 'Tanggal mulai harus berupa format tanggal yang valid.',
        ]);

        // Simpan data ke database
        CateringHarian::create($validated);

        // Redirect ke halaman dengan pesan sukses
        return redirect()->route('dashboard.cateringHarian')->with('success', 'Data berhasil ditambahkan!');
    }

    public function show(CateringHarian $cateringHarian)
    {
        //
    }

    public function edit(CateringHarian $cateringHarian)
    {
        // Pass the catering record to the Inertia page
    return Inertia::render('Dashboard/CateringHarian/Edit', [
        'catering' => $cateringHarian,  // Pass the record to the view
    ]);
    }

    public function update(Request $request, CateringHarian $cateringHarian)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'alamat' => 'required|string|max:50',
            'numberPhone' => 'required|string|max:50',
            'tanggalMulai' => 'required|date',
            'catatan' => 'nullable|string',
        ], [
            'name.required' => 'Nama harus diisi.',
            'alamat.required' => 'Alamat harus diisi.',
            'numberPhone.required' => 'Nomor telepon harus diisi.',
            'tanggalMulai.required' => 'Tanggal mulai harus diisi.',
            'tanggalMulai.date' => 'Tanggal mulai harus berupa format tanggal yang valid.',
        ]);

        $cateringHarian->update($validated);

        return response()->json(['message' => 'Data berhasil diperbarui!']);
    }

    public function destroy(CateringHarian $cateringHarian)
    {
        $cateringHarian->delete();
        return response()->json(['message' => 'Data berhasil dihapus!']);

    }
}