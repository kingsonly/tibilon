<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyStat extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        $totalAmountPaid = $this->project->propertyPayments->sum(function ($payment) {
            return $payment->amount  ?? 0;
        });

        $totalPayment = $this->project->property->sum(function ($payment) {
            return $payment->amount  ?? 0;
        });

        $balance = $totalPayment - $totalAmountPaid;

        $totalProperty = $this->project->property->count();
        $totalPropertySold = $this->project->propertySold->count();
        $totalPropertyPertiallySold = $this->project->propertyPertiallySold->count();
        $totalAvailableProperty = $this->project->availableProperty->count();
        return [
            "totalAmountPaid" => $totalAmountPaid,
            "totalPayment" => $totalPayment,
            "paymentBalance" => $balance,
            "totalProperty" => $totalProperty,
            "totalPropertySold" => $totalPropertySold,
            "totalPropertySold" => $totalPropertyPertiallySold,
            "totalPropertyAvailable" => $$totalAvailableProperty,

            //"totalproperties" => $this->properties->count(),
        ];
    }
}
