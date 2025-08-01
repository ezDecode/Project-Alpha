import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import type { Variants } from 'framer-motion';
import MagneticButton from './MagneticButton';

// --- FIX: The definition for AnimatedWord is now included ---
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

// The MobileMenu definition is also required
const menuVariants: Variants = { open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }, closed: { opacity: 0, y: "-100%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }};
const navLinks = [{ title: "BIO", "href": "#about" }, { title: "PROJECT", "href": "#work" }, { title: "EMAIL ME", "href": "mailto:ezdecode@gmail.com" }];
const MobileMenu: React.FC<{onClose: () => void}> = ({onClose}) => {
  const handleLinkClick = (href: string) => { if (href.startsWith('mailto')) { window.location.href = href; } onClose(); };
  return (
    <motion.div variants={menuVariants} initial="closed" animate="open" exit="closed" className="fixed inset-0 bg-black bg-opacity-95 backdrop-blur-sm z-40 flex flex-col items-center justify-center">
      <nav className="flex flex-col items-center gap-8">
        {navLinks.map((link, i) => (
          <motion.div key={link.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.3 + i * 0.1 } }} className="text-white text-4xl font-light cursor-pointer" style={{ fontFamily: "'PP Editorial New', serif" }} data-scroll-to={link.href.startsWith("#") ? link.href : undefined} onClick={() => handleLinkClick(link.href)}>
            {link.title}
          </motion.div>
        ))}
      </nav>
    </motion.div>
  )
}

// The main Navbar component using the definitions above
interface NavbarProps {
  activeSection: string;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navColor = activeSection === 'home' ? 'text-black' : 'text-white';
  const mobileNavColor = isMenuOpen ? 'text-white' : navColor;
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (isMenuOpen) return;
    const difference = y - lastYRef.current;
    if (y < 150) { setHidden(false); }
    else if (difference > 0) { setHidden(true); }
    else { setHidden(false); }
    lastYRef.current = y;
  });

  return (
    <>
      <motion.div
        variants={{ visible: { y: 0 }, hidden: { y: '-110%' } }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed top-0 left-0 w-full px-4 sm:px-6 pt-5 sm:pt-6 md:pt-8 z-50"
      >
        <div className="w-4/5 mx-auto">
            <nav className={`flex justify-between items-center font-polysans font-normal transition-colors duration-300 ${isMobile ? mobileNavColor : navColor}`}>
                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="relative inline-block cursor-pointer text-base lg:text-xl z-50" data-scroll-to="#home">
                    <AnimatePresence mode="wait">
                        {isHovered ? <AnimatedWord key="name" text="© Akash Choudhury" /> : <AnimatedWord key="code" text="© Code By Sky" />}
                    </AnimatePresence>
                </div>
                {isMobile ? (
                  <MagneticButton onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                    <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                        <motion.div animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 4 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="w-full h-[2px] bg-black"></motion.div>
                        <motion.div animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -4 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="w-full h-[2px] bg-black"></motion.div>
                    </div>
                  </MagneticButton>
                ) : (
                  <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 text-base lg:text-xl">
                      {navLinks.map(link => (
                          <span key={link.title} className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-2 sm:px-3 md:px-4"
                              data-scroll-to={link.href.startsWith("#") ? link.href : undefined}
                              onClick={() => !link.href.startsWith("#") && (window.location.href = link.href)}>
                              {link.title}
                          </span>
                      ))}
                  </div>
                )}
            </nav>
        </div>
      </motion.div>

      <AnimatePresence>
        {isMobile && isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;