"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// --- Main Project Data ---
const projects = [
    {
      title: "Excelify",
      src: "/assets/ProjectImages/excelify.png",
    },
    {
      title: "Cloud Deck",
      src: "/assets/ProjectImages/cloud-deck.png",
    },
    {
      title: "Code Battle",
      src: "/assets/ProjectImages/code-battle.png",
    },
    {
      title: "QR Code Generator",
      src: "/assets/ProjectImages/qr-code-generator.png",
    }
];

// --- Modal Component (Updated with Dynamic Width) ---
const Modal: React.FC<{
  modal: { active: boolean, index: number };
  projects: typeof projects;
}> = ({ modal, projects }) => {

  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);

  // GSAP animation for smooth mouse tracking
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

  const { src, title } = projects[index];

  return (
    <motion.div
        ref={modalContainer}
        variants={{
            initial: { scale: 0, x: "-50%", y: "-50%" },
            open: { 
                scale: 1, 
                x: "-50%", 
                y: "-50%", 
                transition: { type: "spring", stiffness: 300, damping: 20 } 
            },
            closed: { 
                scale: 0, 
                x: "-50%", 
                y: "-50%", 
                transition: { duration: 0.2, ease: "easeOut" }
            }
        }}
        initial="initial"
        animate={active ? "open" : "closed"}
        // Set a fixed height and dynamic width
        className="h-[350px] w-auto absolute top-1/2 left-1/2 pointer-events-none overflow-hidden rounded-2xl"
    >
        <img
            src={src}
            alt={title}
            // Image height is 100%, width is auto to maintain aspect ratio
            className="h-full w-auto"
        />
    </motion.div>
  )
}

// --- Project Item Component (No changes needed) ---
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


// --- Main Project Section (No changes needed) ---
export default function ProjectSection() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section id="work" className="w-full bg-black text-white py-20 md:py-32 relative mb-32">
      
      <div className="w-[80vw] mx-auto">
        
        <div className="text-left mb-16 px-4 md:px-8">
            <h2 className="text-6xl md:text-9xl font-light" style={{ fontFamily: "'PP Editorial New', serif" }}>Feat<span className="italic">u</span>red <span className="italic">Projects</span></h2>
            <p className="text-xl md:text-2xl text-neutral-400 mt-4 italic">The Arts of Maniac presents..</p>
        </div>

        <div className='w-full'>
            {
              projects.map((project, index) => {
                return <Project index={index} title={project.title} setModal={setModal} key={index}/>
              })
            }
        </div>

      </div>

      <Modal modal={modal} projects={projects}/>
    </section>
  )
}