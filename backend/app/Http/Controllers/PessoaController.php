<?php

namespace App\Http\Controllers;

use App\Models\Pessoa;
use Illuminate\Http\Request;

class PessoaController extends Controller
{
    public function index() //lista todas as pessoas
    {
        return Pessoa::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome_pessoa' => 'required|string|max:255',
        ]);

        return Pessoa::create($validated);
    }

    public function show(Pessoa $pessoa)
    {
        return $pessoa;
    }

    public function update(Request $request, Pessoa $pessoa)
    {
        $validated = $request->validate([
            'nome_pessoa' => 'required|string|max:255',
        ]);

        $pessoa->update($validated);
        return $pessoa;
    }

    public function destroy(Pessoa $pessoa)
    {
        $pessoa->delete();
        return response()->noContent();
    }
}
