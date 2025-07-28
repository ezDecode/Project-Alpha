import React, { useEffect } from 'react'
import HeroSection from './components/HeroSection'
import Lenis from 'lenis'

// A placeholder for what comes AFTER the about section
const SomeOtherSection = () => {
  return (
    <div className="h-screen w-screen bg-gray-800 flex items-center justify-center text-white">
      <h2 className="text-5xl">More Content Here</h2>
    </div>
  )
}

const App = () => {
  useEffect(() => {
    // Initialize Lenis with optimized settings for maximum smoothness
    const lenis = new Lenis({
      lerp: 0.06,          // Lower value = smoother/slower (0.06 is very smooth)
      duration: 1.8,       // Duration of scroll animations for ultra-smooth feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for ultra-smooth feel
      touchMultiplier: 1.2, // Touch sensitivity
      infinite: false,      // No infinite scroll
    })

    // RAF loop for maximum smoothness - this is crucial for 60fps scrolling
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Enhanced scroll-to functionality with ultra-smooth transitions
    document.querySelectorAll('span[data-scroll-to]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLElement) {
        const targetId = this.getAttribute('data-scroll-to')
        if (targetId) {
          lenis.scrollTo(targetId, { 
            lerp: 0.03,    // Ultra smooth for click navigation
            duration: 3,   // Longer duration for maximum smoothness
            easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1, // Cubic ease-in-out
          })
        }
      })
    })

    // Optional: Listen to scroll events for debugging
    lenis.on('scroll', () => {
      // You can add scroll event listeners here if needed
      // console.log('scrolling...')
    })

    // Cleanup function
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <main>
      <HeroSection />

    </main>
  )
}

export default App