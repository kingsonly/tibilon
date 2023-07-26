<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
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
            "project_manager_user_id" => 1,
            "address_id" => 1,
            "description" => $this->faker->text(),
            "number_of_properties" => $this->faker->numberBetween(1,50),
            "client_id" => 1,
            "start_date" => $this->faker->date(),
            "end_date" => $this->faker->date(),
            "image" => "just an image",
            "status" => 1,
            "log_user_id" => 1,
        ];
    }
}
