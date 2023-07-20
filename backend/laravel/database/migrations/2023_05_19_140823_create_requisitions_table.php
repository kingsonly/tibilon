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
        Schema::create('requisitions', function (Blueprint $table) {
            $table->id();
            $table->integer("request_id");
            $table->string("requisition_number");
            $table->string("requisition_type");
            $table->string("currency");
            $table->string("priority");
            $table->string("comment");
            $table->string("extra_budget");
            $table->string("total_cost");
            $table->date("requisition_date");
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
        Schema::dropIfExists('requisitions');
    }
};
