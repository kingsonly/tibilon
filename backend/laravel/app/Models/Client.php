<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Client extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    const DefaultStatus = 0;
    const DeactivateStatus = 1;
    const Type = ["project" => "project", "property" => "property"];
    protected $guard = "client";

    public function address()
    {
        return $this->hasOne(ClientAddress::class, "id", "address_id");
    }
    
}
