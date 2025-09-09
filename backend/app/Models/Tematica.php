<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tematica extends Model
{
    protected $table = 'tematicas';
    protected $primaryKey = 'id_tematica';
    protected $fillable = ['tematica'];
    public $timestamps = false;

    public function obras()
    {
        return $this->belongsToMany(
            Obra::class,
            'rel_obras_tematicas',  // tabela pivot
            'id_tematica',          // chave desta tabela na pivot
            'id_obra'               // chave da tabela obras na pivot
        );
    }
}
