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
            $table->foreignId('sets_of_dishes_id')->constrained('sets_of_dishes')->onDelete('cascade');
            $table->foreignId('dishes_id')->constrained('dishes')->onDelete('cascade');
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
