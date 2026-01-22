<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Departments extends Model
{
    protected $fillable = [
        'name'
    ];

    public function doctors(): HasMany
    {
        return $this->hasMany(Doctors::class, 'department_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointments::class, 'department_id');
    }
}
