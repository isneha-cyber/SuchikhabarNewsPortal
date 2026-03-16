import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import FeaturedCard  from './FeaturedCard';
import SecondaryGrid from './SecondaryGrid';
import RightSidebar  from './RightSidebar';

// ─── Categories ───────────────────────────────────────────────────────────────
const SECONDARY_CATEGORIES = [
  'अर्थतन्त्र',
  'खेलकुद',
  'अन्तर्राष्ट्रिय',
  'मनोरञ्जन',
];

const RIGHT_CATEGORIES = [
  'मुख्य समाचार',
  'अर्थतन्त्र',
  'खेलकुद',
  'अन्तर्राष्ट्रिय',
  'मनोरञ्जन',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const timeAgo = (dateString) => {
  if (!dateString) return 'नयाँ';
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (diff < 60)    return 'अहिले';
  if (diff < 3600)  return `${Math.floor(diff / 60)} मिनेट अघि`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} घण्टा अघि`;
  return `${Math.floor(diff / 86400)} दिन अघि`;
};

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
};

const imgUrl = (image) => {
  if (!image)                        return '';
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('storage/'))  return `/${image}`;
  return `/storage/${image}`;
};

// ─── Loading Spinner ──────────────────────────────────────────────────────────
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#f3f1ef] border-t-[#8B0000] border-r-[#8B0000] rounded-full animate-spin" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 bg-[#8B0000]/10 rounded-full animate-pulse" />
      </div>
    </div>
    <p className="mt-6 text-[#8B0000] font-medium text-lg animate-pulse">
      समाचार लोड हुँदैछ...
    </p>
    <p className="mt-2 text-[#a09488] text-sm">कृपया प्रतीक्षा गर्नुहोस्</p>
  </div>
);

// ─── HeroSection ──────────────────────────────────────────────────────────────
const HeroSection = () => {
  const [featuredStory,    setFeaturedStory]    = useState(null);
  const [secondaryStories, setSecondaryStories] = useState([]);
  const [sidebarStories,   setSidebarStories]   = useState([]);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState(false);

  // ✅ Track left column height to cap the sidebar
  const leftRef    = useRef(null);
  const [leftHeight, setLeftHeight] = useState(null);

  useEffect(() => {
    if (!leftRef.current) return;
    const observer = new ResizeObserver(() => {
      setLeftHeight(leftRef.current?.offsetHeight ?? null);
    });
    observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, [featuredStory, secondaryStories]); // re-measure when content loads

  useEffect(() => {
    const timeoutId = setTimeout(() => setError(true), 10000);

    const fetchAll = async () => {
      try {
        // ── 1. Featured card using the new endpoint ──
        const featuredRes = await axios.get('/latest-featured');
        if (featuredRes.data?.status && featuredRes.data?.data) {
          const item = featuredRes.data.data;
          setFeaturedStory({
            id:       item.id,
            slug:     item.slug || item.id,
            title:    item.heading,
            author:   item.blog_by || 'समाचार टोली',
            excerpt:  item.description
              ? stripHtml(item.description).substring(0, 220) + '…'
              : 'विवरण उपलब्ध छैन।',
            image:    imgUrl(item.image),
            category: item.category || 'मुख्य समाचार',
            time:     timeAgo(item.published_at || item.created_at),
            views:    item.views || 0,
          });
        }

        // ── 2. Secondary grid ──
        const secondaryResponses = await Promise.allSettled(
          SECONDARY_CATEGORIES.map((cat) =>
            axios.get(`/ournews?category=${encodeURIComponent(cat)}&per_page=1`)
          )
        );

        const secondaryArticles = secondaryResponses
          .map((res, i) => {
            if (res.status !== 'fulfilled') return null;
            // Fix: Access the data correctly
            const responseData = res.value.data;
            const item = responseData?.data?.data?.[0] || responseData?.data?.[0];
            if (!item) return null;
            return {
              id:       item.id,
              slug:     item.slug || item.id,
              category: item.category || SECONDARY_CATEGORIES[i],
              title:    item.heading,
              image:    imgUrl(item.image),
              time:     timeAgo(item.published_at || item.created_at),
            };
          })
          .filter(Boolean);

        setSecondaryStories(secondaryArticles.slice(0, 3));

        // ── 3. Sidebar ──
        const sidebarResponses = await Promise.allSettled(
          RIGHT_CATEGORIES.map((cat) =>
            axios.get(`/ournews?category=${encodeURIComponent(cat)}&per_page=1`)
          )
        );

        const sidebarArticles = sidebarResponses
          .map((res, i) => {
            if (res.status !== 'fulfilled') return null;
            // Fix: Access the data correctly
            const responseData = res.value.data;
            const item = responseData?.data?.data?.[0] || responseData?.data?.[0];
            if (!item) return null;
            return {
              id:       item.id,
              slug:     item.slug || item.id,
              category: item.category || RIGHT_CATEGORIES[i],
              title:    item.heading,
              time:     timeAgo(item.published_at || item.created_at),
              image:    imgUrl(item.image),
            };
          })
          .filter(Boolean);

        setSidebarStories(sidebarArticles);

      } catch (err) {
        console.error('HeroSection fetch error:', err);
        setError(true);
      } finally {
        setLoading(false);
        clearTimeout(timeoutId);
      }
    };

    fetchAll();
    return () => clearTimeout(timeoutId);
  }, []);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="bg-white min-h-[600px] flex items-center justify-center">
        <div className="w-full"><LoadingSpinner /></div>
      </section>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error && !featuredStory) {
    return (
      <section className="bg-white">
        <div className="px-4 md:px-6 lg:px-24 py-16 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-[#a09488] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-[#1c1711] mb-2">समाचार लोड गर्न समस्या भयो</h3>
            <p className="text-[#a09488] mb-4">कृपया पृष्ठ रिफ्रेस गर्नुहोस्।</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[#8B0000] text-white rounded hover:bg-[#6b0000] transition-colors"
            >
              पुन: प्रयास गर्नुहोस्
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Empty ────────────────────────────────────────────────────────────────
  if (!featuredStory) {
    return (
      <section className="bg-white">
        <div className="px-4 md:px-6 lg:px-24 py-16 text-center">
          <div className="max-w-md mx-auto">
            <svg className="w-16 h-16 text-[#a09488] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="text-xl font-bold text-[#1c1711] mb-2">कुनै समाचार उपलब्ध छैन</h3>
            <p className="text-[#a09488]">हाल कुनै समाचार उपलब्ध छैन।</p>
          </div>
        </div>
      </section>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <section className="bg-white">
      <div className="px-4 md:px-6 lg:px-24 py-4 mb-2">
        <div className="flex flex-col gap-4">

          {/* ── 3-col left + 1-col sidebar ── */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">

            {/* ✅ LEFT: measured column — FeaturedCard + SecondaryGrid */}
            <div className="col-span-3" ref={leftRef}>
              <FeaturedCard story={featuredStory} />
              <SecondaryGrid stories={secondaryStories} />
            </div>

            {/* ✅ RIGHT: sidebar capped to exact left column height, overflow hidden */}
            <div
              className="col-span-1 hidden lg:block overflow-hidden"
              style={{ maxHeight: leftHeight ? `${leftHeight}px` : 'none' }}
            >
              <RightSidebar stories={sidebarStories} />
            </div>

          </div>

        </div>

        {/* Bottom divider */}
        <div className="max-w-[1280px] mx-auto px-3 pb-2">
          <div className="h-[1px] bg-gradient-to-r from-[#8B0000] via-[#c9a84c] to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;