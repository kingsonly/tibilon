<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingDeliveryCompany>
 */
class BookingDeliveryCompanyFactory extends Factory
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
            "company_name" => $this->faker->name(),
            "phone" => $this->faker->phoneNumber(),
            "email" => $this->faker->email(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
