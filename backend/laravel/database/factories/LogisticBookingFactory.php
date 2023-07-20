<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LogisticBooking>
 */
class LogisticBookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bookingType = ["rented", "Companey Owned"];
        $randum = rand(0, 1);
        $journey = ["droop off", "Pickup", "Both"];
        $special = ["none", "Hoist", "forklift"];
        return [
            "booking_type" => $bookingType[$randum],
            "booking_journey" => $journey[rand(0, 2)],
            "special_request" => $special[rand(0, 2)],
            "pickup_time" => $this->faker->date(),
            "dropoff_time" => $this->faker->date(),
            "booking_date" => $this->faker->date(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
