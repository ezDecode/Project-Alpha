import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import WorkSection from './components/WorkSection';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      lerp: 0.07,
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const panels: HTMLElement[] = gsap.utils.toArray('.panel', mainRef.current!);

    panels.forEach((panel) => {
      const track: HTMLElement | null = panel.querySelector('.horizontal-track');

      if (track) {
        const scrollAmount = track.scrollWidth - window.innerWidth;
        const horizontalTween = gsap.to(track, {
          x: `-${scrollAmount}px`,
          ease: 'none',
        });
        
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: `+=${scrollAmount}`,
          pin: true,
          scrub: 1,
          animation: horizontalTween,
          pinSpacing: true, 
          invalidateOnRefresh: true,
        });

      } else {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          end: '+=100%',
          pinSpacing: false,
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      lenis.destroy();
    };

  }, []);

  return (
    <main ref={mainRef}>
      <HeroSection />
      <AboutSection />
      <WorkSection />
    </main>
  );
};

export default App;