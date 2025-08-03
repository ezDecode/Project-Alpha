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
      /*
        --- LINE HEIGHT REDUCTION ---
        Changed `leading-relaxed` to `leading-snug` to decrease the vertical spacing between lines.
      */
      className="relative flex w-full flex-wrap justify-center leading-tight text-tight text-center text-neutral-300"
      style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
    >
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (<span key={index} className="mr-2 mt-2 inline-block"><Word progress={scrollYProgress} range={[start, end]}>{word}</Word></span>);
      })}
    </p>
  );
};

const AboutSection: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ctaScrollYProgress } = useScroll({ target: ctaRef, offset: ['start 1', 'end 0.9'] });
  const buttonOpacity = useTransform(ctaScrollYProgress, [0, 1], [0, 1]);
  const buttonY = useTransform(ctaScrollYProgress, [0, 1], [50, 0]);

  return (
    <section
      id="about"
      className="relative bg-black py-24 md:py-36"
    >
      <div className="relative z-10 w-[90vw] max-w-5xl mx-auto flex flex-col items-center justify-center gap-10 md:gap-14">
        
        <h2
          className="relative w-full text-white font-editorial font-light text-center"
          style={{fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.3', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)'}}
        >
          A Full-Stack Developer
          <span className="block">
            who brings <span className="italic">ideas</span> to life...
          </span>
        </h2>
        
        <div className="w-full max-w-4xl">
          <ScrollRevealParagraph text="I'm a passionate full-stack developer crafting high-performance web applications with precision and creativity. I transform complex challenges into elegant digital solutions using React, Node.js, and cutting-edge modern architecture." />
        </div>

        <motion.div ref={ctaRef} style={{ opacity: buttonOpacity, y: buttonY }} className="relative w-full mt-6">
          <div className="flex flex-row items-center justify-center gap-4">
            <MagneticButton className="w-auto px-8 py-3.5 border border-white/80 rounded-full text-white font-polysans font-medium text-sm sm:text-base">
              Explore My Work
            </MagneticButton>
            <MagneticButton className="w-auto px-8 py-3.5 border border-white/80 rounded-full text-white font-polysans font-medium text-sm sm:text-base">
              View Resume
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;