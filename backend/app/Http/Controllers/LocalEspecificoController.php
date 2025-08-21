<?php

namespace App\Http\Controllers;

use App\Models\LocalEspecifico;
use Illuminate\Http\Request;

class LocalEspecificoController extends Controller
{
    public function index()
    {
        return LocalEspecifico::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome_local' => 'required|string|max:300',
            'id_cidade' => 'required|integer|exists:cidades,id_cidade',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        return LocalEspecifico::create($validated);
    }

    public function show(LocalEspecifico $localEspecifico)
    {
        return $localEspecifico;
    }

    public function update(Request $request, LocalEspecifico $localEspecifico)
    {
        $validated = $request->validate([
            'nome_local' => 'required|string|max:300',
            'id_cidade' => 'required|integer|exists:cidades,id_cidade',
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
        ]);

        $localEspecifico->update($validated);
        return $localEspecifico;
    }

    public function destroy(LocalEspecifico $localEspecifico)
    {
        $localEspecifico->delete();
        return response()->noContent();
    }
}
