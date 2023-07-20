<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyAmenities extends Model
{
    use HasFactory;
    const Default = 0;
    public function amenity(){
        return  $this->belongsTo(Amenities::class,"amenity_id");
     }
}
