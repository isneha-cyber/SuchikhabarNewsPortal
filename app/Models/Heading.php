<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Heading extends Model
{
    //
    protected $fillable = [
        'image',
        'heading',
        'blog_by',
        'description',
        'published_at',
        'category',
        'pdf',
        'slug' 
    ];

protected static function boot()
{
    parent::boot();

    static::saving(function ($model) {

        // Keep Nepali characters and replace spaces or "/" with "-"
        $slug = preg_replace('/[\s\/]+/u', '-', trim($model->heading));

        // Remove question marks
        $slug = str_replace('?', '', $slug);

        // Generate random number
        $randomNumber = rand(1000, 99999);

        // Append random number
        $model->slug = $slug . '-' . $randomNumber;
    });
}
}
