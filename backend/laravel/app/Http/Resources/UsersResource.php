<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $propertyAmount = $this->properties->sum(function ($amount) {
            return $amount->property->amount ?? 0;
        });
        $commitions = 0; 
        if(!empty($this->properties)){
            foreach($this->properties as $value){
                $commitions = $value->commission;
            }
        }
        
        $amountRecieved = 0;
        if(!empty($this->commission)){
            foreach($this->commission as $payment){
                $amountRecieved +=  $payment->payment->amount;
            }
        }
        

        return [
            "id" => $this->id,
            "name" => $this->firstname." ".$this->lastname,
            "email" => $this->email,
            "totalpayment" => $this->payment->sum(function ($payment) {
                return $payment->payment->amount ?? 0;
            }),

            "totalproperties" => $this->properties->count(),
            "amount" => ((int)$propertyAmount * (int)$commitions / 100 ),
            "amountRecieved" => $amountRecieved,
            "amountRemaining" => ((int)$propertyAmount * (int)$commitions / 100 ) - (int)$amountRecieved
        ];
    }
}
