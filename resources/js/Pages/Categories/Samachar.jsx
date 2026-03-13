import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'काठमाडौंमा भारी वर्षाको चेतावनी, सतर्कता अपनाउन आग्रह', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75', time: '१ घण्टा अघि', author: 'सुरेश पौडेल', views: '५,३२०', excerpt: 'मौसम पूर्वानुमान केन्द्रले आगामी ४८ घण्टासम्म भारी वर्षाको सम्भावना रहेको जनाएको छ।' },
  { id: 2,  title: 'सुरक्षा निकायले काठमाडौंमा तस्करी नेटवर्क भत्कायो', image: 'https://images.unsplash.com/photo-1536859975388-b5e6623e9223?w=600&q=75', time: '२ घण्टा अघि', excerpt: 'प्रहरीले काठमाडौं उपत्यकामा सञ्चालित ठूलो तस्करी नेटवर्कलाई पर्दाफास गरेको छ।' },
  { id: 3,  title: 'नेपाल बन्द सफल, प्रमुख सहरमा सुनसान', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=75', time: '३ घण्टा अघि' },
  { id: 4,  title: 'दुर्घटनामा ५ जनाको मृत्यु, परिवारमा शोक', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=75', time: '४ घण्टा अघि' },
  { id: 5,  title: 'अदालतले भ्रष्टाचार मुद्दामा फैसला सुनायो', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 6,  title: 'विद्यालय भवन भत्किँदा विद्यार्थी घाइते', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75', time: '६ घण्टा अघि' },
];

const MORE_NEWS = [
  { id: 201, title: 'पहिरोले राजमार्ग अवरुद्ध, सयौँ यात्रु अलपत्र',         time: '२० मिनेट अघि' },
  { id: 202, title: 'बैंकमा डकैती, प्रहरी खोजीमा',                            time: '१ घण्टा अघि'  },
  { id: 203, title: 'जिल्ला प्रशासनले निषेधाज्ञा जारी गर्यो',                  time: '२ घण्टा अघि'  },
  { id: 204, title: 'नदीमा डुबेर दुई जनाको मृत्यु',                            time: '३ घण्टा अघि'  },
  { id: 205, title: 'अस्पतालमा औषधि अभाव, बिरामी त्रसित',                     time: '४ घण्टा अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/restro.gif', alt: 'विज्ञापन', href: '#' },
];

const Samachar = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="समाचार"
    color="#1c3f6e"
    description="देशभरका ताजा समाचार र घटनाहरू"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Samachar;