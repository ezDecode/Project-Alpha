import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Navbar from './Navbar'
import TextAnimate from './TextAnimate'
import AnimatedIcon from './AnimatedIcon' // Import our new SVG component

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.4
  }, [])

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  })

  // --- Animation Mapping ---

  // Fade out hero content
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // Animate navbar color
  const navColor = useTransform(scrollYProgress, [0.75, 0.85], ['#FFFFFF', '#000000'])

  // --- NEW SVG Animation Sequence ---
  const revealerOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.9, 1], [0, 1, 1, 0])
  
  // The path-drawing animation (`pathOffset`) is no longer needed.
  // The icon now appears by fading in with `revealerOpacity`.

  // 1. Rotate the SVG after it has appeared (from 40% to 60% scroll)
  const rotate = useTransform(scrollYProgress, [0.4, 0.6], [-90, 0])
  
  // 2. Scale the SVG up to reveal the next section (from 75% scroll onwards)
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 30])
  
  // Fade in the About Section content as the zoom completes
  const aboutOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1])

  return (
    <div ref={targetRef} id="home" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-screen flex flex-col items-center justify-center overflow-hidden">
        
        <Navbar textColor={navColor} />

        {/* Layer 1: The original Hero Content (fades out) */}
        <motion.div 
          className="h-full w-full absolute inset-0 z-0"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          {/* Video and Text content remains the same */}
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay loop muted playsInline>
            <source src="/assets/Raycast.webm" type="video/webm" />
          </video>
          <div className="flex items-center justify-center h-full w-full relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <img src="/assets/HeaderText.svg" alt="Creative Sky" className="max-w-none object-contain" style={{ width: '112%' }}/>
              </div>
              <div style={{ width: '80vw', margin: '0 auto' }}>
                <TextAnimate by="word" delay={0.5} duration={0.6} className="text-center" style={{ fontSize: '2.43rem', fontWeight: 500, color: 'white', lineHeight: '1.4' }}>
                  The experience you'll never forget — designed by a self-taught student who breaks the rules, blends logic with creativity, and turns pixels into unforgettable digital stories.
                </TextAnimate>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Layer 2: The Revealer / Zoom element, using the filled SVG */}
        <motion.div 
          className="relative w-[150px] h-[150px] z-20"
          style={{ rotate, scale, opacity: revealerOpacity }}
        >
          <AnimatedIcon />
        </motion.div>

        {/* Layer 3: The About Section Content (fades in on top) */}
        <motion.div
          id="about"
          className="absolute inset-0 w-full h-full bg-white flex items-center justify-center text-black font-['OverusedGrotesk'] z-30 pointer-events-none"
          style={{ opacity: aboutOpacity }}
        >
          <div className="text-center p-8">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">About Me</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              This is where your new content begins. The white background creates a seamless transition from the zoom effect.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default HeroSection