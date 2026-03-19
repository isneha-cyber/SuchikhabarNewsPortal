import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import NepaliDate from 'nepali-date-converter';
import BannerStrip from '@/Ads/BannerStrip';

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

const getCatColor = (cat) => {
  const MAP = {
    'मुख्य समाचार': '#8B0000', 'अर्थतन्त्र': '#1a6b3c', 'खेलकुद': '#c9a84c',
    'अन्तर्राष्ट्रिय': '#00649b', 'समाज': '#6b3a8c', 'राजनीति': '#8B0000',
    'प्रदेश': '#1a6b3c', 'स्वास्थ्य': '#c0392b', 'शिक्षा': '#00649b',
    'प्रविधि': '#2c3e50', 'मनोरञ्जन': '#9d174d', 'कृषि': '#3d6b1a',
    'धार्मिक': '#7c3d12', 'विचार': '#374151', 'प्रवास': '#006B8B',
  };
  return MAP[cat] || '#8B0000';
};

// ─── IMAGE URL RESOLVER ───────────────────────────────────────────────────────
const imgurl = import.meta.env.VITE_IMAGE_PATH;
const imgUrl = (image) => {
  if (!image) return '';
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  if (image.startsWith('storage/')) return `/${image}`;
  return `${imgurl}/${image}`;
};

// ─── PLACEHOLDER IMAGE ────────────────────────────────────────────────────────
const PlaceholderImg = ({ src, alt = '', className = '' }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);

  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center bg-[#f0ede8] text-[#c5bdb4]`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.4" className="opacity-40">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M7 8h10M7 12h6M7 16h4"/>
          <rect x="13" y="11" width="4" height="4" rx="0.5"/>
        </svg>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
};

// ─── SINGLE SIDEBAR ITEM ──────────────────────────────────────────────────────
const SidebarItem = ({ story, index }) => {
  // category label — server sends cat_name for pivot rows, category for direct rows
  const categoryLabel = story.cat_name || story.category || 'समाचार';
  const catColor      = getCatColor(categoryLabel);
  const isTop3        = index < 3;

  // title — server sends heading
  const title = story.heading || story.title || '';

  // image — resolve bare filename through imgUrl
  const resolvedImage = imgUrl(story.image);

  // time — server sends published_at or created_at
  const time = formatNepaliDate(story.published_at || story.created_at || story.time);

  return (
    <Link href={`/news/${story.slug || story.id}`} className="block group">
      <div className="flex items-start gap-3 px-4 py-3 hover:bg-[#faf8f6] transition-colors duration-150">

        {/* Rank number */}
        <div className="flex-shrink-0 w-7 text-center pt-0.5">
          <span
            className="text-[1.1rem] font-black leading-none"
            style={{ color: isTop3 ? catColor : '#d4cfc8' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Category + title + time */}
        <div className="flex-1 min-w-0">
          <span
            className="inline-block text-[0.65rem] font-bold tracking-wider uppercase px-1.5 py-[2px] mb-1.5 rounded-sm"
            style={{ background: catColor, color: '#fff' }}
          >
            {categoryLabel}
          </span>
          <h4 className="text-[0.88rem] font-semibold leading-[1.4] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-2">
            {title}
          </h4>
          <p className="flex items-center gap-1 mt-1.5 text-[0.72rem] text-[#b0a89e]">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {time}
          </p>
        </div>

        {/* Thumbnail */}
        <div className="flex-shrink-0 w-[62px] h-[50px] overflow-hidden rounded-md">
          <PlaceholderImg
            src={resolvedImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.07]"
          />
        </div>

      </div>
    </Link>
  );
};

// ─── RIGHT SIDEBAR COMPONENT ──────────────────────────────────────────────────
const RightSidebar = ({ stories = [], count = 5 }) => {
  // Data comes from server via Inertia props — no axios, no loading state needed
  return (
    <aside className="flex flex-col gap-4 w-full">

      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="w-[3px] h-5 rounded-full bg-[#8B0000]" />
        <h2 className="text-[0.82rem] font-black text-[#1c1711] tracking-[0.12em] uppercase">
          ताजा समाचार
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[rgba(139,0,0,0.2)] to-transparent" />
      </div>

      {/* Stories list */}
      <div className="bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden rounded-md">
        {stories.length > 0 ? (
          stories.slice(0, count).map((story, i) => (
            <div
              key={story.id}
              className={i < stories.length - 1 ? 'border-b border-[rgba(0,0,0,0.055)]' : ''}
            >
              <SidebarItem story={story} index={i} />
            </div>
          ))
        ) : (
          <div className="px-4 py-8 text-center text-[0.85rem] text-[#b0a89e]">
            समाचार उपलब्ध छैन
          </div>
        )}
      </div>

      {/* Ad banner */}
      <BannerStrip />

    </aside>
  );
};

export default RightSidebar;