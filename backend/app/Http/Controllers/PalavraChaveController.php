<?php

namespace App\Http\Controllers;

use App\Models\PalavraChave;
use Illuminate\Http\Request;

class PalavraChaveController extends Controller
{
    public function index()
    {
        return PalavraChave::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'palavra_chave' => 'required|string|max:255',
        ]);

        return PalavraChave::create($validated);
    }

    public function show(PalavraChave $palavra_chave)
    {
        return $palavra_chave;
    }

    public function update(Request $request, PalavraChave $palavra_chave)
    {
        $validated = $request->validate([
            'palavra_chave' => 'required|string|max:255',
        ]);

        $palavra_chave->update($validated);
        return $palavra_chave;
    }

    public function destroy(PalavraChave $palavra_chave)
    {
        $palavra_chave->delete();
        return response()->noContent();
    }
}
