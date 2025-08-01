import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectSection from './components/ProjectSection';
import FooterSection from './components/FooterSection';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationReady, setAnimationReady] = useState(false);
  
  // --- START: COLOR CHANGE LOGIC ---
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // This hook watches the scroll position (scrollY).
  useMotionValueEvent(scrollY, "change", (latest) => {
    // If user has scrolled more than 50px from the top...
    if (latest > 50) {
      // ...they are now over a dark section, so we set isScrolled to true.
      setIsScrolled(true);
    } else {
      // Otherwise, they are at the top (light section), so isScrolled is false.
      setIsScrolled(false);
    }
  });
  // --- END: COLOR CHANGE LOGIC ---


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Lenis setup...
    if (lenisRef.current) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on('scroll', () => { ScrollTrigger.update(); });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    gsap.ticker.lagSmoothing(0);

    // Click handler for smooth scroll...
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('data-scroll-to');
      if (href) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: 0, duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
        }
      }
    };
    document.addEventListener('click', handleNavClick);

    // Cleanup...
    return () => {
      document.removeEventListener('click', handleNavClick);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const lenisRef = useRef<Lenis | null>(null);

  return (
    <main className="bg-black">
      <AnimatePresence
        mode='wait'
        onExitComplete={() => setAnimationReady(true)}
      >
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          {/* We pass the 'isScrolled' state down as a prop */}
          <HeroSection startAnimation={animationReady} isScrolled={isScrolled} />
          <div className="w-full h-0 bg-black"></div>
          <AboutSection />
          <ProjectSection />
          <FooterSection />
        </>
      )}
    </main>
  );
};

export default App;