import Banner2 from '@/Components/Ads/Banner2'
import BannerStrip from '@/Components/Ads/BannerStrip'
import TickerStrip from '@/Components/Ads/Tickerstrip'
import CategorySection from '@/Components/Suchikhabar/Categorysection'
import Footer from '@/Components/Suchikhabar/Footer'
import HeroSection from '@/Components/Suchikhabar/HeroSection'
import Navbar from '@/Components/Suchikhabar/Navbar'
import React from 'react'

const HomePage = () => {
  return (
    <>
       <BannerStrip/>
    <TickerStrip/>
 
    <Navbar/>
    <HeroSection/>
    <Banner2/>
    <CategorySection/>
    <Footer/>
    </>
  )
}

export default HomePage