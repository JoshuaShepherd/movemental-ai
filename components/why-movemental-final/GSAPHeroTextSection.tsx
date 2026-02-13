'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** GSAP scroll-driven hero: What if... → bigger → this week → background → network payoff */
export function GSAPHeroTextSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const block1Ref = useRef<HTMLDivElement>(null)
  const block2Ref = useRef<HTMLDivElement>(null)
  const block3Ref = useRef<HTMLDivElement>(null)
  const block4Ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const block1 = block1Ref.current
      const block2 = block2Ref.current
      const block3 = block3Ref.current
      const block4 = block4Ref.current

      if (!section || !block1 || !block2 || !block3 || !block4) return

      const scrollLength = '+=400%'

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollLength,
          pin: true,
          scrub: 0.8,
        },
      })

      // Block 1: opening "What if everything..." — visible, then fades as we scroll
      gsap.set(block1, { opacity: 1, y: 0 })
      gsap.set(block2, { opacity: 0, y: 30 })
      gsap.set(block3, { opacity: 0, y: 30 })
      gsap.set(block4, { opacity: 0, y: 30 })

      // Phase 1: block1 stays, gets slightly bigger
      tl.to(block1, { scale: 1.08, opacity: 1, duration: 1, ease: 'power1.inOut' }, 0)
      // Phase 2: block1 fades out, block2 ("What if it could happen this week?") fades in
      tl.to(block1, { opacity: 0, y: -40, duration: 0.6, ease: 'power2.in' }, 1)
      tl.fromTo(block2, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1)
      // Phase 3: block2 fades, block3 (background / Alan/Brad/98 leaders) fades in
      tl.to(block2, { opacity: 0, y: -30, duration: 0.5 }, 2)
      tl.fromTo(block3, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 2)
      // Phase 4: block3 fades, block4 (scroll hint) fades in briefly
      tl.to(block3, { opacity: 0.7, y: -20, duration: 0.5 }, 3)
      tl.fromTo(block4, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 3)
      tl.to(block4, { opacity: 0.8, duration: 0.3 }, 3.5)
    },
    { scope: sectionRef }
  )

  const baseClasses =
    'absolute inset-0 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center'

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full"
      style={{
        background: 'var(--color-sage-950, #161d16)',
      }}
    >
      <div className={baseClasses} ref={block1Ref}>
        <p
          className="max-w-3xl text-xl leading-relaxed sm:text-2xl md:text-3xl lg:text-4xl"
          style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            color: 'var(--color-bright-snow-100, #f8faf8)',
          }}
        >
          What if everything you ever wrote or said could live online, not as random pdfs and videos,
          but as a cohesive body of work—digitally-adapted books, articles, and online courses,
          ready to translate into new languages, supported by AI, and integrated into a
          well-architected content, commerce, and subscriber ecosystem?
        </p>
      </div>

      <div className={baseClasses} ref={block2Ref}>
        <p
          className="max-w-2xl text-2xl font-medium sm:text-3xl md:text-4xl lg:text-5xl"
          style={{
            fontFamily: 'var(--font-playfair, Georgia, serif)',
            color: 'var(--color-bright-snow-100, #f8faf8)',
          }}
        >
          What if it could happen this week?
        </p>
      </div>

      <div className={baseClasses} ref={block3Ref}>
        <p
          className="max-w-3xl text-lg leading-relaxed sm:text-xl md:text-2xl"
          style={{
            fontFamily: 'var(--font-inter, system-ui, sans-serif)',
            color: 'var(--color-bright-snow-200, #e8ece8)',
          }}
        >
          What took us 6 months to build for Alan Hirsch took 2 weeks to build for Brad Brisco and 1
          week for the next 98 leaders to join the Movemental network.
        </p>
      </div>

      <div className={baseClasses} ref={block4Ref}>
        <p
          className="text-sm uppercase tracking-widest"
          style={{
            fontFamily: 'var(--font-space-grotesk, system-ui, sans-serif)',
            color: 'var(--color-sage-400, #8a9a8a)',
          }}
        >
          Scroll to explore the network
        </p>
      </div>
    </section>
  )
}
