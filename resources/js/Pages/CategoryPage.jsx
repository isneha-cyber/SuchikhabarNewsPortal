



import React, { useRef, useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import Navbar from '@/Suchikhabar/Navbar';
import Footer from '@/Suchikhabar/Footer';
import LeaderboardBanner from '@/Ads/LeaderboardBanner';
import SidebarBanner     from '@/Ads/SidebarBanner';
import NepaliDate from "nepali-date-converter";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);






// ─── PLACEHOLDER IMAGE ────────────────────────────────────────────────────────
// Handles both missing src (null/undefined/"") and broken URLs (404/network error).
// Drop-in replacement for <img> — accepts same className/style props.
const PlaceholderImg = ({ src, alt = '', className = '', style = {}, onLoad }) => {
  const [failed, setFailed] = useState(!src);

  useEffect(() => { setFailed(!src); }, [src]);

  if (failed) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center bg-[#ede9e4] text-[#c5bdb4]`}
        style={style}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.3"
          strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M7 8h10M7 12h6M7 16h4"/>
          <rect x="13" y="11" width="4" height="4" rx="0.5"/>
        </svg>
        <span className="text-[0.58rem] mt-1 tracking-wide opacity-50">तस्वीर छैन</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onLoad={onLoad}
      onError={() => setFailed(true)}
    />
  );
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const toNepaliDigits = (num) => {
  const nepaliNums = ['०','१','२','३','४','५','६','७','८','९'];
  return String(num).split('').map(d => nepaliNums[d] ?? d).join('');
};

const getNepaliDate = (dateString) => {
  if (!dateString) return 'नयाँ';
  try {
    const date = new Date(dateString);
    const nepaliDate = new NepaliDate(date);
    const nepaliMonths = [
      "वैशाख","जेठ","असार","साउन","भदौ","असोज",
      "कार्तिक","मंसिर","पुष","माघ","फागुन","चैत्र"
    ];
    const nepaliWeekdays = [
      "आइतबार","सोमबार","मङ्गलबार",
      "बुधबार","बिहिबार","शुक्रबार","शनिबार"
    ];
    return `${toNepaliDigits(nepaliDate.getDate())} ${nepaliMonths[nepaliDate.getMonth()]} ${toNepaliDigits(nepaliDate.getYear())}, ${nepaliWeekdays[date.getDay()]}`;
  } catch {
    return 'मिति उपलब्ध छैन';
  }
};

const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};

const CATEGORY_COLORS = {
  'मुख्य':            '#8B0000',
  'समाचार':           '#1c3f6e',
  'अर्थतन्त्र':      '#1a6b3c',
  'अर्थ':             '#1a6b3c',
  'अन्तर्राष्ट्रिय': '#00649b',
  'खेलकुद':           '#b8860b',
  'मनोरञ्जन':         '#9d174d',
  'कृषि':             '#3d6b1a',
  'स्वास्थ्य':        '#b91c1c',
  'धार्मिक':          '#7c3d12',
  'विचार':            '#374151',
  'प्रवास':           '#006B8B',
  'प्रदेश':           '#B85C00',
};
const getCategoryColor = (name) => CATEGORY_COLORS[name] || '#8B0000';

const imgurl = import.meta.env.VITE_IMAGE_PATH;

const transformItem = (item) => ({
  id:       item.id,
  title:    item.heading || item.title || '',
  slug:     item.slug || String(item.id),
  image:    item.image ? `${imgurl}/${item.image}` : '',   // '' → PlaceholderImg shows immediately
  time:     item.published_at
              ? getNepaliDate(item.published_at)
              : (item.created_at ? getNepaliDate(item.created_at) : 'नयाँ'),
  author:   item.blog_by || item.author || 'समाचार टोली',
  excerpt:  item.description ? stripHtml(item.description).slice(0, 140) + '…' : '',
  views:    item.views || 0,
  category: item.category || '',
});

// ─── FEATURED CARD ────────────────────────────────────────────────────────────
const FeaturedCard = ({ story, color }) => (
  <Link href={`/news/${story.slug}`}>
    <article className="group bg-white rounded-md border border-[rgba(0,0,0,0.08)] overflow-hidden
                        hover:border-[rgba(0,0,0,0.2)] hover:shadow-sm
                        transition-all duration-200 cursor-pointer flex flex-col h-full">
      <div className="relative overflow-hidden" style={{ paddingBottom: '56%' }}>
        {/* PlaceholderImg fills the same absolute box whether src exists or not */}
        <PlaceholderImg
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover rounded-md
                     transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: color }} />
        <div className="absolute bottom-2 left-2.5 flex items-center gap-1
                        text-white/90 text-[0.63rem] bg-black/45 px-1.5 py-0.5 rounded-sm">
          <ClockIcon />{story.time}
        </div>
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-[1.92rem] font-bold leading-[1.42] text-[#1a1510]
                       group-hover:text-[#8B0000] transition-colors line-clamp-3 flex-1 mb-2">
          {story.title}
        </h3>
        {story.excerpt && (
          <p className="text-[0.95rem] text-[#7a6f65] leading-[1.65] line-clamp-2 mb-2">
            {story.excerpt}
          </p>
        )}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(0,0,0,0.06)]">
          <span className="text-[0.63rem] text-[#b0a498] truncate max-w-[65%]">{story.author}</span>
          {story.views > 0 && (
            <span className="flex items-center gap-1 text-[0.63rem] text-[#b0a498] flex-shrink-0">
              <EyeIcon />{Number(story.views).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  </Link>
);

// ─── LIST CARD ────────────────────────────────────────────────────────────────
const ListCard = ({ story, color }) => (
  <Link href={`/news/${story.slug}`}>
    <article className="group flex bg-white rounded-md border border-[rgba(0,0,0,0.08)] overflow-hidden
                        hover:border-[rgba(0,0,0,0.2)] hover:shadow-sm
                        transition-all duration-200 cursor-pointer">
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 100, minHeight: 80 }}>
        <PlaceholderImg
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-500 group-hover:scale-[1.07]"
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: color }} />
      </div>
      <div className="flex flex-col justify-between py-2.5 px-3 flex-1 min-w-0">
        <h3 className="text-[1.15rem] font-semibold leading-[1.4] text-[#1a1510]
                       group-hover:text-[#8B0000] transition-colors line-clamp-2">
          {story.title}
        </h3>
        <div className="flex items-center justify-between mt-1.5">
          <p className="text-[0.63rem] text-[#b0a498] flex items-center gap-1">
            <ClockIcon />{story.time}
          </p>
          {story.views > 0 && (
            <p className="text-[0.63rem] text-[#b0a498] flex items-center gap-1">
              <EyeIcon />{Number(story.views).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </article>
  </Link>
);

// ─── NUMBERED CARD (sidebar) ──────────────────────────────────────────────────
const NumberedCard = ({ story, index, color }) => (
  <Link href={`/news/${story.slug}`}>
    <article className="group flex items-start gap-2.5 py-2.5 rounded-md
                        border-b border-[rgba(0,0,0,0.06)] last:border-b-0
                        hover:bg-[#faf8f5] transition-colors cursor-pointer px-2">
      <span className="text-[0.95rem] font-black leading-none flex-shrink-0 w-5 text-right mt-0.5"
            style={{ color: index < 3 ? color : '#d4cfc8' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-[0.8rem] font-semibold leading-[1.4] text-[#1a1510]
                       group-hover:text-[#8B0000] transition-colors line-clamp-2">
          {story.title}
        </h4>
        <p className="text-[0.62rem] text-[#b0a498] mt-0.5 flex items-center gap-1">
          <ClockIcon />{story.time}
        </p>
      </div>
    </article>
  </Link>
);

// ─── PAGINATION ───────────────────────────────────────────────────────────────
const Pagination = ({ links, color }) => {
  if (!links || links.length <= 3) return null;

  const prevLink  = links[0];
  const nextLink  = links[links.length - 1];
  const pageLinks = links.slice(1, links.length - 1);
  const firstPage = pageLinks[0];
  const lastPage  = pageLinks[pageLinks.length - 1];

  const activeStyle  = { background: color, color: 'white', borderColor: color };
  const defaultStyle = { borderColor: 'rgba(0,0,0,0.12)', color: '#6b5f55', background: 'white' };

  const NavLink = ({ href, label }) => (
    <Link href={href}
          className="px-3 py-1.5 text-[0.74rem] border font-medium transition-all
                     hover:border-[rgba(0,0,0,0.28)] hover:shadow-sm"
          style={defaultStyle}>
      {label}
    </Link>
  );
  const NavDisabled = ({ label }) => (
    <span className="px-3 py-1.5 text-[0.74rem] border border-[rgba(0,0,0,0.07)]
                     text-[#c0b8b0] cursor-not-allowed bg-white font-medium select-none">
      {label}
    </span>
  );


  

  return (
    <div className="flex items-center justify-center gap-1 pt-4 pb-2 flex-wrap">
      {firstPage?.url && !firstPage?.active
        ? <NavLink href={firstPage.url} label="« पहिलो" />
        : <NavDisabled label="« पहिलो" />}
      {prevLink?.url
        ? <NavLink href={prevLink.url} label="‹ अघिल्लो" />
        : <NavDisabled label="‹ अघिल्लो" />}
      {pageLinks.map((link, i) =>
        link.url ? (
          <Link key={i} href={link.url}
                className="px-3 py-1.5 text-[0.74rem] border transition-all font-medium"
                style={link.active ? activeStyle : defaultStyle}
                dangerouslySetInnerHTML={{ __html: link.label }} />
        ) : (
          <span key={i}
                className="px-2 py-1.5 text-[0.74rem] text-[#c0b8b0] select-none"
                dangerouslySetInnerHTML={{ __html: link.label }} />
        )
      )}
      {nextLink?.url
        ? <NavLink href={nextLink.url} label="अर्को ›" />
        : <NavDisabled label="अर्को ›" />}
      {lastPage?.url && !lastPage?.active
        ? <NavLink href={lastPage.url} label="अन्तिम »" />
        : <NavDisabled label="अन्तिम »" />}
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const CategoryPage = ({ slug, category, news, moreNews }) => {
  const newsData = news?.data || [];
  const moreData = moreNews  || [];

  const categoryName = category?.name        || slug || 'श्रेणी';
  const color        = category?.color       || getCategoryColor(categoryName);
  const description  = category?.description || '';

  const stories = newsData.map(transformItem);
  const [hero, second, third, fourth, ...rest] = stories;
  const initialDisplay = [hero, second, third, fourth].filter(Boolean);

  const sidebarList = moreData.length > 0
    ? moreData.map(transformItem)
    : stories.slice(8, 13);

  const mainRef = useRef(null);
  const [mainHeight, setMainHeight] = useState(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const observer = new ResizeObserver(() => {
      setMainHeight(mainRef.current?.offsetHeight ?? null);
    });
    observer.observe(mainRef.current);
    return () => observer.disconnect();
  }, [stories.length]);


  const siteUrl = "https://shuchikhabar.com"; // change to your domain

const pageTitle = `${categoryName} | Shuchikhabar`;

const metaDescription =
  description ||
  `${categoryName} सम्बन्धी ताजा समाचारहरू Shuchikhabar मा पढ्नुहोस्।`;

const canonicalUrl = `${siteUrl}/category/${slug}`;

  return (
    <>
<Head>
  <title>{pageTitle}</title>

  {/* Meta Description */}
  <meta name="description" content={metaDescription} />

  {/* Canonical URL */}
  <link rel="canonical" href={canonicalUrl} />

  {/* Optional but recommended */}
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:type" content="website" />
</Head>
      <Navbar />

      <div className="bg-white min-h-screen">
        <div className="px-3 md:px-24 py-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[0.72rem] text-[#b0a498] mb-3">
            <Link href="/" className="hover:text-[#8B0000] transition-colors">गृहपृष्ठ</Link>
            <span>/</span>
            <span style={{ color }} className="font-semibold">{categoryName}</span>
          </nav>

          {/* Category header */}
          <div className="mb-4 pb-2.5 border-b-[3px]" style={{ borderColor: color }}>
            <div className="flex items-center gap-3">
              <div className="w-[5px] h-8 rounded-sm flex-shrink-0" style={{ background: color }} />
              <h1 className="text-[1.4rem] md:text-[1.65rem] font-black tracking-wide uppercase leading-none">
                {categoryName}
              </h1>
            </div>
            {description && (
              <p className="text-[0.78rem] text-[#8a7f75] ml-5 mt-1 leading-relaxed">{description}</p>
            )}
          </div>

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="flex gap-5 items-start">

            {/* LEFT: article grid */}
            <main className="flex-1 min-w-0 flex flex-col gap-3" ref={mainRef}>
              {stories.length === 0 ? (
                <div className="bg-white border border-[rgba(0,0,0,0.08)] flex flex-col
                                items-center justify-center py-20 text-center">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed mb-3
                                  flex items-center justify-center"
                       style={{ borderColor: `${color}50` }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                         stroke={color} strokeWidth="1.5" style={{ opacity: 0.5 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </div>
                  <p className="text-[0.85rem] text-[#b0a498] font-medium mb-2">
                    यस विभागमा हाल समाचार छैन
                  </p>
                  <Link href="/" className="text-[0.78rem] font-semibold hover:underline" style={{ color }}>
                    ← गृहपृष्ठमा फर्कनुहोस्
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {initialDisplay.map((story) => (
                      <FeaturedCard key={story.id} story={story} color={color} />
                    ))}
                  </div>

                  <LeaderboardBanner />

                  {rest.length > 0 && (
                    <>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)]" />
                        <span className="text-[0.6rem] font-black tracking-[0.18em] uppercase px-2"
                              style={{ color, opacity: 0.55 }}>अरू समाचार</span>
                        <div className="flex-1 h-px bg-[rgba(0,0,0,0.08)]" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {rest.map(story => (
                          <ListCard key={story.id} story={story} color={color} />
                        ))}
                      </div>
                    </>
                  )}

                  <Pagination links={news?.links} color={color} />
                </>
              )}
            </main>

            {/* RIGHT: Sidebar */}
            <aside
              className="hidden lg:flex flex-col gap-3 flex-shrink-0 overflow-hidden"
              style={{ width: 268, maxHeight: mainHeight ? `${mainHeight}px` : 'none' }}
            >
              {sidebarList.length > 0 && (
                <div className="bg-white border border-[rgba(0,0,0,0.08)] overflow-hidden">
                  <div className="flex items-center gap-2 px-3 py-2.5 border-b-2"
                       style={{ borderColor: color }}>
                    <div className="w-[3px] h-4 rounded-sm flex-shrink-0" style={{ background: color }} />
                    <h2 className="text-[0.76rem] font-black uppercase tracking-[0.12em]" style={{ color }}>
                      थप समाचार
                    </h2>
                  </div>
                  <div>
                    {sidebarList.map((story, i) => (
                      <NumberedCard key={story.id} story={story} index={i} color={color} />
                    ))}
                  </div>
                </div>
              )}
              <SidebarBanner />
            </aside>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CategoryPage;