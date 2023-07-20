<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertySalesAgent extends Model
{
    use HasFactory;
    const Affiliate = 1;
    const SalesTeam = 0;
    const Default = 0;


    //     public function agent()
    //     {

    //         if ((int)$this->getAttribute('agent_type') == self::Affiliate) {
    //             return $this->belongsTo(Affiliate::class, 'agent_id');
    //         }
    //         if ((int)$this->getAttribute('agent_type') == self::SalesTeam) {
    //             return $this->belongsTo(User::class, 'agent_id');
    //         }
    //     }


    //     public function getAgentAttribute()
    // {

    //     if ($this->agent_type === self::Affiliate) {
    //         return $this->affiliate();
    //     } else {
    //         return $this->user();
    //     }
    // }

    public function affiliates()
    {
        return $this->belongsTo(Affiliate::class, 'agent_id');
    }

    public function users()
    {
        return $this->belongsTo(User::class, 'agent_id');
    }

    public function property()
    {
        return  $this->hasOne(Property::class, "id", "property_id");
    }
}
