import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AnimatedWord from './AnimatedWord'; // <-- IMPORT THE NEW COMPONENT

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-4/5 px-4 sm:px-6 pt-5 sm:pt-6 md:pt-8"
      style={{ zIndex: 50 }}
    >
      <nav className="flex justify-between items-center text-base sm:text-lg font-polysans font-normal py-4 px-2 sm:px-4 text-white">
        
        {/* Hoverable container for the brand name */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative inline-block cursor-pointer py-2 px-1" // Removed overflow-hidden here, it's now in AnimatedWord
          data-scroll-to="#home"
        >
          {/* We still use AnimatePresence to manage the enter/exit of the whole component */}
          <AnimatePresence mode="wait">
            {isHovered ? (
              // Use the new component for "Akash Choudhury"
              <AnimatedWord
                key="name"
                text="&#169; Akash Choudhury"
              />
            ) : (
              // Use the new component for "Code By Sky"
              <AnimatedWord
                key="code"
                text="&#169; Code By Sky"
              />
            )}
          </AnimatePresence>
        </div>

        {/* --- Navigation Links (No Changes) --- */}
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
    </div>
  );
};

export default Navbar;