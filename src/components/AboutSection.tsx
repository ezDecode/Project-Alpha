function AboutSection() {
  return (
    <div
      id="about"
      className="panel w-screen h-screen bg-black text-white flex items-center justify-start font-['OverusedGrotesk'] overflow-hidden"
    >
      <div className="horizontal-track h-full w-max flex items-center gap-8 pl-24 md:pl-32">
        <h2 className="flex items-center text-[4.875rem] md:text-[7.8rem] lg:text-[10.4rem] font-medium leading-[1.1] whitespace-nowrap">
          
          <span>I'm <span>Akash</span>, a student who builds like he belongs—</span>

          <div className="w-28 h-20 md:w-56 md:h-40 bg-neutral-800 rounded-full inline-flex mx-4 overflow-hidden flex-shrink-0">
            <img 
              src="/assets/placeholder-1.jpg" 
              alt="An abstract visual representing purpose" 
              className="w-full h-full object-cover" 
            />
          </div>

          <span>with <span>purpose</span>, <span>precision</span>, and a touch of</span>

          <div className="w-24 h-24 md:w-40 md:h-40 bg-neutral-800 rounded-full inline-flex mx-4 overflow-hidden flex-shrink-0">
             <img 
                src="/assets/placeholder-2.jpg"
                alt="A creative representation of boldness" 
                className="w-full h-full object-cover" 
            />
          </div>

          <span className="pr-24 md:pr-32"><span>boldness</span>.</span>
          
        </h2>
      </div>
    </div>
  );
}

export default AboutSection;
