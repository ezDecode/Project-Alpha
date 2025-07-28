import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const AnimatedIcon: React.FC = () => {
  return (
    <motion.svg
      width="150"
      height="150"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M100 0H0L100 100H0L100 200H200L100 100H200L100 0Z"
        fill="white"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2, ease: 'easeInOut' },
          },
        }}
      />
    </motion.svg>
  )
}

const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 2.5 }}
      style={{ pointerEvents: loading ? 'all' : 'none' }}
    >
      <AnimatedIcon />
    </motion.div>
  )
}

export default LoadingScreen