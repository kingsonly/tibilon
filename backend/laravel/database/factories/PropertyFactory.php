<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Property>
 */
class PropertyFactory extends Factory
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
            "cover_image" => $this->faker->image(),
            "name" => $this->faker->name,
            "description" => $this->faker->text(),
            "amount" => 500,
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
