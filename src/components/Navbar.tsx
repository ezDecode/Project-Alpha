import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import type { Variants } from 'framer-motion';

// --- Reusable AnimatedWord Component ---
const containerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.015 } },
  exit: { transition: { staggerChildren: 0.01, staggerDirection: -1 } },
};

const letterVariants: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

interface AnimatedWordProps {
  text: string;
  className?: string;
}

const AnimatedWord: React.FC<AnimatedWordProps> = ({ text, className }) => {
  const letters = Array.from(text).map(char => (char === ' ' ? '\u00A0' : char));
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`inline-flex overflow-hidden ${className}`}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- Main Navbar Component ---
interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 1. DYNAMIC COLOR LOGIC
  // If `isScrolled` is true (dark background), color is white. Otherwise, it's black.
  const navColor = isScrolled ? 'text-white' : 'text-black';
  
  // 2. HIDE-ON-SCROLL LOGIC
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    
    // Always show navbar at the top of the page
    if (y < 150) {
      setHidden(false);
    } else {
      // Hide on scroll down, show on scroll up
      if (difference > 0) { 
        setHidden(true);
      } else { 
        setHidden(false);
      }
    }
    
    lastYRef.current = y;
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: '-110%' }, // Slides the navbar up and out of view
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-4/5 px-4 sm:px-6 pt-5 sm:pt-6 md:pt-8"
      style={{ zIndex: 50 }}
    >
      {/* The `navColor` class is applied here and inherited by all child text elements */}
      <nav className={`flex justify-between items-center text-base sm:text-lg font-polysans font-normal py-4 px-2 sm:px-4 transition-colors duration-300 ${navColor}`}>
        
        {/* Logo with hover effect */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative inline-block cursor-pointer py-2 px-1"
          data-scroll-to="#home"
        >
          <AnimatePresence mode="wait">
            {isHovered ? (
              <AnimatedWord
                key="name"
                text="© Akash Choudhury"
              />
            ) : (
              <AnimatedWord
                key="code"
                text="© Code By Sky"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Navigation links */}
        <div className="flex gap-3 sm:gap-3 md:gap-4 lg:gap-5">
          <span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            data-scroll-to="#about"
          >
            BIO
          </span>
          <span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            data-scroll-to="#work"
          >
            WORK
          </span>
          <span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            onClick={() => window.location.href = 'mailto:ezdecode@gmail.com'}
          >
            EMAIL ME
          </span>
        </div>
      </nav>
    </motion.div>
  );
};

export default Navbar;