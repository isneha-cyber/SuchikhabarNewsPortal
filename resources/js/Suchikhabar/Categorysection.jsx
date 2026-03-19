
import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import SidebarBanner from '@/Ads/Sidebarbanner';
import axios from 'axios';
import NepaliDate from "nepali-date-converter";

// ─── CLOCK ICON ───────────────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const imgurl = import.meta.env.VITE_IMAGE_PATH;

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const toNepaliDigits = (num) => {
  const nepaliNums = ['०','१','२','३','४','५','६','७','८','९'];
  return String(num).split('').map(d => nepaliNums[d] ?? d).join('');
};

const formatNepaliDate = (dateString) => {
  if (!dateString) return "नयाँ";
  try {
    const adDate = new Date(dateString);
    if (isNaN(adDate.getTime())) return "नयाँ";
    const bsDate = new NepaliDate(adDate);
    const months = [
      "बैशाख","जेठ","असार","साउन","भदौ","असोज",
      "कार्तिक","मंसिर","पुष","माघ","फागुन","चैत"
    ];
    return `${toNepaliDigits(bsDate.getYear())} ${months[bsDate.getMonth()]} ${toNepaliDigits(bsDate.getDate())}`;
  } catch {
    return "नयाँ";
  }
};


// ─── PLACEHOLDER IMAGE ────────────────────────────────────────────────────────
const PlaceholderImg = ({ src, alt, className }) => {
  const [failed, setFailed] = useState(!src);
  useEffect(() => { setFailed(!src); }, [src]);

  if (failed) {
    return (
      <div className={`${className} absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-[#f0ede8] text-[#c5bdb4]`}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M7 8h10M7 12h6M7 16h4"/>
          <rect x="13" y="11" width="4" height="4" rx="0.5"/>
        </svg>
        <span className="text-[0.6rem] mt-1.5 tracking-wide opacity-60">तस्वीर उपलब्ध छैन</span>
      </div>
    );
  }

  return (
    <img
      src={`${imgurl}/${src}`}
      alt={alt}
      className={`${className} absolute inset-0 w-full h-full object-cover`}
      onError={() => setFailed(true)}
    />
  );
};

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader = ({ name, color, route }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className="w-[4px] h-6 rounded-sm mr-2.5 flex-shrink-0" style={{ background: color }} />
      <h2 className="text-[1rem] font-black tracking-wide uppercase">{name}</h2>
    </div>
    <Link
      href={route}
      className="text-[0.68rem] font-bold px-2.5 py-0.5 border transition-all duration-150"
      style={{ color, borderColor: color }}
      onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = 'white'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = color; }}
    >
      सबै हेर्नुहोस् →
    </Link>
  </div>



);

// ─── FEATURED CARD ────────────────────────────────────────────────────────────
const FeaturedCard = ({ story, color }) => (
  <Link href={`/news/${story.slug || story.id}`} className="block h-full">
    <article className="group bg-white border rounded-md cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden" style={{ paddingBottom: '58%' }}>
        <PlaceholderImg
          src={story.image}
          alt={story.title}
          className="transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-[0.9rem] sm:text-[1.1rem] font-bold leading-[1.5] text-[#1a1510] group-hover:text-[#8B0000] transition-colors line-clamp-3 flex-1">
          {story.title}
        </h3>
        <p className="text-[0.66rem] text-[#b0a498] mt-2 flex items-center gap-1">
          <ClockIcon />{formatNepaliDate(story.real_time)}
        </p>
      </div>
    </article>
  </Link>
);

// ─── LIST CARD ────────────────────────────────────────────────────────────────
const ListCard = ({ story, color }) => (
  <Link href={`/news/${story.slug || story.id}`} className="block">
    <article className="group flex bg-white rounded-md border border-[rgba(0,0,0,0.08)] overflow-hidden hover:border-[rgba(0,0,0,0.18)] transition-colors cursor-pointer">
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 96, minHeight: 88 }}>
        <PlaceholderImg
          src={story.image}
          alt={story.title}
          className="transition-transform duration-500 group-hover:scale-[1.07]"
        />
      </div>
      <div className="flex flex-col justify-between p-2.5 flex-1 min-w-0">
        <h3 className="text-[0.82rem] sm:text-[0.9rem] font-semibold leading-[1.45] text-[#1a1510] group-hover:text-[#8B0000] transition-colors line-clamp-2">
          {story.title}
        </h3>
        <p className="text-[0.64rem] text-[#b0a498] mt-1.5 flex items-center gap-1">
          <ClockIcon />{formatNepaliDate(story.real_time)}
        </p>
      </div>
    </article>
  </Link>
);

// ─── INLINE BANNER ────────────────────────────────────────────────────────────
// const InlineBanner = ({ banner }) => {
//   if (!banner) return null;
//   return (
//     <div className="w-full my-4 h-[90px] sm:h-[120px] overflow-hidden bg-[#f7f5f3]">
//       {banner.link ? (
//         <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
//           <img src={`${imgurl}/${banner.image}`} alt="Advertisement" className="w-full h-full object-contain"
//             onError={(e) => { e.target.style.display = 'none'; }} />
//         </a>
//       ) : (
//         <img src={`${imgurl}/${banner.image}`} alt="Advertisement" className="w-full h-full object-contain"
//           onError={(e) => { e.target.style.display = 'none'; }} />
//       )}
//     </div>
//   );
// };

const InlineBanner = ({ banner }) => {
  if (!banner) return null;
  return (
    <div className="w-full my-4 bg-[#f7f5f3] flex items-center justify-center">
      {banner.link ? (
        <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full">
          <img src={`${imgurl}/${banner.image}`} alt="Advertisement" className="w-full h-auto object-contain"
            onError={(e) => { e.target.style.display = 'none'; }} />
        </a>
      ) : (
        <img src={`${imgurl}/${banner.image}`} alt="Advertisement" className="w-full h-auto object-contain"
          onError={(e) => { e.target.style.display = 'none'; }} />
      )}
    </div>
  );
};

// ─── CATEGORY BLOCK ───────────────────────────────────────────────────────────
const CategoryBlock = ({ category }) => {
  if (!category.news || category.news.length === 0) return null;
  const [featured, ...rest] = category.news;

  return (
    <div className="mb-6">
      <div className="pb-2 mb-3 border-b-2" style={{ borderColor: category.color }}>
        <SectionHeader name={category.name} color={category.color} route={category.route} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {featured && (
          <div className="h-full">
            <FeaturedCard story={featured} color={category.color} />
          </div>
        )}
        <div className="flex flex-col gap-3">
          {rest.map((story) => (
            <ListCard key={story.id} story={story} color={category.color} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [banners,    setBanners]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);

  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(null);

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (!leftRef.current) return;
    const observer = new ResizeObserver(() => {
      setLeftHeight(leftRef.current?.offsetHeight ?? null);
    });
    observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, [categories]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, bannersRes] = await Promise.all([
        axios.get('/categorized-news'),
        axios.get('/banner'),
      ]);

      // ── DEBUG: remove these console.logs once working ──
      console.log('STATUS:', categoriesRes.data.status);
      console.log('RAW DATA:', categoriesRes.data);
      console.log('CATEGORIES ARRAY:', categoriesRes.data.data);
      console.log('FIRST CATEGORY:', categoriesRes.data.data?.[0]);
      console.log('FIRST NEWS ITEM:', categoriesRes.data.data?.[0]?.news?.[0]);
      // ──────────────────────────────────────────────────

      if (categoriesRes.data.status) {
        setCategories(categoriesRes.data.data);
      } else {
        setError('Failed to load categories');
      }

      if (bannersRes.data.success) {
        const sorted = [...bannersRes.data.data]
          .filter(b => b.category === 'Rectangle')
          .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
        setBanners(sorted);
      }

    } catch (err) {
      console.error('fetchData error:', err);
      setError('Failed to load news categories');
    } finally {
      setLoading(false);
    }
  };

  // ── LOADING ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="bg-white py-6">
        <div className="px-4 md:px-6 lg:px-24">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
          </div>
        </div>
      </section>
    );
  }

  // ── ERROR ─────────────────────────────────────────────────────────────────
  if (error) {
    return (
      <section className="bg-white py-6">
        <div className="px-4 md:px-6 lg:px-24">
          <div className="text-center py-12 text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  // ── EMPTY ─────────────────────────────────────────────────────────────────
  if (categories.length === 0) {
    return (
      <section className="bg-white py-6">
        <div className="px-4 md:px-6 lg:px-24">
          <div className="text-center py-12 text-gray-500">कुनै समाचार उपलब्ध छैन</div>
        </div>
      </section>
    );
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <section className="bg-white py-6">
      <div className="px-4 md:px-6 lg:px-24">
        <div className="flex gap-6 items-start">

          {/* LEFT: category blocks + interleaved banners */}
          <div className="flex-1 min-w-0" ref={leftRef}>
            {categories.map((cat, i) => (
              <React.Fragment key={cat.name}>
                {i > 0 && banners.length > 0 && (
                  <InlineBanner banner={banners[(i - 1) % banners.length]} />
                )}
                <CategoryBlock category={cat} />
                {i < categories.length - 1 && (
                  <div className="h-px bg-[rgba(0,0,0,0.07)] mb-6" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* RIGHT: sidebar */}
          <aside
            className="hidden lg:block w-[300px] flex-shrink-0 overflow-hidden"
            style={{ maxHeight: leftHeight || 'none' }}
          >
            <SidebarBanner />
          </aside>

        </div>
      </div>
    </section>
  );
};

export default CategorySection;