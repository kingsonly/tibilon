<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProjectFormworkInventory>
 */
class ProjectFormworkInventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [

            "project_id"  => 1,
            "material_id"  => 1,
            "quantity_out"  => $this->faker->numberBetween(1, 5),
            "unit_id"  => 1,
            "total_quantity"  => $this->faker->numberBetween(5, 10),
            "log_user_id"  => 1,
            "status"  => 1,
        ];
    }
}
