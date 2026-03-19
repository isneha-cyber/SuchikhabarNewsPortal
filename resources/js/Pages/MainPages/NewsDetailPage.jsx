// import React, { useState, useRef, useEffect } from 'react';
// import { Link, Head } from '@inertiajs/react';
// import BannerStrip from '@/Ads/BannerStrip';
// import Navbar from '@/Suchikhabar/Navbar';
// import Footer from '@/Suchikhabar/Footer';
// import LeaderboardBanner from '@/Ads/LeaderboardBanner';
// import SidebarBanner from '@/Ads/SidebarBanner';
// import NepaliDate from "nepali-date-converter";
// // ─── ICONS ───────────────────────────────────────────────────────────────────
// const ClockIcon = ({ size = 11 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
//   </svg>
// );
// const EyeIcon = ({ size = 11 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
//   </svg>
// );
// const UserIcon = ({ size = 11 }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
//   </svg>
// );
// const ShareIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
//     <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
//   </svg>
// );
// const toNepaliDigits = (num) => {
//   const nepaliNums = ['०','१','२','३','४','५','६','७','८','९'];
//   return String(num).split('').map(d => nepaliNums[d] ?? d).join('');
// };

// const getNepaliDate = (dateString) => {
//   if (!dateString) return 'नयाँ';

//   try {
//     const date = new Date(dateString);
//     const nepaliDate = new NepaliDate(date);

//     const nepaliMonths = [
//       "वैशाख","जेठ","असार","साउन","भदौ","असोज",
//       "कार्तिक","मंसिर","पुष","माघ","फागुन","चैत्र"
//     ];

//     const nepaliWeekdays = [
//       "आइतबार","सोमबार","मङ्गलबार",
//       "बुधबार","बिहिबार","शुक्रबार","शनिबार"
//     ];

//     const day = toNepaliDigits(nepaliDate.getDate());
//     const month = nepaliMonths[nepaliDate.getMonth()];
//     const year = toNepaliDigits(nepaliDate.getYear());
//     const weekday = nepaliWeekdays[date.getDay()];

//     return `${day} ${month} ${year}, ${weekday}`;

//   } catch {
//     return 'मिति उपलब्ध छैन';
//   }
// };

// // ─── HELPER FUNCTIONS ────────────────────────────────────────────────────────
// const stripHtml = (html) => {
//   if (!html) return '';
//   const tmp = document.createElement('DIV');
//   tmp.innerHTML = html;
//   return tmp.textContent || tmp.innerText || '';
// };

// // Custom function to format date in Nepali
// const formatNepaliDate = (dateString) => {
//   if (!dateString) return 'मिति उपलब्ध छैन';
  
//   const date = new Date(dateString);
  
//   // Nepali month names
//   const nepaliMonths = [
//     'जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन',
//     'जुलाई', 'अगष्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'
//   ];
  
//   // Nepali weekday names
//   const nepaliWeekdays = [
//     'आइतबार', 'सोमबार', 'मङ्गलबार', 'बुधबार', 
//     'बिहिबार', 'शुक्रबार', 'शनिबार'
//   ];
  
//   const year = date.getFullYear();
//   const month = nepaliMonths[date.getMonth()];
//   const day = date.getDate();
//   const weekday = nepaliWeekdays[date.getDay()];
  
//   return `${weekday}, ${month} ${day}, ${year}`;
// };

// // Alternative using Intl with fallback
// const formatDate = (dateString) => {
//   if (!dateString) return 'मिति उपलब्ध छैन';
  
//   try {
//     // Try using Intl.DateTimeFormat with Nepali locale
//     return new Date(dateString).toLocaleDateString('ne-NP', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       weekday: 'long'
//     });
//   } catch (error) {
//     // Fallback to custom formatting if Nepali locale fails
//     return formatNepaliDate(dateString);
//   }
// };

// const timeAgo = (dateString) => {
//   if (!dateString) return 'नयाँ';
  
//   const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
  
//   // Nepali time ago strings
//   if (diff < 60) return 'अहिले';
//   if (diff < 3600) return `${Math.floor(diff / 60)} मिनेट अघि`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)} घण्टा अघि`;
//   if (diff < 2592000) return `${Math.floor(diff / 86400)} दिन अघि`;
//   if (diff < 31536000) return `${Math.floor(diff / 2592000)} महिना अघि`;
//   return `${Math.floor(diff / 31536000)} वर्ष अघि`;
// };

// // Convert English numbers to Nepali numbers (optional)
// const convertToNepaliNumbers = (text) => {
//   const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
//   return text.replace(/\d/g, (digit) => nepaliDigits[parseInt(digit)]);
// };

// // If you want dates with Nepali digits as well, use this instead of formatDate
// const formatDateWithNepaliDigits = (dateString) => {
//   if (!dateString) return 'मिति उपलब्ध छैन';
  
//   try {
//     const formatted = new Date(dateString).toLocaleDateString('ne-NP', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       weekday: 'long'
//     });
//     return convertToNepaliNumbers(formatted);
//   } catch (error) {
//     const formatted = formatNepaliDate(dateString);
//     return convertToNepaliNumbers(formatted);
//   }
// };
// // ─── CATEGORY COLORS ─────────────────────────────────────────────────────────
// const CATEGORY_COLORS = {
//   'मुख्य': '#8B0000', 'समाचार': '#1c3f6e', 'अर्थतन्त्र': '#1a6b3c',
//   'अर्थ': '#1a6b3c', 'अन्तर्राष्ट्रिय': '#00649b', 'खेलकुद': '#b8860b',
//   'मनोरञ्जन': '#9d174d', 'कृषि': '#3d6b1a', 'स्वास्थ्य': '#b91c1c',
//   'धार्मिक': '#7c3d12', 'विचार': '#374151', 'प्रवास': '#006B8B', 'प्रदेश': '#B85C00',
// };
// const getCategoryColor = (name) => CATEGORY_COLORS[name] || '#8B0000';

// // ─── TRANSFORM FUNCTIONS ─────────────────────────────────────────────────────
// const transformArticle = (item) => ({
//   id: item.id,
//   title: item.heading || item.title || '',
//   slug: item.slug || String(item.id),
//   image: item.image ? `/storage/${item.image}` : null,
//   image_caption: item.image_caption || '',

//   published_at: getNepaliDate(item.published_at),

//   updated_at: timeAgo(item.updated_at || item.published_at),
//   author: { name: item.blog_by || 'समाचार टोली', avatar: null },
//   views: item.views || 0,
//   content: item.description || '<p>सामग्री उपलब्ध छैन</p>',
//   category: {
//     name: item.category || 'सामान्य',
//     slug: item.category ? item.category.toLowerCase().replace(/[^\w]/g,'-') : 'general',
//     color: getCategoryColor(item.category),
//   },
// });

// const transformRelated = (item) => ({
//   id:       item.id,
//   title:    item.heading || item.title || '',
//   slug:     item.slug || String(item.id),
//   image:    item.image ? `/storage/${item.image}` : null,
//   time:     timeAgo(item.published_at),
//   category: { name: item.category || 'सामान्य', color: getCategoryColor(item.category) },
// });

// // ─── SOCIAL SHARE BUTTONS ────────────────────────────────────────────────────
// const SocialShare = ({ title }) => {
//   const encoded = encodeURIComponent(title);
//   const url     = encodeURIComponent(window?.location?.href || '');
//   return (
//     <div className="flex items-center gap-2 flex-wrap">
//       <span className="text-[0.8rem] text-[#8a7f75] font-medium flex items-center gap-1.5 mr-1">
//         <ShareIcon /> सेयर गर्नुहोस्:
//       </span>
//       {[
//         { label: 'Facebook', bg: '#1877f2', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
//         { label: 'Twitter',  bg: '#1da1f2', href: `https://twitter.com/intent/tweet?text=${encoded}&url=${url}` },
//         { label: 'WhatsApp', bg: '#25d366', href: `https://wa.me/?text=${encoded}%20${url}` },
//       ].map(s => (
//         <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
//            className="text-white text-[0.75rem] font-bold px-3 py-1.5 transition-opacity hover:opacity-80"
//            style={{ background: s.bg }}>
//           {s.label}
//         </a>
//       ))}
//     </div>
//   );
// };

// // ─── RELATED CARD ────────────────────────────────────────────────────────────
// const RelatedCard = ({ story }) => (
//   <Link href={`/news/${story.slug}`}>
//     <article className="group flex gap-3 bg-white border rounded-md border-[rgba(0,0,0,0.08)] overflow-hidden
//                         hover:border-[rgba(0,0,0,0.2)] transition-colors cursor-pointer">
//       <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 90, minHeight: 70 }}>
//         {story.image ? (
//           <img src={story.image} alt={story.title}
//                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]" />
//         ) : (
//           <div className="absolute inset-0 bg-[#e8e4df]" />
//         )}
//         <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: story.category.color }} />
//       </div>
//       <div className="flex flex-col justify-between py-2 pr-2 flex-1 min-w-0">
//         <h4 className="text-[1.15rem] font-semibold leading-[1.4] text-[#1a1510] group-hover:text-[#8B0000] transition-colors line-clamp-2"
//             >
//           {story.title}
//         </h4>
//         <p className="text-[0.7rem] text-[#b0a498] mt-1 flex items-center gap-1">
//           <ClockIcon size={9} />{story.time}
//         </p>
//       </div>
//     </article>
//   </Link>
// );

// // ─── NEWS DETAIL PAGE ─────────────────────────────────────────────────────────
// const NewsDetailPage = ({ article, related = [], slug, ads = {} }) => {
//   const [copied, setCopied] = useState(false);

//   // ✅ Measure left column, cap sidebar to same height
//   const mainRef   = useRef(null);
//   const [mainHeight, setMainHeight] = useState(null);

//   useEffect(() => {
//     if (!mainRef.current) return;
//     const observer = new ResizeObserver(() => {
//       setMainHeight(mainRef.current?.offsetHeight ?? null);
//     });
//     observer.observe(mainRef.current);
//     return () => observer.disconnect();
//   }, [article]); // re-measure when article changes

//   const transformedArticle = article ? transformArticle(article) : null;
//   const transformedRelated = Array.isArray(related) ? related.map(transformRelated) : [];

//   if (!transformedArticle) {
//     return (
//       <>
//         <Head title="समाचार फेला परेन" />
//         <BannerStrip />
//         <Navbar />
//         <div className="bg-[#f5f4f0] min-h-screen py-20">
//           <div className="max-w-7xl mx-auto px-3 text-center">
//             <h2 className="text-2xl font-bold text-[#8B0000] mb-4">समाचार फेला परेन</h2>
//             <Link href="/" className="text-[#8B0000] underline">गृहपृष्ठमा फर्कनुहोस्</Link>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const handleCopy = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <>
//       <Head title={transformedArticle.title} />
//       <Navbar />

//       {/* Top leaderboard banner */}
//       <div className="bg-white border-b border-[rgba(0,0,0,0.07)] ">
//         <div className="max-w-7xl mx-auto px-3 md:px-5 py-3 flex items-center justify-center">
//           <LeaderboardBanner />
//         </div>
//       </div>

//       <div className="bg-white min-h-screen py-4">
//         <div className="px-3 md:px-24">

//           {/* Breadcrumb */}
//           <nav className="flex items-center gap-1.5 text-[0.8rem] text-[#b0a498] mb-3">
//             <Link href="/" className="hover:text-[#8B0000] transition-colors">गृहपृष्ठ</Link>
//             <span>/</span>
//             <Link href={`/category/${transformedArticle.category.slug}`}
//                   className="hover:text-[#8B0000] transition-colors"
//                   style={{ color: transformedArticle.category.color }}>
//               {transformedArticle.category.name}
//             </Link>
//             <span>/</span>
//             <span className="text-[#8a7f75] truncate max-w-[200px] md:max-w-[400px]">
//               {transformedArticle.title.slice(0, 40)}…
//             </span>
//           </nav>

//           {/* ── MAIN LAYOUT ── */}
//           <div className="flex gap-5 items-start">

//             {/* LEFT: ARTICLE CONTENT */}
//             <main className="flex-1 min-w-0 flex flex-col gap-4" ref={mainRef}>

//               <article className="bg-white border  rounded-md border-[rgba(0,0,0,0.08)]">

//                 {/* Category tag + title */}
//                 <div className="px-4 md:px-6 pt-5 pb-0">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-[0.75rem] font-black uppercase px-2 py-0.5 text-white tracking-wider"
//                           style={{ background: transformedArticle.category.color }}>
//                       {transformedArticle.category.name}
//                     </span>
//                     <span className="text-[0.8rem] text-[#b0a498]">{transformedArticle.published_at}</span>
//                   </div>

//                   <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold leading-[1.35] text-[#1a1510] mb-4"
//                       >
//                     {transformedArticle.title}
//                   </h2>

//                   {/* Meta row */}
//                   <div className="flex flex-wrap items-center justify-between gap-3 pb-3
//                                   border-b border-[rgba(0,0,0,0.07)]">
//                     <div className="flex items-center gap-4 text-[0.8rem] text-[#8a7f75]">
//                       <span className="flex items-center gap-1.5"><UserIcon size={12} />{transformedArticle.author.name}</span>
//                       <span className="flex items-center gap-1.5"><ClockIcon size={12} />{transformedArticle.updated_at}</span>
//                       <span className="flex items-center gap-1.5"><EyeIcon size={12} />{transformedArticle.views.toLocaleString()}</span>
//                     </div>
//                     <button onClick={handleCopy}
//                             className="text-[0.75rem] font-bold px-3 py-1.5 border border-[rgba(0,0,0,0.15)]
//                                        hover:bg-[#f0ede8] transition-colors text-[#6b5f55]">
//                       {copied ? '✓ कपी भयो' : 'लिंक कपी'}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Hero image */}
//                 {transformedArticle.image && (
//                   <div className="relative mt-4 mx-4 md:mx-6 overflow-hidden rounded-md">
//                     <img src={transformedArticle.image} alt={transformedArticle.title}
//                          className="w-full h-auto block" style={{ maxHeight: 500, objectFit: 'cover' }} />
//                     {transformedArticle.image_caption && (
//                       <p className="text-[0.8rem] text-[#8a7f75] mt-1.5 italic">{transformedArticle.image_caption}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Body content */}
//                 <div className="px-4 md:px-6 py-5 prose prose-lg max-w-none text-[1.1rem] text-[#2d2520] leading-[1.85]"
                    
//                      dangerouslySetInnerHTML={{ __html: transformedArticle.content }} />

//                 {/* Social share */}
//                 <div className="px-4 md:px-6 py-4 border-t border-[rgba(0,0,0,0.07)] bg-[#faf8f5]">
//                   <SocialShare title={transformedArticle.title} />
//                 </div>

//                 {/* Tags */}
//                 {transformedArticle.tags?.length > 0 && (
//                   <div className="px-4 md:px-6 py-3 border-t border-[rgba(0,0,0,0.07)] flex flex-wrap gap-2">
//                     <span className="text-[0.8rem] text-[#8a7f75] font-medium">ट्यागहरू:</span>
//                     {transformedArticle.tags.map(tag => (
//                       <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}
//                             className="text-[0.75rem] px-2 py-0.5 bg-[#f0ede8] border border-[rgba(0,0,0,0.1)]
//                                        text-[#6b5f55] hover:bg-[#8B0000] hover:text-white hover:border-[#8B0000]
//                                        transition-all duration-150">
//                         #{tag}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </article>

//               {/* Related articles */}
//               {transformedRelated.length > 0 && (
//                 <div>
//                   <div className="flex items-center gap-2.5 pb-2 mb-3 border-b-2 border-[#8B0000]">
//                     <div className="w-[4px] h-5 bg-[#8B0000] rounded-sm" />
//                     <h2 className="text-[0.9rem] font-black uppercase tracking-wide text-[#8B0000]"
//                         >
//                       सम्बन्धित समाचार
//                     </h2>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                     {transformedRelated.map(s => <RelatedCard key={s.id} story={s} />)}
//                   </div>
//                 </div>
//               )}

//             </main>

//             {/* RIGHT: SIDEBAR — capped to left column height */}
//             <aside
//               className="hidden lg:flex flex-col gap-3 w-[268px] flex-shrink-0 overflow-hidden"
//               style={{ maxHeight: mainHeight ? `${mainHeight}px` : 'none' }}
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-[0.7rem] font-black tracking-[0.18em] uppercase text-[#c0b8b0]">
//                   विज्ञापन
//                 </span>
//               </div>

//               <SidebarBanner />

//               {transformedRelated.length > 0 && (
//                 <>
//                   <div className="flex items-center gap-2 mt-1">
//                     <span className="text-[0.7rem] font-black tracking-[0.18em] uppercase text-[#c0b8b0]">
//                       थप समाचार
//                     </span>
//                     <div className="flex-1 h-px bg-[rgba(0,0,0,0.1)]" />
//                   </div>
//                   {transformedRelated.slice(0, 3).map(s => <RelatedCard key={`sb-${s.id}`} story={s} />)}
//                 </>
//               )}
//             </aside>

//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default NewsDetailPage;


import React, { useState, useRef, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';
import BannerStrip from '@/Ads/BannerStrip';
import Navbar from '@/Suchikhabar/Navbar';
import Footer from '@/Suchikhabar/Footer';
import LeaderboardBanner from '@/Ads/LeaderboardBanner';
import SidebarBanner from '@/Ads/SidebarBanner';
import NepaliDate from "nepali-date-converter";

// ─── ICONS ───────────────────────────────────────────────────────────────────
const ClockIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
  </svg>
);
const EyeIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const UserIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const ShareIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);

// ─── PLACEHOLDER IMAGE ────────────────────────────────────────────────────────
// Handles both missing src (null/undefined/"") and broken URLs.
// Renders a warm grey box with a newspaper icon — no layout shift.
const PlaceholderImg = ({ src, alt = '', className = '', style = {} }) => {
  const [failed, setFailed] = useState(!src);


  useEffect(() => { setFailed(!src); }, [src]);

  if (failed) {
    return (
      <div
        className={`${className} flex flex-col items-center justify-center bg-[#ede9e4] text-[#c5bdb4]`}
        style={style}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
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
      onError={() => setFailed(true)}
    />
  );
};
const imgurl = import.meta.env.VITE_IMAGE_PATH;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
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

const timeAgo = (dateString) => {
  if (!dateString) return 'नयाँ';
  const diff = Math.floor((Date.now() - new Date(dateString)) / 1000);
  if (diff < 60)       return 'अहिले';
  if (diff < 3600)     return `${Math.floor(diff / 60)} मिनेट अघि`;
  if (diff < 86400)    return `${Math.floor(diff / 3600)} घण्टा अघि`;
  if (diff < 2592000)  return `${Math.floor(diff / 86400)} दिन अघि`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} महिना अघि`;
  return `${Math.floor(diff / 31536000)} वर्ष अघि`;
};

// ─── CATEGORY COLORS ─────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  'मुख्य': '#8B0000', 'समाचार': '#1c3f6e', 'अर्थतन्त्र': '#1a6b3c',
  'अर्थ': '#1a6b3c', 'अन्तर्राष्ट्रिय': '#00649b', 'खेलकुद': '#b8860b',
  'मनोरञ्जन': '#9d174d', 'कृषि': '#3d6b1a', 'स्वास्थ्य': '#b91c1c',
  'धार्मिक': '#7c3d12', 'विचार': '#374151', 'प्रवास': '#006B8B', 'प्रदेश': '#B85C00',
};
const getCategoryColor = (name) => CATEGORY_COLORS[name] || '#8B0000';

// ─── TRANSFORM FUNCTIONS ─────────────────────────────────────────────────────
// const transformArticle = (item) => ({
//   id:            item.id,
//   title:         item.heading || item.title || '',
//   slug:          item.slug || String(item.id),
//   image:         item.image ? `/storage/${item.image}` : '',  // '' → PlaceholderImg shows immediately
//   image_caption: item.image_caption || '',
//   published_at:  getNepaliDate(item.published_at),
//   updated_at:    timeAgo(item.updated_at || item.published_at),
//   author:        { name: item.blog_by || 'समाचार टोली', avatar: null },
//   views:         item.views || 0,
//   content:       item.description || '<p>सामग्री उपलब्ध छैन</p>',
//   category: {
//     name:  item.category || 'सामान्य',
//     slug:  item.category ? item.category.toLowerCase().replace(/[^\w]/g, '-') : 'general',
//     color: getCategoryColor(item.category),
//   },
// });

// const transformRelated = (item) => ({
//   id:       item.id,
//   title:    item.heading || item.title || '',
//   slug:     item.slug || String(item.id),
//   image:    item.image ? `/storage/${item.image}` : '',       // '' → PlaceholderImg shows immediately
//   time:     timeAgo(item.published_at),
//   category: { name: item.category || 'सामान्य', color: getCategoryColor(item.category) },
// });

// ─── TRANSFORM FUNCTIONS ─────────────────────────────────────────────────────
const transformArticle = (item, type = 'news') => {
  // Handle Heading model
  if (type === 'heading') {
    return {
      id: item.id,
      title: item.title || item.heading || '',
      slug: item.slug || String(item.id),
      image: item.image ? `${imgurl}/${item.image}` : '',
      image_caption: item.image_caption || '',
      published_at: getNepaliDate(item.published_at),
      updated_at: timeAgo(item.updated_at || item.published_at),
      author: { 
        name: item.author || item.blog_by || 'समाचार टोली', 
        avatar: null 
      },
      views: item.views || 0,
      content: item.content || item.description || '<p>सामग्री उपलब्ध छैन</p>',
      // Category handling for heading
      category: item.category 
        ? {
            name: item.category,
            slug: item.category.toLowerCase().replace(/[^\w]/g, '-'),
            color: getCategoryColor(item.category),
          }
        : {
            name: 'सामान्य',
            slug: 'general',
            color: '#8B0000',
          },
      tags: item.tags || [],
    };
  }
  
  // Handle News model (with pivot category logic from controller)
  // Log the item to see what categories look like
  // console.log('News item categories:', item.categories);
  
  // Determine category based on controller logic
  let categoryName = 'सामान्य';
  let categorySlug = 'general';
  
  // Priority 1: Direct category field
  if (item.category) {
    categoryName = item.category;
    categorySlug = item.category.toLowerCase().replace(/[^\w]/g, '-');
  }
  // Priority 2: Pivot categories (from article_category table)
  else if (item.categories && item.categories.length > 0) {
    // Get the first category from the pivot
    const firstCategory = item.categories[0];
    categoryName = firstCategory.name || firstCategory;
    categorySlug = firstCategory.slug || (firstCategory.name ? firstCategory.name.toLowerCase().replace(/[^\w]/g, '-') : 'general');
  }
  
  return {
    id: item.id,
    title: item.heading || item.title || '',
    slug: item.slug || String(item.id),
    image: item.image ? `${imgurl}/${item.image}` : '',
    image_caption: item.image_caption || '',
    published_at: getNepaliDate(item.published_at),
    updated_at: timeAgo(item.updated_at || item.published_at),
    author: { 
      name: item.blog_by || 'समाचार टोली', 
      avatar: null 
    },
    views: item.views || 0,
    content: item.description || '<p>सामग्री उपलब्ध छैन</p>',
    category: {
      name: categoryName,
      slug: categorySlug,
      color: getCategoryColor(categoryName),
    },
    tags: item.tags || [],
    // Include raw categories for debugging (optional)
    _rawCategories: item.categories,
  };
};

const transformRelated = (item, type = 'news') => {
  // Determine category for related items
  let categoryName = 'सामान्य';
  
  if (item.category) {
    categoryName = item.category;
  } else if (item.categories && item.categories.length > 0) {
    const firstCategory = item.categories[0];
    categoryName = firstCategory.name || firstCategory;
  }
  
  return {
    id: item.id,
    title: item.heading || item.title || '',
    slug: item.slug || String(item.id),
    image: item.image ? `${imgurl}/${item.image}` : '',
    time: timeAgo(item.published_at),
    category: { 
      name: categoryName,
      color: getCategoryColor(categoryName),
    },
  };
};

// ─── SOCIAL SHARE BUTTONS ────────────────────────────────────────────────────
const SocialShare = ({ title }) => {
  const encoded = encodeURIComponent(title);
  const url     = encodeURIComponent(window?.location?.href || '');
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-[0.8rem] text-[#8a7f75] font-medium flex items-center gap-1.5 mr-1">
        <ShareIcon /> सेयर गर्नुहोस्:
      </span>
      {[
        { label: 'Facebook', bg: '#1877f2', href: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
        { label: 'Twitter',  bg: '#1da1f2', href: `https://twitter.com/intent/tweet?text=${encoded}&url=${url}` },
        { label: 'WhatsApp', bg: '#25d366', href: `https://wa.me/?text=${encoded}%20${url}` },
      ].map(s => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
           className="text-white text-[0.75rem] font-bold px-3 py-1.5 transition-opacity hover:opacity-80"
           style={{ background: s.bg }}>
          {s.label}
        </a>
      ))}
    </div>
  );
};

// ─── RELATED CARD ────────────────────────────────────────────────────────────
const RelatedCard = ({ story }) => (
  <Link href={`/news/${story.slug}`}>
    <article className="group flex gap-3 bg-white border rounded-md border-[rgba(0,0,0,0.08)] overflow-hidden
                        hover:border-[rgba(0,0,0,0.2)] transition-colors cursor-pointer">
      {/* Thumbnail — always rendered, placeholder if no image */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ width: 90, minHeight: 70 }}>
        <PlaceholderImg
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: story.category.color }} />
      </div>
      <div className="flex flex-col justify-between py-2 pr-2 flex-1 min-w-0">
        <h4 className="text-[1.15rem] font-semibold leading-[1.4] text-[#1a1510] group-hover:text-[#8B0000] transition-colors line-clamp-2">
          {story.title}
        </h4>
        <p className="text-[0.7rem] text-[#b0a498] mt-1 flex items-center gap-1">
          <ClockIcon size={9} />{story.time}
        </p>
      </div>
    </article>
  </Link>
);

// ─── NEWS DETAIL PAGE ─────────────────────────────────────────────────────────
const NewsDetailPage = ({ article, related = [], slug, ads = {} }) => {
  const [copied, setCopied] = useState(false);

  const mainRef = useRef(null);
  const [mainHeight, setMainHeight] = useState(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const observer = new ResizeObserver(() => {
      setMainHeight(mainRef.current?.offsetHeight ?? null);
    });
    observer.observe(mainRef.current);
    return () => observer.disconnect();
  }, [article]);

  const transformedArticle = article ? transformArticle(article) : null;
  const transformedRelated = Array.isArray(related) ? related.map(transformRelated) : [];

  if (!transformedArticle) {
    return (
      <>
        <Head title="समाचार फेला परेन" />
        <BannerStrip />
        <Navbar />
        <div className="bg-[#f5f4f0] min-h-screen py-20">
          <div className="max-w-7xl mx-auto px-3 text-center">
            <h2 className="text-2xl font-bold text-[#8B0000] mb-4">समाचार फेला परेन</h2>
            <Link href="/" className="text-[#8B0000] underline">गृहपृष्ठमा फर्कनुहोस्</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head title={transformedArticle.title} />
      <Navbar />

      {/* Top leaderboard banner */}
      <div className="bg-white border-b border-[rgba(0,0,0,0.07)]">
        <div className="max-w-7xl mx-auto px-3 md:px-5 py-3 flex items-center justify-center">
          <LeaderboardBanner />
        </div>
      </div>

      <div className="bg-white min-h-screen py-4">
        <div className="px-3 md:px-24">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[0.8rem] text-[#b0a498] mb-3">
            <Link href="/" className="hover:text-[#8B0000] transition-colors">गृहपृष्ठ</Link>
            <span>/</span>
            <Link href={`/category/${transformedArticle.category.slug}`}
                  className="hover:text-[#8B0000] transition-colors"
                  style={{ color: transformedArticle.category.color }}>
              {transformedArticle.category.name}
            </Link>
            <span>/</span>
            <span className="text-[#8a7f75] truncate max-w-[200px] md:max-w-[400px]">
              {transformedArticle.title.slice(0, 40)}…
            </span>
          </nav>

          {/* ── MAIN LAYOUT ── */}
          <div className="flex gap-5 items-start">

            {/* LEFT: ARTICLE CONTENT */}
            <main className="flex-1 min-w-0 flex flex-col gap-4" ref={mainRef}>
              <article className="bg-white border rounded-md border-[rgba(0,0,0,0.08)]">

                {/* Category tag + title */}
                <div className="px-4 md:px-6 pt-5 pb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[0.75rem] font-black uppercase px-2 py-0.5 text-white tracking-wider"
                          style={{ background: transformedArticle.category.color }}>
                      {transformedArticle.category.name}
                    </span>
                    <span className="text-[0.8rem] text-[#b0a498]">{transformedArticle.published_at}</span>
                  </div>

                  <h2 className="text-[1.8rem] md:text-[2.2rem] font-extrabold leading-[1.35] text-[#1a1510] mb-4">
                    {transformedArticle.title}
                  </h2>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3
                                  border-b border-[rgba(0,0,0,0.07)]">
                    <div className="flex items-center gap-4 text-[0.8rem] text-[#8a7f75]">
                      <span className="flex items-center gap-1.5"><UserIcon size={12} />{transformedArticle.author.name}</span>
                      <span className="flex items-center gap-1.5"><ClockIcon size={12} />{transformedArticle.updated_at}</span>
                      <span className="flex items-center gap-1.5"><EyeIcon size={12} />{transformedArticle.views.toLocaleString()}</span>
                    </div>
                    <button onClick={handleCopy}
                            className="text-[0.75rem] font-bold px-3 py-1.5 border border-[rgba(0,0,0,0.15)]
                                       hover:bg-[#f0ede8] transition-colors text-[#6b5f55]">
                      {copied ? '✓ कपी भयो' : 'लिंक कपी'}
                    </button>
                  </div>
                </div>

                {/* Hero image — always rendered, placeholder if no image */}
                <div className="relative mt-4 mx-4 md:mx-6 overflow-hidden rounded-md"
                     style={{ minHeight: transformedArticle.image ? 'auto' : 220 }}>
                  <PlaceholderImg
                    src={transformedArticle.image}
                    alt={transformedArticle.title}
                    className="w-full block"
                    style={{
                      maxHeight: 500,
                      objectFit: 'cover',
                      // When no image, fill the minHeight container
                      height: transformedArticle.image ? 'auto' : '100%',
                      minHeight: transformedArticle.image ? 'unset' : 220,
                    }}
                  />
                  {transformedArticle.image_caption && (
                    <p className="text-[0.8rem] text-[#8a7f75] mt-1.5 italic">
                      {transformedArticle.image_caption}
                    </p>
                  )}
                </div>

                {/* Body content */}
                <div className="px-4 md:px-6 py-5 prose prose-lg max-w-none text-[1.1rem] text-[#2d2520] leading-[1.85]"
                     dangerouslySetInnerHTML={{ __html: transformedArticle.content }} />

                {/* Social share */}
                <div className="px-4 md:px-6 py-4 border-t border-[rgba(0,0,0,0.07)] bg-[#faf8f5]">
                  <SocialShare title={transformedArticle.title} />
                </div>

                {/* Tags */}
                {transformedArticle.tags?.length > 0 && (
                  <div className="px-4 md:px-6 py-3 border-t border-[rgba(0,0,0,0.07)] flex flex-wrap gap-2">
                    <span className="text-[0.8rem] text-[#8a7f75] font-medium">ट्यागहरू:</span>
                    {transformedArticle.tags.map(tag => (
                      <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`}
                            className="text-[0.75rem] px-2 py-0.5 bg-[#f0ede8] border border-[rgba(0,0,0,0.1)]
                                       text-[#6b5f55] hover:bg-[#8B0000] hover:text-white hover:border-[#8B0000]
                                       transition-all duration-150">
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>

              {/* Related articles */}
              {transformedRelated.length > 0 && (
                <div>
                  <div className="flex items-center gap-2.5 pb-2 mb-3 border-b-2 border-[#8B0000]">
                    <div className="w-[4px] h-5 bg-[#8B0000] rounded-sm" />
                    <h2 className="text-[0.9rem] font-black uppercase tracking-wide text-[#8B0000]">
                      सम्बन्धित समाचार
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {transformedRelated.map(s => <RelatedCard key={s.id} story={s} />)}
                  </div>
                </div>
              )}
            </main>

            {/* RIGHT: SIDEBAR */}
            <aside
              className="hidden lg:flex flex-col gap-3 w-[268px] flex-shrink-0 overflow-hidden"
              style={{ maxHeight: mainHeight ? `${mainHeight}px` : 'none' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-[0.7rem] font-black tracking-[0.18em] uppercase text-[#c0b8b0]">
                  विज्ञापन
                </span>
              </div>

              <SidebarBanner />

              {transformedRelated.length > 0 && (
                <>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[0.7rem] font-black tracking-[0.18em] uppercase text-[#c0b8b0]">
                      थप समाचार
                    </span>
                    <div className="flex-1 h-px bg-[rgba(0,0,0,0.1)]" />
                  </div>
                  {transformedRelated.slice(0, 3).map(s => <RelatedCard key={`sb-${s.id}`} story={s} />)}
                </>
              )}
            </aside>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default NewsDetailPage;