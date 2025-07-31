import React from 'react';
import { motion } from 'framer-motion';

interface TextAnimateProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  animation?: 'blurInUp' | 'fadeIn';
  by?: 'text' | 'word' | 'character';
  startOnView?: boolean;
  once?: boolean;
  style?: React.CSSProperties;
  startAnimation?: boolean; 
}

const TextAnimate: React.FC<TextAnimateProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  animation = 'blurInUp',
  by = 'text',
  startOnView = true,
  once = true,
  style = {},
  startAnimation, 
}) => {
  const blurInUpVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
    // --- START: FIX APPLIED HERE ---
    visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration, delay, ease: [0.25, 0.25, 0, 1] as const } }
    // --- END: FIX APPLIED HERE ---
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay } }
  };

  const variants = animation === 'blurInUp' ? blurInUpVariants : fadeInVariants;

  const animateState = startAnimation !== undefined ? (startAnimation ? "visible" : "hidden") : undefined;
  const useWhileInView = animateState === undefined && startOnView;

  if (by === 'text') {
    return (
      <motion.p
        className={className}
        style={style}
        initial="hidden"
        animate={animateState}
        whileInView={useWhileInView ? "visible" : undefined}
        viewport={{ once, margin: "-100px" }}
        variants={variants}
      >
        {children}
      </motion.p>
    );
  }

  if (by === 'word') {
    const words = children.split(' ');
    return (
      <motion.p
        className={className}
        style={style}
        initial="hidden"
        animate={animateState}
        whileInView={useWhileInView ? "visible" : undefined}
        viewport={{ once, margin: "-100px" }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
              visible: {
                filter: 'blur(0px)',
                opacity: 1,
                y: 0,
                transition: {
                  duration: duration,
                  delay: delay + index * 0.1,
                  // --- START: FIX APPLIED HERE ---
                  ease: [0.25, 0.25, 0, 1] as const
                  // --- END: FIX APPLIED HERE ---
                }
              }
            }}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    );
  }
  
  return (
    <motion.p
      className={className}
      style={style}
      initial="hidden"
      animate={animateState}
      whileInView={useWhileInView ? "visible" : undefined}
      viewport={{ once, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.p>
  );
};

export default TextAnimate;