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

// ── Placeholder when no banners available ─────────────────────────────────────
const LeaderboardPlaceholder = () => (
  <div
    className="w-full max-w-[728px] h-[90px] border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 dark:text-gray-500"
  >
    <span className="text-sm">Advertisement</span>
  </div>
);
const imgurl = import.meta.env.VITE_IMAGE_PATH;

// ── Individual banner item ────────────────────────────────────────────────────
const LeaderboardItem = ({ banner }) => (
  <a
    href={banner.link || '#'}
    target={banner.link ? '_blank' : '_self'}
    rel="noopener noreferrer"
    className="block w-full max-w-[898px] h-[90px] overflow-hidden transition-all duration-150 shadow-sm"
  >
    <img
      src={`${imgurl}/${banner.image}`}
      alt={banner.alt_text || "विज्ञापन"}
      className="w-full h-full object-cover object-center block"
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

  return (
    <div className="px-4 md:px-6 lg:px-12 py-2.5 sm:py-4 flex flex-col items-center gap-2">
      {loading ? (
        <LeaderboardPlaceholder />
      ) : banners.length > 0 ? (
        banners.slice(0, 1).map(banner => (
          <LeaderboardItem key={banner.id} banner={banner} />
        ))
      ) : (
        <LeaderboardPlaceholder />
      )}
    </div>
  );
};

export default LeaderboardBanner;