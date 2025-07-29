"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import MagneticButton from './MagneticButton'; // Ensure this path is correct

// --- Reusable Word Component for Scroll Reveal ---
// Memoized to prevent re-renders if props haven't changed.
const Word: React.FC<{
  children: React.ReactNode;
  range: [number, number];
  progress: MotionValue<number>;
}> = React.memo(({ children, range, progress }) => {
  // Animate opacity based on scroll progress within the given range
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="relative">
      {children}
    </motion.span>
  );
});

// --- ScrollRevealParagraph Component ---
const ScrollRevealParagraph: React.FC<{ text: string }> = ({ text }) => {
  const targetRef = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Animation starts when top of paragraph enters 95% of viewport, ends at 70%
    offset: ['start 0.95', 'end 0.7']
  });
  const words = text.split(' ');

  return (
    <p
      ref={targetRef}
      className="flex w-full flex-wrap text-2xl md:text-3xl lg:text-4xl justify-center font-dmsans leading-relaxed text-center text-neutral-300"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={index} className="mr-3 mt-2.5 inline-block">
            <Word progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          </span>
        );
      })}
    </p>
  );
};

// --- Main AboutSection Component ---
const AboutSection: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress: headingScrollYProgress } = useScroll({
    target: headingRef,
    // Animation starts when top of heading enters 90% of viewport, ends at 60%
    offset: ['start 0.9', 'end 0.6']
  });

  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollYProgress } = useScroll({
    target: ctaRef,
    // Animation starts when top of CTA enters viewport, ends when it's 10% in
    offset: ['start 1', 'end 0.9']
  });

  const imageHoverTransition = { type: "spring" as const, stiffness: 400, damping: 12 };
  
  // Animation for the CTA buttons, linked to its specific scroll progress
  const buttonOpacity = useTransform(ctaScrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(ctaScrollYProgress, [0, 1], [50, 0]);

  // An array of all elements within the heading for easier mapping
  const headingElements = [
    <span key="h-1">A</span>,
    <motion.div key="h-2" className="w-16 h-12 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-neutral-800 rounded-xl inline-flex overflow-hidden align-middle" whileHover={{ scale: 1.75, rotate: -15 }} transition={imageHoverTransition}>
      <img src="/assets/HeaderImage.png" alt="Profile Header" className="w-full h-full object-cover"/>
    </motion.div>,
    <span key="h-3">Full-Stack Developer</span>,
    <motion.div key="h-4" className="w-16 h-12 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-neutral-800 rounded-xl inline-flex overflow-hidden align-middle" whileHover={{ scale: 1.75, rotate: 15 }} transition={imageHoverTransition}>
      <img src="https://images.unsplash.com/photo-1599187752140-5b1b6d131f4a?q=80&w=2835&auto=format&fit=crop" alt="An aerial view" className="w-full h-full object-cover"/>
    </motion.div>,
    <span key="h-5">who brings ideas to life...</span>,
    <motion.div key="h-6" className="w-16 h-12 md:w-24 md:h-20 lg:w-32 lg:h-24 bg-neutral-800 rounded-xl inline-flex overflow-hidden align-middle" whileHover={{ scale: 1.75, rotate: -15 }} transition={imageHoverTransition}>
      <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2940&auto=format&fit=crop" alt="A person in a field" className="w-full h-full object-cover"/>
    </motion.div>
  ];

  return (
    <section id="about" className="relative min-h-[160vh] bg-black flex items-center justify-center py-40 md:py-48">
      <div className="w-[80vw] mx-auto flex flex-col items-center justify-center gap-16 md:gap-20">
        <h2 ref={headingRef} className="w-full text-white text-6xl md:text-8xl lg:text-9xl font-instrument font-medium leading-tight text-center flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
          {headingElements.map((element, index) => {
            const start = index / headingElements.length;
            const end = start + 1 / headingElements.length;
            return (
              <Word key={index} progress={headingScrollYProgress} range={[start, end]}>
                {element}
              </Word>
            );
          })}
        </h2>

        {/* --- MODIFIED: Increased paragraph container width to 85% --- */}
        <div className="w-[85%] mx-auto">
          <ScrollRevealParagraph text="I'm a full-stack developer building high-performance, intuitive web applications with the MERN stack. I specialize in turning complex problems into elegant digital solutions using React, Node.js, and serverless architecture." />
        </div>

        <motion.div ref={ctaRef} style={{ opacity: buttonOpacity, y: buttonY }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              className="w-full sm:w-auto px-10 py-4 border border-neutral-600 rounded-full text-white text-base md:text-lg font-dmsans font-medium font-dm-sans"
            >
              EXPLORE MY WORK
            </MagneticButton>
            <MagneticButton
              className="w-full sm:w-auto px-10 py-4 border border-neutral-600 rounded-full text-white text-base md:text-lg font-dmsans font-medium font-dm-sans"
            >
              VIEW RESUME
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;