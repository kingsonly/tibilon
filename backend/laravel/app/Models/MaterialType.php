<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialType extends Model
{
    use HasFactory;
    const Default = 0;
    const Unavailable = 1;

    public function unit(){
        return $this->belongsTo(Unit::class,"unit_id");
    }
}
