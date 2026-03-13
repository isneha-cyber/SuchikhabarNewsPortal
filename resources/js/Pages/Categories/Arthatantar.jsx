import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'शेयर बजारमा उछाल, नेप्से सूचकांक ३०० बिन्दुले बढ्यो', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=75', time: '३० मिनेट अघि', author: 'अर्थ डेस्क', views: '४,८९०', excerpt: 'लगानीकर्ताहरूको सकारात्मक मनोबलका कारण आजको कारोबारमा शेयर बजारमा उल्लेखनीय वृद्धि भएको छ।' },
  { id: 2,  title: 'राष्ट्र बैंकले रेपो दर घटायो, ऋणको ब्याज सस्तो हुने', image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=75', time: '२ घण्टा अघि', excerpt: 'नेपाल राष्ट्र बैंकले मौद्रिक नीतिको समीक्षामा रेपो दर आधा प्रतिशतले घटाउने निर्णय गरेको छ।' },
  { id: 3,  title: 'विदेशी लगानी आकर्षणका लागि सरकारले नयाँ नीति ल्याउँदै', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=75', time: '३ घण्टा अघि' },
  { id: 4,  title: 'नेपाली रुपैयाँ अमेरिकी डलरसँग मजबुत, विनिमय दर सुधार', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 5,  title: 'व्यापार घाटा घट्यो, निर्यात बढ्न थाल्यो', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75', time: '६ घण्टा अघि' },
  { id: 6,  title: 'पर्यटन राजस्वमा उल्लेखनीय वृद्धि, सरकार उत्साहित', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=75', time: '७ घण्टा अघि' },
];

const MORE_NEWS = [
  { id: 401, title: 'बजेट खर्च लक्ष्यभन्दा कम, मन्त्रालय चिन्तित',       time: '१ घण्टा अघि'  },
  { id: 402, title: 'सहकारी संस्थाहरूमा अनियमितता, छानबिन सुरु',          time: '२ घण्टा अघि'  },
  { id: 403, title: 'सिमेन्ट उद्योगले उत्पादन बढाउने घोषणा गर्यो',        time: '३ घण्टा अघि'  },
  { id: 404, title: 'रेमिट्यान्स आप्रवाहमा वृद्धि, रु ५ खर्ब नाघ्यो',     time: '४ घण्टा अघि'  },
  { id: 405, title: 'कृषि उत्पादनमा कमी, आयात बढ्ने संकेत',               time: '५ घण्टा अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/npl.gif',    alt: 'विज्ञापन', href: '#' },
];

const Arthatantar = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="अर्थतन्त्र"
    color="#1a6b3c"
    description="बजार, बैंकिङ, व्यापार र आर्थिक विश्लेषण"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Arthatantar;