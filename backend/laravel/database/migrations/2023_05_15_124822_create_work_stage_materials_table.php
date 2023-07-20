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
        Schema::create('work_stage_materials', function (Blueprint $table) {
            $table->id();
            $table->integer("work_stage_type_id");
            $table->integer("material_id");
            $table->integer("material_type_id");
            $table->integer("total_quantity");
            $table->integer("material_unit_id");
            $table->string("material_price");
            $table->string("total");
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
        Schema::dropIfExists('work_stage_materials');
    }
};
