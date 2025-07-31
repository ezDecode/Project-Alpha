"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';

// Note: The Word and ScrollRevealParagraph components remain the same
const Word: React.FC<{
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}> = React.memo(({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return <motion.span style={{ opacity }} className="relative">{children}</motion.span>;
});

const ScrollRevealParagraph: React.FC<{ text: string }> = ({ text }) => {
  const targetRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start 0.95', 'end 0.7']
  });
  const words = text.split(' ');

  return (
    <p ref={targetRef} className="relative flex w-full flex-wrap text-lg md:text-2xl lg:text-3xl font-polysans justify-center leading-snug text-center text-neutral-300">
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={index} className="mr-2.25 mt-2.5 inline-block">
            <Word progress={scrollYProgress} range={[start, end]}>{word}</Word>
          </span>
        );
      })}
    </p>
  );
};


const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Animation starts when the top of the section meets the bottom of the viewport
    // and ends when the top of the section meets the top of the viewport.
    offset: ['start end', 'end start']
  });

  // Get viewport height for SVG path calculations
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const handleResize = () => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- START: SVG CURVE ANIMATION LOGIC ---

  // initialPath: A flat line at the bottom of the viewport.
  const initialPath = `M0 ${dimension.height} L${dimension.width} ${dimension.height} L${dimension.width} ${dimension.height} L0 ${dimension.height} Z`;
  
  // targetPath: A curve that starts at the top-left, dips down, and ends at the top-right.
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} L0 ${dimension.height} Q${dimension.width/2} ${dimension.height - 150} 0 0 Z`;

  // Interpolate between the two paths based on scroll progress.
  const path = useTransform(scrollYProgress, [0, 1], [initialPath, targetPath]);
  
  // --- END: SVG CURVE ANIMATION LOGIC ---

  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headingScrollYProgress } = useScroll({ target: headingRef, offset: ['start 0.9', 'end 0.6'] });
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollYProgress } = useScroll({ target: ctaRef, offset: ['start 1', 'end 0.9'] });

  const imageHoverTransition = { type: "spring" as const, stiffness: 400, damping: 12 };
  const buttonOpacity = useTransform(ctaScrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(ctaScrollYProgress, [0, 1], [50, 0]);

  const headingElements = [
    <span key="h-1">A</span>,
    <motion.div 
      key="h-2" 
      className="w-12 h-9 md:w-20 md:h-16 lg:w-28 lg:h-20 bg-neutral-800 rounded-lg inline-flex overflow-hidden align-middle -translate-y-1 lg:-translate-y-2" 
      whileHover={{ scale: 1.6, rotate: -15 }} 
      transition={imageHoverTransition}
    >
      <img src="/assets/HeaderImage.png" alt="Pixelated Image" className="w-full h-full object-cover"/>
    </motion.div>,
    <span key="h-3">Full-Stack Devel<span className="italic">o</span>per</span>,
    <motion.div 
      key="h-4" 
      className="w-12 h-9 md:w-20 md:h-16 lg:w-28 lg:h-20 bg-neutral-800 rounded-lg inline-flex overflow-hidden align-middle -translate-y-1 lg:-translate-y-2" 
      whileHover={{ scale: 1.6, rotate: 15 }} 
      transition={imageHoverTransition}
    >
      <img src="/assets/HeaderImageBW.png" alt="Sci-Fi Image" className="w-full h-full object-cover"/>
    </motion.div>,
    <span key="h-5">who brings <span className="italic">ideas</span> to life...</span>
  ];

  return (
    // The main container now has a transparent background, as the SVG will provide the color.
    <section ref={containerRef} id="about" className="relative bg-transparent pt-32 pb-40 md:pb-48">
      {/* The content is wrapped in a container with a relative position and high z-index */}
      <div className="relative z-10 w-[60vw] mx-auto flex flex-col items-center justify-center gap-12 md:gap-16">
        <h2 ref={headingRef} className="relative w-full text-white text-5xl md:text-7xl lg:text-8xl font-editorial font-light leading-tight text-center flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5" style={{fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.2'}}>
          {headingElements.map((element, index) => {
            const start = index / headingElements.length;
            const end = start + 1 / headingElements.length;
            return <Word key={index} progress={headingScrollYProgress} range={[start, end]}>{element}</Word>;
          })}
        </h2>
        
        <div className="w-[60vw]">
          <ScrollRevealParagraph text="I'm a passionate full-stack developer crafting high-performance web applications with precision and creativity. I transform complex challenges into elegant digital solutions using React, Node.js, and cutting-edge modern architecture." />
        </div>

        <motion.div ref={ctaRef} style={{ opacity: buttonOpacity, y: buttonY }} className="relative">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton className="w-full sm:w-auto px-10 py-4 border border-neutral-600 rounded-full text-white text-base md:text-lg font-polysans font-medium">
              Explore My Work
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto px-10 py-4 border border-neutral-600 rounded-full text-white text-base md:text-lg font-polysans font-medium">
              View Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <motion.path d={path} fill="black" />
      </motion.svg>
    </section>
  );
};

export default AboutSection;