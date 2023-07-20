<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $startDate = Carbon::parse($this->start_date);
        $endDate = Carbon::parse($this->end_date);
        $numberOfDays = $startDate->diffInDays($endDate);
        return [
            "id" => $this->id,
            "name" => $this->name,
            "image" => $this->image,
            "manager" => $this->manager->firstname . " " . $this->manager->lastname,
            "location" => $this->address->full_address,
            "description" => $this->description,
            "owner" => $this->client->name,
            "startDate" => $this->start_date,
            "endDate" => $this->end_date,
            "duration" => $numberOfDays,
            "status" => $this->status,
        ];
    }
}
