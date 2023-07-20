<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingVehicleDetails>
 */
class BookingVehicleDetailsFactory extends Factory
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
            "car_color" => $this->faker->colorName(),
            "car_name" => $this->faker->sentence(1),
            "plate_number" => $this->faker->numberBetween(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
