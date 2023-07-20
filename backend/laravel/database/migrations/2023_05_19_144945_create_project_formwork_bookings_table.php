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
        Schema::create('project_formwork_bookings', function (Blueprint $table) {
            $table->id();
            $table->integer("formwork_id");
            $table->date("duration");
            $table->integer("status");
            $table->integer("log_user_id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_formwork_bookings');
    }
};
