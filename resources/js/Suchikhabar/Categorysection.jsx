import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@inertiajs/react';
import SidebarBanner from '@/Ads/Sidebarbanner';
import axios from 'axios';

// ─── CLOCK ICON ───────────────────────────────────────────────────────────────
const ClockIcon = () => (
  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader = ({ name, color, route }) => (
  <div className="flex items-center justify-between mb-0">
    <div className="flex items-center gap-0">
      <div className="w-[4px] h-6 rounded-sm mr-2.5 flex-shrink-0" style={{ background: color }} />
      <h2
        className="text-[1rem] font-black tracking-wide uppercase"
        style={{ color, fontFamily: "'Noto Serif Devanagari', Georgia, serif" }}
      >
        {name}
      </h2>
    </div>
    <Link
      href={route}
      className="text-[0.68rem] font-bold px-2.5 py-0.5 border transition-all duration-150 hover:text-white"
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
  <Link href={`/news/${story.slug || story.id}`}>
    <article className="group bg-white border border-[rgba(0,0,0,0.08)] overflow-hidden hover:border-[rgba(0,0,0,0.18)] transition-colors cursor-pointer h-full flex flex-col">
      <div className="relative overflow-hidden" style={{ paddingBottom: '58%' }}>
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=Image+Not+Available'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: color }} />
      </div>
      <div className="p-2.5 flex flex-col flex-1">
        <h3
          className="text-[0.9rem] sm:text-[1.56rem] font-bold leading-[1.4] text-[#1a1510] group-hover:text-[#8B0000] transition-colors line-clamp-3 flex-1"
          style={{ fontFamily: "'Noto Serif Devanagari', Georgia, serif" }}
        >
          {story.title}
        </h3>
        <p className="text-[0.66rem] text-[#b0a498] mt-1.5 flex items-center gap-1">
          <ClockIcon />{story.time || 'भर्खरै'}
        </p>
      </div>
    </article>
  </Link>
);

// ─── LIST CARD ────────────────────────────────────────────────────────────────
const ListCard = ({ story, color }) => (
  <Link href={`/news/${story.slug || story.id}`}>
    <article className="group flex gap-2.5 bg-white border border-[rgba(0,0,0,0.08)] overflow-hidden hover:border-[rgba(0,0,0,0.18)] transition-colors cursor-pointer my-4">
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 98, minHeight: 92 }}>
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300?text=No+Image'; }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: color }} />
      </div>
      <div className="flex flex-col justify-between my-2 pr-2.5 flex-1 min-w-0">
        <h3
          className="text-[0.82rem] sm:text-[1.36rem] font-semibold leading-[1.42] text-[#1a1510] group-hover:text-[#8B0000] transition-colors line-clamp-2"
          style={{ fontFamily: "'Noto Serif Devanagari', Georgia, serif" }}
        >
          {story.title}
        </h3>
        <p className="text-[0.64rem] text-[#b0a498] mt-1 flex items-center gap-1">
          <ClockIcon />{story.time || 'भर्खरै'}
        </p>
      </div>
    </article>
  </Link>
);

// ─── INTERLEAVED BANNER ───────────────────────────────────────────────────────
const InlineBanner = ({ banner }) => {
  if (!banner) return null;
  return (
    <div className="w-full flex justify-center my-3">
      {banner.link ? (
        <a href={banner.link} target="_blank" rel="noopener noreferrer" className="block w-full">
          <img
            src={banner.image}
            alt="Advertisement"
            className="w-full h-full object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </a>
      ) : (
        <img
          src={banner.image}
          alt="Advertisement"
          className="w-full h-full object-contain"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      )}
    </div>
  );
};

// ─── CATEGORY BLOCK ───────────────────────────────────────────────────────────
const CategoryBlock = ({ category }) => {
  if (!category.news || category.news.length === 0) return null;
  const [featured, ...rest] = category.news;
  return (
    <div className="mb-5">
      <div className="pb-2 mb-2.5 border-b-2" style={{ borderColor: category.color }}>
        <SectionHeader name={category.name} color={category.color} route={category.route} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] gap-2">
        {featured && <FeaturedCard story={featured} color={category.color} />}
        <div className="flex flex-col gap-2">
          {rest.map((story) => (
            <ListCard key={story.id} story={story} color={category.color} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN CATEGORY SECTION WITH SIDEBAR ───────────────────────────────────────
const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Hooks now correctly inside the component
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Re-measure left column height whenever categories update
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
      console.error('Error fetching data:', err);
      setError('Failed to load news categories');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-white py-4">
        <div className="px-4 md:px-6 lg:px-24">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-4">
        <div className="px-4 md:px-6 lg:px-24">
          <div className="text-center py-12 text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="bg-white py-4">
        <div className="px-4 md:px-6 lg:px-24">
          <div className="text-center py-12 text-gray-500">कुनै समाचार उपलब्ध छैन</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4">
      <div className="px-4 md:px-6 lg:px-24">
        {/* ✅ Single flex row — duplicate wrapper removed */}
        <div className="flex gap-4 items-start">

          {/* LEFT: Category blocks interleaved with banners */}
          <div className="flex-1 min-w-0" ref={leftRef}>
            {categories.map((cat, i) => (
              <React.Fragment key={cat.name}>
                {banners.length > 0 && (
                  <InlineBanner banner={banners[i % banners.length]} />
                )}
                <CategoryBlock category={cat} />
                {i < categories.length - 1 && (
                  <div className="h-px bg-[rgba(0,0,0,0.07)] mb-5" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* RIGHT: Sidebar capped to left column height */}
          <aside
            className="hidden lg:block w-[320px] flex-shrink-0 overflow-hidden"
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