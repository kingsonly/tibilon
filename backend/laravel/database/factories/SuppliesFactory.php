<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplies>
 */
class SuppliesFactory extends Factory
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
            "company_name" => $this->faker->sentence(1),
            "company_email" => $this->faker->email(),
            "company_phone" => $this->faker->phoneNumber(),
            "contact_name" => $this->faker->name(),
            "contact_phone" => $this->faker->phoneNumber(),
            "contact_email" => $this->faker->email(),
            "company_address" => $this->faker->address(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
