<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LogisticCostPayment>
 */
class LogisticCostPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "booking_id" => 1,
            "logistic_cost_id" => 1,
            "payment_id" => 1,
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
