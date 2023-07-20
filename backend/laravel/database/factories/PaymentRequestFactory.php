<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymentRequest>
 */
class PaymentRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "project_id" => 1,
            "description" => $this->faker->text(),
            "amount" => $this->faker->numberBetween(100,1000),
            "date_due" => $this->faker->date(),
            "expense_type" => "rentals",
            "status" => 1,
        ];
    }
}
