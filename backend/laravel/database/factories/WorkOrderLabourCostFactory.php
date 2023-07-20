<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkOrderLabourCost>
 */
class WorkOrderLabourCostFactory extends Factory
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
            "labour_title" => $this->faker->sentence(),
            "quantity" => $this->faker->numberBetween(100),
            "unit_cost" => $this->faker->numberBetween(100),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
