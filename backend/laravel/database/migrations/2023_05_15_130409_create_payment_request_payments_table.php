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
        Schema::create('payment_request_payments', function (Blueprint $table) {
            $table->id();
            $table->integer("payment_request_id");
            $table->string("mode_of_payment");
            $table->integer("payment_id");
            $table->string("prof_of_payment");
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
        Schema::dropIfExists('payment_request_payments');
    }
};
