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
        Schema::create('obras', function (Blueprint $table) {
            $table->integer('id_obra', true);
            $table->string('titulo', 300)->nullable();
            $table->string('ano', 4)->nullable();
            $table->string('acervo')->nullable()->unique('acervo');
            $table->string('link_pdf', 500)->nullable();
            $table->text('resumo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('obras');
    }
};
