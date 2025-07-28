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
  const mainRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const panels: HTMLElement[] = gsap.utils.toArray(
        panelSelector,
        mainRef.current!
      );
      
      panels.forEach((panel, i) => {
        // Try to find a horizontal track within the current panel
        const track: HTMLElement | null = panel.querySelector('.horizontal-track');

        // --- If it's a HORIZONTAL scroll panel ---
        if (track) {
          const scrollAmount = track.scrollWidth - window.innerWidth;
          
          // Animate the track moving left
          const horizontalTween = gsap.to(track, {
            x: `-${scrollAmount}px`,
            ease: 'none',
          });
          
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            end: `+=${scrollAmount}`, // Pin for the exact duration of the horizontal scroll
            pin: true,
            scrub: 1,
            animation: horizontalTween,
            invalidateOnRefresh: true, // Recalculate on resize
          });

        // --- If it's a STANDARD snapping panel ---
        } else {
          ScrollTrigger.create({
            trigger: panel,
            start: 'top top',
            pin: true,
            pinSpacing: false, // Prevents space from being added after pin
            snap: {
              snapTo: 1, // Snap to the end
              duration: 0.5,
              ease: 'power2.inOut',
            },
          });
        }
      });
    },
    { scope: mainRef }
  );

  return <main ref={mainRef}>{children}</main>;
};

export default LayerAnimate;