<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingRecipient>
 */
class BookingRecipientFactory extends Factory
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
            "recipients_name" => $this->faker->name(),
            "recipients_email" => $this->faker->email(),
            "recipients_phone" => $this->faker->phoneNumber(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
