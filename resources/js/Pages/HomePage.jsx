// import LeaderboardBanner from '@/Ads/Leaderboardbanner'
// import TickerStrip from '@/Ads/Tickerstrip'
import CategorySection from '@/Suchikhabar/Categorysection'
import Footer from '@/Suchikhabar/Footer'
// import LandingPage from '@/Suchikhabar/LandingPage'
import HeroSection from '@/Suchikhabar/HeroSection'
import Navbar from '@/Suchikhabar/Navbar'
import React from 'react'

const HomePage = ({categoryNews, latestNews}) => {
	return (
		<> {/* <LeaderboardBanner/>
      <TickerStrip/> */}
			<Navbar/>

			<HeroSection latestNews={latestNews}/> {/* <LeaderboardBanner/> */}
			<CategorySection categoryNews={categoryNews}/>
			<Footer/>
		</>
	)
}

export default HomePage
