<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertySalesAgent>
 */
class PropertySalesAgentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "agent_id" => 1,
            "property_id" => 1,
            "agent_type" => "staff",
            "status" => 1,
        ];
    }
}
