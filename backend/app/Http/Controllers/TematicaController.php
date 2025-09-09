<?php

namespace App\Http\Controllers;

use App\Models\Tematica;
use Illuminate\Http\Request;

class TematicaController extends Controller
{
    public function index()
    {
        return Tematica::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tematica' => 'required|string|max:256',
        ]);

        return Tematica::create($validated);
    }

    public function show(Tematica $tematica)
    {
        return $tematica;
    }

    public function update(Request $request, Tematica $tematica)
    {
        $validated = $request->validate([
            'tematica' => 'required|string|max:256',
        ]);

        $tematica->update($validated);
        return $tematica;
    }

    public function destroy(Tematica $tematica)
    {
        $tematica->delete();
        return response()->noContent();
    }
}
