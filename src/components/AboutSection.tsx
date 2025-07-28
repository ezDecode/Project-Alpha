import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <div
      id="about"
      className="panel w-screen h-screen bg-black text-white flex items-center justify-start font-overused overflow-hidden"
    >
      <div className="horizontal-track h-full w-max flex items-center gap-8 pl-24 md:pl-32">
        <h2 className="flex items-center text-6xl md:text-8xl lg:text-9xl font-medium leading-tight whitespace-nowrap">
          <span>I’m Akash, a student who builds like he belongs—</span>
          <div className="w-24 h-16 md:w-48 md:h-32 bg-neutral-800 rounded-full inline-flex mx-4 overflow-hidden flex-shrink-0">
            <img 
              src="/assets/placeholder-1.jpg"
              alt="An abstract visual representing purpose" 
              className="w-full h-full object-cover" 
            />
          </div>
          <span>with purpose, precision, and a touch of</span>
          <div className="w-20 h-20 md:w-32 md:h-32 bg-neutral-800 rounded-full inline-flex mx-4 overflow-hidden flex-shrink-0">
             <img 
                src="/assets/placeholder-2.jpg"
                alt="A creative representation of boldness" 
                className="w-full h-full object-cover" 
            />
          </div>
          <span className="pr-24 md:pr-32">boldness.</span>
        </h2>
      </div>
    </div>
  );
};

export default AboutSection;