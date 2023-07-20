<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingPickupDetails>
 */
class BookingPickupDetailsFactory extends Factory
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
            "pickup_address" => $this->faker->address(),
            "store_rep_name" => $this->faker->name(),
            "store_rep_phone" => $this->faker->phoneNumber(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
