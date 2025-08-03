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
import DesktopSuggestionModal from './components/DesktopSuggestionModal'; // --- IMPORTED ---

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [animationReady, setAnimationReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // --- STATE FOR THE NEW MODAL ---
  const [showSuggestionModal, setShowSuggestionModal] = useState(false);

  useEffect(() => {
    const checkDeviceSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // --- LOGIC TO SHOW MODAL ONCE PER SESSION ---
      const hasSeenSuggestion = sessionStorage.getItem('hasSeenDesktopSuggestion');
      if (mobile && !hasSeenSuggestion) {
        setShowSuggestionModal(true);
      }
    };
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);
  
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    if (lenisRef.current) return;
    const lenis = new Lenis({ lerp: 0.07, smoothWheel: true });
    lenisRef.current = lenis;
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    gsap.ticker.lagSmoothing(0);
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const href = target.getAttribute('data-scroll-to');
      if (href) {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) lenis.scrollTo(element as HTMLElement, { offset: 0, duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 3) });
      }
    };
    document.addEventListener('click', handleNavClick);
    return () => {
      document.removeEventListener('click', handleNavClick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // --- HANDLER TO CLOSE THE MODAL AND SET SESSION STORAGE ---
  const handleCloseSuggestionModal = () => {
    setShowSuggestionModal(false);
    sessionStorage.setItem('hasSeenDesktopSuggestion', 'true');
  };

  return (
    <main className="bg-black">
      {/* --- RENDER THE MODAL --- */}
      <DesktopSuggestionModal isOpen={showSuggestionModal} onClose={handleCloseSuggestionModal} />

      <AnimatePresence mode='wait' onExitComplete={() => setAnimationReady(true)}>
        {isLoading && <Preloader />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <HeroSection startAnimation={animationReady} isScrolled={isScrolled} isMobile={isMobile} />
          <AboutSection />
          <ProjectSection isMobile={isMobile} />
          <FooterSection />
        </>
      )}
    </main>
  );
};

export default App;