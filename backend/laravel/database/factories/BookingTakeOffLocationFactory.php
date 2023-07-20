<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingTakeOffLocation>
 */
class BookingTakeOffLocationFactory extends Factory
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
            "address" => $this->faker->address(),
            "longitude" => $this->faker->longitude(),
            "latitude" => $this->faker->latitude(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
