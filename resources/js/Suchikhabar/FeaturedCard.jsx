import React, { useState } from 'react';
import { router } from '@inertiajs/react';

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getCatColor = (cat) => {
  const CATEGORY_COLOR = {
    'मुख्य समाचार':    '#8B0000',
    'अर्थतन्त्र':      '#1a6b3c',
    'खेलकुद':          '#c9a84c',
    'अन्तर्राष्ट्रिय': '#00649b',
    'समाज':            '#6b3a8c',
    'राजनीति':         '#8B0000',
    'प्रदेश':          '#1a6b3c',
    'स्वास्थ्य':       '#c0392b',
    'शिक्षा':          '#00649b',
    'प्रविधि':         '#2c3e50',
    'मनोरञ्जन':        '#9d174d',
    'कृषि':            '#3d6b1a',
    'धार्मिक':         '#7c3d12',
    'विचार':           '#374151',
    'प्रवास':          '#006B8B',
  };
  return CATEGORY_COLOR[cat] || '#8B0000';
};

const formatViews = (views) => {
  if (!views)          return '०';
  if (views > 1000000) return (views / 1000000).toFixed(1) + 'M';
  if (views > 1000)    return (views / 1000).toFixed(1) + 'K';
  return String(views);
};

// ─── CATEGORY BADGE ───────────────────────────────────────────────────────────
const CategoryBadge = ({ category }) => (
  <span
    className="inline-block font-bold tracking-wide uppercase text-[0.78rem] px-2.5 py-1"
    style={{ background: getCatColor(category), color: 'white' }}
  >
    {category || 'समाचार'}
  </span>
);

// ─── FEATURED CARD COMPONENT ──────────────────────────────────────────────────
const FeaturedCard = ({ story }) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  if (!story) return null;

  const href = `/news/${story.slug || story.id}`;

  const handleClick = () => {
    router.visit(href);
  };

  return (
    <div onClick={handleClick} className="group cursor-pointer">
      <div className="bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden rounded-md">

        {/* ── ROW 1: Time & Category ── */}
        <div className="flex items-center gap-3 px-5 pt-4 pb-2">
          <span className="flex items-center gap-1 text-[0.78rem] text-[#a09488]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {story.time}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#d4cfc8]" />
          <CategoryBadge category={story.category} />
        </div>

        {/* ── Text block ── */}
        <div className="px-5 pt-4 pb-5">

          {/* Red accent line */}
          <div className="w-8 h-[3px] bg-[#8B0000] mb-3" />

          {/* Title */}
          <h1
            className="text-[1.45rem] md:text-[2.95rem] font-bold leading-[1.35] text-[#1c1711] group-hover:text-[#8B0000] transition-colors mb-3"
           
          >
            {story.title}
          </h1>

          {/* Image */}
          <div className="relative overflow-hidden w-full rounded-md">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              onLoad={() => setImgLoaded(true)}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&q=80';
                setImgLoaded(true);
              }}
              style={{
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease, transform 0.7s ease',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Excerpt */}
          <p className="text-[0.97rem] text-[#5a5049] leading-relaxed line-clamp-3 mt-6">
            {story.excerpt}
          </p>

          {/* Meta row */}
          <div className="mt-4 pt-4 border-t border-[rgba(0,0,0,0.07)] flex items-center justify-between text-[0.82rem] text-[#a09488]">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                {story.author}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                {story.time}
              </span>
            </div>
            <span className="flex items-center gap-1.5 flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              {formatViews(story.views)}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;