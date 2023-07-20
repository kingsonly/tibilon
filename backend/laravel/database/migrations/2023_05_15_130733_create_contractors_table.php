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
        Schema::create('contractors', function (Blueprint $table) {
            $table->id();
            $table->string("company_name");
            $table->string("contact_person_name")->nullable();
            $table->string("company_email")->nullable();
            $table->string("contact_person_email")->nullable();
            $table->string("company_phonenumber")->nullable();
            $table->string("contact_person_phonenumber")->nullable();
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
        Schema::dropIfExists('contractors');
    }
};
