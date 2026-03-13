import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'डेंगुको प्रकोप बढ्दो, स्वास्थ्य मन्त्रालयले सतर्कता अपनाउन आग्रह', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=75', time: '१ घण्टा अघि', author: 'स्वास्थ्य डेस्क', views: '५,६७०', excerpt: 'काठमाडौं उपत्यकामा डेंगुका बिरामीको संख्या बढ्दो क्रममा रहेको स्वास्थ्य मन्त्रालयले जनाएको छ।' },
  { id: 2,  title: 'नेपालमा नयाँ अस्पताल निर्माण, स्वास्थ्य सेवा विस्तार', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=75', time: '३ घण्टा अघि', excerpt: 'सरकारले दूरदराजका जिल्लामा नयाँ अस्पताल र स्वास्थ्य केन्द्र निर्माण गर्ने घोषणा गरेको छ।' },
  { id: 3,  title: 'मधुमेह रोगीको संख्या बढ्दो, विशेषज्ञको चेतावनी', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=75', time: '५ घण्टा अघि' },
  { id: 4,  title: 'खोप अभियान सफल, लक्षित बालबालिका लाभान्वित', image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=75', time: '७ घण्टा अघि' },
  { id: 5,  title: 'मानसिक स्वास्थ्य सेवामा सुधार, नयाँ केन्द्र खुल्यो', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=75', time: '९ घण्टा अघि' },
  { id: 6,  title: 'आयुर्वेद उपचार पद्धतिप्रति बढ्दो आकर्षण', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=75', time: '१ दिन अघि' },
];

const MORE_NEWS = [
  { id: 1001, title: 'रक्तदान अभियानमा हजारौँको सहभागिता',                time: '२ घण्टा अघि' },
  { id: 1002, title: 'क्यान्सर उपचारका लागि नयाँ औषधि उपलब्ध',            time: '४ घण्टा अघि' },
  { id: 1003, title: 'स्वस्थ जीवनशैलीका लागि व्यायामको महत्त्व',            time: '१ दिन अघि'  },
  { id: 1004, title: 'खाद्य सुरक्षा मापदण्ड कडा बनाइने',                   time: '१ दिन अघि'  },
  { id: 1005, title: 'सरकारी अस्पतालमा निःशुल्क उपचार विस्तार',             time: '२ दिन अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/news.gif',   alt: 'विज्ञापन', href: '#' },
];

const Suwastha = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="स्वास्थ्य"
    color="#b91c1c"
    description="स्वास्थ्य सेवा, रोग, उपचार र स्वस्थ जीवनशैली"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Suwastha;