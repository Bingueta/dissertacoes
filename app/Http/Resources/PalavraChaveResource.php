<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PalavraChaveResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id_palavra_chave' => $this->id_palavra_chave,
            'palavra_chave' => $this->palavra_chave,
        ];
    }
}