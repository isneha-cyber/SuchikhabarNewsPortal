import React from 'react';
import CategoryPage from './CategoryPage';

const NEWS = [
  { id: 1,  title: 'पशुपतिनाथमा लाखौँ भक्तजनको भीड, महाशिवरात्रि उत्सव', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=75', time: '१ घण्टा अघि', author: 'धर्म डेस्क', views: '७,८३०', excerpt: 'महाशिवरात्रिको अवसरमा पशुपतिनाथ मन्दिर परिसरमा देशविदेशका लाखौँ भक्तजनको भीड लागेको छ।' },
  { id: 2,  title: 'लुम्बिनीमा विश्व बौद्ध सम्मेलन, ४० देशका प्रतिनिधि सहभागी', image: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&q=75', time: '३ घण्टा अघि', excerpt: 'गौतम बुद्धको जन्मस्थल लुम्बिनीमा आयोजित विश्व बौद्ध सम्मेलनमा विभिन्न देशका प्रतिनिधिहरूले भाग लिएका छन्।' },
  { id: 3,  title: 'देशभर तीज पर्व हर्षोल्लासका साथ मनाइयो', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=75', time: '१ दिन अघि' },
  { id: 4,  title: 'जनकपुरमा रामनवमी महोत्सव, ठूलो जमघट', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=75', time: '२ दिन अघि' },
  { id: 5,  title: 'मुस्लिम समुदायले इदको नमाज अदा गर्यो, भाइचाराको सन्देश', image: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&q=75', time: '३ दिन अघि' },
  { id: 6,  title: 'चर्चमा क्रिसमस पर्व धुमधामसाथ मनाइयो', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75', time: '४ दिन अघि' },
];

const MORE_NEWS = [
  { id: 701, title: 'गोसाइँकुण्डमा तीर्थयात्रीको भीड',                   time: '२ घण्टा अघि' },
  { id: 702, title: 'मुक्तिनाथ मन्दिर जीर्णोद्धार कार्य सुरु',            time: '१ दिन अघि'  },
  { id: 703, title: 'स्वयम्भूनाथ क्षेत्रमा विकास आयोजना घोषणा',           time: '२ दिन अघि'  },
  { id: 704, title: 'धार्मिक पर्यटन प्रवर्द्धनका लागि नयाँ कार्यक्रम',    time: '३ दिन अघि'  },
  { id: 705, title: 'बौद्ध विहारको शताब्दी उत्सव समारोह',                  time: '४ दिन अघि'  },
];

const ADS = [
  { image: '/images/hilife.gif', alt: 'विज्ञापन', href: '#' },
  { image: '/images/restro.gif', alt: 'विज्ञापन', href: '#' },
];

const Dharmik = ({ news = NEWS, moreNews = MORE_NEWS, ads = ADS }) => (
  <CategoryPage
    categoryName="धार्मिक"
    color="#7c3d12"
    description="धर्म, संस्कृति, पर्व र तीर्थस्थलका समाचार"
    news={news}
    moreNews={moreNews}
    ads={ads}
  />
);

export default Dharmik;