import React from 'react'

const Navbar: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-1/2 transform -translate-x-1/2 w-4/5 px-4 sm:px-6 pt-8 sm:pt-10 md:pt-12"
      style={{ zIndex: 50 }}
    >
      <nav className="flex justify-between items-center text-base sm:text-lg font-polysans font-normal tracking-wide py-4 px-2 sm:px-4 text-white">
        <span 
          className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-1"
          data-scroll-to="#home"
        >
          SKYHERE
        </span>
        <div className="flex gap-3 sm:gap-3 md:gap-4 lg:gap-5">
          <span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            data-scroll-to="#about"
          >
            BIO
          </span>
          <span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            data-scroll-to="#work"
          >
            WORK
          </span>
          <span 
            className="hover:opacity-70 transition-opacity cursor-pointer py-2 px-3 sm:px-4"
            onClick={() => window.location.href = 'mailto:contact@skyhere.dev'}
          >
            EMAIL ME
          </span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar