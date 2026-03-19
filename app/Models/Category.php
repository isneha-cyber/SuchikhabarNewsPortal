<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    //
    protected $fillable = [
        'name', 'slug',
    ];

    protected static function boot()
    {
        parent::boot();

       
        static::saving(function ($model) {
            $slug = preg_replace('/[\s\/]+/', '-', $model->name);
            $slug = str_replace('?', '', $slug);
            $model->slug = $slug;
        });
    }

    public function news()
    {
        return $this->hasMany(News::class);
    }

    
}
