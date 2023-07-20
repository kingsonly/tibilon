<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreInventory>
 */
class StoreInventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "material_type_id" =>  1,
            "material_id" =>  1,
            "unit_id" =>  1,
            "quantity" =>  $this->faker->randomDigitNotNull(),
            "unit_cost" =>  $this->faker->numberBetween(100,150),
            "recipients_name" =>  $this->faker->name(),
            "log_user_id" =>  1,
            "status" =>  1,
        ];
    }
}
