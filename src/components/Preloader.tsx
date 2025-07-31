"use client";

import React, { useState, useEffect } from 'react';
import type { Variants } from 'framer-motion';
import  { motion } from 'framer-motion';
import { opacity, slideUp } from './anim';

const words = ["नमस्ते", "Hello", "Bonjour", "Ciao", "Olà", "やあ", "안녕하세요", "Hola", "Привет"];

const Preloader: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 1000 : 150);
    return () => clearTimeout(timeout);
  }, [index]);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height} L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  // CORRECTED: Explicitly type the curve object with Variants
  const curve: Variants = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
    }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className="fixed inset-0 bg-black text-white z-[100] flex items-center justify-center"
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial="initial"
            animate="enter"
            className="flex items-center text-4xl md:text-5xl z-10 font-light"
            style={{fontFamily: "'PolySans', sans serif"}}
          >
            <span className="block w-2.5 h-2.5 bg-white rounded-full mr-2.5"></span>
            {words[index]}
          </motion.p>
          <svg className="absolute top-0 w-full h-[calc(100%+300px)] pointer-events-none">
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
              className="fill-current text-black"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
};

export default Preloader;