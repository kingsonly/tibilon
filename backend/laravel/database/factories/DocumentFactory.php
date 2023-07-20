<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rand = rand(0,1);
        $fileType = ["png","pdf"];
        return [
            "project_id" => 1,
            "document_title" => $this->faker->sentence(),
            "file_path" => $this->faker->image(),
            "file_type" => $fileType[$rand],
            "log_user_id" => 1,
            "status" => 1,
        ];
    }
}
