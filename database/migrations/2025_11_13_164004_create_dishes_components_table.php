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
        Schema::create('dishes_components', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('products_id')->nullable(); // Внешний ключ на таблицу model1s
            $table->foreign('products_id')->references('id')->on('products')->nullOnDelete()->cascadeOnUpdate();

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
        Schema::dropIfExists('dishes_components');
    }
};
