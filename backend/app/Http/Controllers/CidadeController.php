<?php

namespace App\Http\Controllers;

use App\Models\Cidade;
use Illuminate\Http\Request;

class CidadeController extends Controller
{
    public function index()
    {
        return Cidade::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome_cidade' => 'required|string|max:300',
            'id_estado' => 'required|integer|exists:estados,id_estado',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        return Cidade::create($validated);
    }

    public function show(Cidade $cidade)
    {
        return $cidade;
    }

    public function update(Request $request, Cidade $cidade)
    {
        $validated = $request->validate([
            'nome_cidade' => 'required|string|max:300',
            'id_estado' => 'required|integer|exists:estados,id_estado',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $cidade->update($validated);
        return $cidade;
    }

    public function destroy(Cidade $cidade)
    {
        $cidade->delete();
        return response()->noContent();
    }
}
