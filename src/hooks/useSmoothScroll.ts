import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      syncTouch: true
    })

    lenisRef.current = lenis

    lenis.on('scroll', () => {
      ScrollTrigger.update()
    })

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    gsap.ticker.lagSmoothing(0)

    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement
      const href = target.getAttribute('data-scroll-to')
      
      if (href) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: 0, duration: 1.5 })
        }
      }
    }

    document.addEventListener('click', handleNavClick)

    return () => {
      document.removeEventListener('click', handleNavClick)
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId)
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element as HTMLElement, { offset: 0, duration: 1.5 })
    }
  }

  return { scrollToSection }
}

export default useSmoothScroll 