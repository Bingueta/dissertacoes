<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RelObrasPessoas extends Model
{
    protected $table = 'rel_obras_pessoas';
    protected $primaryKey = 'id_rel_obra_pessoa';
    protected $fillable = [
        'id_obra',
        'id_pessoa',
        'id_funcao',
    ];
    public $timestamps = false;
}
