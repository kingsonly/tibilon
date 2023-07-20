<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lpo>
 */
class LpoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "requisition_id" => 1,
            "vendor_ref" => $this->faker->numberBetween(2000),
            "vat" => $this->faker->numberBetween(100,500),
            "purchase_order_date" => $this->faker->date(),
            "expected_delivery_date" => $this->faker->date(),
            "shiping_address_id" => 1,
            "payment_terms" => "",
            "other_terms_conditions" => $this->faker->text(),
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
