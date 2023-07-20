<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PropertyClient>
 */
class PropertyClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "property_id" => 1,
            "client_id" => 1,
            "log_user_id" => 1,
            "status" => 0,
            
        ];
    }
}
