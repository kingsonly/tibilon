<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectFormworkBooking>
 */
class ProjectFormworkBookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "formwork_id" => 1,
            "duration" => $this->faker->date(),
            "status" => 1,
            "log_user_id" => 1,
        ];
    }
}
