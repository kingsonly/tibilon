<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LogisticCost>
 */
class LogisticCostFactory extends Factory
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
            "amount" => $this->faker->numberBetween(100,5000),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
