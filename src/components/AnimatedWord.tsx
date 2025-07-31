import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

interface AnimatedWordProps {
  text: string;
  className?: string;
}

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.015,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.01,
      staggerDirection: -1,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
};

const AnimatedWord: React.FC<AnimatedWordProps> = ({ text, className }) => {
  const letters = Array.from(text).map(char => (char === ' ' ? '\u00A0' : char));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`inline-flex overflow-hidden ${className}`}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants}>
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedWord;