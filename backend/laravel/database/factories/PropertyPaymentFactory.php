<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyPayment>
 */
class PropertyPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "property_id" => 1,
            "payment_id" => 1,
            "log_user_id" => 1,
            "prof_of_payment" => "just",
            "status" => 1,
        ];
    }
}
