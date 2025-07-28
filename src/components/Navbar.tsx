import React from 'react'
import { motion, MotionValue } from 'framer-motion'

// Define props to accept an animated color value
interface NavbarProps {
  textColor: MotionValue<string>
}

const Navbar: React.FC<NavbarProps> = ({ textColor }) => {
  return (
    // The fixed positioning and high z-index keep it on top
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-4/5 px-4 sm:px-6 pt-8 sm:pt-10 md:pt-12" style={{ zIndex: 50 }}>
      <nav className="flex justify-between items-center text-base sm:text-lg font-medium tracking-wide py-4 px-2 sm:px-4">
        {/* Use motion.span and apply the animated textColor */}
        <motion.span 
          data-scroll-to="#home"
          className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-1"
          style={{ color: textColor }}
        >
          SKYHERE
        </motion.span>
        <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <motion.span 
            data-scroll-to="#about"
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            style={{ color: textColor }}
          >
            BIO
          </motion.span>
          <motion.span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            style={{ color: textColor }}
          >
            WORK
          </motion.span>
          <motion.span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            style={{ color: textColor }}
          >
            EMAIL ME
          </motion.span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar