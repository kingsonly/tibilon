<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "project" => $this->id,
            "name" => $this->document_title,
            "file" => $this->file_path,
            "type" => $this->file_type,
            "date" => $this->created_at,
        ];
    }
}
