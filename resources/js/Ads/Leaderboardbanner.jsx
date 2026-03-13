/**
 * LeaderboardBanner
 * ─────────────────
 * Fetches Rectangle banners from GET /api/banner and renders them
 * as a top leaderboard strip (max 728px wide, 90px tall).
 *
 * Usage:
 *   import LeaderboardBanner from '@/Banners/LeaderboardBanner';
 *   <LeaderboardBanner />
 */

import React, { useEffect, useState } from 'react';

// ── Skeleton while loading ────────────────────────────────────────────────────
const LeaderboardSkeleton = () => (
  <div
    className="w-full max-w-7xl mx-auto  animate-pulse rounded-sm"
    style={{ height: 90 }}
  />
);

// ── Empty placeholder when no Rectangle banners in DB ────────────────────────
const LeaderboardPlaceholder = () => (
  <div
    className="w-full max-w-[728px] flex flex-col items-center justify-center gap-1
               bg-white border border-dashed border-[rgba(0,0,0,0.1)]"
    style={{ height: 90 }}
  >
    <span className="text-[0.6rem] font-black tracking-[0.2em] uppercase text-[#c0b8b0]">
      विज्ञापन
    </span>
    <span className="text-[0.56rem] text-[#d4d0cb]">७२८ × ९०</span>
  </div>
);

// ── Single Rectangle banner ───────────────────────────────────────────────────
const LeaderboardItem = ({ banner }) => (
  <a
    href={banner.link || '#'}
    target={banner.link ? '_blank' : '_self'}
    rel="noopener noreferrer"
    className="block w-full max-w-[728px] overflow-hidden
               border border-[rgba(0,0,0,0.08)]
               hover:border-[rgba(0,0,0,0.2)] hover:opacity-95
               transition-all duration-150"
    style={{ height: 90 }}
  >
    <img
      src={banner.image}
      alt={banner.alt_text || "विज्ञापन"}
      className="w-full h-full object-cover block"
      loading="lazy"
      onError={(e) => {
        // Hide the parent anchor if image fails to load
        e.currentTarget.closest('a').style.display = 'none';
      }}
    />
  </a>
);

// ── Main export ───────────────────────────────────────────────────────────────
const LeaderboardBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchBanners = async () => {
  try {
    setLoading(true);
    setError(null);
    
    const response = await fetch('/banner', { 
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    
    // Handle the API response structure from your BannerController
    // Your controller returns { success: true, message: '...', data: [...] }
    const allBanners = json?.data && Array.isArray(json.data) ? json.data : [];
    
    // Filter only Rectangle banners for the leaderboard
    const rectangleBanners = allBanners.filter(b => b.category === 'Rectangle');
    
    setBanners(rectangleBanners);
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

  // Don't render anything if there's an error and no banners to show
//   if (error && banners.length === 0) {
//     console.warn('Banner fetch error:', error);
//     return (
//       <div className="]">
//         <div className="max-w-7xl mx-auto px-3 md:px-5 py-2.5 flex flex-col items-center gap-2">
//           <LeaderboardPlaceholder />
//         </div>
//       </div>
//     );
//   }

  return (
    
      <div className="px-24 py-2.5 flex flex-col items-center gap-2">
        {loading ? (
          <LeaderboardSkeleton />
        ) : banners.length > 0 ? (
          // Render all rectangle banners (you might want to limit this)
          banners.slice(0, 3).map(banner => ( // Limit to 3 banners max
            <LeaderboardItem key={banner.id} banner={banner} />
          ))
        ) : (
          <LeaderboardPlaceholder />
        )}
      </div>
   
  );
};

export default LeaderboardBanner;