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
        Schema::create('recieved_project_materials', function (Blueprint $table) {
            $table->id();
            $table->integer("project_id");
            $table->integer("recive_project_id");
            $table->integer("material_id");
            $table->integer("quantity_recived");
            $table->integer("quantity_rejected");
            $table->integer("total_quantity");
            $table->string("type")["just a string"];
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
        Schema::dropIfExists('recieved_project_materials');
    }
};
