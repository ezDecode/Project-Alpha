"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Word: React.FC<{children: React.ReactNode; range: [number, number]; progress: MotionValue<number>;}> = React.memo(({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return <motion.span style={{ opacity }} className="relative">{children}</motion.span>;
});

const ScrollRevealParagraph: React.FC<{ text: string }> = ({ text }) => {
  const targetRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 0.95', 'end 0.7'] });
  const words = text.split(' ');
  return (
    <p
      ref={targetRef}
      className="relative flex w-full flex-wrap justify-center leading-snug text-center text-neutral-300"
      style={{ fontSize: 'clamp(1.25rem, 2.75vw, 1.75rem)' }}
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={index} className="mr-1.5 mt-2 inline-block"><Word progress={scrollYProgress} range={[start, end]}>{word}</Word></span>
        );
      })}
    </p>
  );
};

const AboutSection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollYProgress } = useScroll({ target: ctaRef, offset: ['start 1', 'end 0.9'] });
  const buttonOpacity = useTransform(ctaScrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(ctaScrollYProgress, [0, 1], [50, 0]);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headingScrollYProgress } = useScroll({ target: headingRef, offset: ['start 0.9', 'end 0.6'] });
  const imageHoverTransition = { type: "spring" as const, stiffness: 400, damping: 12 };

  const decorativeImageClasses = "hidden sm:inline-flex sm:w-18 sm:h-14 md:w-24 md:h-18 bg-neutral-800 rounded-lg overflow-hidden align-middle -translate-y-1";

  const headingElements = [ 
    <span key="h-1">A</span>, 
    <motion.div key="h-2" className={decorativeImageClasses} whileHover={{ scale: 1.6, rotate: -15 }} transition={imageHoverTransition}>
      <img src="/assets/HeaderImage.png" alt="Pixelated decorative" className="w-full h-full object-cover"/>
    </motion.div>, 
    <span key="h-3">Full-Stack Devel<span className="italic">o</span>per</span>, 
    <motion.div key="h-4" className={decorativeImageClasses} whileHover={{ scale: 1.6, rotate: 15 }} transition={imageHoverTransition}>
      <img src="/assets/HeaderImageBW.png" alt="Sci-Fi decorative" className="w-full h-full object-cover"/>
    </motion.div>, 
    <span key="h-5">who brings <span className="italic">ideas</span> to life...</span>
  ];

  return (
    <section
      id="about"
      className="relative bg-black py-24 md:py-36"
    >
      <div className="relative z-10 w-[80vw] max-w-5xl mx-auto flex flex-col items-center justify-center gap-10 md:gap-14">
        
        <h2
          ref={headingRef}
          className="relative w-full text-white font-editorial font-light text-center flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-2"
          style={{fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.3', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)'}}
        >
          {headingElements.map((element, index) => {
            const start = index / headingElements.length;
            const end = start + 1 / headingElements.length;
            return <Word key={index} progress={headingScrollYProgress} range={[start, end]}>{element}</Word>;
          })}
        </h2>
        
        <div>
          <ScrollRevealParagraph text="I'm a passionate full-stack developer crafting high-performance web applications with precision and creativity. I transform complex challenges into elegant digital solutions using React, Node.js, and cutting-edge modern architecture." />
        </div>

        <motion.div ref={ctaRef} style={{ opacity: buttonOpacity, y: buttonY }} className="relative w-full mt-6">
          <div className="flex flex-row items-center justify-center gap-4">
            <MagneticButton className="w-auto px-10 py-4 border border-white/80 rounded-full text-white font-polysans font-medium text-lg">
              Explore My Work
            </MagneticButton>
            <MagneticButton className="w-auto px-10 py-4 border border-white/80 rounded-full text-white font-polysans font-medium text-lg">
              View Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;