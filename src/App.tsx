import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence } from 'framer-motion';

import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // CORRECTED: New state to control the Hero animation start
  const [animationReady, setAnimationReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (lenisRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
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

    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    gsap.ticker.lagSmoothing(0);

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

    document.addEventListener('click', handleNavClick);

    return () => {
      document.removeEventListener('click', handleNavClick);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="bg-black">
      <AnimatePresence
        mode='wait'
        // CORRECTED: Set animationReady to true after Preloader exits
        onExitComplete={() => setAnimationReady(true)}
      >
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {/* CORRECTED: Pass the animationReady state as a prop */}
      <HeroSection startAnimation={animationReady} />
      <div className="w-full h-0 bg-black"></div>
      <AboutSection />
    </main>
  );
};

export default App;