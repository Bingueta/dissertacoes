<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PalavraChave extends Model
{
    protected $table = 'palavras_chave';

    protected $primaryKey = 'id_palavra_chave';

    protected $fillable = ['palavra_chave'];

    public $timestamps = false;

    public function obras()
    {
        return $this->belongsToMany(Obra::class, 'rel_obras_palavras_chave', 'id_palavra_chave', 'id_obra');
    }
}