import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TextReveal: React.FC<{ children: string }> = ({ children }) => {
  const words = children.split(' ');

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03 } },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: "spring" as const, damping: 15, stiffness: 100 },
    },
  };

  return (
    <motion.p
      className="flex flex-wrap text-2xl md:text-3xl lg:text-4xl justify-center font-dmsans font-medium leading-relaxed text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="mr-2.5 mt-2.5 inline-block"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

const AboutSection: React.FC = () => {
  const targetRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const imageHoverTransition = { type: 'spring' as const, stiffness: 400, damping: 12 };

  const useFadeInUp = (range: [number, number]) => {
      return {
          opacity: useTransform(scrollYProgress, range, [0, 1]),
          y: useTransform(scrollYProgress, range, [40, 0]),
      };
  };
  
  const headingAnimation = useFadeInUp([0.1, 0.35]);
  const paragraphAnimation = useFadeInUp([0.25, 0.5]);
  const buttonAnimation = useFadeInUp([0.4, 0.6]);


  return (
    <section
      id="about"
      ref={targetRef}
      className="panel w-screen h-auto bg-black flex items-center justify-center py-28 md:py-36"
    >
      <div className="w-[80vw] max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 md:gap-16">
        
        <motion.div style={headingAnimation} className="w-full">
          <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-instrument font-medium leading-tight text-center flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <span>A</span>
            <motion.div
              className="w-16 h-12 md:w-24 md:h-16 bg-neutral-800 rounded-xl inline-flex overflow-hidden align-middle"
              whileHover={{ scale: 1.15, rotate: -15 }}
              transition={imageHoverTransition}
            >
              <img src="/assets/placeholder-1.jpg" alt="A landscape" className="w-full h-full object-cover"/>
            </motion.div>
            <span>Full-Stack Developer</span>
            <motion.div
              className="w-16 h-12 md:w-24 md:h-16 bg-neutral-800 rounded-xl inline-flex overflow-hidden align-middle"
              whileHover={{ scale: 1.15, rotate: 15 }}
              transition={imageHoverTransition}
            >
              <img src="/assets/placeholder-2.jpg" alt="An aerial view" className="w-full h-full object-cover"/>
            </motion.div>
            <span>who brings ideas to life...</span>
            <motion.div
              className="w-16 h-12 md:w-24 md:h-16 bg-neutral-800 rounded-xl inline-flex overflow-hidden align-middle"
              whileHover={{ scale: 1.15, rotate: -15 }}
              transition={imageHoverTransition}
            >
              <img src="/assets/placeholder-3.jpg" alt="A person in a field" className="w-full h-full object-cover"/>
            </motion.div>
          </h2>
        </motion.div>

        <motion.div style={paragraphAnimation} className="w-full max-w-4xl">
          <TextReveal>
            I'm Akash Choudhury, a full-stack developer specializing in the MERN stack. I build modern, intuitive web applications that transform complex problems into elegant digital solutions. With a strong foundation in React, Node.js, and serverless architecture, I deliver seamless user experiences and robust, high-performance applications. My passion lies in turning creative concepts into reality, one line of code at a time.
          </TextReveal>
        </motion.div>
        
        <motion.div style={buttonAnimation}>
          <button className="px-8 py-3 border border-neutral-600 rounded-full text-white hover:bg-white hover:text-black transition-colors duration-300 text-sm md:text-base font-dmsans font-medium">
            EXPLORE MY WORK
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;