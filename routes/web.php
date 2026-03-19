<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HeadingController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\HerosectionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Heading;
use App\Models\News;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// ── Home Page ────────────────────────────────────────────────────────────────
Route::get('/', function () {
 
    // ── Featured (Headings) ──────────────────────────────────────────────
    $featured = Heading::latest()->get();
 
    // ── Secondary Grid (3 articles from 3 different categories) ─────────
    $picked   = collect();
    $usedCats = [];
 
    // Pass 1: direct category column
    $directNews = News::whereNotNull('category')
        ->where('category', '!=', '')
        ->latest()
        ->limit(30)
        ->get();
 
    foreach ($directNews as $news) {
        if ($picked->count() >= 3) break;
        if (in_array($news->category, $usedCats, true)) continue;
        $picked->push($news);
        $usedCats[] = $news->category;
    }
 
    // Pass 2: pivot table
    if ($picked->count() < 3) {
        $pivotRows = DB::table('article_category')
            ->join('categories', 'article_category.category_id', '=', 'categories.id')
            ->join('news', 'article_category.article_id', '=', 'news.id')
            ->select(
                'news.id',
                'news.heading',
                'news.description',
                'news.image',
                'news.slug',
                'news.published_at',
                'news.created_at',
                'categories.name as cat_name',
                'categories.slug as cat_slug'
            )
            ->whereNotIn('news.id', $picked->pluck('id'))
            ->orderBy('news.id', 'desc')
            ->limit(30)
            ->get();
 
        foreach ($pivotRows as $row) {
            if ($picked->count() >= 3) break;
            $label = $row->cat_name ?? $row->cat_slug ?? 'समाचार';
            if (in_array($label, $usedCats, true)) continue;
            $picked->push($row);
            $usedCats[] = $label;
        }
    }
 
    // Pass 3: fallback
    if ($picked->count() < 3) {
        $fallback = News::whereNotIn('id', $picked->pluck('id'))
            ->latest()
            ->limit(10)
            ->get();
 
        foreach ($fallback as $news) {
            if ($picked->count() >= 3) break;
            $picked->push($news);
        }
    }
 
    $secondary = $picked->values();
 
    // ── Sidebar (latest 5 from different categories) ─────────────────────
    $pickedSidebar   = collect();
    $usedCatsSidebar = [];
    $count           = 5;
 
    // Pass 1: direct category column
    $directNewsSidebar = News::whereNotNull('category')
        ->where('category', '!=', '')
        ->latest()
        ->limit(50)
        ->get();
 
    foreach ($directNewsSidebar as $news) {
        if ($pickedSidebar->count() >= $count) break;
        if (in_array($news->category, $usedCatsSidebar, true)) continue;
        $pickedSidebar->push($news);
        $usedCatsSidebar[] = $news->category;
    }
 
    // Pass 2: pivot table
    if ($pickedSidebar->count() < $count) {
        $pivotRowsSidebar = DB::table('article_category')
            ->join('categories', 'article_category.category_id', '=', 'categories.id')
            ->join('news', 'article_category.article_id', '=', 'news.id')
            ->select(
                'news.id',
                'news.heading',
                'news.description',
                'news.image',
                'news.slug',
                'news.published_at',
                'news.created_at',
                'categories.name as cat_name',
                'categories.slug as cat_slug'
            )
            ->whereNotIn('news.id', $pickedSidebar->pluck('id'))
            ->orderBy('news.id', 'desc')
            ->limit(50)
            ->get();
 
        foreach ($pivotRowsSidebar as $row) {
            if ($pickedSidebar->count() >= $count) break;
            $label = $row->cat_name ?? $row->cat_slug ?? 'समाचार';
            if (in_array($label, $usedCatsSidebar, true)) continue;
            $pickedSidebar->push($row);
            $usedCatsSidebar[] = $label;
        }
    }
 
    // Pass 3: fallback
    if ($pickedSidebar->count() < $count) {
        $fallbackSidebar = News::whereNotIn('id', $pickedSidebar->pluck('id'))
            ->latest()
            ->limit($count * 2)
            ->get();
 
        foreach ($fallbackSidebar as $news) {
            if ($pickedSidebar->count() >= $count) break;
            $pickedSidebar->push($news);
        }
    }
 
    $sidebar = $pickedSidebar->values();
 
    // ── Render ───────────────────────────────────────────────────────────
    return Inertia::render('Welcome', [
        'canLogin'       => Route::has('login'),
        'canRegister'    => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion'     => PHP_VERSION,
 
        'heroData' => [
            'featured'  => $featured,
            'secondary' => ['status' => true, 'data' => $secondary],
            'sidebar'   => ['status' => true, 'data' => $sidebar],
        ],
    ]);
});
 

 

 
// ── API Routes (keep these for any direct API access if still needed) ─────────
Route::get('/headings', [HeadingController::class, 'index'])->name('headings.index');
Route::get('/hero/secondary-grid', [HeroSectionController::class, 'secondaryGrid']);
Route::get('/hero/sidebar', [HeroSectionController::class, 'sidebar']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
      Route::get('/teams',function(){
        return Inertia::render('AdminPage/Teams');
    }); 
    Route::post('/team', [TeamController::class, 'store'])->name('team.store');     
    Route::put('/team/{id}', [TeamController::class, 'update'])->name('team.update'); 
    Route::delete('/team/{id}', [TeamController::class, 'destroy'])->name('team.destroy'); 

    // Route For the Category
    Route::get('/categories',function(){
        return Inertia::render('AdminPage/Category');
    });
    Route::post('/cate', [CategoryController::class, 'store'])->name('cate.store');     
    Route::put('/cate/{id}', [CategoryController::class, 'update'])->name('cate.update'); 
    Route::delete('/cate/{id}', [CategoryController::class, 'destroy'])->name('cate.destroy');

    

    // Route for the News
    Route::get('/article',function(){
        return Inertia::render('AdminPage/News');
    });
    Route::post('/ournews', [NewsController::class, 'store'])->name('news.store');     
    Route::put('/ournews/{id}', [NewsController::class, 'update'])->name('news.update'); 
    Route::delete('/ournews/{id}', [NewsController::class, 'destroy'])->name('news.destroy');

    // Route for the Banners
    Route::get('/banners',function(){
        return Inertia::render('AdminPage/Banners');
    });
    Route::post('/banner', [BannerController::class, 'store'])->name('banner.store');     
    Route::put('/banner/{id}', [BannerController::class, 'update'])->name('banner.update'); 
    Route::delete('/banner/{id}', [BannerController::class, 'destroy'])->name('banner.destroy');

    // ROute For the User
    Route::get('/user',function(){
        return Inertia::render('AdminPage/UserManagement');
    });
    Route::get('/users', [UserController::class, 'index'])->name('users.index');       
    Route::post('/users', [UserController::class, 'store'])->name('users.store');      
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update'); 
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy'); 

    // ROute For the Logs
    Route::get('/log',function(){
        return Inertia::render('AdminPage/Logs');
    });
    Route::get('/logs', [LogController::class, 'index'])->name('logs.index');  

    // ROute For the heading
    Route::get('/heading',function(){
        return Inertia::render('AdminPage/Heading');
    });

    Route::post('/headings', [HeadingController::class, 'store'])->name('headings.store');      
    Route::put('/headings/{id}', [HeadingController::class, 'update'])->name('headings.update'); 
    Route::delete('/headings/{id}', [HeadingController::class, 'destroy'])->name('headings.destroy');
    
    
 

   
});

Route::get('/team', [TeamController::class, 'index'])->name('team.index'); 
        Route::get('/cate', [CategoryController::class, 'index'])->name('cate.index'); 
            Route::get('/ournews', [NewsController::class, 'index'])->name('news.index');  
                Route::get('/banner', [BannerController::class, 'index'])->name('banner.index');  
                    Route::get('/headings', [HeadingController::class, 'index'])->name('headings.index');       
    

Route::get('/category', function () {
    return Inertia::render('CategoryPage');
});
 Route::get('/news/{slug}', [NewsController::class, 'newsShow'])->name('news.show');

   Route::get('/category/{slug}',[CategoryController::class,'showDetails'])->name('ourcategory.showDetails');

 Route::get('/detail',function(){
        return Inertia::render('NewsDetailPage');
    });
    

   Route::get('/categorized-news', [NewsController::class, 'getCategorizedNews'])->name('news.categorized');
   Route::get('/latest-featured', [NewsController::class, 'getLatestFeatured'])->name('news.latestFeatured');

Route::get('/hamro-team', function () {
    return Inertia::render('HamroTeam');
});
Route::get('/privacy-policy', function () {
    return Inertia::render('Privacy');
});

// Secondary Grid  →  GET /hero/secondary-grid
// Returns 3 articles from 3 distinct categories
Route::get('/hero/secondary-grid', [HeroSectionController::class, 'secondaryGrid']);
 
// Right Sidebar   →  GET /hero/sidebar?count=5
// Returns latest N articles (default 5) with resolved category labels
Route::get('/hero/sidebar', [HeroSectionController::class, 'sidebar']);

require __DIR__.'/auth.php';
