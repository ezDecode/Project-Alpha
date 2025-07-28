import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface LayerAnimateProps {
  children: React.ReactNode;
  panelSelector?: string;
}

const LayerAnimate: React.FC<LayerAnimateProps> = ({
  children,
  panelSelector = '.panel',
}) => {
  const main = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels: HTMLElement[] = gsap.utils.toArray(
        panelSelector,
        main.current!
      );
      if (panels.length === 0) return;

      // FIX: Removed the unused 'i' variable from the forEach loop.
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
            pinSpacing: false,
            end: '+=100%',
          });
        }
      });
    },
    { scope: main }
  );

  return <main ref={main}>{children}</main>;
};

export default LayerAnimate;