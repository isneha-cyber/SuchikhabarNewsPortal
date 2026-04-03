import React from 'react'
import { Head } from '@inertiajs/react'
import CategorySection from '@/Suchikhabar/Categorysection'
import Footer from '@/Suchikhabar/Footer'
import HeroSection from '@/Suchikhabar/HeroSection'
import Navbar from '@/Suchikhabar/Navbar'
import SEO from '@/Components/SEO'

const Welcome = ({ heroData }) => {
  // Static SEO for this page
  const seoData = {
    title: "Shuchikhabar | Best NewsPortal in Nepal",
    description: "Shuchikhabar मा नेपाल र विश्वका ताजा समाचारहरू पढ्नुहोस्। राजनीति, खेलकुद, मनोरञ्जन र व्यवसायका समाचारहरू।",
    keywords: "समाचार, नेपाल समाचार, विश्व समाचार, खेलकुद, राजनीति, मनोरञ्जन",
    canonical: "https://shuchikhabar.com/",
  }

  return (
    <>
      {/* SEO */}
   <SEO {...seoData} />

      <Navbar />
      <HeroSection heroData={heroData} />
      <CategorySection />
      <Footer />
    </>
  )
}

export default Welcome