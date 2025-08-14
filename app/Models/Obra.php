<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Obra extends Model
{
    protected $table = 'obras';
    protected $primaryKey = 'id_obra';
    protected $fillable = [
        'titulo',
        'ano',
        'acervo',
        'link_pdf',
        'resumo'
    ];
    public $timestamps = false;

    
    public function pessoasRel()
    {
        return $this->hasMany(RelObrasPessoas::class, 'id_obra');
    }

    public function palavrasRel()
    {
        return $this->hasMany(RelObrasPalavrasChave::class, 'id_obra');
    }

    public function localizacoesRel()
    {
        return $this->hasMany(RelObrasLocalizacoes::class, 'id_obra');
    }

    public function pessoas()
    {
        return $this->belongsToMany(Pessoa::class, 'rel_obras_pessoas', 'id_obra', 'id_pessoa')
            ->withPivot('id_funcao')
            ->with('funcao');
    }

    public function palavrasChave()
    {
        return $this->belongsToMany(PalavraChave::class, 'rel_obras_palavras_chave', 'id_obra', 'id_palavra_chave');
    }

    public function localizacoes()
    {
        return $this->belongsToMany(LocalEspecifico::class, 'rel_obras_localizacoes', 'id_obra', 'id_local_especifico');
    }
}
