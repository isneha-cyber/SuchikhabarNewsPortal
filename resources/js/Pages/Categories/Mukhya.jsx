import React from 'react';
import CategoryPage from './CategoryPage';

// ─── PLACEHOLDER DATA — replace with your API/props ──────────────────────────
const NEWS = [
  { id: 1,  title: 'प्रधानमन्त्रीले विश्वासको मत पाए, संसदमा बहुमत सिद्ध', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=75', time: '१ घण्टा अघि', author: 'रामप्रसाद शर्मा', views: '८,२४०', excerpt: 'संसदमा विश्वासको मतको लागि भएको मतदानमा सत्तापक्षले बहुमत प्राप्त गर्यो।' },
  { id: 2,  title: 'मन्त्रिपरिषद् बैठकले दश वटा नीतिगत निर्णय गर्यो', image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=75', time: '२ घण्टा अघि', excerpt: 'मन्त्रिपरिषद्को आजको बैठकमा विभिन्न क्षेत्रमा महत्त्वपूर्ण निर्णयहरू गरियो।' },
  { id: 3,  title: 'नयाँ मन्त्रिपरिषद् गठनका लागि दलहरूबीच छलफल जारी', image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=75', time: '३ घण्टा अघि' },
  { id: 4,  title: 'प्रदेश सरकारले बजेट पेस गर्दै, विकासमा जोड दिने घोषणा', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75', time: '४ घण्टा अघि' },
  { id: 5,  title: 'राष्ट्रपतिले संविधान दिवसमा राष्ट्रलाई सम्बोधन गरे', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 6,  title: 'संसदीय समितिले नयाँ कानुन मस्यौदामा सुझाव दियो', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=75', time: '६ घण्टा अघि' },
];

const MORE_NEWS = [
  { id: 101, title: 'सरकारले नयाँ आर्थिक नीति सार्वजनिक गर्यो',        time: '३० मिनेट अघि' },
  { id: 102, title: 'विपक्षले संसद अवरोध गर्ने चेतावनी दियो',          time: '१ घण्टा अघि'  },
  { id: 103, title: 'राष्ट्रिय सभाको बैठक आज बस्ने',                    time: '२ घण्टा अघि'  },
  { id: 104, title: 'पार्टी एकीकरणका लागि शीर्ष नेताहरू भेटघाट गर्दै', time: '३ घण्टा अघि'  },
  { id: 105, title: 'स्थानीय तहले वार्षिक प्रगति विवरण सार्वजनिक गर्यो', time: '४ घण्टा अघि' },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन',  href: '#' },
  { image: '/images/news.gif',   alt: 'विज्ञापन २', href: '#' },
];

// ─── MUKHYA PAGE ─────────────────────────────────────────────────────────────
const Mukhya = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="मुख्य"
    color="#8B0000"
    description="नेपालका प्रमुख र ताजा समाचारहरू"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Mukhya;