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
		Schema::create('rel_obras_tematicas', function (Blueprint $table) {
			$table->integer('id_obras_tematicas', true);
			$table->integer('id_obra');
			$table->integer('id_tematica');

			$table->foreign('id_obra')
				->references('id_obra')
				->on('obras')
				->onDelete('cascade');

			$table->foreign('id_tematica')
				->references('id_tematica')
				->on('tematicas')
				->onDelete('cascade');
		});

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rel_obras_tematicas');
    }
};
