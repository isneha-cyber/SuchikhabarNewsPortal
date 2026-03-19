<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HeroSectionController extends Controller
{
    /**
     * Return 3 articles from 3 different categories for the Secondary Grid.
     *
     * Strategy (in priority order):
     *   1. news.category column (inline string)  — most common case
     *   2. article_category pivot  → categories.name / categories.slug
     *
     * GET /hero/secondary-grid
     */
    public function secondaryGrid()
    {
        $picked = collect();   // final 3 articles
        $usedCats = [];          // guard against duplicate categories

        // ── Pass 1: direct category column ──────────────────────────────────
        // Grab a larger batch (30) so we have enough variety across categories
        $directNews = News::whereNotNull('category')
            ->where('category', '!=', '')
            ->latest()
            ->limit(30)
            ->get();

        foreach ($directNews as $news) {
            if ($picked->count() >= 3) {
                break;
            }
            if (in_array($news->category, $usedCats, true)) {
                continue;
            }

            $picked->push($this->formatSecondary($news, $news->category));
            $usedCats[] = $news->category;
        }

        // ── Pass 2: pivot table (article_category) ──────────────────────────
        if ($picked->count() < 3) {
            $pivotRows = DB::table('article_category')
                ->join('categories', 'article_category.category_id', '=', 'categories.id')
                ->join('news', 'article_category.article_id', '=', 'news.id')
               // in secondaryGrid(), update the ->select() inside Pass 2:
                ->select(
                    'news.id',
                    'news.heading',
                    'news.description',   // ← add this line
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
                if ($picked->count() >= 3) {
                    break;
                }
                $label = $row->cat_name ?? $row->cat_slug ?? 'समाचार';
                if (in_array($label, $usedCats, true)) {
                    continue;
                }

                $picked->push($this->formatSecondaryRaw($row, $label));
                $usedCats[] = $label;
            }
        }

        // ── Pass 3: fallback — any remaining news ignoring category dupes ───
        if ($picked->count() < 3) {
            $fallback = News::whereNotIn('id', $picked->pluck('id'))
                ->latest()
                ->limit(10)
                ->get();

            foreach ($fallback as $news) {
                if ($picked->count() >= 3) {
                    break;
                }
                $picked->push($this->formatSecondary($news, $news->category ?? 'समाचार'));
            }
        }

        return response()->json([
            'status' => true,
            'data' => $picked->values(),
        ]);
    }

    /**
     * Return the latest N articles for the Right Sidebar.
     * Also resolves category label via pivot when the inline column is empty.
     *
     * GET /hero/sidebar?count=5
     */
   public function sidebar(Request $request)
{
    $count = (int) $request->get('count', 5);
    $count = max(1, min($count, 20));

    $picked   = collect();
    $usedCats = [];

    // ── Pass 1: direct category column ──────────────────────────────────
    $directNews = News::whereNotNull('category')
        ->where('category', '!=', '')
        ->latest()
        ->limit(50)
        ->get();

    foreach ($directNews as $news) {
        if ($picked->count() >= $count) break;
        if (in_array($news->category, $usedCats, true)) continue;

        $picked->push($this->formatSecondary($news, $news->category));
        $usedCats[] = $news->category;
    }

    // ── Pass 2: pivot table ──────────────────────────────────────────────
    if ($picked->count() < $count) {
        $pivotRows = DB::table('article_category')
            ->join('categories', 'article_category.category_id', '=', 'categories.id')
            ->join('news', 'article_category.article_id', '=', 'news.id')
            ->select(
                'news.id', 'news.heading', 'news.description',
                'news.image', 'news.slug', 'news.published_at',
                'news.created_at', 'categories.name as cat_name',
                'categories.slug as cat_slug'
            )
            ->whereNotIn('news.id', $picked->pluck('id'))
            ->orderBy('news.id', 'desc')
            ->limit(50)
            ->get();

        foreach ($pivotRows as $row) {
            if ($picked->count() >= $count) break;
            $label = $row->cat_name ?? $row->cat_slug ?? 'समाचार';
            if (in_array($label, $usedCats, true)) continue;

            $picked->push($this->formatSecondaryRaw($row, $label));
            $usedCats[] = $label;
        }
    }

    // ── Pass 3: fallback — fill remaining slots ignoring category dupes ──
    if ($picked->count() < $count) {
        $fallback = News::whereNotIn('id', $picked->pluck('id'))
            ->latest()
            ->limit($count * 2)
            ->get();

        foreach ($fallback as $news) {
            if ($picked->count() >= $count) break;
            $picked->push($this->formatSecondary($news, $news->category ?? 'समाचार'));
        }
    }

    return response()->json([
        'status' => true,
        'data'   => $picked->values(),
    ]);
}

    // ── Private formatters ───────────────────────────────────────────────────

    private function formatSecondary(News $news, string $category): array
    {
        return [
            'id' => $news->id,
            'slug' => $news->slug ?? (string) $news->id,
            'title' => $news->heading,
            'category' => $category,
            'image' => $this->resolveImageUrl($news->image),
            'time' => $news->published_at ?? $news->created_at,
            'description' => $news->description   // ← was $row->description (wrong variable)
                                ? strip_tags($news->description)
                                : '',
        ];
    }

    private function formatSecondaryRaw(object $row, string $category): array
    {
        return [
            'id' => $row->id,
            'slug' => $row->slug ?? (string) $row->id,
            'title' => $row->heading,
            'category' => $category,
            'image' => $this->resolveImageUrl($row->image ?? null),
            'time' => $row->published_at ?? $row->created_at,
            'description' => isset($row->description)  // ← was missing entirely
                                ? strip_tags($row->description)
                                : '',
        ];
    }

    private function resolveImageUrl(?string $image): string
    {
        if (! $image) {
            return '';
        }
        if (str_starts_with($image, 'http://') || str_starts_with($image, 'https://')) {
            return $image;
        }

        // images stored as bare filenames in storage root
        return asset('storage/'.ltrim($image, '/'));
    }
}
