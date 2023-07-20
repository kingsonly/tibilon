<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Requisition>
 */
class RequisitionFactory extends Factory
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
            "requisition_number" => $this->faker->numberBetween(100,200),
            "requisition_type" => "purchase",
            "currency" => "Naira",
            "priority" => "urgent",
            "comment" => "test",
            "extra_budget" => "none",
            "total_cost" => $this->faker->numberBetween(100,200),
            "requisition_date" => $this->faker->date(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
