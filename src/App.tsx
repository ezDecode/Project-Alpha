import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Optimized Lenis configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3), // Custom cubic easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
      syncTouch: true
    });

    lenisRef.current = lenis;

    // Sync with ScrollTrigger
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Animation frame loop
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // GSAP performance optimization
    gsap.ticker.lagSmoothing(0);

    // Smooth scroll navigation handler
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('data-scroll-to');
      
      if (href) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, { 
            offset: 0, 
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 3)
          });
        }
      }
    };

    // Add click listener for navigation
    document.addEventListener('click', handleNavClick);

    return () => {
      document.removeEventListener('click', handleNavClick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-black">
      <HeroSection />
      {/* Seamless transition container */}
      <div className="w-full h-0 bg-black"></div>
      <AboutSection />
    </main>
  );
};

export default App;