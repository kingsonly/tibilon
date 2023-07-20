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
        Schema::create('store_inventories', function (Blueprint $table) {
            $table->id();
            $table->integer("material_type_id");
            $table->integer("material_id");
            $table->integer("unit_id");
            $table->integer("quantity");
            $table->string("unit_cost");
            $table->string("recipients_name");
            $table->integer("log_user_id");
            $table->string("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_inventories');
    }
};
