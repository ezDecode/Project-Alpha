"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';

// Inner components remain unchanged.
const Word: React.FC<{children: React.ReactNode; range: [number, number]; progress: MotionValue<number>;}> = React.memo(({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return <motion.span style={{ opacity }} className="relative">{children}</motion.span>;
});
const ScrollRevealParagraph: React.FC<{ text: string }> = ({ text }) => {
  const targetRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.95', 'end 0.7'] });
  const words = text.split(' ');
  return (
    <p ref={targetRef} className="relative flex w-full flex-wrap text-base sm:text-lg md:text-2xl lg:text-3xl font-polysans justify-center leading-relaxed sm:leading-snug text-center text-neutral-300">
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (<span key={index} className="mr-1.5 mt-2 sm:mr-2.25 sm:mt-2.5 inline-block"><Word progress={scrollYProgress} range={[start, end]}>{word}</Word></span>);
      })}
    </p>
  );
};


const AboutSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headingScrollYProgress } = useScroll({ target: headingRef, offset: ['start 0.9', 'end 0.6'] });
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollYProgress } = useScroll({ target: ctaRef, offset: ['start 1', 'end 0.9'] });
  const imageHoverTransition = { type: "spring" as const, stiffness: 400, damping: 12 };
  const buttonOpacity = useTransform(ctaScrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(ctaScrollYProgress, [0, 1], [50, 0]);
  const headingElements = [ <span key="h-1">A</span>, <motion.div key="h-2" className="w-10 h-8 sm:w-12 sm:h-9 md:w-20 md:h-16 lg:w-28 lg:h-20 bg-neutral-800 rounded-lg inline-flex overflow-hidden align-middle -translate-y-1 lg:-translate-y-2" whileHover={{ scale: 1.6, rotate: -15 }} transition={imageHoverTransition}><img src="/assets/HeaderImage.png" alt="Pixelated decorative" className="w-full h-full object-cover"/></motion.div>, <span key="h-3">Full-Stack Devel<span className="italic">o</span>per</span>, <motion.div key="h-4" className="w-10 h-8 sm:w-12 sm:h-9 md:w-20 md:h-16 lg:w-28 lg:h-20 bg-neutral-800 rounded-lg inline-flex overflow-hidden align-middle -translate-y-1 lg:-translate-y-2" whileHover={{ scale: 1.6, rotate: 15 }} transition={imageHoverTransition}><img src="/assets/HeaderImageBW.png" alt="Sci-Fi decorative" className="w-full h-full object-cover"/></motion.div>, <span key="h-5">who brings <span className="italic">ideas</span> to life...</span>];

  return (
    // FIX #1: The Framer Motion warning is addressed by ensuring the main <section> has the `relative` class.
    <section 
      id="about" 
      className="relative bg-black pt-20 md:pt-40 pb-40 md:pb-48"
    >
      <div className="relative z-10 w-[90vw] md:w-[70vw] lg:w-[60vw] mx-auto flex flex-col items-center justify-center gap-12 md:gap-16">
        <h2 
          ref={headingRef} 
          className="relative w-full text-white text-[10vw] sm:text-5xl md:text-7xl lg:text-8xl font-editorial font-light leading-tight text-center flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 gap-y-1 sm:gap-y-1.5 mt-[20%]"
          style={{fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.2'}}
        >
          {headingElements.map((element, index) => {
            const start = index / headingElements.length;
            
            // FIX #2: Replaced the incorrect `words.length` with `headingElements.length`.
            // This ensures the animation is calculated based on the correct array, fixing the ReferenceError crash.
            const end = start + 1 / headingElements.length;
            
            return <Word key={index} progress={headingScrollYProgress} range={[start, end]}>{element}</Word>;
          })}
        </h2>
        
        {/* Rest of the component remains the same */}
        <div className="w-full md:w-[80vw] lg:w-[60vw]">
          <ScrollRevealParagraph text="I'm a passionate full-stack developer crafting high-performance web applications with precision and creativity. I transform complex challenges into elegant digital solutions using React, Node.js, and cutting-edge modern architecture." />
        </div>

        <motion.div ref={ctaRef} style={{ opacity: buttonOpacity, y: buttonY }} className="relative w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border-2 border-white-400 rounded-full text-white text-sm sm:text-base md:text-lg font-polysans font-medium">
              Explore My Work
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto px-8 py-3 sm:px-10 sm:py-4 border-2 border-white-400 rounded-full text-white text-sm sm:text-base md:text-lg font-polysans font-medium">
              View Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;