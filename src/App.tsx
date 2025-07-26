import React from 'react'
import HeroSection from './components/HeroSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const App = () => {
  // Initialize smooth scrolling
  useSmoothScroll()

  return (
    <div className="font-['OverusedGrotesk']">
      {/* Hero Section */}
      <HeroSection />
    </div>
  )
}

export default App