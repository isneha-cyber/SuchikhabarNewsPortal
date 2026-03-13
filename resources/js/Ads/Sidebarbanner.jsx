/**
 * SidebarBanner
 * ─────────────
 * Fetches Square and Rectangle banners from GET /api/banner and renders them
 * as stacked sidebar advertisement blocks with appropriate dimensions.
 * Square: 268px width, auto height
 * Rectangle: 268px width, fixed height for rectangular format
 *
 * Usage:
 *   import SidebarBanner from '@/Banners/SidebarBanner';
 *   <SidebarBanner />
 */

import React, { useEffect, useState } from 'react';

// ── Skeleton while loading ────────────────────────────────────────────────────
const SidebarSkeleton = () => (
  <>
    {[0, 1, 2].map(i => (
      <div
        key={i}
        className="w-full bg-[#ece9e4] animate-pulse rounded-sm"
        style={{ height: i === 1 ? 200 : 260 }} // Mixed heights for variety
      />
    ))}
  </>
);

// ── Empty placeholder when no banners in DB ────────────────────────────────────
const SidebarPlaceholder = ({ index }) => {
  // Alternate between square and rectangle placeholder heights
  const height = index % 2 === 0 ? 260 : 200;
  
  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-1
                 bg-white border border-dashed border-[rgba(0,0,0,0.1)]"
      style={{ height }}
    >
      <span className="text-[0.6rem] font-black tracking-[0.2em] uppercase text-[#c0b8b0]">
        विज्ञापन
      </span>
      <span className="text-[0.56rem] text-[#d4d0cb]">
        {index % 2 === 0 ? '२६८ × २६०' : '२६८ × २००'}
      </span>
    </div>
  );
};

// ── Single banner item with dynamic styling based on category ─────────────────
const SidebarItem = ({ banner }) => {
  // Apply different height for rectangle banners
  const isRectangle = banner.category === 'Rectangle';
  
  return (
    <a
      href={banner.link || '#'}
      target={banner.link ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="block w-full overflow-hidden
                 border border-[rgba(0,0,0,0.08)]
                 hover:border-[rgba(0,0,0,0.2)] hover:opacity-95
                 transition-all duration-150"
    >
      <img
        src={banner.image}
        alt="विज्ञापन"
        className="w-full block object-cover"
        style={{ 
          height: isRectangle ? '200px' : 'auto',
          maxHeight: isRectangle ? '200px' : 'none'
        }}
        onError={(e) => {
          e.currentTarget.closest('a').style.display = 'none';
        }}
      />
    </a>
  );
};

// ── Category section separator ───────────────────────────────────────────────
const CategorySeparator = ({ category }) => (
  <div className="flex items-center gap-2 my-1">
    <span className="text-[0.58rem] font-black tracking-[0.22em] uppercase text-[#c8c2bb]">
      {category === 'Rectangle' ? '' : ''}
    </span>
    <div className="flex-1 h-px bg-[rgba(0,0,0,0.09)]" />
  </div>
);

// ── Main export ───────────────────────────────────────────────────────────────
const SidebarBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Separate banners by category
  const squareBanners = banners.filter(b => b.category === 'Square');
  const rectangleBanners = banners.filter(b => b.category === 'Rectangle');
  const hasBanners = squareBanners.length > 0 || rectangleBanners.length > 0;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        
       const response = await fetch('/banner', { 
  headers: { Accept: 'application/json' },
  cache: 'no-store'
});
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (json.success && Array.isArray(json.data)) {
          // Filter to only Square and Rectangle categories
          const filteredBanners = json.data.filter(b => 
            b.category === 'Square' || b.category === 'Rectangle'
          );
          setBanners(filteredBanners);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setError(err.message);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Function to render banner sections
  const renderBannerSections = () => {
    const sections = [];

    // Rectangle banners section
    if (rectangleBanners.length > 0) {
      sections.push(
        <React.Fragment key="rectangle-section">
          <CategorySeparator category="Rectangle" />
          {rectangleBanners.map(banner => (
            <SidebarItem key={`rect-${banner.id}`} banner={banner} />
          ))}
        </React.Fragment>
      );
    }

    // Square banners section
    if (squareBanners.length > 0) {
      sections.push(
        <React.Fragment key="square-section">
          <CategorySeparator category="Square" />
          {squareBanners.map(banner => (
            <SidebarItem key={`square-${banner.id}`} banner={banner} />
          ))}
        </React.Fragment>
      );
    }

    return sections;
  };

  return (
    <div className="flex flex-col gap-3">

     
      {/* Error state */}
      {error && !loading && (
        <div className="text-xs text-red-500 p-2 bg-red-50 rounded">
          Error loading banners: {error}
        </div>
      )}

      {/* Content */}
      {loading ? (
        <SidebarSkeleton />
      ) : hasBanners ? (
        renderBannerSections()
      ) : (
        // Show 3 placeholder slots when no banners exist
        [0, 1, 2].map(i => (
          <SidebarPlaceholder key={i} index={i} />
        ))
      )}

      {/* Optional: Debug info (remove in production) */}
      {/* {process.env.NODE_ENV === 'development' && !loading && (
        <div className="text-[0.5rem] text-gray-400 mt-2 p-1 border-t border-gray-200">
          Banners: {banners.length} (Square: {squareBanners.length}, Rectangle: {rectangleBanners.length})
        </div>
      )} */}

    </div>
  );
};

export default SidebarBanner;