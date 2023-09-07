<?php

namespace App\Http\Resources;

use App\Models\PropertySalesAgent;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyList extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $agent = "";
        if (!empty($this->agent)) {
            if ($this->agent_type == PropertySalesAgent::Affiliate) {
                $agent = $this->agent->affiliates;
            } else {
                $agent = $this->agent->users;
                //$agent = $this->agent->affiliates;
            }
        }

        switch ($this->status) {
            case 1:
                $status = "Paid";
                break;
            case 2:
                $status = "Partial Payment";
                break;
            default:
                $status = "available";
        }

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "amenity" => $this->amenity,
            "project" => $this->project,
            "amount" => $this->amount,
            "cover_image" => $this->cover_image,
            "agent" => $agent,
            "client" => !empty($this->client) ? new ClientResource($this->client->client) : null,
            "payment" => $this->payments,
            "status" => $status
        ];
    }
}
