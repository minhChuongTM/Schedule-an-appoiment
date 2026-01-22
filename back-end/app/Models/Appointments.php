<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointments extends Model
{
    protected $fillable = [
        'patient_id', 'doctor_id', 'department_id', 'appointment_date', 'status', 'reason', 'notes'
    ];

    protected $casts = [
        'appointment_date' => 'datetime',
    ];

    public function patient() {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor() {
        return $this->belongsTo(Doctors::class, 'doctor_id', 'user_id');
    }

    public function department() {
        return $this->belongsTo(Departments::class);
    }
}
