<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Property extends Model
{
    use HasFactory;
    const Completed = 1;
    const Incompleted = 0;
    const Available = 0;
    const IncompletedPayment = 2;
    public function payments()
    {
        return $this->belongsToMany(Payment::class, 'property_payments');
            //->withPivot('completed')
            //->withTimestamps();
        //return $this->belongsToMany(Payment::class, 'property_payments');
    }

    public function amenity()
    {
        return  $this->hasMany(PropertyAmenities::class, "property_id");
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function agent(){
        return $this->hasOne(PropertySalesAgent::class,"property_id");
    }

    public function client(){
        return $this->hasOne(PropertyClient::class,"property_id");
    }

   
}
