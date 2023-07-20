<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkStageLabour>
 */
class WorkStageLabourFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "work_stage_type_id" => 1,
            "total_quantity" => $this->faker->numberBetween(1,10),
            "labour_per_unit" => $this->faker->numberBetween(1000,3000),
            "total" => $this->faker->numberBetween(10000,30000),
            "status" => 1,
        ];
    }
}
