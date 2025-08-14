<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RelObrasLocalizacoes extends Model
{
    protected $table = 'rel_obras_localizacoes';
    protected $primaryKey = 'id_rel_obras_localizacoes';
    protected $fillable = [
        'id_obra',
        'id_local_especifico',
    ];
    public $timestamps = false;
}
