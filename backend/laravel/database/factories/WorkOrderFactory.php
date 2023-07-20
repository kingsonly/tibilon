<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkOrder>
 */
class WorkOrderFactory extends Factory
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
            "work_stage_id" => 1,
            "title" => $this->faker->text(20),
            "start_time" => $this->faker->date(),
            "end_time" => $this->faker->date(),
            "status" => 1,
        ];
    }
}
