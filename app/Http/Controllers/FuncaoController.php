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
            'funcao' => 'required|string|max:255',
        ]);

        return Funcao::create($validated);
    }

    public function show(Funcao $obj_funcao) //Precisou ser obj_funcao em vez de funcao, poir dava conflito com o nome da coluna da tabela
    {
        return $obj_funcao;
    }

    public function update(Request $request, Funcao $obj_funcao)
    {
        $validated = $request->validate([
            'funcao' => 'required|string|max:255',
        ]);

        $obj_funcao->update($validated);
        return $obj_funcao;
    }

    public function destroy(Funcao $obj_funcao)
    {
        $obj_funcao->delete();
        return response()->noContent();
    }
}
