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
        Schema::create('booking_recipients', function (Blueprint $table) {
            $table->id();
            $table->integer("booking_id");
            $table->string("recipients_name");
            $table->string("recipients_email");
            $table->string("recipients_phone");
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
        Schema::dropIfExists('booking_recipients');
    }
};
