<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\FuncaoController;
use App\Http\Controllers\ObraController;

Route::apiResource('pessoas', PessoaController::class);

//Precisei fazer a rota 'funcoes' assim, pois tive que mudar o nome do objeto no controller devido a um conflito com o nome da coluna na tabela
//E se i nome do objeto for diferente
Route::get('funcoes', [FuncaoController::class, 'index']);
Route::post('funcoes', [FuncaoController::class, 'store']);
Route::get('funcoes/{obj_funcao}', [FuncaoController::class, 'show']);
Route::put('funcoes/{obj_funcao}', [FuncaoController::class, 'update']);
Route::delete('funcoes/{obj_funcao}', [FuncaoController::class, 'destroy']);

Route::apiResource('obras', ObraController::class);