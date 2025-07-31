// ... (imports and Letter component are the same)
import React, { useRef, useEffect, memo } from 'react';
import Navbar from './Navbar';
import TextAnimate from './TextAnimate';
import { motion, useScroll, useTransform, useSpring, motionValue } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { gsap } from 'gsap';
import ImageTransition from './ImageTransition';

interface LetterProps { char: string; isItalic: boolean; mousePos: React.MutableRefObject<{ x: number; y: number; }>; variants: Variants; }
const Letter = memo<LetterProps>(({ char, isItalic, mousePos, variants }) => { /* ... */ 
  const letterRef = useRef<HTMLSpanElement>(null);
  const weightMotionValue = motionValue(300);
  const weightSpring = useSpring(weightMotionValue, { damping: 12, stiffness: 250, mass: 0.8 });
  const fontVariationSettings = useTransform(weightSpring, (weight) => `'wght' ${weight}`);
  useEffect(() => {
    const letterEl = letterRef.current;
    if (!letterEl) return;
    let animationFrameId: number;
    const animate = () => {
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

  const headingPart1 = "Code in the ";
  const headingPart2 = " Shadows, Build in the Light.";
  const fullHeading = headingPart1 + headingPart2;
  const wIndex = fullHeading.indexOf('w');
  const uIndex = fullHeading.indexOf('u');
  const gIndex = fullHeading.indexOf('g');
  const images = ["/assets/HeaderImage.png", "/assets/HeaderImageBW.png", "/assets/HeaderImageRed.png"];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.02, delayChildren: 0.2 } }, // Added delayChildren
  };

  const childVariants: Variants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
    visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.25, 0, 1] } },
  };

  return (
    <div ref={targetRef} id="home" className="panel relative h-screen w-screen overflow-hidden bg-black">
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-5"></div>
      
      <motion.div style={{ opacity, scale }} className="flex flex-col items-center justify-center h-full w-full relative z-10">
        <div className="text-center w-[70vw] mx-auto relative">
          <motion.h1 
            ref={headingRef} 
            className="text-white text-[3.85rem] md:text-[6rem] lg:text-[8.25rem] font-light text-center mb-12 cursor-default flex flex-wrap justify-center items-center" 
            style={{ fontFamily: "'PP Editorial New', serif", fontWeight: 300, lineHeight: '1.2' }}
            variants={containerVariants}
            initial="hidden"
            animate={startAnimation ? 'visible' : 'hidden'}
          >
            {/* ... (mapping over letters remains the same) */}
            {headingPart1.split("").map((char, index) => {
              const originalIndex = index;
              const isItalic = originalIndex === wIndex || originalIndex === uIndex || originalIndex === gIndex;
              return <Letter key={`p1-${index}`} char={char} isItalic={isItalic} mousePos={mousePos} variants={childVariants} />;
            })}
            <motion.div className="relative lg:-translate-y-3 md:-translate-y-3 -translate-y-2 w-24 h-20 md:w-32 md:h-28 lg:w-48 lg:h-32 bg-neutral-800 rounded-full inline-flex overflow-hidden align-middle mx-2" variants={childVariants}>
                <ImageTransition images={images} className="w-full h-full"/>
            </motion.div>
            {headingPart2.split("").map((char, index) => {
              const originalIndex = headingPart1.length + index;
              const isItalic = originalIndex === wIndex || originalIndex === uIndex || originalIndex === gIndex;
              return <Letter key={`p2-${index}`} char={char} isItalic={isItalic} mousePos={mousePos} variants={childVariants} />;
            })}
          </motion.h1>

          {/* CORRECTED: Pass startAnimation prop and set delay */}
          <TextAnimate 
            by="word" 
            delay={0.8} // Delay to start after the heading
            duration={0.3} 
            className="text-center font-polysans text-[2rem] md:text-[2.05rem]" 
            style={{ fontWeight: 400, color: '#d4d4d4', lineHeight: '1.5' }}
            startAnimation={startAnimation} // Pass the prop here
          >
            The experience you'll never forget — designed by a self-taught student who breaks the rules, blends logic with creativity, and turns pixels into unforgettable digital stories.
          </TextAnimate>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;