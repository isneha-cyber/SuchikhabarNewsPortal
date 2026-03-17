<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Models\Heading;
use App\Models\Banner;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function index(Request $request)
{
    $query = News::latest();
 
    // Filter by category if provided: /ournews?category=राजनीति
    if ($request->filled('category')) {
        $query->where('category', $request->category);
    }
 
    $perPage = $request->get('per_page', 10);
    $news = $query->paginate($perPage);
 
    return response()->json([
        'status'  => true,
        'message' => 'News fetched successfully',
        'data'    => $news,
    ]);
}

    /**
     * API endpoint to get single news with related articles
     */
    public function getNewsBySlug($slug)
    {
        $news = News::where("slug", $slug)->firstOrFail();
        
        // Get related news from same category, excluding current news
        $related = News::where('category', $news->category)
            ->where('id', '!=', $news->id)
            ->latest()
            ->take(6)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $news,
            'related' => $related
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading'      => 'required|string|max:255',
            'blog_by'      => 'required|string|max:255',
            'description'  => 'required|string',
            'published_at' => 'nullable|date',
            'category'     => 'nullable|string|max:255',
            'pdf'          => 'nullable|mimes:pdf|max:10000',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news/images', 'public');
        }

        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('news/pdfs', 'public');
        }

        $news = News::create($validated);

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Created news: "' . $news->heading . '"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News created successfully',
            'data' => $news,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading'      => 'sometimes|required|string|max:255',
            'blog_by'      => 'sometimes|required|string|max:255',
            'description'  => 'sometimes|required|string',
            'published_at' => 'nullable|date',
            'category'     => 'nullable|string|max:255',
            'pdf'          => 'nullable|mimes:pdf|max:10000',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('news/images', 'public');
        }

        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('news/pdfs', 'public');
        }

        $news->update($validated);

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Updated news: "' . $news->heading . '"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News updated successfully',
            'data' => $news,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $heading = $news->heading;
        $news->delete();

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => request()->ip(),
            'title' => 'Deleted news: "' . $heading . '"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News deleted successfully',
        ]);
    }

    // public function newsShow($slug){
    //     $newsDetails = News::where("slug", $slug)->firstOrFail();
    //     return Inertia::render("MainPages/NewsDetails", [
    //         "slug" => $slug, // Pass the slug to the component
    //         "newsdetails" => $newsDetails // Also pass the news details for initial render
    //     ]);
    // }

    public function newsShow($slug){
    $newsDetails = News::where("slug", $slug)->firstOrFail();
    
    // Get related news from same category, excluding current news
    $related = News::where('category', $newsDetails->category)
        ->where('id', '!=', $newsDetails->id)
        ->latest()
        ->take(6)
        ->get();
    
    return Inertia::render("MainPages/NewsDetailPage", [
        "article" => $newsDetails,  // Change from 'newsdetails' to 'article'
        "related" => $related,       // Add related news
        "slug" => $slug,
    ]);
}

    public function home(){
    $today = Carbon::today();

    $todayNews = Heading::whereDate('published_at', $today)->get();

    $categories = News::select('category')
        ->distinct()
        ->pluck('category');

    $categoryNews = [];
    foreach ($categories as $category) {
        $categoryNews[$category] = News::where('category', $category)
            ->latest()
            ->take(8)
            ->get();
    }

    $bannerCategories = Banner::select('category')
        ->distinct()
        ->pluck('category');

    $categoryBanners = [];
    foreach ($bannerCategories as $bannerCategory) {
        $categoryBanners[$bannerCategory] = Banner::where('category', $bannerCategory)
            ->latest()
            ->get(); 
    }

    // Get latest 3 news for hero section
    $latestNews = News::latest()->take(3)->get();
    
    // Debug: Log to Laravel log
    \Log::info('Latest News Count: ' . $latestNews->count());
    \Log::info('Latest News Data:', $latestNews->toArray());

    return Inertia::render("MainPages/HomePage", [
        "todayNews"      => $todayNews,
        "categoryNews"   => $categoryNews,
        "categoryBanners"=> $categoryBanners,
        "latestNews"     => $latestNews,
    ]);
}

// Add this method to your NewsController.php

public function getCategorizedNews()
{
    // Get all distinct categories that have news
    $categories = News::select('category')
        ->whereNotNull('category') // Exclude null categories
        ->distinct()
        ->pluck('category')
        ->take(5); // Take only first 5 categories
    
    $categorizedNews = [];
    
    foreach ($categories as $category) {
        // Get latest 4 news for each category (1 featured + 3 list items)
        $news = News::where('category', $category)
            ->latest('published_at') // Order by published date
            ->take(5)
            ->get(['id', 'heading as title', 'image', 'published_at', 'slug']);
        
        // Format the news items
        $formattedNews = $news->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => $item->title,
                'image' => $item->image ? asset('storage/' . $item->image) : 'https://via.placeholder.com/500x300?text=No+Image',
                'time' => $item->published_at ? Carbon::parse($item->published_at)->diffForHumans() : 'भर्खरै',
                'slug' => $item->slug,
                'real_time' => $item->published_at
            ];
        });
        
        $categorizedNews[] = [
            'name' => $category,
            'color' => $this->getCategoryColor($category),
            'route' => '/category/' . urlencode($category),
            'news' => $formattedNews,
        ];
    }
    
    return response()->json([
        'status' => true,
        'data' => $categorizedNews
    ]);
}

// Helper method to assign colors to categories
private function getCategoryColor($category)
{
    $colors = [
        'राजनीति' => '#8B0000',
        'अर्थतन्त्र' => '#1a6b3c',
        'खेलकुद' => '#b8860b',
        'अन्तर्राष्ट्रिय' => '#00649b',
        'समाज' => '#6b3a8c',
        'मनोरञ्जन' => '#c44569',
        'प्रविधि' => '#2c3e50',
        'शिक्षा' => '#16a085',
        'स्वास्थ्य' => '#c0392b',
    ];
    
    return $colors[$category] ?? '#808080'; // Default gray if category not found
}

    public function getLatestFeatured()
{
    $latest = News::latest()->first();
    
    if (!$latest) {
        return response()->json([
            'status' => false,
            'message' => 'No news found'
        ]);
    }
    
    return response()->json([
        'status' => true,
        'data' => [
            'id' => $latest->id,
            'slug' => $latest->slug,
            'heading' => $latest->heading,
            'blog_by' => $latest->blog_by,
            'description' => $latest->description,
            'image' => $latest->image,
            'category' => $latest->category,
            'published_at' => $latest->published_at,
            'created_at' => $latest->created_at,
            'views' => $latest->views,
        ]
    ]);
}
}