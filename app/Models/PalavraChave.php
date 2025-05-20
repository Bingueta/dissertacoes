<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PalavraChave extends Model
{
    protected $table = 'palavras_chave';

    protected $primaryKey = 'id_palavra_chave';

    protected $fillable = ['palavra_chave'];

    public $timestamps = false;
}
