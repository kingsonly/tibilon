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
        Schema::create('formwork_bookings', function (Blueprint $table) {
            $table->id();
            $table->integer("project_id");
            $table->integer("formwork_id");
            $table->integer("quantity");
            $table->date("duration");
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
        Schema::dropIfExists('formwork_bookings');
    }
};
