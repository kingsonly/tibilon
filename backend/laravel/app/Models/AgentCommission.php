<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentCommission extends Model
{
    use HasFactory;
    public function payment(){
        return $this->hasOne(Payment::class, "id","payment_id");//->where(["agent_type" => self::Type["tibilon"]]);
    }
}
