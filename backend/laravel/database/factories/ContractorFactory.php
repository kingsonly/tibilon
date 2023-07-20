<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contractor>
 */
class ContractorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "company_name" => $this->faker->company(),
            "contact_person_name" => $this->faker->name(),
            "company_email" => $this->faker->email(),
            "contact_person_email" => $this->faker->email(),
            "company_phonenumber" => $this->faker->phoneNumber(),
            "contact_person_phonenumber" => $this->faker->phoneNumber(),
            "status" => 1,
        ];
    }
}
