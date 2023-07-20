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
        Schema::create('logistic_bookings', function (Blueprint $table) {
            $table->id();
            $table->string("booking_type")->nullable();
            $table->string("booking_journey")->nullable();
            $table->string("special_request")->nullable();
            $table->date("pickup_time")->nullable();
            $table->date("dropoff_time")->nullable();
            $table->date("booking_date");
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
        Schema::dropIfExists('logistic_bookings');
    }
};
