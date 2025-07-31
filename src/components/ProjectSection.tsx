"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// --- Main Project Data ---
const projects = [
    {
      title: "Excelify",
      src: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "#D1D1D1"
    },
    {
      title: "Cloud Deck",
      src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2940&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "#E0A37E"
    },
    {
      title: "Code Battle",
      src: "https://images.unsplash.com/photo-1542291026-7eec264c27ab?q=80&w=2940&auto=format&fit=crop&ixlib-rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "#A2A4A6"
    },
    {
      title: "Figma Designs",
      src: "https://images.unsplash.com/photo-1491553662414-22b9449f8443?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "#B0B0B0"
    }
];

// --- Modal Component (No changes needed here) ---
const Modal: React.FC<{
  modal: { active: boolean, index: number };
  projects: typeof projects
}> = ({ modal, projects }) => {

  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalContainer.current) {
        const moveContainerX = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
        const moveContainerY = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          moveContainerX(clientX);
          moveContainerY(clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <motion.div ref={modalContainer}
        variants={{
            initial: { scale: 0, x:"-50%", y:"-50%" },
            open: { scale: 1, x:"-50%", y:"-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
            closed: { scale: 0, x:"-50%", y:"-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
        }}
        initial="initial"
        animate={active ? "open" : "closed"}
        className="h-[350px] w-[400px] absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center rounded-2xl"
        style={{top: '50%', left: '50%'}}
    >
      <div style={{top: index * -100 + "%"}} className="h-full w-full absolute transition-all duration-500" >
        {
          projects.map( (project, pIndex) => {
            const { src, color } = project
            return <div className="h-full w-full flex items-center justify-center" style={{backgroundColor: color}} key={`modal_${pIndex}`}>
              <img src={`${src}`} width={300} height={0} alt="image" className='h-auto'/>
            </div>
          })
        }
      </div>
    </motion.div>
  )
}

// --- Project Item Component (No changes needed here) ---
const Project: React.FC<{
  index: number;
  title: string;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean, index: number }>>;
}> = ({ index, title, setModal }) => {
  return (
    <div
      onMouseEnter={() => {setModal({active: true, index})}}
      onMouseLeave={() => {setModal({active: false, index})}}
      className="flex w-full justify-between items-center px-4 md:px-8 py-12 border-t border-neutral-700 cursor-pointer transition-opacity duration-300 hover:opacity-50 last:border-b last:border-neutral-700"
    >
      <h2 className="text-4xl md:text-6xl font-light text-white" style={{ fontFamily: "'PP Editorial New', serif" }}>{title}</h2>
      <p className="font-light text-base md:text-lg text-neutral-300 hidden sm:block">Design & Development</p>
    </div>
  )
}


// --- Main Project Section ---
export default function ProjectSection() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section id="work" className="w-full bg-black text-white py-20 md:py-32 relative mb-32">
      
      {/* Main container with 80vw width and centered */}
      <div className="w-[80vw] mx-auto">
        
        {/* Heading section */}
        <div className="text-left mb-16 px-4 md:px-8">
            <h2 className="text-5xl md:text-7xl font-light" style={{ fontFamily: "'PP Editorial New', serif" }}>Recent Works</h2>
            <p className="text-lg md:text-xl text-neutral-400 mt-4">The Arts of Maniac presents..</p>
        </div>

        {/* The list of projects now resides inside the 80vw container */}
        <div className='w-full'>
            {
              projects.map((project, index) => {
                return <Project index={index} title={project.title} setModal={setModal} key={index}/>
              })
            }
        </div>

      </div>

      {/* Modal remains outside to be positioned relative to the viewport */}
      <Modal modal={modal} projects={projects}/>
    </section>
  )
}