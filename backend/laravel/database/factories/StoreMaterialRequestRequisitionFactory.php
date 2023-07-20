<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\StoreMaterialRequestRequisition>
 */
class StoreMaterialRequestRequisitionFactory extends Factory
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
            "requisition_id" => 1,
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
