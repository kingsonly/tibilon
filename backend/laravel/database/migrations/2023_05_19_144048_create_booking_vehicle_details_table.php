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
        Schema::create('booking_vehicle_details', function (Blueprint $table) {
            $table->id();
            $table->integer("booking_id");
            $table->string("car_color");
            $table->string("car_name");
            $table->string("plate_number");
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
        Schema::dropIfExists('booking_vehicle_details');
    }
};
