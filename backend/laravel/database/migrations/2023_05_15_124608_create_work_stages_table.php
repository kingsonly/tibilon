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
        Schema::create('work_stages', function (Blueprint $table) {
            $table->id();
            $table->integer("budget_id");
            $table->string("structure_type");
            $table->string("title");
            $table->string("description");
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
        Schema::dropIfExists('work_stages');
    }
};
