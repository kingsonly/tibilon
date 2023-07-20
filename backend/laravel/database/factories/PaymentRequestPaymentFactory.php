<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentRequestPayment>
 */
class PaymentRequestPaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "payment_request_id" => 1,
            "mode_of_payment" => "transfer",
            "payment_id" => 1,
            "prof_of_payment" => $this->faker->file(),
            "status" => 1,
        ];
    }
}
