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
        Schema::create('rel_obras_palavras_chave', function (Blueprint $table) {
            $table->integer('id_rel_obra_palavra_chave', true);
            $table->integer('id_obra')->index('id_obra');
            $table->integer('id_palavra_chave')->index('id_palavra_chave');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rel_obras_palavras_chave');
    }
};
