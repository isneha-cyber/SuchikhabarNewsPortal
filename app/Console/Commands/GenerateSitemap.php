<?php

namespace App\Console\Commands;
use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\News;
use App\Models\Category;
use App\Models\Heading;

class GenerateSitemap extends Command
{
    protected $signature = 'sitemap:generate';
    protected $description = 'Generate sitemap.xml';

  

public function handle()
{
    $sitemap = Sitemap::create();

    // Home
    $sitemap->add(Url::create('/')->setPriority(1.0));

    // Static pages
    $sitemap->add(Url::create('/category'));
    $sitemap->add(Url::create('/hamro-team'));
    $sitemap->add(Url::create('/privacy-policy'));

    // Categories
    Category::all()->each(function ($category) use ($sitemap) {
        $slug = $category->slug ?? urlencode($category->name);
        $sitemap->add(Url::create("/category/{$slug}"));
    });

    // News
    News::latest()->get()->each(function ($news) use ($sitemap) {
        $sitemap->add(
            Url::create("/news/{$news->slug}")
                ->setLastModificationDate($news->updated_at)
        );
    });

    // Headings (IMPORTANT in your case)
    Heading::latest()->get()->each(function ($heading) use ($sitemap) {
        $sitemap->add(
            Url::create("/news/{$heading->slug}")
        );
    });

    // Save file
    $sitemap->writeToFile(public_path('sitemap.xml'));

    $this->info('Sitemap generated successfully!');
}
}
