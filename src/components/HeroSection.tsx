"use client";

import React, { useRef, useEffect, memo, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, motionValue } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { gsap } from 'gsap';

import Navbar from './Navbar';
import TextAnimate from './TextAnimate';
import ImageTransition from './ImageTransition';

interface LetterProps {
  char: string;
  isItalic: boolean;
  mousePos: React.RefObject<{ x: number; y: number }>;
  variants: Variants;
}
const Letter = memo<LetterProps>(({ char, isItalic, mousePos, variants }) => {
  const letterRef = useRef<HTMLSpanElement>(null);
  const weightMotionValue = motionValue(300);
  const weightSpring = useSpring(weightMotionValue, { damping: 12, stiffness: 250, mass: 0.8 });
  const fontVariationSettings = useTransform(weightSpring, (weight) => `'wght' ${weight}`);

  useEffect(() => {
    const letterEl = letterRef.current;
    if (!letterEl) return;
    let animationFrameId: number;
    const animate = () => {
      if (!mousePos.current) return;
      const { left, top, width, height } = letterEl.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distance = Math.sqrt(Math.pow(centerX - mousePos.current.x, 2) + Math.pow(centerY - mousePos.current.y, 2));
      const newTarget = gsap.utils.mapRange(0, 75, 500, 300, distance);
      const clampedWeight = gsap.utils.clamp(300, 500, newTarget);
      weightMotionValue.set(clampedWeight);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos, weightMotionValue]);

  return (
    <motion.span ref={letterRef} className={`inline-block ${isItalic ? 'italic' : ''}`} style={{ fontVariationSettings }} variants={variants}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
});

// --- Main Hero Section Component ---
interface HeroSectionProps {
  startAnimation: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ startAnimation }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mousePos = useRef({ x: -9999, y: -9999 });

  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.9]);

  useEffect(() => {
    const headingEl = headingRef.current;
    if (!headingEl) return;
    const updateMousePos = (e: MouseEvent) => { mousePos.current = { x: e.clientX, y: e.clientY }; };
    const resetMousePos = () => { mousePos.current = { x: -9999, y: -9999 }; };
    headingEl.addEventListener('mousemove', updateMousePos);
    headingEl.addEventListener('mouseleave', resetMousePos);
    return () => {
      headingEl.removeEventListener('mousemove', updateMousePos);
      headingEl.removeEventListener('mouseleave', resetMousePos);
    };
  }, []);

  const wordsPart1 = ["Code", "in", "the", "Shadows"];
  const wordsPart2 = ["Build", "in", "the", "Light."];
  const allImages = ["/assets/HeaderImage.png", "/assets/HeaderImageBW.png", "/assets/HeaderImageRed.png", "/assets/HeaderImageBWOne.png"];

  const imageInsertionIndex = useMemo(() => {
    return Math.floor(Math.random() * (wordsPart1.length - 1));
  }, [wordsPart1.length]);

  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0.2 } } };
  const childVariants: Variants = { hidden: { filter: 'blur(10px)', opacity: 0, y: 20 }, visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] as const } } };

  const isCharItalic = (word: string, char: string): boolean => {
    const lowerChar = char.toLowerCase();
    switch (word) {
      case "Code":
        return lowerChar === 'o';
      case "Shadows":
        return lowerChar === 'w';
      case "Build":
        return lowerChar === 'u';
      case "Light.":
        return lowerChar === 'g';
      default:
        return false;
    }
  };

  return (
    <div ref={targetRef} id="home" className="panel relative h-screen w-screen overflow-hidden" style={{ backgroundColor: '#FAF6E9' }}>
      <Navbar />
      <motion.div style={{ opacity, scale }} className="flex flex-col items-center justify-center h-full w-full relative z-10">
        <div className="text-center w-[70vw] mx-auto relative">
          <motion.h1 ref={headingRef} className="text-black text-[3.85rem] md:text-[6rem] lg:text-[8.25rem] font-light text-center mb-4 mt-[12vh] cursor-default flex flex-wrap justify-center items-center" style={{ fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.2', letterSpacing: '-0.03em' }} variants={containerVariants} initial="hidden" animate={startAnimation ? 'visible' : 'hidden'}>
            {wordsPart1.map((word, index) => (
              <React.Fragment key={`p1-${index}`}>
                <span className="inline-flex">
                  {word.split('').map((char, letterIndex) => (
                    <Letter key={letterIndex} char={char} isItalic={isCharItalic(word, char)} mousePos={mousePos} variants={childVariants} />
                  ))}
                </span>
                <span className="inline-block"> </span>
                
                {index === imageInsertionIndex && (
                  <>
                    <motion.div
                      className="relative lg:-translate-y-3 md:-translate-y-3 -translate-y-2 w-24 h-20 md:w-32 md:h-28 lg:w-48 lg:h-32 bg-neutral-800 rounded-2xl inline-flex overflow-hidden align-middle mx-2"
                      variants={childVariants}
                    >
                      <ImageTransition images={allImages} interval={1500} className="w-full h-full" />
                    </motion.div>
                    <span className="inline-block"> </span>
                  </>
                )}
              </React.Fragment>
            ))}

            <span className="inline-block">  </span>

            {wordsPart2.map((word, index) => (
              <React.Fragment key={`p2-${index}`}>
                <span className="inline-flex">
                  {word.split('').map((char, letterIndex) => (
                    <Letter key={letterIndex} char={char} isItalic={isCharItalic(word, char)} mousePos={mousePos} variants={childVariants} />
                  ))}
                </span>
                {index < wordsPart2.length - 1 && <span className="inline-block"> </span>}
              </React.Fragment>
            ))}

          </motion.h1>
          <TextAnimate by="word" delay={0.8} duration={0.3} className="text-center font-polysans text-[2rem] md:text-[2.15rem] font-tight" style={{ fontWeight: 400, color: 'black', lineHeight: '1.5' }} startAnimation={startAnimation}>
            The experience you'll never forget — designed by a self-taught student who breaks the rules, blends logic with creativity, and turns pixels into unforgettable.
          </TextAnimate>
        </div>
      </motion.div>
      
      <div className="absolute bottom-0 left-0 w-full h-[150px] z-20 pointer-events-none">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path d="M0,100 C40,0 60,0 100,100 L100,101 L0,101 Z" fill="black"></path>
        </svg>
      </div>

    </div>
  );
};

export default HeroSection;