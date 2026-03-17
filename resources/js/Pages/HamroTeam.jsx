import Footer from '@/Suchikhabar/Footer';
import Navbar from '@/Suchikhabar/Navbar';
import React, { useState, useEffect } from 'react';

// ─── SKELETON CARD ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="flex flex-col items-center gap-3 p-6 animate-pulse">
    <div className="w-20 h-20 rounded-full bg-[#e8e4df]" />
    <div className="h-4 w-32 bg-[#e8e4df] rounded" />
    <div className="h-3 w-24 bg-[#f0ede9] rounded" />
  </div>
);

// ─── SINGLE MEMBER CARD ───────────────────────────────────────────────────────
const MemberCard = ({ member, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className="group relative flex flex-col items-center text-center p-6 border border-[rgba(0,0,0,0.07)] bg-white
                 hover:border-[#00649b] transition-all duration-300 hover:shadow-md"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top accent bar — alternates color */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
        style={{ background: isEven ? '#00649b' : '#8B0000' }}
      />

      {/* Avatar circle */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 flex-shrink-0 text-white text-[1.2rem] font-black tracking-wide"
        style={{ background: isEven ? '#00649b' : '#8B0000' }}
      >
        {member.name?.charAt(0)?.toUpperCase() || '?'}
      </div>

      {/* Name */}
      <h3
        className="text-[0.95rem] font-bold text-[#1a1510] leading-tight mb-1 group-hover:text-[#00649b] transition-colors"
      >
        {member.name}
      </h3>

      {/* Designation */}
      <p className="text-[0.72rem] font-semibold tracking-wider uppercase text-[#8a7f75]">
        {member.designation}
      </p>

      {/* Bottom indicator dot */}
      <div
        className="mt-4 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: isEven ? '#00649b' : '#8B0000' }}
      />
    </div>
  );
};

// ─── MAIN HAMRO TEAM SECTION ──────────────────────────────────────────────────
const HamroTeam = () => {
  const [team,    setTeam]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const res = await fetch('/team', {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setTeam(json.data);
        } else {
          setTeam([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  return (
    <>
    <Navbar/>
    <section className="bg-white py-12 px-4 md:px-6 lg:px-24">

      {/* ── Section Header ── */}
      <div className="mb-10">
        {/* Top rule */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
          <span
            className="text-[0.62rem] font-black tracking-[0.28em] uppercase px-3"
            style={{ color: '#8B0000' }}
          >
            हाम्रो टिम
          </span>
          <div className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-[5px] h-8 rounded-sm" style={{ background: '#00649b' }} />
              <h2
                className="text-[1.6rem] font-black text-[#1a1510] leading-none tracking-tight"
              >
                हाम्रो टोली
              </h2>
            </div>
            <p className="ml-5 text-[0.8rem] text-[#8a7f75]">
              सुचीखबरका समर्पित पत्रकार र कर्मचारीहरू
            </p>
          </div>

          {/* Member count badge */}
          {!loading && team.length > 0 && (
            <span
              className="text-[0.7rem] font-black px-3 py-1.5 text-white tracking-wider"
              style={{ background: '#00649b' }}
            >
              {team.length} सदस्य
            </span>
          )}
        </div>

        {/* Bottom border */}
        <div className="mt-4 h-[2px] bg-gradient-to-r from-[#00649b] via-[#8B0000] to-transparent" />
      </div>

      {/* ── Loading ── */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* ── Error ── */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'rgba(139,0,0,0.08)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B0000" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-[0.85rem] text-[#8B0000] font-semibold mb-1">टिम लोड गर्न समस्या भयो</p>
          <p className="text-[0.75rem] text-[#b0a498]">{error}</p>
        </div>
      )}

      {/* ── Empty ── */}
      {!loading && !error && team.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-[0.85rem] text-[#b0a498]">कुनै सदस्य उपलब्ध छैन</p>
        </div>
      )}

      {/* ── Team Grid ── */}
      {!loading && !error && team.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {team.map((member, i) => (
            <MemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      )}

      {/* ── Bottom divider ── */}
      <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[rgba(0,0,0,0.08)] to-transparent" />

    </section>
    <Footer/>
    </>
  );
};

export default HamroTeam;