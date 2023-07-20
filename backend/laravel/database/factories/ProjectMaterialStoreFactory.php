<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectMaterialStore>
 */
class ProjectMaterialStoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "material_type_id" => 1,
            "quantity" => $this->faker->numberBetween(10),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
