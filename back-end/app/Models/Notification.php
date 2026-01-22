<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = [
        'user_id',
        'sender_id',
        'appointment_id',
        'type',
        'title',
        'message',
        'is_read',
        'action_data'
    ];

    protected $casts = [
        'is_read' => 'boolean',
        'action_data' => 'array'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
