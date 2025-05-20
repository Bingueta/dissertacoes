<?php

namespace App\Http\Controllers;

use App\Models\Pais;
use Illuminate\Http\Request;

class PaisController extends Controller
{
    public function index()
    {
        return Pais::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome_pais' => 'required|string|max:300',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        return Pais::create($validated);
    }

    public function show(Pais $pais)
    {
        return $pais;
    }

    public function update(Request $request, Pais $pais)
    {
        $validated = $request->validate([
            'nome_pais' => 'required|string|max:300',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $pais->update($validated);
        return $pais;
    }

    public function destroy(Pais $pais)
    {
        $pais->delete();
        return response()->noContent();
    }
}
