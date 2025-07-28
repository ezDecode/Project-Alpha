import React, { useRef, useEffect } from 'react'
import Navbar from './Navbar'
import TextAnimate from './TextAnimate'

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.4
  }, [])

  return (
    <div id="home" className="panel relative h-screen w-screen overflow-hidden">
      <Navbar />
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/Raycast.webm" type="video/webm" />
      </video>
      <div className="flex items-center justify-center h-full w-full relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <img
              src="/assets/HeaderText.svg"
              alt="Creative Sky"
              className="max-w-none object-contain"
              style={{ width: '112%' }}
            />
          </div>
          <div style={{ width: '80vw', margin: '0 auto' }}>
            <TextAnimate
              by="word"
              delay={0.5}
              duration={0.6}
              className="text-center"
              style={{
                fontSize: '2.43rem',
                fontWeight: 500,
                color: 'white',
                lineHeight: '1.4',
              }}
            >
              The experience you'll never forget — designed by a self-taught
              student who breaks the rules, blends logic with creativity, and
              turns pixels into unforgettable digital stories.
            </TextAnimate>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection