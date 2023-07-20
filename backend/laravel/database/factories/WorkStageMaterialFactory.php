<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkStageMaterial>
 */
class WorkStageMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quantity =  $this->faker->numberBetween(1,10);
        $price =  $this->faker->numberBetween(100,1000);
        return [
            "work_stage_type_id" => 1,
            "material_id" => 1,
            "material_type_id" => 1,
            "total_quantity" => $quantity,
            "material_unit_id" => 1,
            "material_price" => $price,
            "total" => $quantity * $price,
            "status" => 1,
        ];
    }
}
