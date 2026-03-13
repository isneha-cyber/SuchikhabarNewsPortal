import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'नेपाली चलचित्र "प्रेम गीत ४" ले बक्स अफिस रेकर्ड तोड्यो', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=75', time: '१ घण्टा अघि', author: 'मनोरञ्जन डेस्क', views: '११,२४०', excerpt: 'नेपाली फिल्म इन्डस्ट्रीको सबैभन्दा चर्चित चलचित्रले पहिलो हप्तामै ऐतिहासिक कमाई गर्यो।' },
  { id: 2,  title: 'लोकप्रिय गायक राजेश पायलको नयाँ एल्बम रिलिज', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=75', time: '३ घण्टा अघि', excerpt: 'प्रसिद्ध गायकको बहुप्रतीक्षित एल्बम आज सार्वजनिक भएको छ, संगीत प्रेमीहरूमा उत्साह।' },
  { id: 3,  title: 'टेलिसिरियल "सासु आमा" ले ५०० एपिसोड पूरा गर्यो', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 4,  title: 'नेपाली कलाकार अन्तर्राष्ट्रिय मञ्चमा, भारतमा पुरस्कार', image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=600&q=75', time: '७ घण्टा अघि' },
  { id: 5,  title: 'युट्युबमा नेपाली संगीत च्यानल ट्रेन्डिङमा', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=75', time: '८ घण्टा अघि' },
  { id: 6,  title: 'नाटक महोत्सवमा दर्शकको उत्साहजनक उपस्थिति', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75', time: '१ दिन अघि' },
];

const MORE_NEWS = [
  { id: 801, title: 'नेपाली ओटिटी प्लेटफर्मले नयाँ सिरिज घोषणा गर्यो',    time: '२ घण्टा अघि' },
  { id: 802, title: 'लोकगीत प्रतियोगितामा बागमती प्रदेश विजयी',             time: '३ घण्टा अघि' },
  { id: 803, title: 'बलिउड तारा नेपाल भ्रमणमा, भव्य स्वागत',                time: '५ घण्टा अघि' },
  { id: 804, title: 'कमेडी शोले सामाजिक सन्देश दिन थाल्यो',                 time: '१ दिन अघि'  },
  { id: 805, title: 'नेपाली म्युजिक भिडियो अन्तर्राष्ट्रिय चार्टमा',        time: '२ दिन अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/drinks.gif', alt: 'विज्ञापन', href: '#' },
];

const Manoranjan = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="मनोरञ्जन"
    color="#9d174d"
    description="चलचित्र, संगीत, टेलिभिजन र कला"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Manoranjan;