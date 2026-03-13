import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'नेपाली क्रिकेट टिम टी-२० विश्वकपका लागि क्वालिफाइ गर्यो', image: 'https://images.unsplash.com/photo-1540747913346-19212a4b32a0?w=600&q=75', time: '१ घण्टा अघि', author: 'खेल डेस्क', views: '९,४७०', excerpt: 'नेपाली क्रिकेट टिमले टी-२० विश्वकप क्वालिफाइङ राउन्डमा शानदार प्रदर्शन गर्दै मुख्य प्रतियोगितामा ठाउँ बनायो।' },
  { id: 2,  title: 'साफ च्याम्पियनसिपमा नेपालले भारतलाई हराउँदै फाइनलमा', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=75', time: '२ घण्टा अघि', excerpt: 'नेपाली फुटबल टिमले कडा प्रतिस्पर्धापछि भारतलाई पराजित गर्दै फाइनलमा प्रवेश गर्यो।' },
  { id: 3,  title: 'एथलेटिक्समा नेपालले पहिलो स्वर्ण पदक जित्यो', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=75', time: '४ घण्टा अघि' },
  { id: 4,  title: 'राष्ट्रिय फुटबल लिग आगामी महिनादेखि सुरु हुने', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=75', time: '६ घण्टा अघि' },
  { id: 5,  title: 'नेपाली तेक्वान्दो खेलाडीले अन्तर्राष्ट्रिय पदक जिते', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=75', time: '७ घण्टा अघि' },
  { id: 6,  title: 'एनएसएल यो वर्ष विस्तारित प्रारूपमा खेलिने', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=75', time: '८ घण्टा अघि' },
];

const MORE_NEWS = [
  { id: 501, title: 'बागमती प्रभिन्स फुटबल लिगको खेल तालिका सार्वजनिक', time: '२ घण्टा अघि' },
  { id: 502, title: 'नेपाल ब्याडमिन्टन संघले नयाँ कोच नियुक्त गर्यो',   time: '३ घण्टा अघि' },
  { id: 503, title: 'माउन्टेन बाइकिङ प्रतियोगितामा नेपाल अव्वल',        time: '४ घण्टा अघि' },
  { id: 504, title: 'नेपाल भलिबल टिम एसियन च्याम्पियनसिपमा',             time: '५ घण्टा अघि' },
  { id: 505, title: 'राष्ट्रिय खेलकुद परिषदले नयाँ अनुदान घोषणा गर्यो', time: '६ घण्टा अघि' },
];

const ADS = [
  { image: '/images/npl.gif',    alt: 'विज्ञापन', href: '#' },
  { image: '/images/drinks.gif', alt: 'विज्ञापन', href: '#' },
];

const Khelkud = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="खेलकुद"
    color="#b8860b"
    description="क्रिकेट, फुटबल, एथलेटिक्स र अन्य खेलका समाचार"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Khelkud;