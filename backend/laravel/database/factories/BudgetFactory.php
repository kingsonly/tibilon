<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Budget>
 */
class BudgetFactory extends Factory
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
            "budget_title" => $this->faker->name,
            "budget_description" => $this->faker->text(),
            "number_of_units" => $this->faker->numberBetween(1,10),
            "status" => 1,
        ];
        
    }
}
