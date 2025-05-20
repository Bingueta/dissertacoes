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
        Schema::create('palavras_chave', function (Blueprint $table) {
            $table->integer('id_palavra_chave', true);
            $table->string('palavra_chave')->nullable()->unique('palavra_chave');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('palavras_chave');
    }
};
