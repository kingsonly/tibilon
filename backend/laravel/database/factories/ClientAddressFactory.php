<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ClientAddress>
 */
class ClientAddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "full_address" => $this->faker->address(),
            "longitude" => $this->faker->longitude(),
            "latitude" => $this->faker->latitude(),
            "status" => 1,
        ];
    }
}
