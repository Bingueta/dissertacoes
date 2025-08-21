<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    protected $table = 'pessoas';

    protected $primaryKey = 'id_pessoa';

    protected $fillable = ['nome_pessoa'];

    public $timestamps = false;
    
    public function funcaoPivot()
    {
        return $this->belongsTo(Funcao::class, 'pivot_id_funcao', 'id_funcao');
    }

}
