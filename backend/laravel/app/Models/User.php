<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable,HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    const DefaultStatus = 0;
    
    const Type = ["affiliate" => 1, "tibilon" => 0];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function payment()
    {
        return $this->hasManyThrough(
            PropertyPayment::class,
            PropertySalesAgent::class,
            'agent_id', // Foreign key on the environments table...
            'property_id', // Foreign key on the deployments table...
            'id', // Local key on the projects table...
            'id' // Local key on the environments table...);
        )->where(["agent_type" => self::Type["tibilon"]]);
    }

    public function properties()
    {
        return $this->hasMany(PropertySalesAgent::class, "agent_id")->where(["agent_type" => self::Type["tibilon"]]);
    }

    public function commission()
    {
        return $this->hasMany(AgentCommission::class, 'agent_id')->where(["agent_type" => self::Type["tibilon"]]);
    }
}
