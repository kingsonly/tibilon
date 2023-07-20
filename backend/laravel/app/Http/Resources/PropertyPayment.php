<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyPayment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $totalPaid = $this->property->payments->sum(function ($payment) {
            return $payment->amount ?? 0;
        });
        $propertyCost = $this->property->amount;
        return [
            "payment" => $this->payment,
            "proof" => $this->prof_of_payment,
            "property" => $this->property,
            "totalPaid" => $totalPaid,
            "propertyCost" => $propertyCost,
            "balance" => (int)$propertyCost - (int)$totalPaid,
        ];
    }
}

