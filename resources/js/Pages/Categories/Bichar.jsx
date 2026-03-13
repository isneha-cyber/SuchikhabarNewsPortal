import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'लोकतन्त्रको संरक्षण गर्न नागरिक समाजको भूमिका अपरिहार्य', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=75', time: '२ घण्टा अघि', author: 'डा. सुरेश आचार्य', views: '३,२१०', excerpt: 'नेपालको राजनीतिक अस्थिरतामा नागरिक समाजले खेल्न सक्ने रचनात्मक भूमिकाबारे विस्तृत विश्लेषण।' },
  { id: 2,  title: 'शिक्षा प्रणालीमा आमूल सुधार किन जरुरी छ?', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=75', time: '४ घण्टा अघि', author: 'प्रा. मीना श्रेष्ठ', excerpt: 'नेपालको शिक्षा क्षेत्रमा देखिएका कमजोरी र सुधारका उपायहरूबारे एक गहन दृष्टिकोण।' },
  { id: 3,  title: 'युवा पलायन रोक्न के गर्नुपर्छ?', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75', time: '५ घण्टा अघि', author: 'राजेन्द्र गुरुङ' },
  { id: 4,  title: 'संघीयताको सफलताका लागि स्थानीय सरकार बलियो बनाउनुपर्छ', image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=75', time: '१ दिन अघि', author: 'नीरा थापा' },
  { id: 5,  title: 'जलवायु संकट र नेपालको जिम्मेवारी', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=75', time: '१ दिन अघि' },
  { id: 6,  title: 'डिजिटल अर्थतन्त्रमा नेपालको सम्भावना', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=75', time: '२ दिन अघि' },
];

const MORE_NEWS = [
  { id: 601, title: 'भ्रष्टाचारविरुद्धको लडाइँ कहाँ पुग्यो?',              time: '३ घण्टा अघि' },
  { id: 602, title: 'मिडियाको स्वतन्त्रता र जिम्मेवारी',                    time: '५ घण्टा अघि' },
  { id: 603, title: 'कृषि क्षेत्रमा लगानी बढाउनु आजको आवश्यकता',           time: '१ दिन अघि'  },
  { id: 604, title: 'नेपाल र भारत सम्बन्ध: चुनौती र अवसर',                  time: '१ दिन अघि'  },
  { id: 605, title: 'महिला नेतृत्वले मात्र देशको काया पलट गर्न सक्छ',       time: '२ दिन अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/news.gif',   alt: 'विज्ञापन', href: '#' },
];

const Bichar = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="विचार"
    color="#374151"
    description="विश्लेषण, टिप्पणी र वैचारिक लेखहरू"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Bichar;