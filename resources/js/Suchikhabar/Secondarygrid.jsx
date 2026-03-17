import React from 'react';
import { Link } from '@inertiajs/react';

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

// ─── CATEGORY BADGE ───────────────────────────────────────────────────────────
const CategoryBadge = ({ category }) => (
  <span
    className="inline-block font-bold tracking-wide uppercase text-[0.78rem] px-3 py-1"
    style={{ background: getCatColor(category), color: 'white' }}
  >
    {category || 'समाचार'}
  </span>
);

// ─── SINGLE SECONDARY CARD ────────────────────────────────────────────────────
const SecondaryCard = ({ story }) => (
  <Link href={`/news/${story.slug || story.id}`} className="block group h-full">
    <div className="bg-white border rounded-md border-[rgba(0,0,0,0.07)] overflow-hidden h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* Image */}
      <div className="relative overflow-hidden aspect-[16/10] flex-shrink-0 rounded-md">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          onError={(e) => { e.target.src = ''; }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <CategoryBadge category={story.category} />
        </div>
      </div>

      {/* Text */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="text-[1.08rem] font-semibold leading-[1.55] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-3 flex-1"
         
        >
          {story.title}
        </h3>
        {/* Time */}
        <p className="text-[0.82rem] text-[#a09488] mt-3 flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {story.time}
        </p>
      </div>

    </div>
  </Link>
);

// ─── SECONDARY GRID COMPONENT ─────────────────────────────────────────────────
const SecondaryGrid = ({ stories = [] }) => {
  const slots = stories.slice(0, 3);

  if (slots.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
      {slots.map((story) => (
        <SecondaryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default SecondaryGrid;