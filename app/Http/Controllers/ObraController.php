<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use Illuminate\Http\Request;

class ObraController extends Controller
{
    public function index() //lista todas as obras
    {
        return Obra::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:300',
            'ano' => 'required|string|max:4',
            'acervo' => 'nullable|string|max:255',
            'link_pdf' => 'required|string|max:500',
            'resumo' => 'required|string',
        ]);

        return Obra::create($validated);
    }

    public function show(Obra $obra)
    {
        return $obra;
    }

    public function update(Request $request, Obra $obra)
    {
        $validated = $request->validate([
            'titulo' => 'required|string|max:300',
            'ano' => 'required|string|max:4',
            'acervo' => 'nullable|string|max:255',
            'link_pdf' => 'required|string|max:500',
            'resumo' => 'required|string',
        ]);

        $obra->update($validated);
        return $obra;
    }

    public function destroy(Obra $obra)
    {
        $obra->delete();
        return response()->noContent();
    }
}
