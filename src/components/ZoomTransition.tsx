import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ZoomTransition = () => {
  // Create a reference to the component's container element
  const targetRef = useRef<HTMLDivElement>(null)

  // Track scroll progress relative to the target container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Animate from when the start of the container meets the end of the viewport,
    // to when the end of the container meets the start of the viewport.
    offset: ['start end', 'end start'],
  })

  // Define animations based on scroll progress using useTransform
  // 1. Rotate the plus sign as the user scrolls into the section
  const rotate = useTransform(scrollYProgress, [0.4, 0.6], [0, 90])

  // 2. Animate the clip-path to transform the plus sign into a square
  // The polygon values are interpolated from a thin bar to a full square.
  const clipPathProgress1 = useTransform(scrollYProgress, [0.6, 0.8], [45, 0])
  const clipPathProgress2 = useTransform(scrollYProgress, [0.6, 0.8], [55, 100])
  const clipPath = useTransform(
    [clipPathProgress1, clipPathProgress2],
    ([p1, p2]) => `polygon(${p1}% 0%, ${p2}% 0%, ${p2}% 100%, ${p1}% 100%)`
  )

  // 3. Scale the square up to fill the entire viewport for the final zoom effect
  const scale = useTransform(scrollYProgress, [0.85, 1], [1, 25])

  return (
    // This container provides the necessary scrollable height for the animation to play out.
    <div ref={targetRef} className="relative h-[300vh] bg-black">
      
      {/* This element sticks to the top of the viewport while scrolling through the parent */}
      <div className="sticky top-0 h-screen w-screen flex items-center justify-center overflow-hidden">
        
        {/* This is the animated element container. It rotates and scales. */}
        <motion.div 
          className="relative w-[120px] h-[120px]" 
          style={{ rotate, scale }}
        >
          {/* Vertical bar of the plus sign */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white"
            style={{ clipPath }}
          />
          {/* Horizontal bar (a rotated vertical bar) */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-white"
            style={{ 
              clipPath,
              rotate: 90 
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default ZoomTransition