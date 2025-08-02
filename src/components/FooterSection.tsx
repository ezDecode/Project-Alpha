"use client";

import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton'; 

const FooterSection: React.FC = () => {
  // --- UPDATED: Font size is now smaller on mobile ---
  const SocialLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      // Changed to `text-sm` on mobile, scaling up to `md:text-xl`
      className="group flex items-center gap-2 text-sm sm:text-lg md:text-xl text-neutral-400 hover:text-white transition-colors"
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
        className="w-4 h-4 sm:w-6 sm:h-6 inline-block transition-transform duration-300 ease-in-out group-hover:-rotate-45"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
  );

  return (
    <footer className="relative h-screen bg-[#141414] text-white">
      
      <div className="w-full h-full flex items-center justify-center">
        <div className="relative text-right w-[90vw] md:w-[80vw] mx-auto">
          <h2
            className="text-[13vw] sm:text-[10vw] md:text-[8vw] font-medium leading-none"
            style={{ fontFamily: "'PP Editorial New', serif", fontWeight: 300 }}
          >
            <div className="flex justify-end items-center gap-x-3 sm:gap-x-4 md:gap-x-6">
              <span>Let's</span>
              <motion.div
                  className="w-[20vw] h-[13vw] sm:w-[14.5vw] sm:h-[9.5vw] max-w-[150px] max-h-[100px] md:max-w-[200px] md:max-h-[135px] bg-neutral-800 rounded-lg sm:rounded-xl inline-flex overflow-hidden align-middle -translate-y-1"
                  whileHover={{ scale: 1.15, rotate: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                  <img
                      src="/assets/HeaderImageBW.png" 
                      alt="decorative"
                      className="w-full h-full object-cover"
                  />
              </motion.div>
              <span>Work</span>
            </div>
            <div className="mt-1">
              <span className="block italic">Together</span>
            </div>
          </h2>
          {/* --- UPDATED: Flex direction is now a wrapping row, aligned to the end --- */}
          <div className="mt-8 sm:mt-12 flex flex-row flex-wrap justify-end items-center gap-x-6 gap-y-2 sm:gap-x-8 md:gap-x-12">
            <SocialLink href="https://github.com">GitHub</SocialLink>
            <SocialLink href="https://linkedin.com">LinkedIn</SocialLink>
            <SocialLink href="https://twitter.com">Twitter</SocialLink>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90vw] md:w-[80vw] flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm md:text-base text-neutral-400 font-light border-t border-neutral-700 py-4 sm:py-6 gap-4 sm:gap-0">
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 text-center sm:text-left'>
          <span>© 2024 Akash Choudhury</span>
          <span>All Rights Reserved</span>
        </div>
        <MagneticButton
           onClick={() => window.location.href = 'mailto:ezdecode@gmail.com'}
           className="bg-black-600 border-2 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg"
        >
           Get in Touch
        </MagneticButton>
      </div>
    </footer>
  );
};

export default FooterSection;