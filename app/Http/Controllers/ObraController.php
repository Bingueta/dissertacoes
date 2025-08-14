<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use Illuminate\Http\Request;
use App\Http\Resources\PessoaResource;
use App\Http\Resources\PalavraChaveResource;

class ObraController extends Controller
{
    public function index()
    {
        $obras = Obra::with([
            'palavrasChave',
            'pessoas',
            'localizacoes.cidade.estado.pais'
        ])->get();

        $result = [];

        foreach ($obras as $obra) {
            $obraArray = [
                'id_obra' => $obra->id_obra,
                'titulo' => $obra->titulo,
                'ano' => $obra->ano,
                'acervo' => $obra->acervo,
                'link_pdf' => $obra->link_pdf,
                'resumo' => $obra->resumo,
                'autor' => null,
                'orientador' => null,
                'coorientador' => null,
                'palavras_chave' => PalavraChaveResource::collection($obra->palavrasChave),
                'localidades' => [],
            ];

            foreach ($obra->pessoas as $pessoa) {
                $idFuncao = $pessoa->pivot->id_funcao ?? null;
                $dadosPessoa = [
                    'id_pessoa' => $pessoa->id_pessoa,
                    'nome_pessoa' => $pessoa->nome_pessoa,
                ];

                if ($idFuncao === 1) {
                    $obraArray['autor'] = $dadosPessoa;
                } elseif ($idFuncao === 2) {
                    $obraArray['orientador'] = $dadosPessoa;
                } elseif ($idFuncao === 3) {
                    $obraArray['coorientador'] = $dadosPessoa;
                }
            }

            foreach ($obra->localizacoes as $local) {
                $cidade = $local->cidade;
                $estado = $cidade ? $cidade->estado : null;
                $pais = $estado ? $estado->pais : null;

                $obraArray['localidades'][] = [
                    'local_especifico' => [
                        'id_local_especifico' => $local->id_local_especifico,
                        'nome_local' => $local->nome_local,
                        'latitude' => $local->latitude,
                        'longitude' => $local->longitude,
                    ],
                    'cidade' => $cidade ? [
                        'id_cidade' => $cidade->id_cidade,
                        'nome_cidade' => $cidade->nome_cidade,
                        'latitude' => $cidade->latitude,
                        'longitude' => $cidade->longitude,
                    ] : null,
                    'estado' => $estado ? [
                        'id_estado' => $estado->id_estado,
                        'nome_estado' => $estado->nome_estado,
                        'latitude' => $estado->latitude,
                        'longitude' => $estado->longitude,
                    ] : null,
                    'pais' => $pais ? [
                        'id_pais' => $pais->id_pais,
                        'nome_pais' => $pais->nome_pais,
                        'latitude' => $pais->latitude,
                        'longitude' => $pais->longitude,
                    ] : null,
                ];
            }

            $result[] = $obraArray;
        }

        return $result;
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
        $obra->load([
            'palavrasChave',
            'pessoas',
            'localizacoes.cidade.estado.pais'
        ]);

        $result = [
            'id_obra' => $obra->id_obra,
            'titulo' => $obra->titulo,
            'ano' => $obra->ano,
            'acervo' => $obra->acervo,
            'link_pdf' => $obra->link_pdf,
            'resumo' => $obra->resumo,
            'autor' => null,
            'orientador' => null,
            'coorientador' => null,
            'palavras_chave' => PalavraChaveResource::collection($obra->palavrasChave),
            'localidades' => [],
        ];

        foreach ($obra->pessoas as $pessoa) {
            $idFuncao = $pessoa->pivot->id_funcao ?? null;
            $dadosPessoa = [
                'id_pessoa' => $pessoa->id_pessoa,
                'nome_pessoa' => $pessoa->nome_pessoa,
            ];

            if ($idFuncao === 1) {
                $result['autor'] = $dadosPessoa;
            } elseif ($idFuncao === 2) {
                $result['orientador'] = $dadosPessoa;
            } elseif ($idFuncao === 3) {
                $result['coorientador'] = $dadosPessoa;
            }
        }

        foreach ($obra->localizacoes as $local) {
            $cidade = $local->cidade;
            $estado = $cidade ? $cidade->estado : null;
            $pais = $estado ? $estado->pais : null;

            $result['localidades'][] = [
                'local_especifico' => [
                    'id_local_especifico' => $local->id_local_especifico,
                    'nome_local' => $local->nome_local,
                    'latitude' => $local->latitude,
                    'longitude' => $local->longitude,
                ],
                'cidade' => $cidade ? [
                    'id_cidade' => $cidade->id_cidade,
                    'nome_cidade' => $cidade->nome_cidade,
                    'latitude' => $cidade->latitude,
                    'longitude' => $cidade->longitude,
                ] : null,
                'estado' => $estado ? [
                    'id_estado' => $estado->id_estado,
                    'nome_estado' => $estado->nome_estado,
                    'latitude' => $estado->latitude,
                    'longitude' => $estado->longitude,
                ] : null,
                'pais' => $pais ? [
                    'id_pais' => $pais->id_pais,
                    'nome_pais' => $pais->nome_pais,
                    'latitude' => $pais->latitude,
                    'longitude' => $pais->longitude,
                ] : null,
            ];
        }

        return $result;
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
