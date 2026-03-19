
import React, { useState, useEffect, useRef } from 'react';
import NepaliDate from 'nepali-date-converter';

import FeaturedCard  from './FeaturedCard';
import SecondaryGrid from './SecondaryGrid';
import RightSidebar  from './RightSidebar';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const toNepaliDigits = (num) =>
  String(num)
    .split('')
    .map((d) => '०१२३४५६७८९'[d] ?? d)
    .join('');

const formatNepaliDate = (dateString) => {
  if (!dateString) return 'नयाँ';
  try {
    const bsDate = new NepaliDate(new Date(dateString));
    const months = [
      'बैशाख','जेठ','असार','साउन','भदौ','असोज',
      'कार्तिक','मंसिर','पुष','माघ','फागुन','चैत',
    ];
    return `${toNepaliDigits(bsDate.getYear())} ${months[bsDate.getMonth()]} ${toNepaliDigits(bsDate.getDate())}`;
  } catch {
    return 'नयाँ';
  }
};

const stripHtml = (html) => (html ? html.replace(/<[^>]*>/g, '') : '');

const imgurl = import.meta.env.VITE_IMAGE_PATH;
const imgUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('storage/')) return `/${image}`;
  return `${imgurl}/${image}`;
};

// ─── LOADING SPINNER ──────────────────────────────────────────────────────────
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-[#f3f1ef] border-t-[#8B0000] border-r-[#8B0000] rounded-full animate-spin" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-8 h-8 bg-[#8B0000]/10 rounded-full animate-pulse" />
      </div>
    </div>
    <p className="mt-6 text-[#8B0000] font-medium text-lg animate-pulse">समाचार लोड हुँदैछ...</p>
    <p className="mt-2 text-[#a09488] text-sm">कृपया प्रतीक्षा गर्नुहोस्</p>
  </div>
);

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
const HeroSection = ({ heroData }) => {

  // console.log(heroData)


  // ── Derive featured story directly from props — no axios, no loading state ──
  const rawFeatured = Array.isArray(heroData?.featured)
    ? heroData.featured[0]
    : heroData?.featured ?? null;

  const featuredStory = rawFeatured ? {
    id:       rawFeatured.id,
    slug:     rawFeatured.slug || String(rawFeatured.id),
    title:    rawFeatured.heading,
    author:   rawFeatured.blog_by || 'समाचार टोली',
    excerpt:  rawFeatured.description
      ? stripHtml(rawFeatured.description).substring(0, 220) + '…'
      : 'विवरण उपलब्ध छैन।',
    image:    imgUrl(rawFeatured.image),
    category: rawFeatured.category || 'मुख्य समाचार',
    time:     formatNepaliDate(rawFeatured.published_at || rawFeatured.created_at),
    views:    rawFeatured.views || 0,
  } : null;

  // ── Secondary and sidebar come pre-formatted from the server ─────────────
  const secondaryStories = heroData?.secondary?.data ?? [];
  const sidebarStories   = heroData?.sidebar?.data   ?? [];

  // console.log(secondaryStories)
  // console.log(sidebarStories)

  // ── Track left column height to cap the sidebar ───────────────────────────
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(null);

  useEffect(() => {
    if (!leftRef.current) return;
    const observer = new ResizeObserver(() => {
      setLeftHeight(leftRef.current?.offsetHeight ?? null);
    });
    observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, [featuredStory, secondaryStories]);

  // ── Error ──────────────────────────────────────────────────────────────────
  if (!heroData) {
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

  // ── Empty ──────────────────────────────────────────────────────────────────
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

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <section className="bg-white">
      <div className="px-4 md:px-6 lg:px-24 py-4 mb-2">
        <div className="flex flex-col gap-4">

          {/* 3-col left  +  1-col sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">

            {/* LEFT: FeaturedCard + SecondaryGrid */}
            <div className="col-span-3" ref={leftRef}>
              <FeaturedCard story={featuredStory} />
              <SecondaryGrid stories={secondaryStories} />
            </div>

            {/* RIGHT: Sidebar capped to left column height */}
            <div
              className="col-span-1 hidden lg:block overflow-hidden"
              style={{ maxHeight: leftHeight ? `${leftHeight}px` : 'none' }}
            >
              <RightSidebar stories={sidebarStories} count={5} />
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