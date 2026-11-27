import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText)

const EASE = 'power1.out'
const DEFAULT_DURATION = 0.5
const DESKTOP = '(min-width: 992px)'
const MOBILE = '(max-width: 991px)'

const flatten = (...values) => values.flat(Infinity).filter(Boolean)

function createScope() {
  const splits = new Set()
  const timelines = new Set()
  const triggers = new Set()
  const listeners = []
  const delayedCalls = new Set()

  const q = (selector, root = document) => gsap.utils.toArray(selector, root)

  const split = (targets, type, mask) => {
    const elements = flatten(targets)
    if (!elements.length) return null

    const instance = SplitText.create(elements, {
      // Webflow always splits words as well when chars are requested.
      type: type === 'chars' ? 'words, chars' : type,
      tag: 'span',
      wordsClass: 'gsap_split_word++',
      charsClass: 'gsap_split_letter++',
      ...(mask ? { mask } : {}),
    })
    splits.add(instance)
    return instance
  }

  const timeline = (vars = {}) => {
    const tl = gsap.timeline({ paused: true, ...vars })
    timelines.add(tl)
    return tl
  }

  const addTween = (
    tl,
    targets,
    from,
    to,
    { position = 0, duration = DEFAULT_DURATION, stagger, tt = 2 } = {}
  ) => {
    const elements = flatten(targets)
    if (!elements.length) return

    const common = { duration, ease: EASE, force3D: true }
    if (stagger) common.stagger = stagger

    if (tt === 3) {
      tl.set(elements, { ...common, ...to }, position)
    } else if (tt === 1) {
      tl.from(elements, { ...common, ...from }, position)
    } else if (tt === 2) {
      tl.fromTo(elements, from || {}, { ...common, ...to }, position)
    } else {
      tl.to(elements, { ...common, ...to }, position)
    }
  }

  const scrollCallback = (action, tl) => {
    switch (action) {
      case 'play':
        return () => tl.play()
      case 'pause':
        return () => tl.pause()
      case 'resume':
        return () => tl.resume()
      case 'reverse':
        return () => tl.reverse()
      case 'restart':
        return () => tl.restart()
      case 'reset':
        return () => tl.pause(0)
      case 'complete':
        return () => tl.progress(1)
      default:
        return undefined
    }
  }

  const scrollTimeline = (triggerSelector, config, build) => {
    const trigger = q(triggerSelector)[0]
    if (!trigger) return null

    const tl = timeline()
    build(tl, trigger)

    const actions = [
      config.enter || 'none',
      config.leave || 'none',
      config.enterBack || 'none',
      config.leaveBack || 'none',
    ]
    const scrub = config.scrub ?? false
    const scrollConfig = {
      trigger,
      start: config.clamp ? `clamp(${config.start})` : config.start,
      end: config.clamp ? `clamp(${config.end})` : config.end,
      scrub,
      toggleActions: actions.join(' '),
    }

    if (scrub !== false) {
      scrollConfig.animation = tl
    } else {
      const callbacks = [
        ['onEnter', actions[0]],
        ['onLeave', actions[1]],
        ['onEnterBack', actions[2]],
        ['onLeaveBack', actions[3]],
      ]
      callbacks.forEach(([key, action]) => {
        const callback = scrollCallback(action, tl)
        if (callback) scrollConfig[key] = callback
      })
    }

    const st = ScrollTrigger.create(scrollConfig)
    triggers.add(st)
    return tl
  }

  const on = (element, event, handler) => {
    if (!element) return
    element.addEventListener(event, handler)
    listeners.push(() => element.removeEventListener(event, handler))
  }

  const delayedCall = (delay, callback) => {
    const call = gsap.delayedCall(delay, callback)
    delayedCalls.add(call)
    return call
  }

  const cleanup = () => {
    delayedCalls.forEach((call) => call.kill())
    delayedCalls.clear()

    listeners.forEach((remove) => remove())
    listeners.length = 0

    triggers.forEach((st) => st.kill())
    triggers.clear()

    timelines.forEach((tl) => tl.kill())
    timelines.clear()

    splits.forEach((instance) => instance.revert())
    splits.clear()
  }

  return { q, split, timeline, addTween, scrollTimeline, on, delayedCall, cleanup }
}

function setupHover(scope, selector, build, { leaveDelay = 0.1 } = {}) {
  scope.q(selector).forEach((trigger) => {
    const tl = scope.timeline()
    build(tl, trigger)
    let pendingLeave = null

    const enter = () => {
      if (pendingLeave) {
        pendingLeave.kill()
        pendingLeave = null
      }
      tl.timeScale(1)
      tl.play()
    }

    const leave = () => {
      if (pendingLeave) pendingLeave.kill()
      pendingLeave = scope.delayedCall(leaveDelay, () => {
        tl.timeScale(1.5)
        tl.reverse()
        pendingLeave = null
      })
    }

    scope.on(trigger, 'mouseenter', enter)
    scope.on(trigger, 'mouseleave', leave)
  })
}

function splitTargets(scope, element, type, mask) {
  const instance = scope.split(element, type, mask)
  return instance ? instance[type === 'chars' ? 'chars' : 'words'] : []
}

function setupButtonHover(scope) {
  setupHover(scope, '.button.is-button', (tl, trigger) => {
    const staticChars = splitTargets(scope, scope.q('.button_text.is-static', trigger), 'chars', 'chars')
    scope.addTween(
      tl,
      staticChars,
      { opacity: '100%', y: '0%' },
      { opacity: '0%', y: '-35%' },
      { position: 0, stagger: { amount: 0.15 } }
    )

    const absoluteChars = splitTargets(scope, scope.q('.button_text.is-absolute', trigger), 'chars', 'chars')
    scope.addTween(
      tl,
      absoluteChars,
      { y: '85%' },
      { y: '0%' },
      { position: 0.25, stagger: { amount: 0.1 } }
    )
  })
}

function setupNavButtonHover(scope) {
  setupHover(scope, '.button.is-nav', (tl, trigger) => {
    const staticChars = splitTargets(scope, scope.q('.button_text.is-static', trigger), 'chars', 'chars')
    scope.addTween(
      tl,
      staticChars,
      { y: '0%', opacity: '100%' },
      { y: '-35%', opacity: '0%' },
      { position: 0, stagger: { amount: 0.15 } }
    )

    const absoluteChars = splitTargets(scope, scope.q('.button_text.is-absolute', trigger), 'chars', 'chars')
    scope.addTween(
      tl,
      absoluteChars,
      { y: '85%' },
      { y: '0%' },
      { position: 0.25, stagger: { amount: 0.1 } }
    )

    scope.addTween(tl, scope.q('.button_bullet-nav', trigger), { scale: 1 }, { scale: 0.75 }, { position: 0 })
  })
}

function setupButtonIconHover(scope) {
  setupHover(scope, '.button-icon_component', (tl, trigger) => {
    scope.addTween(
      tl,
      scope.q('.button-icon_icon.is-static', trigger),
      { opacity: '100%', y: '0%' },
      { opacity: '0%', y: '-35%' },
      { position: 0 }
    )
    scope.addTween(
      tl,
      scope.q('.button-icon_icon.is-absolute', trigger),
      { y: '85%' },
      { y: '0%' },
      { position: 0.25 }
    )
  })
}

function setupTeamHover(scope) {
  setupHover(
    scope,
    '.home-team-card_component',
    (tl, trigger) => {
      scope.addTween(tl, scope.q('.home-team-card_bullet', trigger), { scale: 1 }, { scale: 0.75 }, { position: 0 })
      scope.addTween(
        tl,
        scope.q('.home-team-card-image', trigger),
        { scale: 1 },
        { scale: 1.075 },
        { position: 0 }
      )
    },
    { leaveDelay: 0 }
  )
}

function setupNavPhoneHover(scope) {
  setupHover(scope, '.nav-phone-text-icon_component', (tl, trigger) => {
    scope.addTween(
      tl,
      scope.q('.nav-phone-text-icon_icon.is-static', trigger),
      { y: '0%', opacity: '100%' },
      { y: '-35%', opacity: '0%' },
      { position: 0, duration: 0.45 }
    )
    scope.addTween(
      tl,
      scope.q('.nav-phone-text-icon_icon.is-absolute', trigger),
      { y: '90%' },
      { y: '0%' },
      { position: 0.15, duration: 0.45 }
    )
  })
}

function setupServicesHover(scope) {
  setupHover(
    scope,
    '.home_services_item',
    (tl, trigger) => {
      scope.addTween(
        tl,
        scope.q('.home_services-image.home_services-image-wrapper', trigger),
        { scale: 1 },
        { scale: 1.025 },
        { position: 0 }
      )
      scope.addTween(
        tl,
        scope.q('.home_services-icon-image.is-static', trigger),
        { opacity: '100%', x: '0%', y: '0%' },
        { opacity: '0%', x: '100%', y: '-100%' },
        { position: 0 }
      )
      scope.addTween(
        tl,
        scope.q('.home_services-icon-image.is-absolute', trigger),
        { x: '-100%', y: '100%' },
        { x: '0%', y: '0%' },
        { position: 0 }
      )
    },
    { leaveDelay: 0 }
  )
}

function setupMobileMenu(scope) {
  const openTrigger = scope.q('.nav_menu-trigger-mobile-button')[0]
  const closeTrigger = scope.q('.nav-menu-overlay_close-trigger-button')[0]
  const overlay = scope.q('.nav-menu-overlay_component')[0]
  const container = scope.q('.nav-menu-overlay_container')[0]
  const wrapper = scope.q('.nav-menu-overlay_wrapper')[0]

  if (openTrigger && overlay && container && wrapper) {
    const openTl = scope.timeline()
    scope.addTween(openTl, overlay, { display: 'none' }, { display: 'block' }, { position: 0 })
    scope.addTween(openTl, container, { y: '-100%' }, { y: '0%' }, { position: 0.25 })
    scope.addTween(openTl, wrapper, { opacity: '0%' }, { opacity: '100%' }, { position: 0.5 })
    scope.on(openTrigger, 'click', () => openTl.restart())
  }

  if (closeTrigger && overlay && container && wrapper) {
    const closeTl = scope.timeline()
    scope.addTween(closeTl, wrapper, null, { opacity: '0%' }, { position: 0, tt: 0 })
    scope.addTween(closeTl, container, null, { y: '-100%' }, { position: 0.5, tt: 0 })
    scope.addTween(closeTl, overlay, null, { display: 'none' }, { position: 0.75, tt: 0 })
    scope.on(closeTrigger, 'click', () => closeTl.restart())
  }
}

function setupNavHide(scope) {
  scope.scrollTimeline(
    '.page-wrapper',
    { start: 'top 1%', end: '1% top', scrub: 0.8, clamp: true },
    (tl, trigger) => {
      scope.addTween(tl, scope.q('.nav_component', trigger), { y: '0%' }, { y: '-100%' })
    }
  )
}

function setupHeroLoad(scope) {
  const tl = scope.timeline()

  scope.addTween(
    tl,
    scope.q('.nav_component'),
    { y: '-100%', opacity: '0%' },
    { y: '0%', opacity: '100%' },
    { position: 0.5 }
  )

  const headline = scope.q('.home_hero-headline')[0]
  const headlineWords = splitTargets(scope, headline, 'words')
  scope.addTween(
    tl,
    headlineWords,
    { opacity: '0%' },
    { opacity: '100%' },
    { position: 0.75, stagger: { amount: 0.25 } }
  )

  scope.addTween(
    tl,
    scope.q('.home_hero-cta-1, .home_hero-cta-2'),
    { opacity: '0%' },
    { opacity: '100%' },
    { position: 1, stagger: { amount: 0.25 } }
  )

  scope.addTween(
    tl,
    scope.q('.home_hero-bodytext'),
    { opacity: '0%', y: '25%' },
    { opacity: '100%', y: '0%' },
    { position: 1.25 }
  )

  return tl
}

function setupPrinciples(scope) {
  scope.scrollTimeline(
    '.home_principles-content-text',
    { start: 'top 50%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const headline = scope.q('.home_principles-headline', trigger)[0]
      const words = splitTargets(scope, headline, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
      scope.addTween(
        tl,
        scope.q('.home_principles-subheadline', trigger),
        { opacity: '0%', y: '25%' },
        { opacity: '100%', y: '0%' },
        { position: 0.5 }
      )
    }
  )
}

function setupHeroScroll(scope) {
  scope.scrollTimeline(
    '.home_hero-image-ix-trigger',
    { start: 'top bottom', end: '20% 0%', scrub: 0.8, clamp: true },
    (tl) => {
      scope.addTween(
        tl,
        scope.q('.home_hero-text-content'),
        { opacity: '100%' },
        { opacity: '0%' },
        { position: 0.2 }
      )
      scope.addTween(
        tl,
        scope.q('.home_hero-image-content'),
        { width: '50%' },
        { width: '100%' },
        { position: 0.55, duration: 1 }
      )
      scope.addTween(
        tl,
        scope.q('.home_hero-overlay'),
        { opacity: '60%' },
        { opacity: '100%' },
        { position: 1.55 }
      )
      const imageText = scope.q('.home_hero-image-text')[0]
      const words = splitTargets(scope, imageText, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 1.55, stagger: { amount: 0.25 } }
      )
    }
  )
}

function setupTestimonials(scope) {
  scope.scrollTimeline(
    '.section_home_testimonials',
    { start: 'top 25%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const heading = scope.q('.home_testimonials-heading', trigger)[0]
      const words = splitTargets(scope, heading, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
      scope.addTween(
        tl,
        scope.q('.home_testimonials-slide-mask', trigger),
        { opacity: '0%', y: '5%' },
        { opacity: '100%', y: '0%' },
        { position: 0.5 }
      )
      scope.addTween(
        tl,
        scope.q('.home_testimonials-image', trigger),
        { scale: 1.05 },
        { scale: 1 },
        { position: 1 }
      )
      scope.addTween(
        tl,
        scope.q('.home_testimonials-text-image-wrapper'),
        { opacity: '0%', y: '5%' },
        { opacity: '100%', y: '0%' },
        { position: 1.5 }
      )
    }
  )
}

function setupServices(scope) {
  scope.scrollTimeline(
    '.section_home_services',
    { start: 'top 50%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const heading = scope.q('.home_services-heading')[0]
      const words = splitTargets(scope, heading, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
      scope.addTween(
        tl,
        scope.q('.home_services_item.col-4', trigger),
        { opacity: '0%', y: '2.5%' },
        { opacity: '100%', y: '0%' },
        { position: 0.75 }
      )
      scope.addTween(
        tl,
        scope.q('.home_services_item.col-1', trigger),
        { opacity: '0%', y: '2.5%' },
        { opacity: '100%', y: '0%' },
        { position: 1, stagger: { amount: 0.5 } }
      )
    }
  )
}

function setupTeams(scope) {
  scope.scrollTimeline(
    '.section_home_teams',
    { start: 'top 25%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const headline = scope.q('.home_teams-headline', trigger)[0]
      const words = splitTargets(scope, headline, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
      scope.addTween(
        tl,
        scope.q('.home_teams-subheadline', trigger),
        { opacity: '0%', y: '15%' },
        { opacity: '100%', y: '0%' },
        { position: 0.5 }
      )
      scope.addTween(
        tl,
        scope.q('.home-teams-card-wrapper', trigger),
        { opacity: '0%', y: '5%' },
        { opacity: '100%', y: '0%' },
        { position: 1 }
      )
    }
  )
}

function setupAbout(scope) {
  scope.scrollTimeline(
    '.home_about-content',
    { start: 'top 50%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const description = scope.q('.home_about-description-text', trigger)
      const words = splitTargets(scope, description, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.5, from: 'random' } }
      )
      scope.addTween(
        tl,
        scope.q('.home_about-highlight-item', trigger),
        { opacity: '0%', y: '15%' },
        { opacity: '100%', y: '0%' },
        { position: 0.75, stagger: { amount: 0.25 } }
      )
    }
  )
}

function setupExperienceHeading(scope) {
  scope.scrollTimeline(
    '.home_experience-heading',
    { start: 'top 50%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const headline = scope.q('.home_experience-headline', trigger)[0]
      const words = splitTargets(scope, headline, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
    }
  )
}

function setupResults(scope) {
  scope.scrollTimeline(
    '.section_home_results',
    { start: 'top 25%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const heading = scope.q('.home_results-heading', trigger)[0]
      const words = splitTargets(scope, heading, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
      scope.addTween(
        tl,
        scope.q('.home_results-grid-row-1', trigger),
        { opacity: '0%', y: '1.5%' },
        { opacity: '100%', y: '0%' },
        { position: 0.5, stagger: { amount: 0.25 } }
      )
      scope.addTween(
        tl,
        scope.q('.home_results-grid-row-2', trigger),
        { opacity: '0%', x: '1%' },
        { opacity: '100%', x: '0%' },
        { position: 1.25 }
      )
    }
  )
}

function setupExperienceScroll(scope) {
  scope.scrollTimeline(
    '.home_experience-first-images-wrapper',
    { start: 'top -10%', end: 'bottom top', scrub: 0.8, clamp: true },
    (tl) => {
      scope.addTween(
        tl,
        scope.q('.home_experience-first-images-list'),
        { x: '0%' },
        { x: '-285%' },
        { position: 0, duration: 1 }
      )
      scope.addTween(
        tl,
        scope.q('.home_experience-first-images-item.is-last'),
        { scale: 1 },
        { scale: 1.3 },
        { position: 1, duration: 0.5 }
      )
      scope.addTween(
        tl,
        scope.q('.home_experinece-image-overlay'),
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 1.5, duration: 0.5 }
      )
      const fadeText = scope.q('.home_experience-fade-text')[0]
      const words = splitTargets(scope, fadeText, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 1.5, duration: 0.5, stagger: { amount: 0.25 } }
      )
    }
  )
}

function setupCta(scope) {
  scope.scrollTimeline(
    '.section-cta_component',
    { start: 'top -10%', end: '75% top', scrub: 0.8, clamp: true },
    (tl) => {
      scope.addTween(
        tl,
        scope.q('.section-cta_headline'),
        { opacity: '100%' },
        { opacity: '0%' },
        { position: 0 }
      )
      scope.addTween(
        tl,
        scope.q('.section-cta_image-wrapper'),
        { opacity: '0%', scale: 0 },
        { opacity: '100%', scale: 1 },
        { position: 0.45 }
      )
      scope.addTween(
        tl,
        scope.q('.section-cta_card-wrapper'),
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0.95 }
      )
    }
  )
}

function setupMobileHeroText(scope) {
  scope.scrollTimeline(
    '.home_hero-image-text-wrapper',
    { start: 'top 25%', end: 'bottom top', clamp: true },
    (tl, trigger) => {
      const text = scope.q('.home_hero-image-text', trigger)[0]
      const words = splitTargets(scope, text, 'words')
      scope.addTween(
        tl,
        words,
        { opacity: '0%' },
        { opacity: '100%' },
        { position: 0, stagger: { amount: 0.25 } }
      )
    }
  )
}

export function initAnimations() {
  const lenis = new Lenis({
    smoothWheel: true,
    smoothTouch: false,
    lerp: 0.1,
    wheelMultiplier: 1,
    autoRaf: false,
  })

  const onLenisScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onLenisScroll)

  const raf = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  const root = createScope()
  const scopes = [root]
  const childScope = () => {
    const scope = createScope()
    scopes.push(scope)
    return scope
  }

  const mm = gsap.matchMedia()
  let destroyed = false

  // 1. Button rolling text (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupButtonHover(scope)
    return () => scope.cleanup()
  })

  // 2. CTA scrub
  setupCta(root)

  // 3. FAQ interaction is not present on this page.

  // 4. Nav button rolling text + bullet
  setupNavButtonHover(root)

  // 5. Icon buttons (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupButtonIconHover(scope)
    return () => scope.cleanup()
  })

  // 6. Team card hover (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupTeamHover(scope)
    return () => scope.cleanup()
  })

  // 7. Mobile menu open/close
  setupMobileMenu(root)

  // 8. Nav phone hover (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupNavPhoneHover(scope)
    return () => scope.cleanup()
  })

  // 9. Nav hides as the page scrolls
  setupNavHide(root)

  // 11. Hero entrance
  const heroTl = setupHeroLoad(root)

  // 12. Principles reveal
  setupPrinciples(root)

  // 13. Hero expansion scrub (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupHeroScroll(scope)
    return () => scope.cleanup()
  })

  // 14-17, 19-20. Section reveals
  setupTestimonials(root)
  setupServices(root)
  setupTeams(root)
  setupAbout(root)
  setupExperienceHeading(root)
  setupResults(root)

  // 18. Service card hover (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupServicesHover(scope)
    return () => scope.cleanup()
  })

  // 21. Experience horizontal sequence (desktop only)
  mm.add(DESKTOP, () => {
    const scope = childScope()
    setupExperienceScroll(scope)
    return () => scope.cleanup()
  })

  // 22. Hero image text reveal (mobile only)
  mm.add(MOBILE, () => {
    const scope = childScope()
    setupMobileHeroText(scope)
    return () => scope.cleanup()
  })

  heroTl.play()

  const refresh = () => {
    if (!destroyed) ScrollTrigger.refresh()
  }
  const rafId = requestAnimationFrame(refresh)
  root.on(window, 'load', refresh)
  if (document.fonts?.ready) {
    document.fonts.ready.then(refresh).catch(() => {})
  }

  return () => {
    destroyed = true
    cancelAnimationFrame(rafId)

    mm.revert()
    scopes.forEach((scope) => scope.cleanup())

    gsap.ticker.remove(raf)
    gsap.ticker.lagSmoothing(500, 33)
    lenis.off('scroll', onLenisScroll)
    lenis.destroy()
  }
}
