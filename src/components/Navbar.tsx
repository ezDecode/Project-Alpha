import React from 'react'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-4/5 px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 md:pt-12" style={{ zIndex: 200 }}>
      <nav className="flex justify-between items-center text-base sm:text-lg font-medium tracking-wide py-4 px-2 sm:px-4">
        <span 
          data-scroll-to="#home"
          className="hover:text-gray-300 transition-colors cursor-pointer text-white py-2 px-1" 
          style={{ 
            textShadow: '0 4px 8px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(2px)'
          }}
        >
          SKYHERE
        </span>
        <div className="flex gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          <span 
            data-scroll-to="#about"
            className="hover:text-gray-300 transition-colors cursor-pointer text-white py-2 px-3 sm:px-4" 
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(2px)'
            }}
          >
            BIO
          </span>
          <span 
            className="hover:text-gray-300 transition-colors cursor-pointer text-white py-2 px-3 sm:px-4" 
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(2px)'
            }}
          >
            WORK
          </span>
          <span 
            className="hover:text-gray-300 transition-colors cursor-pointer text-white py-2 px-3 sm:px-4" 
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(2px)'
            }}
          >
            EMAIL ME
          </span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar 