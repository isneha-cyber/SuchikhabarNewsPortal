import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'संयुक्त राष्ट्रसंघले युद्धविराम घोषणाको आह्वान गर्यो', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=75', time: '२ घण्टा अघि', author: 'अन्तर्राष्ट्रिय डेस्क', views: '६,१५०', excerpt: 'संयुक्त राष्ट्रसंघको सुरक्षा परिषद्ले द्वन्द्वग्रस्त क्षेत्रमा तत्काल युद्धविराम गर्न आह्वान गरेको छ।' },
  { id: 2,  title: 'भारत र चीनबीच सीमा विवाद समाधानका लागि उच्चस्तरीय वार्ता', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75', time: '३ घण्टा अघि', excerpt: 'दुई देशका वरिष्ठ अधिकारीहरूबीच सीमा विवादबारे सकारात्मक छलफल भएको जानकारी आएको छ।' },
  { id: 3,  title: 'अमेरिकामा राष्ट्रपति चुनावको मतगणना जारी, रोचक प्रतिस्पर्धा', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 4,  title: 'युरोपेली संघले जलवायु परिवर्तनविरुद्ध नयाँ प्याकेज घोषणा', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=75', time: '७ घण्टा अघि' },
  { id: 5,  title: 'पाकिस्तानमा राजनीतिक अस्थिरता, सेनाको भूमिकामा प्रश्न', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=75', time: '८ घण्टा अघि' },
  { id: 6,  title: 'रुस–युक्रेन संघर्षमा नयाँ मोड, पश्चिमी देशहरू सतर्क', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75', time: '९ घण्टा अघि' },
];

const MORE_NEWS = [
  { id: 301, title: 'जापानमा शक्तिशाली भूकम्प, सुनामीको चेतावनी',           time: '१ घण्टा अघि'  },
  { id: 302, title: 'अफ्रिकामा खाद्य संकट गहिरिँदै, संयुक्त राष्ट्र चिन्तित', time: '२ घण्टा अघि' },
  { id: 303, title: 'दक्षिण कोरियाले नयाँ रक्षा सम्झौतामा हस्ताक्षर गर्यो',  time: '४ घण्टा अघि' },
  { id: 304, title: 'विश्व व्यापार संगठनमा नयाँ सदस्य थपिए',                  time: '५ घण्टा अघि' },
  { id: 305, title: 'मध्यपूर्वमा शान्ति वार्ता पुनः सुरु',                    time: '७ घण्टा अघि' },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/news.gif',   alt: 'विज्ञापन', href: '#' },
];

const Antarastra = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="अन्तर्राष्ट्रिय"
    color="#00649b"
    description="विश्वका प्रमुख घटना र समाचारहरू"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Antarastra;