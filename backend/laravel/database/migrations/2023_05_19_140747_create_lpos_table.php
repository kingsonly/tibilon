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
        Schema::create('lpos', function (Blueprint $table) {
            $table->id();
            $table->integer("requisition_id");
            $table->string("vendor_ref");
            $table->string("vat");
            $table->date("purchase_order_date");
            $table->date("expected_delivery_date");
            $table->integer("shiping_address_id");
            $table->string("payment_terms");
            $table->string("other_terms_conditions");
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
        Schema::dropIfExists('lpos');
    }
};
