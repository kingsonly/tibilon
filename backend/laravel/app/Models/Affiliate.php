<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Affiliate extends Model
{
    use HasFactory;
    const DefaultStatus = 0;

    const Type = ["affiliate" => 1, "tibilon" => 0];

    public function payment()
    {
        return $this->hasManyThrough(
            PropertyPayment::class,
            PropertySalesAgent::class,
            'agent_id', // Foreign key on the environments table...
            'property_id', // Foreign key on the deployments table...
            'id', // Local key on the projects table...
            'id' // Local key on the environments table...);
        )->where(["agent_type" => self::Type["affiliate"]]);
    }

    public function properties()
    {
        return $this->hasMany(PropertySalesAgent::class, "agent_id")->where(["agent_type" => self::Type["affiliate"]]);
    }

    public function commission()
    {
        return $this->hasMany(AgentCommission::class, 'agent_id')->where(["agent_type" => self::Type["affiliate"]]);
    }
}
