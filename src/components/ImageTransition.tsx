import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface ImageTransitionProps {
  images: string[];
  className?: string;
  interval?: number;
  initialIndex?: number;
}

const ImageTransition: React.FC<ImageTransitionProps> = ({ 
  images, 
  className = '', 
  interval = 1500,
  initialIndex = 0
}) => {
  // --- START: ADDED GUARD CLAUSE ---
  // If images is not a valid array with items, render nothing to prevent a crash.
  if (!images || images.length === 0) {
    return null;
  }
  // --- END: ADDED GUARD CLAUSE ---

  const [index, setIndex] = useState(initialIndex % images.length);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const variants: Variants = {
    enter: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    hidden: { opacity: 0, filter: 'blur(10px)' },
    exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[index]} 
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