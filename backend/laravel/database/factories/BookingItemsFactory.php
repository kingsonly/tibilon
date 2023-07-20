<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingItems>
 */
class BookingItemsFactory extends Factory
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
            "material_id" => 1,
            "quantity" => $this->faker->numberBetween(100,200),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
