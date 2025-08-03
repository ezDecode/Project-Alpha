"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DesktopSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DesktopSuggestionModal: React.FC<DesktopSuggestionModalProps> = ({ isOpen, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
    exit: { scale: 0.9, opacity: 0, y: 50, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl bg-[#1C1C1C] p-6 sm:p-8 text-center shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
          >
            <h3 
              className="text-2xl font-medium text-white"
              style={{ fontFamily: "'PolySans', serif" }}
            >
              For a Better Experience
            </h3>
            <p className="mt-3 text-base text-neutral-300 font-light leading-relaxed">
              This portfolio is best viewed on a desktop to fully experience the animations and layout.
            </p>
            <button
              onClick={onClose}
              className="mt-6 w-full rounded-full bg-white px-6 py-3 text-base font-medium text-black transition-transform hover:scale-105"
              style={{ fontFamily: "'PolySans', sans-serif" }}
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopSuggestionModal;