<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Heading;
use App\Models\Log;
use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
            'status' => true,
            'message' => 'News fetched successfully',
            'data' => $news,
        ]);
    }

    /**
     * API endpoint to get single news with related articles
     */
    public function getNewsBySlug($slug)
    {
        $news = News::where('slug', $slug)->firstOrFail();

        // Get related news from same category, excluding current news
        $related = News::where('category', $news->category)
            ->where('id', '!=', $news->id)
            ->latest()
            ->take(6)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $news,
            'related' => $related,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading' => 'required|string|max:255',
            'blog_by' => 'required|string|max:255',
            'description' => 'required|string',
            'published_at' => 'nullable|date',
            'category' => 'nullable|string|max:255',
            'category_id' => 'nullable|integer|exists:categories,id',
            'category_ids' => 'nullable|array',      // ← accept pivot IDs too
            'category_ids.*' => 'integer|exists:categories,id',
            'pdf' => 'nullable|mimes:pdf|max:10000',
        ]);

        // if ($request->hasFile('image')) {
        //     $validated['image'] = $request->file('image')->store('news/images', 'public');
        // }

        if ($request->hasFile('image')) {
            $file = $request->file('image');

            // Generate unique filename
            $filename = uniqid().'.'.$file->getClientOriginalExtension();

            // Store without folder (root of storage/app/public)
            $file->storeAs('', $filename, 'public');

            $validated['image'] = $filename;
        }

        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('news/pdfs', 'public');
        }

        $news = News::create($validated);

        $hasInlineCategory = ! empty($validated['category']);
        $pivotCategoryIds = [];

        if (! empty($validated['category_ids'])) {
            $pivotCategoryIds = $validated['category_ids'];
        } elseif (! empty($validated['category_id'])) {
            $pivotCategoryIds = [$validated['category_id']];
        }

        // Only use pivot when category field is empty (article_id acts as news_id)
        if (! $hasInlineCategory && ! empty($pivotCategoryIds)) {
            $news->categories()->sync($pivotCategoryIds);
        }

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Created news: "'.$news->heading.'"',
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'heading' => 'sometimes|required|string|max:255',
            'blog_by' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'published_at' => 'nullable|date',
            'category' => 'nullable|string|max:255',
            'category_id' => 'nullable|integer|exists:categories,id',
            'category_ids' => 'nullable|array',
            'category_ids.*' => 'integer|exists:categories,id',
            'pdf' => 'nullable|mimes:pdf|max:10000',
        ]);

        // if ($request->hasFile('image')) {
        //     $validated['image'] = $request->file('image')->store('news/images', 'public');
        // }

        if ($request->hasFile('image')) {

            // 🧹 Delete old image if exists
            if ($news->image && Storage::disk('public')->exists($news->image)) {
                Storage::disk('public')->delete($news->image);
            }

            $file = $request->file('image');

            // Generate unique filename
            $filename = uniqid().'.'.$file->getClientOriginalExtension();

            // Store in root (or change path if needed)
            $file->storeAs('', $filename, 'public');

            $validated['image'] = $filename;
        }

        if ($request->hasFile('pdf')) {
            $validated['pdf'] = $request->file('pdf')->store('news/pdfs', 'public');
        }

        $news->update($validated);

        $finalCategory = array_key_exists('category', $validated) ? $validated['category'] : $news->category;
        $pivotCategoryIds = [];

        if (! empty($validated['category_ids'])) {
            $pivotCategoryIds = $validated['category_ids'];
        } elseif (! empty($validated['category_id'])) {
            $pivotCategoryIds = [$validated['category_id']];
        }

        // Only use pivot when category field is empty (article_id acts as news_id)
        if (! empty($finalCategory)) {
            // Ensure pivot is not used when category is present
            $news->categories()->detach();
        } elseif ($request->has('category_ids') || $request->has('category_id')) {
            $news->categories()->sync($pivotCategoryIds);
        }

        Log::create([
            'name' => Auth::check() ? Auth::user()->name : 'Guest',
            'ip_address' => $request->ip(),
            'title' => 'Updated news: "'.$news->heading.'"',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'News updated successfully',
            'data' => $news,
        ]);
    }

    public function destroy($id)
    {
        $news = News::findOrFail($id);
        $heading = $news->heading;
        $news->delete();

        return response()->json([
            'status' => true,
            'message' => 'News deleted successfully',
        ]);
    }

    // In your NewsController.php, update the newsShow method:

    public function newsShow($slug)
    {
        // Try to determine if this is a heading or news based on slug pattern
        if (preg_match('/-\d+$/', $slug)) {
            // Try Heading first (since they have numbers)
            $newsDetails = Heading::where('slug', $slug)->first();

            if ($newsDetails) {
                $related = Heading::where('id', '!=', $newsDetails->id)
                    ->latest()
                    ->take(6)
                    ->get();

                return Inertia::render('MainPages/NewsDetailPage', [
                    'article' => $newsDetails,
                    'related' => $related,
                    'slug' => $slug,
                    'type' => 'heading',
                ]);
            }
        }

        // If not found in Heading or doesn't match pattern, try News
        // IMPORTANT: Eager load the categories relationship
        $newsDetails = News::with('categories')  // ← Add this line to load pivot categories
            ->where('slug', $slug)
            ->firstOrFail();

        // Also eager load categories for related news
        $related = News::with('categories')  // ← Add this for related news too
            ->where('category', $newsDetails->category)
            ->where('id', '!=', $newsDetails->id)
            ->latest()
            ->take(6)
            ->get();

        return Inertia::render('MainPages/NewsDetailPage', [
            'article' => $newsDetails,
            'related' => $related,
            'slug' => $slug,
            'type' => 'news',
        ]);
    }

    public function home()
    {
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

        return Inertia::render('MainPages/HomePage', [
            'todayNews' => $todayNews,
            'categoryNews' => $categoryNews,
            'categoryBanners' => $categoryBanners,
            'latestNews' => $latestNews,
        ]);
    }

    

public function getCategorizedNews()
{
    $categorizedNews = [];

    // ✅ Only these categories will be shown, in this exact order
    $priorityOrder = ['मुख्य', 'समाचार', 'अर्थतन्त्र', 'अन्तर्राष्ट्रिय', 'खेलकुद', 'मनोरञ्जन'];

    // ✅ Filter direct categories to ONLY allowed ones
    $directCategories = News::select('category')
        ->whereNotNull('category')
        ->where('category', '!=', '')
        ->whereIn('category', $priorityOrder) // ← only allowed categories
        ->distinct()
        ->pluck('category')
        ->sortBy(function ($category) use ($priorityOrder) {
            return array_search($category, $priorityOrder);
        });

    foreach ($directCategories as $category) {
        $directNews = News::where('category', $category)
            ->latest('published_at')
            ->take(5)
            ->get(['id', 'heading', 'image', 'published_at', 'slug']);

        $pivotCategory = DB::table('categories')->where('name', $category)->first();
        $pivotNews = collect();

        if ($pivotCategory) {
            $newsIds = DB::table('article_category')
                ->where('category_id', $pivotCategory->id)
                ->pluck('article_id');

            $pivotNews = News::whereIn('id', $newsIds)
                ->latest('published_at')
                ->take(5)
                ->get(['id', 'heading', 'image', 'published_at', 'slug']);
        }

        $allNews = $directNews->merge($pivotNews)
            ->unique('id')
            ->sortByDesc('published_at')
            ->take(5)
            ->values();

        if ($allNews->isEmpty()) continue;

        $categorizedNews[] = [
            'name'  => $category,
            'color' => $this->getCategoryColor($category),
            'route' => '/category/' . urlencode($category),
            'news'  => $this->formatNewsItems($allNews),
        ];
    }

    // ✅ Strategy 2: check pivot-only for any missing allowed categories
    $coveredNames = collect($categorizedNews)->pluck('name');
    $missingCategories = collect($priorityOrder)->filter(
        fn($name) => !$coveredNames->contains($name)
    );

    foreach ($missingCategories as $name) {
        $pivotCategory = DB::table('categories')->where('name', $name)->first();

        if (!$pivotCategory) continue;

        $newsIds = DB::table('article_category')
            ->where('category_id', $pivotCategory->id)
            ->pluck('article_id');

        $news = News::whereIn('id', $newsIds)
            ->latest('published_at')
            ->take(5)
            ->get(['id', 'heading', 'image', 'published_at', 'slug']);

        if ($news->isEmpty()) continue;

        $categorizedNews[] = [
            'name'  => $name,
            'color' => $this->getCategoryColor($name),
            'route' => '/category/' . urlencode($name),
            'news'  => $this->formatNewsItems($news),
        ];
    }

    // ✅ Final sort to guarantee correct order
    $categorizedNews = collect($categorizedNews)
        ->sortBy(fn($cat) => array_search($cat['name'], $priorityOrder))
        ->values()
        ->toArray();

    return response()->json(['status' => true, 'data' => $categorizedNews]);
}

 

    private function formatNewsItems($news)
    {
        return $news->map(function ($item) {
            $image = $item->image ?? null;

            return [
                'id' => $item->id,
                'title' => $item->heading,
                'image' => $image ?: '',
                'time' => $item->published_at
                                ? Carbon::parse($item->published_at)->diffForHumans()
                                : 'भर्खरै',
                'slug' => $item->slug,
                'real_time' => $item->published_at,
            ];
        });
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

        if (! $latest) {
            return response()->json([
                'status' => false,
                'message' => 'No news found',
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
            ],
        ]);
    }
}
