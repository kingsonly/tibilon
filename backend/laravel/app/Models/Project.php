<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    const Completed = 1;
    const Inprogress = 0;
    const Sold = 1;
    const PertiallySold = 2;
    const Available = 0;

    public function address(){
       return  $this->hasOne(Address::class,"id","address_id");
    }

    public function manager(){
        return $this->hasOne(User::class,"id","project_manager_user_id");
    }

    public function client(){
        return $this->hasOne(Client::class,"id","client_id");
    }

    public function property()
    {
        return  $this->hasMany(Property::class, "project_id");
    }

    public function propertySold()
    {
        return  $this->hasMany(Property::class, "project_id")->where("status",self::Sold);
    }

    public function propertyPertiallySold()
    {
        return  $this->hasMany(Property::class, "project_id")->where("status",self::PertiallySold);
    }
    public function availableProperty()
    {
        return  $this->hasMany(Property::class, "project_id")->where("status",self::Available);
    }

    

    public function propertyPayments()
    {
        return $this->hasManyThrough(
            Payment::class,
            PropertyPayment::class,
            'property_id', // Foreign key on the environments table...
            'id', // Foreign key on the deployments table...
            'id', // Local key on the projects table...
            'id' // Local key on the environments table...);
        );
    }

    
}
