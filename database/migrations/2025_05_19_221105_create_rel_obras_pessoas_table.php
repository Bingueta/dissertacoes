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
        Schema::create('rel_obras_pessoas', function (Blueprint $table) {
            $table->integer('id_rel_obra_pessoa', true);
            $table->integer('id_obra')->index('id_obra');
            $table->integer('id_pessoa')->index('id_pessoa');
            $table->integer('id_funcao')->index('id_funcao');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rel_obras_pessoas');
    }
};
