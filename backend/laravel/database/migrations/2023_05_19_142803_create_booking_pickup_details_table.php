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
        Schema::create('booking_pickup_details', function (Blueprint $table) {
            $table->id();
            $table->integer("booking_id");
            $table->string("pickup_address");
            $table->string("store_rep_name");
            $table->string("store_rep_phone");
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
        Schema::dropIfExists('booking_pickup_details');
    }
};
