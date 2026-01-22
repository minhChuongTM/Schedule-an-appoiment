<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Notification;

class User extends Authenticatable
{
    use HasApiTokens;
    protected $fillable = [
        'name',
        'birthdate',
        'gender',
        'email',
        'password',
        'phone',
        'role',
        'status',
        'avatar_url',
        'address',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = ['c_notifications'];

    public function getCNotificationsAttribute()
    {
        return Notification::where('user_id', $this->id)
            ->where('is_read', false)
            ->count();
    }

    // Kết nối 1-1 với Doctor
    public function doctor(): HasOne {
        return $this->hasOne(Doctors::class, 'user_id');
    }

    // Kết nối 1-1 với Patient
    public function patient(): HasOne {
        return $this->hasOne(Patients::class, 'user_id');
    }

    // Một User có nhiều thông báo
    public function notifications(): HasMany {
        return $this->hasMany(Notification::class);
    }
}
