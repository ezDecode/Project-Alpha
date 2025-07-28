import React from 'react'
import { motion } from 'framer-motion'

// The component no longer needs to accept any animated props from its parent
// for this implementation.

const AnimatedIcon: React.FC = () => {
  return (
    // The SVG viewport is set to match its original dimensions
    <motion.svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path 
        fillRule="evenodd" 
        clipRule="evenodd" 
        d="M100 0H0L100 100H0L100 200H200L100 100H200L100 0Z"
        fill="white" // The path is now filled with a solid color.
        
        // The stroke, strokeWidth, and path drawing animation properties
        // are no longer needed. The icon's appearance is controlled
        // by the opacity of its parent in HeroSection.tsx.
      />
    </motion.svg>
  )
}

export default AnimatedIcon