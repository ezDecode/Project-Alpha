import React, { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Import your components
// import LoadingScreen from './components/LoadingScreen'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import WorkSection from './components/WorkSection'
import LayerAnimate from './components/LayerAnimate'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const App: React.FC = () => {
  // Setup Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Sync GSAP's ScrollTrigger with Lenis' scroll events
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP's ticker to ensure both animations are in sync
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000) // Lenis requires time in milliseconds
    })

    gsap.ticker.lagSmoothing(0)

    // Cleanup on component unmount
    return () => {
      lenis.destroy()
      gsap.ticker.remove(() => {})
    }
  }, [])

  return (
    <>
      {/* <LoadingScreen /> */}
      {/* The main-content div will appear after the loading screen */}
      <div className="main-content">
        {/* LayerAnimate now works seamlessly because ScrollTrigger is synced with Lenis */}
        <LayerAnimate panelSelector=".panel">
          <HeroSection />
          <AboutSection />
          <WorkSection />
        </LayerAnimate>
      </div>
    </>
  )
}

export default App