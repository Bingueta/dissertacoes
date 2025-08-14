<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RelObrasPalavrasChave extends Model
{
    protected $table = 'rel_obras_palavras_chave';
    protected $primaryKey = 'id_rel_obras_palavra_chave';
    protected $fillable = [
        'id_obra',
        'id_palavra_chave',
    ];
    public $timestamps = false;
}
