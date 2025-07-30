import React, { useRef, useEffect } from 'react';
import Navbar from './Navbar';
import TextAnimate from './TextAnimate';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  
  const opacity = useTransform(scrollYProgress, [0.5, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [1, 0.9]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 1.4;
  }, []);

  return (
    <div ref={targetRef} id="home" className="panel relative h-screen w-screen overflow-hidden bg-black">
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
      
      {/* Gradient overlay for seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black z-5"></div>
      
      <motion.div style={{ opacity, scale }} className="flex items-center justify-center h-full w-full relative z-10">
        <div className="text-center w-[80vw] mx-auto relative">
          <div className="flex items-center justify-center mb-6 w-full">
            <img
              src="/assets/HeaderText.svg"
              alt="Creative Sky"
              className="max-w-full object-contain mx-auto"
              style={{ width: '101%', maxWidth: '100%' }}
            />
          </div>
          <TextAnimate
            by="word"
            delay={0.5}
            duration={0.6}
            className="text-center font-editorial"
            style={{
              fontSize: '2.25rem',
              fontWeight: 400,
              color: 'white',
              lineHeight: '1.4',
            }}
          >
            The experience you'll never forget — designed by a self-taught
            student who breaks the rules, blends logic with creativity, and
            turns pixels into unforgettable digital stories.
          </TextAnimate>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;