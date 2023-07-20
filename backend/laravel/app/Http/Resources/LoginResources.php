<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginResources extends JsonResource
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
            "name" => $this->firstname." ".$this->lastname,
            "token" => $this->token,
            "email" => $this->email,
            "status" => "success",
            "message" => "user logged in",
        ];
    }



    public function toResponse($request)
    {

        return parent::toResponse($request)->setStatusCode(200);
    }
}
