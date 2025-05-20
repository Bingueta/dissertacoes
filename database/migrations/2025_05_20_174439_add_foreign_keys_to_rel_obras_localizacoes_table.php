<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('rel_obras_localizacoes', function (Blueprint $table) {
            $table->foreign(['id_obra'], 'rel_obras_localizacoes_ibfk_1')->references(['id_obra'])->on('obras')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_local_especifico'], 'rel_obras_localizacoes_ibfk_2')->references(['id_local_especifico'])->on('local_especifico')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rel_obras_localizacoes', function (Blueprint $table) {
            $table->dropForeign('rel_obras_localizacoes_ibfk_1');
            $table->dropForeign('rel_obras_localizacoes_ibfk_2');
        });
    }
};
