import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Principles from './components/Principles'
import Services from './components/Services'
import Results from './components/Results'
import Experience from './components/Experience'
import Teams from './components/Teams'
import Testimonials from './components/Testimonials'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const triggerAnimations = () => {
      // 1. Initialize Lenis if not already initialized
      if (window.Lenis && !window.lenis) {
        window.lenis = new window.Lenis({
          smoothWheel: true,
          smoothTouch: false,
          lerp: 0.1,
          wheelMultiplier: 1,
          autoRaf: true,
        })
      }

      // 2. Trigger native Webflow IX3 animations
      if (typeof window.initVelourIX3 === 'function') {
        window.initVelourIX3()
      }

      // 3. Notify Webflow
      if (window.Webflow && typeof window.Webflow.ready === 'function') {
        window.Webflow.ready()
      }
    }

    const timer = setTimeout(triggerAnimations, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="page-wrapper">
      <Navbar />
      <main className="main-wrapper">
        <Hero />
        <About />
        <Principles />
        <Services />
        <Results />
        <Experience />
        <Teams />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
