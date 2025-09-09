<?php

namespace App\Http\Controllers;

use App\Models\Metodologia;
use Illuminate\Http\Request;

class MetodologiaController extends Controller
{
    public function index()
    {
        return Metodologia::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'metodologia' => 'required|string|max:256',
        ]);

        return Metodologia::create($validated);
    }

    public function show(Metodologia $metodologia)
    {
        return $metodologia;
    }

    public function update(Request $request, Metodologia $metodologia)
    {
        $validated = $request->validate([
            'metodologia' => 'required|string|max:256',
        ]);

        $metodologia->update($validated);
        return $metodologia;
    }

    public function destroy(Metodologia $metodologia)
    {
        $metodologia->delete();
        return response()->noContent();
    }
}
