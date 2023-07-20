<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectMaterialRequest>
 */
class ProjectMaterialRequestFactory extends Factory
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
            "store_id" => 1,
            "quantity" => $this->faker->numberBetween(100),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
