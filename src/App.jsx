import React, { useLayoutEffect } from 'react'
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
import { initAnimations } from './animations'

export default function App() {
  useLayoutEffect(() => {
    const cleanup = initAnimations()
    return () => cleanup()
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
