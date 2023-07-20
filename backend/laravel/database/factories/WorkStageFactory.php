<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WorkStage>
 */
class WorkStageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "budget_id" => 1,
            "structure_type" => 1,
            "title" => $this->faker->text($maxNbChars = 20),
            "description" => $this->faker->text(),
            "status" => 1,
        ];
    }
}
