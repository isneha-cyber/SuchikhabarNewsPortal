import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'धान उत्पादनमा रेकर्ड वृद्धि, किसानहरू उत्साहित', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=75', time: '२ घण्टा अघि', author: 'कृषि डेस्क', views: '३,५४०', excerpt: 'यस वर्ष मनसुन राम्रो भएकाले धानको उत्पादन गत वर्षको तुलनामा उल्लेखनीय रूपमा बढेको छ।' },
  { id: 2,  title: 'जैविक कृषिमा बढ्दो रुचि, युवा किसान अग्रसर', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=75', time: '४ घण्टा अघि', excerpt: 'रासायनिक मल र कीटनाशकको सट्टा जैविक विधि अपनाउने किसानहरूको संख्या बढ्दो छ।' },
  { id: 3,  title: 'कृषि अनुदानको वितरण सुरु, हजारौँ किसान लाभान्वित', image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 4,  title: 'आधुनिक सिँचाई प्रणालीले तराईका किसान खुसी', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=75', time: '७ घण्टा अघि' },
  { id: 5,  title: 'फलफूल निर्यातमा वृद्धि, किवी र स्याउ विदेश जाँदै', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=600&q=75', time: '९ घण्टा अघि' },
  { id: 6,  title: 'कृषि विश्वविद्यालयले नयाँ अनुसन्धान केन्द्र स्थापना गर्यो', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=75', time: '१ दिन अघि' },
];

const MORE_NEWS = [
  { id: 901, title: 'मकै उत्पादनमा नयाँ प्रविधि प्रयोग गरिँदै',           time: '३ घण्टा अघि' },
  { id: 902, title: 'किसान क्रेडिट कार्डबाट ऋण लिन सजिलो हुने',            time: '५ घण्टा अघि' },
  { id: 903, title: 'पशुपालन विकासका लागि सरकारी कार्यक्रम',                time: '१ दिन अघि'  },
  { id: 904, title: 'तरकारीको मूल्य घट्यो, उपभोक्ता खुसी',                 time: '१ दिन अघि'  },
  { id: 905, title: 'चिया निर्यातमा नयाँ बजार खोजिँदै',                    time: '२ दिन अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/restro.gif', alt: 'विज्ञापन', href: '#' },
];

const Krishi = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="कृषि"
    color="#3d6b1a"
    description="कृषि, पशुपालन, सिँचाई र ग्रामीण विकासका समाचार"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Krishi;