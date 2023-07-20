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
        Schema::create('store_material_request_items', function (Blueprint $table) {
            $table->id();
            $table->integer("request_id");
            $table->integer("material_id");
            $table->string("quantity");
            $table->string("unit_cost");
            $table->string("total_cost");
            $table->date("request_date");
            $table->integer("log_user_id");
            $table->integer("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_material_request_items');
    }
};
