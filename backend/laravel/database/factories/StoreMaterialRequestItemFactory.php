<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreMaterialRequestItem>
 */
class StoreMaterialRequestItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "request_id" => 1,
            "material_id" => 1,
            "quantity" => $this->faker->randomDigitNotNull(),
            "unit_cost" => $this->faker->numberBetween(100,300),
            "total_cost" => $this->faker->numberBetween(1000,3000),
            "request_date" => $this->faker->date(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
