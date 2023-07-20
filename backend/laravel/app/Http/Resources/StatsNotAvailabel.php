<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatsNotAvailabel extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "totalAmountPaid" => 0,
            "totalPayment" => 0,
            "paymentBalance" => 0,
            "totalProperty" => 0,
            "totalPropertySold" => 0,
            "totalPropertyAvailable" => 0,
        ];
    }
}
