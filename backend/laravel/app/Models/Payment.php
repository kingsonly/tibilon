<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    const Default = 0;
    const Credit = "Credit";
    const Debit = "Debit";
    public function properties()
    {
        // return $this->belongsToMany(Property::class, 'property_payments');
        //     //->withPivot('completed')
        //    // ->withTimestamps();
    }

    public function agentCommissions()
    {
        return $this->hasMany(AgentCommission::class, 'payment_id');
    }
}
