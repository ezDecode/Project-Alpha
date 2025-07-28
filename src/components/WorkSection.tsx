import React from 'react';

// You can define your project data here
const projects = [
  { title: 'Project Alpha', imageUrl: '/assets/placeholder-1.jpg' }, // Replace with your image paths
  { title: 'Project Beta', imageUrl: '/assets/placeholder-2.jpg' },
  { title: 'Project Gamma', imageUrl: '/assets/placeholder-3.jpg' },
  { title: 'Project Delta', imageUrl: '/assets/placeholder-4.jpg' },
];

const WorkSection: React.FC = () => {
  return (
    // The .panel class allows LayerAnimate to recognize this as a main section
    <div
      id="work"
      className="panel w-full h-screen bg-neutral-900 text-white overflow-hidden"
    >
      {/* The .horizontal-track class tells our smart LayerAnimate to apply the horizontal scroll effect */}
      <div
        className="horizontal-track h-full w-max flex items-center relative gap-16 md:gap-24 px-12 md:px-24"
      >
        {/* Intro Text Block */}
        <div className="flex-shrink-0 w-[50vw] md:w-[30vw] text-left">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">My Work</h2>
          <p className="text-xl text-neutral-400">
            A selection of projects that showcase my passion for design and
            development.
          </p>
        </div>

        {/* Project Cards */}
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-[70vw] h-[70vh] md:w-[40vw] md:h-[75vh] bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* You can add project titles or other info on top of the images here */}
          </div>
        ))}

        {/* Outro Link Block */}
        <div className="flex-shrink-0 w-[50vw] md:w-[30vw] text-center">
          <a href="#" className="text-2xl md:text-3xl font-semibold hover:underline">
            View All Projects →
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkSection;