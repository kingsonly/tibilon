<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Affiliate>
 */
class AffiliateFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => $this->faker->name(),
            "gender" => $this->faker->titleMale(),
            "email" => $this->faker->email(),
            "address" => $this->faker->address(),
            "phone_number" => $this->faker->phoneNumber(),
            "status" => 1,
        ];
    }
}
