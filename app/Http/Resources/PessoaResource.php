<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Funcao;

class PessoaResource extends JsonResource
{
    public function toArray($request)
    {
        $funcaoNome = null;
        if ($this->pivot && $this->pivot->id_funcao) {
            $funcao = Funcao::find($this->pivot->id_funcao);
            $funcaoNome = $funcao ? $funcao->nome_funcao : null;
        }

        return [
            'id_pessoa' => $this->id_pessoa,
            'nome_pessoa' => $this->nome_pessoa,
            'funcao' => $funcaoNome,
        ];
    }
}
