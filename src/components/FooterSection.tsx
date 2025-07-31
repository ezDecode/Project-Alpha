"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MagneticButton from './MagneticButton'; 

// --- Main Footer Component ---
const FooterSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // The y-axis animation logic
  const y = useTransform(scrollYProgress, [0, 1], [13 * 16, 0]);

  // Social link component
  const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-2 text-xl md:text-2xl text-neutral-400 hover:text-white transition-colors"
      style={{ fontFamily: "'PolySans', sans-serif", fontWeight: 400 }}
    >
      <span>{children}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6 inline-block transition-transform duration-300 ease-in-out group-hover:-rotate-45"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );

  return (
    <footer ref={containerRef} className="relative h-[100vh] bg-[#141414]">
      <div className="sticky top-0 h-screen text-white relative">

        {/* --- SVG element has been removed --- */}

        {/* Vertically and horizontally centered content */}
        <div className="w-full h-full flex items-center justify-center">
          <motion.div 
            style={{ y }} 
            className="relative text-right w-[80vw] mx-auto"
          >
            <h2
              className="text-[10vw] md:text-[8vw] font-medium leading-none"
              style={{ fontFamily: "'PP Editorial New', serif", fontWeight: 300 }}
            >
              <span className="block">Let's Work</span>
              <span className="block italic">Together</span>
            </h2>
            <div className="mt-12 flex justify-end gap-8 md:gap-12">
              <SocialLink href="https://github.com">GitHub</SocialLink>
              <SocialLink href="https://linkedin.com">LinkedIn</SocialLink>
              <SocialLink href="https://twitter.com">Twitter</SocialLink>
            </div>
          </motion.div>
        </div>
        
        {/* Absolutely positioned bottom navigation bar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] flex justify-between items-center text-sm md:text-base text-neutral-400 font-light border-t border-neutral-700 py-6">
          <div className='flex gap-4'>
            <span>© 2025 Akash Choudhury All Rights Reserved</span>
            <span>Needs A lot of caffeine</span>
          </div>
          <MagneticButton
             onClick={() => window.location.href = 'mailto:ezdecode@gmail.com'}
             className="bg-black-600 border-2 text-white px-8 py-4 rounded-full"
          >
             Get in Touch
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;