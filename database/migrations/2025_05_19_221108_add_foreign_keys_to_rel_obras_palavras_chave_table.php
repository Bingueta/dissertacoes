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
        Schema::table('rel_obras_palavras_chave', function (Blueprint $table) {
            $table->foreign(['id_obra'], 'rel_obras_palavras_chave_ibfk_1')->references(['id_obra'])->on('obras')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_palavra_chave'], 'rel_obras_palavras_chave_ibfk_2')->references(['id_palavra_chave'])->on('palavras_chave')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rel_obras_palavras_chave', function (Blueprint $table) {
            $table->dropForeign('rel_obras_palavras_chave_ibfk_1');
            $table->dropForeign('rel_obras_palavras_chave_ibfk_2');
        });
    }
};
