// resources/js/Components/SEO.jsx
import React from 'react';
import { Head } from '@inertiajs/react';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  image, 
  type = 'website',
  author = 'Shuchikhabar Team',
  publishedTime,
  modifiedTime,
  tags = [],
  noIndex = false
}) => {
  const siteUrl = "https://shuchikhabar.com";
  const currentUrl = canonical || `${siteUrl}${window.location.pathname}`;
  const fullTitle = title.includes('|') ? title : `${title} | Shuchikhabar`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Shuchikhabar" />
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:alt" content={title} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Head>
  );
};

export default SEO;