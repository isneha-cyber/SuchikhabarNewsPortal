// resources/js/Pages/Suchikhabar/HamroTeam.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '@/Suchikhabar/Navbar';
import Footer from '@/Suchikhabar/Footer';
import SEO from '@/Components/SEO'; // Import the SEO component

const SkeletonCard = () => (
  <div className="flex flex-col items-center gap-3 p-6 animate-pulse">
    <div className="w-20 h-20 rounded-full bg-[#e8e4df]" />
    <div className="h-4 w-32 bg-[#e8e4df] rounded" />
    <div className="h-3 w-24 bg-[#f0ede9] rounded" />
  </div>
);

const MemberCard = ({ member, index }) => {
  const isEven = index % 2 === 0;
  return (
    <div
      className="group relative flex flex-col items-center text-center p-6 border border-[rgba(0,0,0,0.07)] bg-white
                 hover:border-[#00649b] transition-all duration-300 hover:shadow-md"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-300"
        style={{ background: isEven ? '#00649b' : '#8B0000' }}
      />
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 flex-shrink-0 text-white text-[1.2rem] font-black tracking-wide"
        style={{ background: isEven ? '#00649b' : '#8B0000' }}
      >
        {member.name?.charAt(0)?.toUpperCase() || '?'}
      </div>
      <h3 className="text-[0.95rem] font-bold text-[#1a1510] leading-tight mb-1 group-hover:text-[#00649b] transition-colors">
        {member.name}
      </h3>
      <p className="text-[0.72rem] font-semibold tracking-wider uppercase text-[#8a7f75]">
        {member.designation}
      </p>
    </div>
  );
};

const HamroTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch('/team', { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setTeam(json.success && Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // SEO Data
  const seoData = {
    title: "Shuchikhabar | हाम्रो टिम",
    description: "Shuchikhabar मा हाम्रो टिमका सदस्यहरू पढ्नुहोस्। राजनीति, खेलकुद, मनोरञ्जन र व्यवसाय।",
    keywords: "समाचार, टिम, पत्रकार, कर्मचारी, शुचिखबर टिम",
    canonical: "https://shuchikhabar.com/team",
  };

  return (
    <>
      <SEO {...seoData} />
      
      <Navbar />

      <section className="bg-white py-12 px-4 md:px-6 lg:px-24">
        <h2 className="text-[1.6rem] font-black mb-6">हाम्रो टोली</h2>

        {loading && <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(5)].map((_, i) => <SkeletonCard key={i} />)}
        </div>}

        {error && !loading && <p className="text-red-600">{error}</p>}

        {!loading && !error && team.length === 0 && <p>कुनै सदस्य उपलब्ध छैन</p>}

        {!loading && !error && team.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {team.map((member, i) => <MemberCard key={member.id} member={member} index={i} />)}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default HamroTeam;