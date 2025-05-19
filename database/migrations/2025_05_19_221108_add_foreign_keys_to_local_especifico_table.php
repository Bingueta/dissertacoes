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
        Schema::table('local_especifico', function (Blueprint $table) {
            $table->foreign(['id_cidade'], 'local_especifico_ibfk_1')->references(['id_cidade'])->on('cidades')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('local_especifico', function (Blueprint $table) {
            $table->dropForeign('local_especifico_ibfk_1');
        });
    }
};
