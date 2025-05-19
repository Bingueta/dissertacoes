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
        Schema::create('local_especifico', function (Blueprint $table) {
            $table->integer('id_local_especifico', true);
            $table->string('nome_local')->nullable();
            $table->integer('id_cidade')->index('id_cidade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local_especifico');
    }
};
