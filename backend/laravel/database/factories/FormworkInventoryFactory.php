<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FormworkInventory>
 */
class FormworkInventoryFactory extends Factory
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
            "quantity_out" => $this->faker->numberBetween(1,10),
            "unit_id" => 1,
            "total_quantity" => $this->faker->numberBetween(10,20),
            "formwork_material_id" => 1,
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
