<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyPayment extends Model
{
    use HasFactory;
    const Default = 0;

    public function payment(){
        return $this->hasOne(Payment::class,"id","payment_id");
    }
    public function property(){
        return $this->hasOne(Property::class,"id","property_id");
    }
}
