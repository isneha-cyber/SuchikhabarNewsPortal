import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const BREAKING_NEWS = [
  'प्रधानमन्त्रीले आज संसदमा विश्वासको मत लिने',
  'काठमाडौंमा भारी वर्षाको चेतावनी जारी',
  'नेपाल क्रिकेट टिम एसिया कपको फाइनलमा',
  'सरकारले इन्धनको मूल्य घटायो',
  'नयाँ शैक्षिक सत्र असारदेखि सुरु हुने',
];

const HERO_STORY = {
  id: 1,
  category: 'मुख्य समाचार',
  title: 'संविधान संशोधनको प्रस्तावमाथि संसदमा व्यापक बहस, सत्तापक्ष र प्रतिपक्षबीच तीव्र विमति',
  excerpt: 'प्रतिनिधिसभाको आजको बैठकमा संविधान संशोधन विधेयकमाथि लामो बहस भयो। सत्तापक्षले संशोधन आवश्यक भएको तर्क गर्दा प्रतिपक्षले कडा विरोध जनाएको छ। बैठक राति सम्म चल्ने अनुमान गरिएको छ।',
  image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=900&q=80',
  time: '२ घण्टा अघि',
  author: 'रामप्रसाद शर्मा',
  views: '१२,४५०',
};

const SECONDARY_STORIES = [
  {
    id: 2,
    category: 'अर्थतन्त्र',
    title: 'राष्ट्र बैंकले ब्याजदर घटाउने संकेत, बजारमा सकारात्मक प्रतिक्रिया',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    time: '१ घण्टा अघि',
  },
  {
    id: 3,
    category: 'खेलकुद',
    title: 'नेपाली फुटबल टिमले भारतलाई हराउँदै साफ च्याम्पियनसिप जित्यो',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
    time: '३ घण्टा अघि',
  },
  {
    id: 4,
    category: 'अन्तर्राष्ट्रिय',
    title: 'संयुक्त राष्ट्रसंघले जलवायु परिवर्तनविरुद्ध नयाँ सन्धिमा हस्ताक्षर गर्यो',
    image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=80',
    time: '४ घण्टा अघि',
  },
  {
    id: 5,
    category: 'समाज',
    title: 'काठमाडौंको यातायात व्यवस्थापनका लागि नयाँ प्रविधि प्रयोग सुरु',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
    time: '५ घण्टा अघि',
  },
];

const SMALL_STORIES = [
  { id: 6,  category: 'राजनीति',   title: 'मन्त्रिपरिषद् बैठकले दश वटा नीतिगत निर्णय गर्यो',                    time: '३० मिनेट अघि' },
  { id: 7,  category: 'प्रदेश',    title: 'लुम्बिनी प्रदेशमा पर्यटन विकासका लागि विशेष कार्यक्रम',              time: '१ घण्टा अघि'  },
  { id: 8,  category: 'स्वास्थ्य', title: 'डेंगुको प्रकोप बढ्दो, स्वास्थ्य मन्त्रालयले सतर्कता अपनाउन आग्रह', time: '२ घण्टा अघि'  },
  { id: 9,  category: 'शिक्षा',    title: 'एसईई परीक्षाको नतिजा असार १५ गते सार्वजनिक हुने',                    time: '३ घण्टा अघि'  },
  { id: 10, category: 'प्रविधि',   title: 'नेपालमा ५जी सेवा विस्तारको तयारी, परीक्षण सफल',                      time: '४ घण्टा अघि'  },
];

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
};

const getCatColor = (cat) => CATEGORY_COLOR[cat] || '#8B0000';

// ─── BREAKING NEWS TICKER ────────────────────────────────────────────────────
// Font: 0.65rem label → 0.8rem | ticker text 0.85rem → 1rem
const BreakingTicker = () => {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % BREAKING_NEWS.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#8B0000] text-white flex items-stretch overflow-hidden">
      {/* Label */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#6a0000] flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        {/* ↑ was 0.65rem */}
        <span className="font-bold tracking-widest text-[0.8rem] uppercase whitespace-nowrap">ब्रेकिङ</span>
      </div>

      {/* Scrolling text */}
      <div className="flex-1 flex items-center px-4 py-2.5 overflow-hidden">
        {/* ↑ was 0.85rem */}
        <span
          className="whitespace-nowrap text-[1rem] transition-all duration-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)' }}
        >
          {BREAKING_NEWS[idx]}
        </span>
      </div>

      {/* Dots */}
      <div className="flex items-center gap-1.5 px-4 flex-shrink-0">
        {BREAKING_NEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{ background: i === idx ? 'white' : 'rgba(255,255,255,0.35)' }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── CATEGORY BADGE ──────────────────────────────────────────────────────────
// small: 0.58rem → 0.72rem | normal: 0.62rem → 0.78rem
const CategoryBadge = ({ category, small = false }) => (
  <span
    className={`inline-block font-bold tracking-wide uppercase ${
      small ? 'text-[0.72rem] px-2 py-0.5' : 'text-[0.78rem] px-2.5 py-1'
    }`}
    style={{ background: getCatColor(category), color: 'white' }}
  >
    {category}
  </span>
);

// ─── HERO SECTION ────────────────────────────────────────────────────────────
const HeroSection = ({
  featuredStory    = HERO_STORY,
  secondaryStories = SECONDARY_STORIES,
  smallStories     = SMALL_STORIES,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <section className="bg-white">

      {/* ── MAIN HERO GRID ── */}
      <div className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

          {/* ── LEFT: Featured + Secondary grid ── */}
          <div className="flex flex-col gap-4">

            {/* FEATURED STORY */}
            <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden group">
              <div className="relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                <img
                  src={featuredStory.image}
                  alt={featuredStory.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  onLoad={() => setImgLoaded(true)}
                  style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.4s, transform 0.7s' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <CategoryBadge category={featuredStory.category} />
                </div>
              </div>

              <div className="p-6 md:p-7 flex flex-col justify-between border-t md:border-t-0 md:border-l border-[rgba(0,0,0,0.07)]">
                <div>
                  <div className="w-8 h-[3px] bg-[#8B0000] mb-4" />
                  <Link href={`/news/${featuredStory.id}`}>
                    {/* ↑ was 1.35rem/1.5rem → now 1.6rem/1.85rem */}
                    <h1
                      className="text-[1.6rem] md:text-[1.85rem] font-bold leading-[1.35] text-[#1c1711] hover:text-[#8B0000] transition-colors cursor-pointer mb-4"
                      style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                    >
                      {featuredStory.title}
                    </h1>
                  </Link>
                  {/* ↑ was 0.88rem → 1rem */}
                  <p className="text-[1rem] text-[#5a5049] leading-relaxed line-clamp-4">
                    {featuredStory.excerpt}
                  </p>
                </div>

                {/* Meta — was 0.7rem → 0.85rem */}
                <div className="mt-5 pt-4 border-t border-[rgba(0,0,0,0.07)] flex items-center justify-between text-[0.85rem] text-[#a09488]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      {featuredStory.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {featuredStory.time}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    {featuredStory.views}
                  </span>
                </div>
              </div>
            </div>

            {/* SECONDARY 4-GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {secondaryStories.map((story) => (
                <Link key={story.id} href={`/news/${story.id}`}>
                  <div className="bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden group cursor-pointer h-full flex flex-col">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                      <div className="absolute top-2 left-2">
                        <CategoryBadge category={story.category} small />
                      </div>
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      {/* ↑ was 0.82rem → 0.95rem */}
                      <h3
                        className="text-[0.95rem] font-semibold leading-[1.45] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-3 flex-1"
                        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                      >
                        {story.title}
                      </h3>
                      {/* ↑ was 0.65rem → 0.78rem */}
                      <p className="text-[0.78rem] text-[#a09488] mt-2 flex items-center gap-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {story.time}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="flex flex-col gap-3">

            {/* Sidebar header — was 0.75rem → 0.9rem */}
            <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-[#8B0000]" />
              <h2 className="text-[0.9rem] font-bold text-[#1c1711] tracking-widest uppercase">ताजा समाचार</h2>
            </div>

            {/* Small stories list */}
            <div className="bg-white border border-[rgba(0,0,0,0.07)] divide-y divide-[rgba(0,0,0,0.06)]">
              {smallStories.map((story, i) => (
                <Link key={story.id} href={`/news/${story.id}`}>
                  <div className="flex items-start gap-3 p-4 group cursor-pointer hover:bg-[#faf9f7] transition-colors">
                    {/* Number — was 1.1rem → 1.3rem */}
                    <span
                      className="text-[1.3rem] font-black leading-none flex-shrink-0 mt-0.5"
                      style={{ color: i < 3 ? '#8B0000' : '#d4cfc8', fontFamily: 'Georgia, serif' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                      <CategoryBadge category={story.category} small />
                      {/* ↑ was 0.82rem → 0.95rem */}
                      <h4
                        className="text-[0.95rem] font-semibold leading-[1.45] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-2"
                        style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
                      >
                        {story.title}
                      </h4>
                      {/* ↑ was 0.62rem → 0.78rem */}
                      <p className="text-[0.78rem] text-[#a09488] flex items-center gap-1">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {story.time}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* ── PROMO / AD IMAGE BOX ── */}
            <div className="w-full bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden">
              <img
                src="/images/hilife.gif"
                alt="advertisement"
                className="w-full h-auto block"
              />
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM DIVIDER ── */}
      <div className="max-w-[1280px] mx-auto px-3 md:px-6 pb-2">
        <div className="h-[1px] bg-gradient-to-r from-[#8B0000] via-[#c9a84c] to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;