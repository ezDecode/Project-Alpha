import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import your page sections/components
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. --- SMOOTH SCROLL SETUP (Lenis) ---
    const lenis = new Lenis({
      duration: 1.8,
      lerp: 0.07,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update(); // Sync ScrollTrigger
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // 2. --- ANIMATION LOGIC (Centralized GSAP) ---
    const panels: HTMLElement[] = gsap.utils.toArray('.panel', mainRef.current!);

    panels.forEach((panel, i) => {
      const track: HTMLElement | null = panel.querySelector('.horizontal-track');

      // --- IF THE PANEL IS A HORIZONTAL SCROLLER ---
      if (track) {
        const scrollAmount = track.scrollWidth - window.innerWidth;
        
        // This tween animates the track from left 0 to its end
        const horizontalTween = gsap.to(track, {
          x: `-${scrollAmount}px`,
          ease: 'none',
        });
        
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1, // Connects the scrollbar to the animation
          animation: horizontalTween,
          // IMPORTANT: Adds space after pinning so the next section's start position is correct
          pinSpacing: true, 
          invalidateOnRefresh: true,
        });

      // --- IF THE PANEL IS A STANDARD VERTICAL SNAP ---
      } else {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          // We set end to ensure the pin is released after one screen's worth of scrolling
          end: '+=100%',
          // Use pinSpacing: false for seamless transitions between vertical panels
          pinSpacing: false,
        });
      }
    });

    // Cleanup
    return () => {
      // Kill all ScrollTriggers created in this effect
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      lenis.destroy();
    };

  }, []);

  return (
    // We add a ref to the main container to scope our GSAP queries
    <main ref={mainRef}>
      <HeroSection />
      <AboutSection />
      <WorkSection />
    </main>
  );
};

export default App;