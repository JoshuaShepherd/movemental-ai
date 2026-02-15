'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  fontHeading,
  fontBody,
  fontAccent,
} from '@/components/why-movemental-final/typography'

gsap.registerPlugin(ScrollTrigger)

const sectionBg = 'var(--color-sage-950, #161d16)'
const textPrimary = 'var(--color-bright-snow-100, #f8faf8)'
const textSecondary = 'var(--color-bright-snow-200, #e8ece8)'
const textMuted = 'var(--color-sage-400, #8a9a8a)'

/**
 * Post-auth tour: GSAP scrollytelling placeholder structure.
 * Replace placeholder copy with final content; keep scroll-driven sections.
 */
export function TourScrollytelling() {
  const sectionRef = useRef<HTMLElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const section = sectionRef.current
      const blocks = blocksRef.current.filter(Boolean) as HTMLDivElement[]
      if (!section || blocks.length === 0) return

      const scrollLength = '+=350%'
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollLength,
          pin: true,
          scrub: 0.9,
        },
      })

      gsap.set(blocks, { opacity: 0, y: 28 })

      // Block 0: Hero
      tl.fromTo(
        blocks[0],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0
      )
      tl.to(blocks[0], { opacity: 0, y: -24, duration: 0.5 }, 0.9)
      // Block 1
      tl.fromTo(
        blocks[1],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.9
      )
      tl.to(blocks[1], { opacity: 0, y: -24, duration: 0.5 }, 1.7)
      // Block 2
      tl.fromTo(
        blocks[2],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.7
      )
      tl.to(blocks[2], { opacity: 0, y: -24, duration: 0.5 }, 2.5)
      // Block 3: CTA
      tl.fromTo(
        blocks[3],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        2.5
      )
    },
    { scope: sectionRef, dependencies: [] }
  )

  const baseClasses =
    'absolute inset-0 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center'

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative min-h-screen w-full"
      style={{ background: sectionBg }}
      aria-label="Tour"
    >
      {/* Block 0: Hero */}
      <div
        ref={(el) => {
          blocksRef.current[0] = el
        }}
        className={baseClasses}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h1
            className="text-3xl font-semibold sm:text-4xl md:text-5xl"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            Welcome to the tour
          </h1>
          <p
            className="text-lg sm:text-xl text-balance"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            Scroll to explore how Movemental helps movement leaders structure
            their content and reach their audience.
          </p>
        </div>
      </div>

      {/* Block 1: Your content */}
      <div
        ref={(el) => {
          blocksRef.current[1] = el
        }}
        className={baseClasses}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            Your content. Structured.
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            Placeholder: books, articles, courses—all in one place, discoverable
            and connected.
          </p>
        </div>
      </div>

      {/* Block 2: Your platform */}
      <div
        ref={(el) => {
          blocksRef.current[2] = el
        }}
        className={baseClasses}
      >
        <div className="max-w-3xl mx-auto space-y-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            Your platform. Your audience.
          </h2>
          <p
            className="text-base sm:text-lg"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            Placeholder: own your digital presence. No rental. No algorithm lock.
          </p>
        </div>
      </div>

      {/* Block 3: CTA */}
      <div
        ref={(el) => {
          blocksRef.current[3] = el
        }}
        className={baseClasses}
      >
        <div className="max-w-2xl mx-auto space-y-8">
          <h2
            className="text-xl sm:text-2xl md:text-3xl"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/decided"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-scarlet-rush-500 px-6 font-semibold text-white transition-colors hover:bg-scarlet-rush-600"
            >
              I&apos;ve Decided
            </Link>
            <Link
              href="/decide"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-sage-400 px-6 font-medium text-bright-snow-100 transition-colors hover:bg-sage-800/50"
            >
              Help Me Decide
            </Link>
          </div>
          <p
            className="text-sm"
            style={{ fontFamily: fontAccent, color: textMuted }}
          >
            Or continue to <Link href="/how-it-works" className="underline hover:text-bright-snow-200">How It Works</Link> for the full journey.
          </p>
        </div>
      </div>
    </section>
  )
}
