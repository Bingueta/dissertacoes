<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    protected $table = 'estados';
    protected $primaryKey = 'id_estado';
    protected $fillable = [
        'nome_estado',
        'id_pais',
        'latitude',
        'longitude'
    ];
    public $timestamps = false;

    public function pais()
    {
        return $this->belongsTo(Pais::class, 'id_pais');
    }
}
