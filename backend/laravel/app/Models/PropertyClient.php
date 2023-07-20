<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PropertyClient extends Model
{
    use HasFactory;
    const Default = 0;
     
    public function client(){
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function property(){
        return $this->belongsTo(Property::class, 'property_id');
    }
}
