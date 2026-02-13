'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fontHeading, fontBody, fontAccent } from './typography'

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
        <div
          className="max-w-3xl space-y-4 text-xl leading-relaxed sm:text-2xl md:text-3xl lg:text-4xl"
          style={{
            fontFamily: fontHeading,
            color: 'var(--color-bright-snow-100, #f8faf8)',
          }}
        >
          <p>
            What if your life&apos;s work could live online on a unified digital platform you own
            but didn&apos;t have to build—e-books, courses, articles, AI agents, all integrated in
            an e-commerce and [subscription] platform built for movement—of your content and of the
            people shaped by it?
          </p>
          <p>
            Not scattered PDFs and videos—
            <br />
            but books, articles, and courses, digitally structured, AI-supported, and ready to grow.
          </p>
          <div className="h-12 sm:h-16" aria-hidden />
          <p className="text-2xl sm:text-3xl md:text-4xl">In less than 2 weeks.</p>
        </div>
      </div>

      <div className={baseClasses} ref={block2Ref}>
        <div
          className="max-w-3xl space-y-6 text-center"
          style={{
            fontFamily: fontBody,
            color: 'var(--color-bright-snow-100, #f8faf8)',
          }}
        >
          <p className="text-xl leading-relaxed sm:text-2xl md:text-3xl">
            And what if that platform was… part of a credibility network of 100 movement leaders
            like Alan Hirsch and Brad Brisco.
          </p>
          <p
            className="text-lg font-medium sm:text-xl"
            style={{ fontFamily: fontHeading, color: 'var(--color-bright-snow-200, #e8ece8)' }}
          >
            100 movement leaders:
          </p>
          <ul className="mx-auto max-w-md list-none space-y-2 text-left text-base sm:text-lg">
            <li>
              <span
                title="Cross-linking between leaders amplifies discoverability and signals shared credibility to readers and algorithms."
              >
                Linking to each other
              </span>
            </li>
            <li>Collaborating in new ways</li>
            <li>Publishing their best stuff</li>
            <li>…and more.</li>
          </ul>
        </div>
      </div>

      <div className={baseClasses} ref={block3Ref}>
        <p
          className="max-w-3xl text-2xl font-medium sm:text-3xl md:text-4xl"
          style={{
            fontFamily: fontHeading,
            color: 'var(--color-bright-snow-100, #f8faf8)',
          }}
        >
          Look.
        </p>
        {/* Alan's face fades in and story continues — visualization left as-is for now */}
      </div>

      <div className={baseClasses} ref={block4Ref}>
        <p
          className="text-sm uppercase tracking-widest"
          style={{
            fontFamily: fontAccent,
            color: 'var(--color-sage-400, #8a9a8a)',
          }}
        >
          Scroll to explore the network
        </p>
      </div>
    </section>
  )
}
