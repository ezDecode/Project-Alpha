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

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          // Snap to the start of the panel
          snap: {
            snapTo: 1, // Snap to the end of the animation (which is the start of the panel)
            duration: 0.5,
            ease: 'power2.inOut',
          },
        });
      });
    },
    { scope: main }
  );

  return <main ref={main}>{children}</main>;
};

export default LayerAnimate;