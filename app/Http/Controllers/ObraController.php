<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use Illuminate\Http\Request;
use App\Models\RelObrasPessoas;
use App\Models\RelObrasLocalizacoes;
use App\Models\RelObrasPalavrasChave;

class ObraController extends Controller
{
    public function index()
    {
        return Obra::all();
    }

    public function store(Request $request)
    {
        //dd($request->all()); isso era pra observar a estrutura do JSON

        $validated = $request->validate([
            'titulo' => 'required|string|max:300',
            'ano' => 'required|string|max:4',
            'acervo' => 'nullable|string|max:255',
            'link_pdf' => 'required|string|max:500',
            'resumo' => 'required|string',

            'pessoas' => 'array|required',
            'pessoas.*.id_pessoa' => 'required|integer|exists:pessoas,id_pessoa',
            'pessoas.*.id_funcao' => 'required|integer|exists:fucoes,id_funcao',

            'localizacoes' => 'array|required',
            'localizacoes.*' => 'required|integer|exists:local_especifico,id_local_especifico',

            'palavras_chave' => 'array|required',
            'palavras_chave.*' => 'required|integer|exists:palavras_chave,id_palavra_chave',

        ]);

        $obra = Obra::create($validated);

        foreach ($validated['pessoas'] as $pessoa) {
            RelObrasPessoas::create([
                'id_obra' => $obra->id_obra,
                'id_pessoa' => $pessoa['id_pessoa'],
                'id_funcao' => $pessoa['id_funcao'],
            ]);
        }

        foreach ($validated['localizacoes'] as $localizacao) {
            RelObrasLocalizacoes::create([
                'id_obra' => $obra->id_obra,
                'id_local_especifico' => $localizacao,
            ]);
        }

        foreach ($validated['palavras_chave'] as $palavra_chave) {
            RelObrasPalavrasChave::create([
                'id_obra' => $obra->id_obra,
                'id_palavra_chave' => $palavra_chave,
            ]);
        }

        return $obra;
    }

    public function show(Obra $obra)
    {
        return $obra;
    }

    public function update(Request $request, Obra $obra)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:300',
            'ano' => 'required|string|max:4',
            'acervo' => 'nullable|string|max:255',
            'link_pdf' => 'required|string|max:500',
            'resumo' => 'required|string',
        ]);

        $obra->update($validated);
        return $obra;
    }

    public function destroy(Obra $obra)
    {
        $obra->delete();
        return response()->noContent();
    }
}
