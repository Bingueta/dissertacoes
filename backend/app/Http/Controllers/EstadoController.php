<?php

namespace App\Http\Controllers;

use App\Models\Estado;
use Illuminate\Http\Request;

class EstadoController extends Controller
{
    public function index()
    {
        return Estado::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome_estado' => 'required|string|max:300',
            'id_pais' => 'required|integer|exists:paises,id_pais',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        return Estado::create($validated);
    }

    public function show(Estado $estado)
    {
        return $estado;
    }

    public function update(Request $request, Estado $estado)
    {
        $validated = $request->validate([
            'nome_estado' => 'required|string|max:300',
            'id_pais' => 'required|integer|exists:paises,id_pais',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $estado->update($validated);
        return $estado;
    }

    public function destroy(Estado $estado)
    {
        $estado->delete();
        return response()->noContent();
    } 
}
