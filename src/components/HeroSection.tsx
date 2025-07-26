import React, { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import TextAnimate from './TextAnimate'

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.4 // 40% faster
    }
  }, [])

  return (
    <div id="home" className="h-screen w-screen text-white font-['OverusedGrotesk'] relative overflow-hidden" style={{ height: '100vh' }}>
      {/* Background Video */}
      <video 
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/assets/Raycast.webm" type="video/webm" />
      </video>

      {/* Navigation */}
      <Navbar />

      {/* Main Hero Content */}
      <div className="flex items-center justify-center h-full w-full relative z-20">
        <div className="text-center">
          {/* HeaderText.svg */}
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/assets/HeaderText.svg" 
              alt="Creative Sky" 
              className="max-w-none object-contain"
              style={{ 
                width: '112%'
              }}
            />
          </div>
          
          {/* Subtitle */}
          <div style={{ width: '80vw', margin: '0 auto' }}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              delay={0.5}
              duration={0.6}
              className="text-center"
              style={{ 
                fontSize: '2.43rem', 
                fontWeight: 500,
                color: 'white',
                lineHeight: '1.4'
              }}
            >
              The experience you'll never forget — designed by a self-taught student who breaks the rules, blends logic with creativity, and turns pixels into unforgettable digital stories.
            </TextAnimate>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection 