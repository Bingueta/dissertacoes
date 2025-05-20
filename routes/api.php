<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PessoaController;
use App\Http\Controllers\FuncaoController;
use App\Http\Controllers\ObraController;

Route::apiResource('pessoas', PessoaController::class);

Route::apiResource('funcoes', FuncaoController::class)
    ->parameters(['funcoes' => 'funcao']); //Isso foi necessário pois o laravel estava considerando o singular de 'funcoes' como 'funco'

Route::apiResource('obras', ObraController::class);