<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = [
        'image',
        'heading',
        'blog_by',
        'description',
        'published_at',
        'category',
        'pdf',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        // ✅ FIX: Use 'creating' instead of 'saving'
        // 'saving' fired on EVERY update, regenerating slugs and breaking old links
        // 'creating' only fires once when the record is first created
        static::creating(function ($model) {
            if (empty($model->slug)) {
                // Keep Nepali characters, replace spaces or "/" with "-"
                $slug = preg_replace('/[\s\/]+/u', '-', trim($model->heading));

                // Remove question marks
                $slug = str_replace('?', '', $slug);

                // Append random number to ensure uniqueness
                $randomNumber = rand(1000, 99999);

                $model->slug = $slug . '-' . $randomNumber;
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function categories()
    {
        // article_id on pivot acts as news_id
        return $this->belongsToMany(Category::class, 'article_category', 'article_id', 'category_id');
    }
}