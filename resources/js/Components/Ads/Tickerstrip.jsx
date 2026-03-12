import React from 'react';

// ─── TICKER ITEMS ─────────────────────────────────────────────────────────────
// Replace or extend this array with your real breaking news headlines.
const TICKER_ITEMS = [
  'नेपाल सरकारले नयाँ आर्थिक नीति सार्वजनिक गर्यो',
  'काठमाडौंमा आज भारी वर्षाको सम्भावना',
  'राष्ट्रिय क्रिकेट टिमले एसिया कपमा जित हासिल गर्यो',
  'नेपालमा विदेशी लगानी बढ्दो क्रममा',
  'संसद अधिवेशन आउँदो सोमबारबाट सुरु हुने',
  'नेपाल राष्ट्र बैंकले ब्याजदर घटायो',
];

// ─── TICKER STRIP ─────────────────────────────────────────────────────────────
const TickerStrip = () => {
  // Triple the items so translateX(-33.333%) always snaps back to
  // identical content — the strip is visible from frame 0, no blank gap.
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

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
          animation: ticker-scroll 20s linear infinite;
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