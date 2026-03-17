import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios or use fetch

// ─── TICKER STRIP ─────────────────────────────────────────────────────────────
const TickerStrip = () => {
  const [newsTitles, setNewsTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch latest news titles
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        // Using your existing route '/ournews' which returns paginated news
        const response = await axios.get('/ournews');
        
        if (response.data.status && response.data.data) {
          // Extract headings from the first 6 news items
          const titles = response.data.data.data
            .slice(0, 6)
            .map(news => news.heading);
          
          setNewsTitles(titles);
        } else {
          // Fallback to empty array if no data
          setNewsTitles([]);
        }
      } catch (err) {
        console.error('Error fetching news titles:', err);
        setError('Failed to load news');
        // Fallback to empty array on error
        setNewsTitles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
    
    // Optional: Refresh every 5 minutes
    const interval = setInterval(fetchLatestNews, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Use fetched titles or fallback to static data if empty
  const displayTitles = newsTitles.length > 0 
    ? newsTitles 
    : [
        'नेपाल सरकारले नयाँ आर्थिक नीति सार्वजनिक गर्यो',
        'काठमाडौंमा आज भारी वर्षाको सम्भावना',
        'राष्ट्रिय क्रिकेट टिमले एसिया कपमा जित हासिल गर्यो',
        'नेपालमा विदेशी लगानी बढ्दो क्रममा',
        'संसद अधिवेशन आउँदो सोमबारबाट सुरु हुने',
        'नेपाल राष्ट्र बैंकले ब्याजदर घटायो',
      ];

  // Triple the items so translateX(-33.333%) always snaps back to
  // identical content — the strip is visible from frame 0, no blank gap.
  const repeated = [...displayTitles, ...displayTitles, ...displayTitles];

  // If loading, show a simple loading state
  if (loading) {
    return (
      <div className="w-full bg-[#8B0000] flex items-center h-[30px] sm:h-[34px]">
        <div className="flex-shrink-0 h-full flex items-center px-3 sm:px-4 bg-[#6b0000]">
          <span className="text-[0.52rem] sm:text-[0.6rem] font-bold tracking-[0.16em] uppercase text-white">
            ब्रेकिंग
          </span>
        </div>
        <div className="flex-1 px-4">
          <span className="text-white/70 text-[0.62rem]">लोड हुँदैछ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#8B0000] flex items-center overflow-hidden h-[30px] sm:h-[34px]">
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .ticker-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          /* width must exceed the viewport so the loop is seamless */
          width: max-content;
          animation: ticker-scroll 70s linear infinite;
          will-change: transform;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ── BREAKING label badge ── */}
      <div className="flex-shrink-0 h-full flex items-center px-3 sm:px-4 bg-[#6b0000] border-r border-white/10 z-10">
        <span className="text-[0.52rem] sm:text-[0.6rem] font-bold tracking-[0.16em] uppercase text-white whitespace-nowrap select-none">
          ब्रेकिंग
        </span>
      </div>

      {/* ── Scrolling track ── */}
      <div className="flex-1 overflow-hidden relative">
        {/* Fade edges for a polished look */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#8B0000] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#8B0000] to-transparent z-10 pointer-events-none" />

        <div className="ticker-track">
          {repeated.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-5 text-[0.62rem] sm:text-[0.68rem] text-white/90 cursor-default"
            >
              {/* Gold bullet separator */}
              <span className="w-[5px] h-[5px] rounded-full bg-[#c9a84c] flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TickerStrip;