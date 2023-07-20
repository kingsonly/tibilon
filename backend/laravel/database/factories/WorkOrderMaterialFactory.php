<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkOrderMaterial>
 */
class WorkOrderMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "work_order_id" => 1,
            "material_type_id" => 1,
            "quantity" => $this->faker->numberBetween(100),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
