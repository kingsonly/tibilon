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
        Schema::create('store_project_requests', function (Blueprint $table) {
            $table->id();
            $table->integer("project_id");
            $table->integer("logistic_booking_id")["This holds the id for the logistic booking made from the store to the logistic department."];
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
        Schema::dropIfExists('store_project_requests');
    }
};
