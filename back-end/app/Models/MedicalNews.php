<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicalNews extends Model
{
    protected $table = 'medical_news';

    protected $fillable = [
        'title',
        'content',
        'image_url',
        'category',
        'author_id'
    ];

    /**
     * Get the author of the medical news.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
