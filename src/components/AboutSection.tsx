"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton';

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
    <p ref={targetRef} className="flex w-full flex-wrap text-base md:text-xl lg:text-2xl font-polysans justify-center leading-snug text-center text-neutral-300">
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
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headingScrollYProgress } = useScroll({ target: headingRef, offset: ['start 0.9', 'end 0.6'] });
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollYProgress } = useScroll({ target: ctaRef, offset: ['start 1', 'end 0.9'] });

  const imageHoverTransition = { type: "spring" as const, stiffness: 400, damping: 12 };
  const buttonOpacity = useTransform(ctaScrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(ctaScrollYProgress, [0, 1], [50, 0]);

  const headingElements = [
    <span key="h-1">A</span>,
    <motion.div key="h-2" className="w-12 h-9 md:w-20 md:h-16 lg:w-28 lg:h-20 bg-neutral-800 rounded-lg inline-flex overflow-hidden align-middle" whileHover={{ scale: 1.6, rotate: -15 }} transition={imageHoverTransition}>
      <img src="/assets/HeaderImage.png" alt="Pixelated Image" className="w-full h-full object-cover"/>
    </motion.div>,
    <span key="h-3">Full-Stack Devel<span className="italic">o</span>per</span>,
    <motion.div key="h-4" className="w-12 h-9 md:w-20 md:h-16 lg:w-28 lg:h-20 bg-neutral-800 rounded-lg inline-flex overflow-hidden align-middle" whileHover={{ scale: 1.6, rotate: 15 }} transition={imageHoverTransition}>
      <img src="/assets/HeaderImageBW.png" alt="Sci-Fi Image" className="w-full h-full object-cover"/>
    </motion.div>,
    <span key="h-5">who brings ideas to life...</span>
  ];

  return (
    <section id="about" className="relative min-h-[160vh] bg-black flex items-center justify-center pt-9 pb-40 md:pt-11 md:pb-48">
      <div className="w-[60vw] mx-auto flex flex-col items-center justify-center gap-12 md:gap-16">
        <h2 ref={headingRef} className="w-[60vw] text-white text-4xl md:text-6xl lg:text-7xl font-editorial font-light leading-tight text-center flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5" style={{fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.2'}}>
          {headingElements.map((element, index) => {
            const start = index / headingElements.length;
            const end = start + 1 / headingElements.length;
            return <Word key={index} progress={headingScrollYProgress} range={[start, end]}>{element}</Word>;
          })}
        </h2>
        
        <div className="w-[60vw]">
          <ScrollRevealParagraph text="I'm a passionate full-stack developer crafting high-performance web applications with precision and creativity. I transform complex challenges into elegant digital solutions using React, Node.js, and cutting-edge modern architecture." />
        </div>

        <motion.div ref={ctaRef} style={{ opacity: buttonOpacity, y: buttonY }}>
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
    </section>
  );
};

export default AboutSection;