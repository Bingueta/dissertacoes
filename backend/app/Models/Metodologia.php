<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Metodologia extends Model
{
    protected $table = 'metodologias';
    protected $primaryKey = 'id_metodologia';
    protected $fillable = ['metodologia'];
    public $timestamps = false;

    public function obras()
    {
        return $this->belongsToMany(
            Obra::class,
            'rel_obras_metodologias',  // tabela pivot
            'id_metodologia',          // chave desta tabela na pivot
            'id_obra'                  // chave da tabela obras na pivot
        );
    }
}
