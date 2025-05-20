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
}
