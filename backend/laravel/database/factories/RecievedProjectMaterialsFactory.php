<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RecievedProjectMaterials>
 */
class RecievedProjectMaterialsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = ["regular", "formwork"];
        $quantity = $this->faker->numberBetween(20, 30);
        $quantityRecived = $quantity - $this->faker->numberBetween(1, 8);
        $quantityRejected = $quantity - $quantityRecived;
        
        return [
            "project_id" => 1,
            "recive_project_id" => 1,
            "material_id" => 1,
            "quantity_recived" => $quantityRecived,
            "quantity_rejected" => $quantityRejected,
            "total_quantity" => $quantity,
            "type" => $type,
            "log_user_id" => 1,
        ];
    }
}
