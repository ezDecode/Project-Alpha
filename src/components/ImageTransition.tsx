import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion'; // CORRECTED: Import 'Variants' as a type

interface ImageTransitionProps {
  images: string[];
  className?: string;
}

const ImageTransition: React.FC<ImageTransitionProps> = ({ images, className = '' }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Ensure there are images to cycle through to prevent errors
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1800); // Change image every 1.5 seconds
    
    return () => clearInterval(timer);
  }, [images.length]);

  // Explicitly type the variants object
  const variants: Variants = {
    enter: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] // ease-in-out
      }
    },
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] // ease-in-out
      }
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt="Transitioning Image"
          className="absolute inset-0 w-full h-full object-cover"
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
        />
      </AnimatePresence>
    </div>
  );
};

export default ImageTransition;