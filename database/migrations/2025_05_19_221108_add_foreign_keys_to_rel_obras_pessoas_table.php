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
        Schema::table('rel_obras_pessoas', function (Blueprint $table) {
            $table->foreign(['id_obra'], 'rel_obras_pessoas_ibfk_1')->references(['id_obra'])->on('obras')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_pessoa'], 'rel_obras_pessoas_ibfk_2')->references(['id_pessoa'])->on('pessoas')->onUpdate('restrict')->onDelete('restrict');
            $table->foreign(['id_funcao'], 'rel_obras_pessoas_ibfk_3')->references(['id_funcao'])->on('funcoes')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('rel_obras_pessoas', function (Blueprint $table) {
            $table->dropForeign('rel_obras_pessoas_ibfk_1');
            $table->dropForeign('rel_obras_pessoas_ibfk_2');
            $table->dropForeign('rel_obras_pessoas_ibfk_3');
        });
    }
};
