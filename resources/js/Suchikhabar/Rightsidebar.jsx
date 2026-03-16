import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import BannerStrip from '@/Ads/BannerStrip';

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





// ─── SINGLE SIDEBAR ITEM ──────────────────────────────────────────────────────
const SidebarItem = ({ story, index }) => {
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const catColor = getCatColor(story.category);
  const isTop3   = index < 3;
   const imgurl = import.meta.env.VITE_IMAGE_PATH;

    console.log(story)

// const imgUrl = (image) => {
//   if (!image)                   return '';
//   if (image.startsWith('http')) return image;
//   return `/storage/${image}`;  // ✅ Absolute path from root
// };

  return (
    <Link href={`/news/${story.slug || story.id}`} className="block group">
      <div className="flex items-start gap-3 px-4 py-3 hover:bg-[#faf8f6] transition-colors duration-150">

        {/* ── Left: rank number ── */}
        <div className="flex-shrink-0 w-7 text-center pt-0.5">
          <span
            className="text-[1.1rem] font-black leading-none"
            style={{
              color:      isTop3 ? catColor : '#d4cfc8',
              fontFamily: 'Georgia, serif',
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* ── Middle: category + title + time ── */}
        <div className="flex-1 min-w-0">
          {/* Category pill */}
          <span
            className="inline-block text-[0.65rem] font-bold tracking-wider uppercase px-1.5 py-[2px] mb-1.5 rounded-sm"
            style={{ background: catColor, color: '#fff' }}
          >
            {story.category || 'समाचार'}
          </span>

          {/* Title */}
          <h4
            className="text-[0.88rem] font-semibold leading-[1.4] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-2"
            style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
          >
            {story.title}
          </h4>

          {/* Time */}
          <p className="flex items-center gap-1 mt-1.5 text-[0.72rem] text-[#b0a89e]">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {story.time}
          </p>
        </div>

        {/* ── Right: thumbnail (if available) ── */}
        {story.image && (
          <div className="flex-shrink-0 w-[62px] h-[50px] overflow-hidden rounded-sm bg-gray-100">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.07]"
              onLoad={() => setThumbLoaded(true)}
              onError={(e) => { e.target.style.display = 'none'; }}
              style={{ opacity: thumbLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
            />
          </div>
        )}

      </div>
    </Link>
  );
};

// ─── RIGHT SIDEBAR COMPONENT ──────────────────────────────────────────────────
/**
 * Props:
 *   stories: Array of:
 *     { id, slug, category, title, time, image? }
 */
const RightSidebar = ({ stories = [] }) => {
  return (
    <aside className="flex flex-col gap-4 w-full">

      {/* ── Section header ── */}
      <div className="flex items-center gap-2">
        <div className="w-[3px] h-5 rounded-full bg-[#8B0000]" />
        <h2 className="text-[0.82rem] font-black text-[#1c1711] tracking-[0.12em] uppercase">
          ताजा समाचार
        </h2>
        {/* Filler line */}
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(139,0,0,0.2)] to-transparent" />
      </div>

      {/* ── Stories list ── */}
      {stories.length > 0 ? (
        <div className="bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden">
          {stories.map((story, i) => (
            <div
              key={story.id}
              className={i < stories.length - 1 ? 'border-b border-[rgba(0,0,0,0.055)]' : ''}
            >
              <SidebarItem story={story} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-[rgba(0,0,0,0.07)] px-4 py-8 text-center text-[0.85rem] text-[#b0a89e]">
          समाचार उपलब्ध छैन
        </div>
      )}

      {/* ── Ad banner ── */}
      <BannerStrip />

    </aside>
  );
};

export default RightSidebar;