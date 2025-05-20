<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\FuncaoController;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\PalavraChaveController;
use App\Http\Controllers\PaisController;
use App\Http\Controllers\EstadoController;
use App\Http\Controllers\CidadeController;
use App\Http\Controllers\LocalEspecificoController;

Route::apiResource('pessoas', PessoaController::class);

Route::apiResource('funcoes', FuncaoController::class)
    ->parameters(['funcoes' => 'funcao']); //Isso foi necessário pois o laravel estava considerando o singular de 'funcoes' como 'funco'

Route::apiResource('obras', ObraController::class);

Route::apiResource('palavras-chave', PalavraChaveController::class)
    ->parameters(['palavras-chave' => 'palavra_chave']);

Route::apiResource('paises', PaisController::class)
    ->parameters(['paises' => 'pais']);

Route::apiResource('estados', EstadoController::class);

Route::apiResource('cidades', CidadeController::class);

Route::apiResource('locais-especificos', LocalEspecificoController::class)
    ->parameters(['locais-especificos' => 'localEspecifico']);