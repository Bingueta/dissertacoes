<?php

namespace App\Http\Controllers;

use App\Models\Funcao;
use Illuminate\Http\Request;

class FuncaoController extends Controller
{
    public function index()
    {
        return Funcao::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome_funcao' => 'required|string|max:255',
        ]);

        return Funcao::create($validated);
    }

    public function show(Funcao $funcao)
    {
        return $funcao;
    }

    public function update(Request $request, Funcao $funcao)
    {
        $validated = $request->validate([
            'nome_funcao' => 'required|string|max:255',
        ]);

        $funcao->update($validated);
        return $funcao;
    }

    public function destroy(Funcao $funcao)
    {
        $funcao->delete();
        return response()->noContent();
    }
}
