<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    const Default = 0;
    const Unavailable = 1;
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($self) {
            $self->materialType()->delete();
        });
    }

    public function materialType(){
        return $this->hasMany(MaterialType::class,"material_id");
    }
}
