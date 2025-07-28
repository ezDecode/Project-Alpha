const AboutSection = () => {
  return (
    <div
      id="about"
      className="panel h-screen w-screen bg-white flex items-center justify-center text-black font-['OverusedGrotesk']"
    >
      <div className="text-center p-8">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">About Me</h2>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          This is the about section. The snapping scroll is handled by the
          LayerAnimate component, creating a seamless transition.
        </p>
      </div>
    </div>
  )
}

export default AboutSection