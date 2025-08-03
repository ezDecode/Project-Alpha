"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

// Data and Modal component remain the same and do not need changes.
const projects = [{title: "Excelify", src: "/assets/ProjectImages/excelify.png"}, {title: "Cloud Deck", src: "/assets/ProjectImages/cloud-deck.png"}, {title: "Code Battle", src: "/assets/ProjectImages/code-battle.png"}, {title: "QR Code Generator", src: "/assets/ProjectImages/qr-code-generator.png"}];
const Modal: React.FC<{modal: { active: boolean, index: number }; projects: typeof projects;}> = ({ modal, projects }) => {
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
  const { src, title } = projects[index];
  return (<motion.div ref={modalContainer} variants={{initial: { scale: 0, x: "-50%", y: "-50%" }, open: { scale: 1, x: "-50%", y: "-50%", transition: { type: "spring", stiffness: 300, damping: 20 } }, closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.2, ease: "easeOut" } }}} initial="initial" animate={active ? "open" : "closed"} className="h-[250px] sm:h-[350px] w-auto absolute top-1/2 left-1/2 pointer-events-none overflow-hidden rounded-xl sm:rounded-2xl"><img src={src} alt={title} className="h-full w-auto" /></motion.div>)
}

const Project: React.FC<{index: number; title: string; src: string; isMobile: boolean; setModal: React.Dispatch<React.SetStateAction<{ active: boolean, index: number }>>;}> = ({ index, title, src, isMobile, setModal }) => {
  const hoverEvents = !isMobile ? { onMouseEnter: () => setModal({ active: true, index }), onMouseLeave: () => setModal({ active: false, index }), } : {};
  return (
    <div {...hoverEvents} className="flex flex-col w-full px-4 md:px-8 py-8 sm:py-12 border-t border-neutral-700 cursor-pointer transition-opacity duration-300 group last:border-b last:border-neutral-700">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-light text-white group-hover:opacity-50 transition-opacity duration-300" style={{ fontFamily: "'PP Editorial New', serif" }}>{title}</h2>
        <p className="font-light text-sm sm:text-base md:text-lg text-neutral-300 hidden md:block group-hover:opacity-50 transition-opacity duration-300">Design & Development</p>
      </div>
      <div className="block md:hidden mt-6 w-full overflow-hidden rounded-lg">
        <img src={src} alt={`Screenshot of ${title}`} className="w-full h-auto object-cover"/>
      </div>
    </div>
  )
}

interface ProjectSectionProps {
  isMobile: boolean;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ isMobile }) => { 

  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <section id="work" className="w-full bg-black text-white py-16 sm:py-20 md:py-32 relative mb-24 sm:mb-32">
      <div className="w-[90vw] md:w-[80vw] mx-auto">
        <div className="text-left mb-12 sm:mb-16 px-4 md:px-8">
            <h2 className="text-5xl sm:text-6xl md:text-9xl font-light" style={{ fontFamily: "'PP Editorial New', serif" }}>Feat<span className="italic">u</span>red Projec<span className="italic">t</span>s</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 mt-2 sm:mt-4 italic">The Arts of Maniac presents..</p>
        </div>
        <div className='w-full'>
            {projects.map((project, index) => (
                <Project 
                  index={index} 
                  title={project.title} 
                  src={project.src}
                  isMobile={isMobile}
                  setModal={setModal} 
                  key={index}
                />
            ))}
        </div>
      </div>
      {!isMobile && <Modal modal={modal} projects={projects}/>}
    </section>
  )
}

export default ProjectSection;