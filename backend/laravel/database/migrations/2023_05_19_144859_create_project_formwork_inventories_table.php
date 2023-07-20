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
        Schema::create('project_formwork_inventories', function (Blueprint $table) {
            $table->id();
            $table->integer("project_id");
            $table->integer("material_id");
            $table->integer("quantity_out");
            $table->integer("unit_id");
            $table->integer("total_quantity");
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
        Schema::dropIfExists('project_formwork_inventories');
    }
};
