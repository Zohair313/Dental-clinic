import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export function initAnimations() {
  // 1. Lenis Smooth Scrolling
  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    autoRaf: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const tickerCallback = (time) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(tickerCallback)
  gsap.ticker.lagSmoothing(0)

  // 2. Hero Entrance Animation
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  if (document.querySelector('.home_hero-headline .gsap_split_word')) {
    heroTl.from('.home_hero-headline .gsap_split_word', {
      opacity: 0,
      y: 40,
      stagger: 0.05,
      duration: 1,
    })
  }

  if (document.querySelector('.home_hero-cta')) {
    heroTl.from('.home_hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
  }

  if (document.querySelector('.home_hero-bodytext')) {
    heroTl.from('.home_hero-bodytext', {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.6')
  }

  if (document.querySelector('.home_hero-image-content')) {
    heroTl.from('.home_hero-image-content', {
      opacity: 0,
      scale: 0.96,
      duration: 1.2,
    }, '-=0.8')
  }

  if (document.querySelector('.home_hero-image-text .gsap_split_word')) {
    heroTl.from('.home_hero-image-text .gsap_split_word', {
      opacity: 0,
      y: 25,
      stagger: 0.06,
      duration: 0.8,
    }, '-=0.6')
  }

  // 3. About Section ScrollTrigger Animation
  if (document.querySelector('.section_home_about')) {
    gsap.from('.home_about-headline .gsap_split_word', {
      scrollTrigger: {
        trigger: '.section_home_about',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.03,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.home_about-highlight-item', {
      scrollTrigger: {
        trigger: '.home_about-highlight-list',
        start: 'top 85%',
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out',
    })
  }

  // 4. Principles Section Sticky Image Crossfade
  const principleItems = document.querySelectorAll('.home_principles-content-item')
  const stickyImages = document.querySelectorAll('.home_principles-images-sticky')

  if (principleItems.length > 0 && stickyImages.length > 0) {
    stickyImages.forEach((img, idx) => {
      img.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      img.style.position = 'sticky'
      img.style.top = '10vh'
      if (idx === 0) {
        img.style.opacity = '1'
        img.style.transform = 'scale(1)'
      } else {
        img.style.opacity = '0'
        img.style.transform = 'scale(0.98)'
      }
    })

    principleItems.forEach((item, idx) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => {
          stickyImages.forEach((img, i) => {
            if (i === idx) {
              img.style.opacity = '1'
              img.style.transform = 'scale(1)'
            } else {
              img.style.opacity = '0'
              img.style.transform = 'scale(0.98)'
            }
          })
        },
        onEnterBack: () => {
          stickyImages.forEach((img, i) => {
            if (i === idx) {
              img.style.opacity = '1'
              img.style.transform = 'scale(1)'
            } else {
              img.style.opacity = '0'
              img.style.transform = 'scale(0.98)'
            }
          })
        },
      })
    })
  }

  // 5. Services Section Grid Cards Reveal
  if (document.querySelector('.home_services_item')) {
    gsap.from('.home_services-heading .gsap_split_word', {
      scrollTrigger: {
        trigger: '.section_home_services',
        start: 'top 80%',
      },
      opacity: 0,
      y: 25,
      stagger: 0.05,
      duration: 0.7,
      ease: 'power3.out',
    })

    gsap.from('.home_services_item', {
      scrollTrigger: {
        trigger: '.home_services-content',
        start: 'top 75%',
      },
      opacity: 0,
      y: 50,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out',
    })
  }

  // 6. Results Section
  if (document.querySelector('.section_home_results')) {
    gsap.from('.home_results-heading .gsap_split_word', {
      scrollTrigger: {
        trigger: '.section_home_results',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.04,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.home_results-grid-row-1 .home_results-image-wrapper', {
      scrollTrigger: {
        trigger: '.home_results-content-grid',
        start: 'top 75%',
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
    })
  }

  // 7. Experience Section (Horizontal scrub animation)
  const expSection = document.querySelector('.section_home_experience')
  const expList = document.querySelector('.home_experience-first-images-list')
  if (expSection && expList) {
    gsap.to(expList, {
      x: '-65%',
      ease: 'none',
      scrollTrigger: {
        trigger: expSection,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    })
  }

  // 8. Teams Section
  if (document.querySelector('.section_home_teams')) {
    gsap.from('.home_teams-headline .gsap_split_word', {
      scrollTrigger: {
        trigger: '.section_home_teams',
        start: 'top 80%',
      },
      opacity: 0,
      y: 30,
      stagger: 0.04,
      duration: 0.8,
      ease: 'power3.out',
    })

    gsap.from('.home-team-card_component', {
      scrollTrigger: {
        trigger: '.home-teams-card-wrapper',
        start: 'top 75%',
      },
      opacity: 0,
      y: 45,
      stagger: 0.1,
      duration: 0.9,
      ease: 'power3.out',
    })
  }

  // 9. CTA Section (Exact Webflow Scrub Scale & Card Reveal)
  const ctaSection = document.querySelector('.section-cta_component')
  const ctaContainer = document.querySelector('.section-cta_container')
  const ctaHeadline = document.querySelector('.section-cta_headline')
  const ctaImageWrapper = document.querySelector('.section-cta_image-wrapper')
  const ctaCardWrapper = document.querySelector('.section-cta_card-wrapper')

  if (ctaSection && ctaContainer) {
    if (ctaHeadline) {
      gsap.set(ctaHeadline, { opacity: 1, y: 0, scale: 1 })
    }
    if (ctaImageWrapper) {
      gsap.set(ctaImageWrapper, { scale: 0.45, opacity: 0, borderRadius: '24px' })
    }
    if (ctaCardWrapper) {
      gsap.set(ctaCardWrapper, { opacity: 0, scale: 0.9, y: 40 })
    }

    const ctaTl = gsap.timeline({
      scrollTrigger: {
        trigger: ctaSection,
        start: 'top top',
        end: 'bottom bottom',
        pin: ctaContainer,
        scrub: 0.8,
        anticipatePin: 1,
      },
    })

    // Phase 1: Headline fades out and lifts as you scroll
    if (ctaHeadline) {
      ctaTl.to(ctaHeadline, {
        opacity: 0,
        y: -40,
        duration: 0.35,
        ease: 'power2.inOut',
      }, 0)
    }

    // Phase 2: Plant/curved wall image scales up smoothly from small center to full bleed
    if (ctaImageWrapper) {
      ctaTl.to(ctaImageWrapper, {
        scale: 1,
        opacity: 1,
        borderRadius: '0px',
        duration: 0.55,
        ease: 'power2.out',
      }, 0.2)
    }

    // Phase 3: Woman aligner consultation card fades in and settles directly on top of the image
    if (ctaCardWrapper) {
      ctaTl.to(ctaCardWrapper, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      }, 0.6)
    }
  }

  // 10. Navbar Scroll State
  const navComponent = document.querySelector('.nav_component')
  if (navComponent) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 60) {
        navComponent.classList.add('is-scrolled')
      } else {
        navComponent.classList.remove('is-scrolled')
      }
    }, { passive: true })
  }

  // Cleanup function
  return () => {
    gsap.ticker.remove(tickerCallback)
    lenis.destroy()
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}
