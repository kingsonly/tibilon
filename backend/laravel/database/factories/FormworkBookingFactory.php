<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FormworkBooking>
 */
class FormworkBookingFactory extends Factory
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
            "formwork_id" => 1,
            "quantity" => $this->faker->numberBetween(1,10),
            "duration" => $this->faker->date(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
