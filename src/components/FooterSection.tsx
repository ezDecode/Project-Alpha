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
    <footer ref={containerRef} className="relative h-[150vh] bg-[#141414]">
      <div className="sticky top-0 h-screen text-white relative">

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
              <div className="flex justify-end items-center gap-x-4 md:gap-x-6">
                <span>Let's</span>
                <motion.div
                    className="w-[14.5vw] h-[9.5vw] max-w-[200px] max-h-[135px] bg-neutral-800 rounded-full inline-flex overflow-hidden align-middle -translate-y-1" // <-- FIX: Increased size by ~20%
                    whileHover={{ scale: 1.15, rotate: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                    <img
                        src="/assets/HeaderImageBW.png" 
                        alt="decorative image"
                        className="w-full h-full object-cover"
                    />
                </motion.div>
                <span>Work</span>
              </div>
              <div className="mt-1">
                <span className="block italic">Together</span>
              </div>
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
            <span>© 2024 Akash Choudhury</span>
            <span>All Rights Reserved</span>
          </div>
          <MagneticButton
             onClick={() => window.location.href = 'mailto:ezdecode@gmail.com'}
             className="bg-indigo-600 text-white px-8 py-4 rounded-full"
          >
             Get in Touch
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;