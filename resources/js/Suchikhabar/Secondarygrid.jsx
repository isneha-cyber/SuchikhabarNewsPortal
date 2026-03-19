

import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import NepaliDate from 'nepali-date-converter';
import parse from 'html-react-parser';

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
      <div className={`${className} flex flex-col items-center justify-center bg-[#f0ede8] text-[#c5bdb4]`}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.3" className="opacity-40">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M7 8h10M7 12h6M7 16h4"/>
          <rect x="13" y="11" width="4" height="4" rx="0.5"/>
        </svg>
        <span className="text-[0.6rem] mt-1.5 tracking-wide opacity-50">तस्वीर उपलब्ध छैन</span>
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
};

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white border rounded-md border-[rgba(0,0,0,0.07)] overflow-hidden flex flex-col shadow-sm animate-pulse">
    <div className="aspect-[16/10] bg-[#f0ede8] flex-shrink-0" />
    <div className="p-4 flex flex-col gap-3">
      <div className="h-4 bg-[#f0ede8] rounded w-full" />
      <div className="h-4 bg-[#f0ede8] rounded w-4/5" />
      <div className="h-3 bg-[#f0ede8] rounded w-1/3 mt-2" />
    </div>
  </div>
);

// ─── SINGLE SECONDARY CARD ────────────────────────────────────────────────────
const SecondaryCard = ({ story }) => {
  // category label — server sends cat_name for pivot rows, category for direct rows
  const categoryLabel = story.cat_name || story.category || 'समाचार';
  const catColor      = getCatColor(categoryLabel);

  // title — server sends heading
  const title = story.heading || story.title || '';

  // image — resolve bare filename through imgUrl
  const resolvedImage = imgUrl(story.image);

  // time — server sends published_at or created_at
  const time = formatNepaliDate(story.published_at || story.created_at || story.time);

  // description — strip HTML tags and truncate
  const getPlainTextDescription = () => {
    if (!story.description) return null;
    
    // Create a temporary DOM element to parse HTML and get text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = story.description;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    return textContent.length > 140 
      ? textContent.slice(0, 140) + '…' 
      : textContent;
  };

  const plainTextDescription = getPlainTextDescription();

  return (
    <div
      onClick={() => router.visit(`/news/${story.slug || story.id}`)}
      className="block group h-full cursor-pointer"
    >
      <div className="bg-white border rounded-md border-[rgba(0,0,0,0.07)] overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">

        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10] flex-shrink-0 rounded-md">
          <PlaceholderImg
            src={resolvedImage}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-block font-bold tracking-wide uppercase text-[0.78rem] px-3 py-1"
              style={{ background: catColor, color: '#fff' }}
            >
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-[1.08rem] font-semibold leading-[1.55] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-3 flex-1">
            {title}
          </h3>
          
          {plainTextDescription && (
            <p className="text-[0.82rem] text-[#6b6460] leading-[1.5] mt-2 line-clamp-2">
              {plainTextDescription}
            </p>
          )}
          
          <p className="text-[0.82rem] text-[#a09488] mt-3 flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {time}
          </p>
        </div>

      </div>
    </div>
  );
};

// ─── SECONDARY GRID COMPONENT ─────────────────────────────────────────────────
const SecondaryGrid = ({ stories = [] }) => {
  if (stories.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      {stories.slice(0, 3).map((story) => (
        <SecondaryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default SecondaryGrid;