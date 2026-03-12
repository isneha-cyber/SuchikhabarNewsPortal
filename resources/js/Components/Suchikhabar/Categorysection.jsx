import React from 'react';
import { Link } from '@inertiajs/react';

// ─── SAMPLE CATEGORY DATA ─────────────────────────────────────────────────────
const CATEGORIES = [
  {
    name: 'राजनीति',
    color: '#8B0000',
    route: '/category/राजनीति',
    news: [
      { id: 11, title: 'प्रधानमन्त्रीले विश्वासको मत पाए, संसदमा बहुमत सिद्ध', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&q=75', time: '१ घण्टा अघि' },
      { id: 12, title: 'विपक्षी दलले सरकारविरुद्ध अविश्वास प्रस्ताव दर्ता गर्ने तयारी', image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=500&q=75', time: '२ घण्टा अघि' },
      { id: 13, title: 'नयाँ मन्त्रिपरिषद् गठनका लागि दलहरूबीच छलफल जारी', image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=500&q=75', time: '३ घण्टा अघि' },
      { id: 14, title: 'प्रदेश सरकारले बजेट पेस गर्दै, विकासमा जोड दिने घोषणा', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=75', time: '४ घण्टा अघि' },
    ],
  },
  {
    name: 'अर्थतन्त्र',
    color: '#1a6b3c',
    route: '/category/अर्थतन्त्र',
    news: [
      { id: 21, title: 'शेयर बजारमा उछाल, नेप्से सूचकांक ३०० बिन्दुले बढ्यो', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=75', time: '३० मिनेट अघि' },
      { id: 22, title: 'राष्ट्र बैंकले रेपो दर घटायो, ऋणको ब्याज सस्तो हुने', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=75', time: '२ घण्टा अघि' },
      { id: 23, title: 'विदेशी लगानी आकर्षणका लागि सरकारले नयाँ नीति ल्याउँदै', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=75', time: '३ घण्टा अघि' },
      { id: 24, title: 'नेपाली रुपैयाँ अमेरिकी डलरसँग मजबुत, विनिमय दर सुधार', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=75', time: '५ घण्टा अघि' },
    ],
  },
  {
    name: 'खेलकुद',
    color: '#c9a84c',
    route: '/category/खेलकुद',
    news: [
      { id: 31, title: 'नेपाली क्रिकेट टिम टी-२० विश्वकपका लागि क्वालिफाइ', image: 'https://images.unsplash.com/photo-1540747913346-19212a4b32a0?w=500&q=75', time: '१ घण्टा अघि' },
      { id: 32, title: 'साफ च्याम्पियनसिपमा नेपालले भारतलाई हरायो', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=75', time: '२ घण्टा अघि' },
      { id: 33, title: 'एथलेटिक्समा नेपालले पहिलो स्वर्ण पदक जित्यो', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&q=75', time: '४ घण्टा अघि' },
      { id: 34, title: 'राष्ट्रिय फुटबल लिग आगामी महिनादेखि सुरु हुने', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=500&q=75', time: '६ घण्टा अघि' },
    ],
  },
  {
    name: 'अन्तर्राष्ट्रिय',
    color: '#00649b',
    route: '/category/अन्तर्राष्ट्रिय',
    news: [
      { id: 41, title: 'संयुक्त राष्ट्रसंघले युद्धविराम घोषणाको आह्वान गर्यो', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=500&q=75', time: '२ घण्टा अघि' },
      { id: 42, title: 'भारत र चीनबीच सीमा विवाद समाधानका लागि वार्ता', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=500&q=75', time: '३ घण्टा अघि' },
      { id: 43, title: 'अमेरिकामा राष्ट्रपति चुनावको मतगणना जारी', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=75', time: '५ घण्टा अघि' },
      { id: 44, title: 'युरोपेली संघले जलवायु परिवर्तनविरुद्ध नयाँ प्याकेज घोषणा', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=500&q=75', time: '७ घण्टा अघि' },
    ],
  },
  {
    name: 'समाज',
    color: '#6b3a8c',
    route: '/category/समाज',
    news: [
      { id: 51, title: 'काठमाडौंमा वायु प्रदूषण खतरनाक स्तरमा, स्वास्थ्य सतर्कता', image: 'https://images.unsplash.com/photo-1536859975388-b5e6623e9223?w=500&q=75', time: '१ घण्टा अघि' },
      { id: 52, title: 'भूकम्प पीडितका लागि पुनर्निर्माण कार्य तीव्र पारिँदै', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&q=75', time: '३ घण्टा अघि' },
      { id: 53, title: 'महिला सशक्तीकरणका लागि नयाँ कार्यक्रम सञ्चालन', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=75', time: '४ घण्टा अघि' },
      { id: 54, title: 'युवा उद्यमीहरूलाई सरकारले अनुदान दिने निर्णय', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=75', time: '६ घण्टा अघि' },
    ],
  },
];

// ─── ADS DATA ─────────────────────────────────────────────────────────────────
const ADS = [
  { id: 1, image: '/images/hilife.gif', alt: 'विज्ञापन १', href: '#' },
  { id: 2, image: '/images/news.gif',   alt: 'विज्ञापन २', href: '#' },
  { id: 3, image: '/images/restro.gif', alt: 'विज्ञापन ३', href: '#' },
  { id: 4, image: '/images/npl.gif',    alt: 'विज्ञापन ४', href: '#' },
  { id: 5, image: '/images/drinks.gif', alt: 'विज्ञापन ५', href: '#' },
];

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
const SectionHeader = ({ name, color, route }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center">
      <div className="w-1.5 h-7 rounded-sm mr-3" style={{ background: color }} />
      <h2
        className="text-[1.15rem] font-black tracking-wide uppercase"
        style={{ color, fontFamily: "'Noto Serif Devanagari', serif" }}
      >
        {name}
      </h2>
    </div>
    <Link
      href={route}
      className="text-[0.78rem] font-semibold px-3 py-1 border transition-all duration-200"
      style={{ color, borderColor: color }}
      onMouseEnter={e => {
        e.currentTarget.style.background = color;
        e.currentTarget.style.color = 'white';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = color;
      }}
    >
      सबै हेर्नुहोस् →
    </Link>
  </div>
);

// ─── NEWS CARD ────────────────────────────────────────────────────────────────
const NewsCard = ({ story, color }) => (
  <Link href={`/news/${story.id}`}>
    <div className="group flex gap-3 bg-white border border-[rgba(0,0,0,0.07)] overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer h-full">
      <div className="relative flex-shrink-0 w-[110px] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          style={{ minHeight: '90px' }}
        />
        <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: color }} />
      </div>
      <div className="flex flex-col justify-between py-2.5 pr-3 flex-1 min-w-0">
        <h3
          className="text-[0.92rem] font-semibold leading-[1.45] text-[#1c1711] group-hover:text-[#8B0000] transition-colors line-clamp-3"
          style={{ fontFamily: "'Noto Serif Devanagari', serif" }}
        >
          {story.title}
        </h3>
        <p className="text-[0.72rem] text-[#a09488] mt-1.5 flex items-center gap-1 flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          {story.time}
        </p>
      </div>
    </div>
  </Link>
);

// ─── CATEGORY BLOCK (2×2) ─────────────────────────────────────────────────────
const CategoryBlock = ({ category }) => (
  <div className="mb-8">
    <div className="h-[2px] mb-4" style={{ background: `linear-gradient(to right, ${category.color}, transparent)` }} />
    <SectionHeader name={category.name} color={category.color} route={category.route} />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {category.news.map(story => (
        <NewsCard key={story.id} story={story} color={category.color} />
      ))}
    </div>
  </div>
);

// ─── MAIN CATEGORY SECTION ────────────────────────────────────────────────────
const CategorySection = ({
  categories = CATEGORIES,
  ads        = ADS,
}) => (
  <section className="bg-white py-6">
    <div className="max-w-7xl mx-auto ">

      
      <div className="flex gap-6 items-start relative">

        {/* ── LEFT: Category blocks ── */}
        <div className="flex-1 min-w-0">
          {categories.map(cat => (
            <CategoryBlock key={cat.name} category={cat} />
          ))}
        </div>

       
        <aside
          className="hidden lg:flex flex-col gap-4 w-[300px] flex-shrink-0 self-start sticky top-[70px]"
        >
          {/* Label */}
          <div className="flex items-center gap-2">
            <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#b0a89e]">
              विज्ञापन
            </span>
            <div className="flex-1 h-[1px] bg-[rgba(0,0,0,0.08)]" />
          </div>

          {/* Ad images */}
          {ads.map((ad) => (
            <a
              key={ad.id}
              href={ad.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white border border-[rgba(0,0,0,0.08)] overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <img
                src={ad.image}
                alt={ad.alt}
                className="w-full h-auto block"
              />
            </a>
          ))}
        </aside>

      </div>
    </div>
  </section>
);

export default CategorySection;