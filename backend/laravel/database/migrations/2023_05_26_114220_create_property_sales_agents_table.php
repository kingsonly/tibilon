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
        Schema::create('property_sales_agents', function (Blueprint $table) {
            $table->id();
            $table->integer("agent_id");
            $table->integer("property_id");
            $table->string("agent_type")["agent type could be either staff or affiliate or tibilion"];
            $table->integer("status");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('property_sales_agents');
    }
};
