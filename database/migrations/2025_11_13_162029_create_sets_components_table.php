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
        Schema::create('sets_components', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('sets_of_dishes_id')->nullable(); // Внешний ключ на таблицу model1s
            $table->foreign('sets_of_dishes_id')->references('id')->on('sets_of_dishes')->nullOnDelete()->cascadeOnUpdate();

            $table->unsignedBigInteger('dishes_id')->nullable(); // Внешний ключ на таблицу model2s
            $table->foreign('dishes_id')->references('id')->on('dishes')->nullOnDelete()->cascadeOnUpdate();

            $table->integer('quantity');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sets_components');
    }
};
