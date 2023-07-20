<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreMaterialRequest>
 */
class StoreMaterialRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "requester_user_id" => 1,
            "description" => $this->faker->text(),
            "urgency" => "urgent",
            "date_of_request" => $this->faker->date(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
