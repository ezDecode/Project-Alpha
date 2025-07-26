import React from 'react'

const Navbar = () => {
  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-4/5 pt-12" style={{ zIndex: 200 }}>
      <nav className="flex justify-between items-center text-lg font-medium tracking-wide">
        <span 
          data-scroll-to="#home"
          className="hover:text-gray-300 transition-colors cursor-pointer text-white" 
          style={{ 
            textShadow: '0 4px 8px rgba(0,0,0,0.8)',
            backdropFilter: 'blur(2px)'
          }}
        >
          SKYHERE
        </span>
        <div className="flex gap-8">
          <span 
            data-scroll-to="#about"
            className="hover:text-gray-300 transition-colors cursor-pointer text-white" 
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(2px)'
            }}
          >
            BIO
          </span>
          <span 
            className="hover:text-gray-300 transition-colors cursor-pointer text-white" 
            style={{ 
              textShadow: '0 4px 8px rgba(0,0,0,0.8)',
              backdropFilter: 'blur(2px)'
            }}
          >
            WORK
          </span>
          <span 
            className="hover:text-gray-300 transition-colors cursor-pointer text-white" 
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