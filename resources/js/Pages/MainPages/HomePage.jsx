

import LeaderboardBanner from '@/Ads/Leaderboardbanner'
import TickerStrip from '@/Ads/Tickerstrip'
import CategorySection from '@/Suchikhabar/Categorysection'
import Footer from '@/Suchikhabar/Footer'
import HeroSection from '@/Suchikhabar/HeroSection'
import Navbar from '@/Suchikhabar/Navbar'
import React from 'react'

const HomePage = () => {
  return (
    <>
      <LeaderboardBanner/>
    <TickerStrip/>
 
    <Navbar/>
    <HeroSection/>
    <LeaderboardBanner/>
    <CategorySection/>
    <Footer/>
    </>
  )
}

export default HomePage