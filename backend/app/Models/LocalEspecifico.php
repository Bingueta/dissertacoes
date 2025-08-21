<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocalEspecifico extends Model
{
    protected $table = 'local_especifico';
    protected $primaryKey = 'id_local_especifico';
    protected $fillable = [
        'nome_local',
        'id_cidade',
        'latitude',
        'longitude'
    ];
    public $timestamps = false;

    public function cidade()
    {
        return $this->belongsTo(Cidade::class, 'id_cidade');
    }
}
