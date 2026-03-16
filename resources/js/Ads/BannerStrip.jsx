import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BannerStrip = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSquareBanners();
  }, []);

  const fetchSquareBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/banner');
      if (response.data.success) {
        // Filter Square banners, sort by latest (id desc), take 2
        const squareBanners = response.data.data
          .filter(banner => banner.category === 'Square')
          .sort((a, b) => b.id - a.id)
          .slice(0, 2);
        setBanners(squareBanners);
      } else {
        throw new Error('Failed to fetch banners');
      }
    } catch (err) {
      console.error('Error fetching banners:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const FallbackBanner = () => (
    <div className="w-full">
      <img
        src="/images/hilife.gif"
        alt="Default banner"
        className="w-full h-auto object-cover"
      />
    </div>
  );

  if (loading) {
    return (
      <div className="w-full bg-white px-4 py-2">
        <div className="flex gap-2">
          <div className="animate-pulse bg-gray-200 h-[250px] w-1/2 rounded" />
          <div className="animate-pulse bg-gray-200 h-[250px] w-1/2 rounded" />
        </div>
      </div>
    );
  }

  if (error || banners.length === 0) {
    return (
      <div className="w-full bg-white px-4 py-2">
        <div className="flex gap-2">
          <FallbackBanner />
          <FallbackBanner />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white px-4 py-2">
      <div className="gap-2">
        {banners.map((banner, index) => (
          <div
            key={banner.id || index}
            className="mt-6"
          >
            <a
              href={banner.link || '#'}
              target={banner.link ? '_blank' : '_self'}
              rel={banner.link ? 'noopener noreferrer' : ''}
              className="block"
            >
              <img
                src={banner.image}
                alt={`Square Banner ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerStrip;