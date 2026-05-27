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

interface TourScrollytellingProps {
  firstName?: string
}

/**
 * Post-auth tour: GSAP scrollytelling experience.
 * Orients, clarifies what Movemental is, and gently introduces the decision path.
 */
export function TourScrollytelling({ firstName = '' }: TourScrollytellingProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  const greeting = firstName
    ? `Welcome, ${firstName}.`
    : 'Welcome.'

  useGSAP(
    () => {
      const section = sectionRef.current
      const blocks = blocksRef.current.filter(Boolean) as HTMLDivElement[]
      if (!section || blocks.length === 0) return

      const scrollLength = '+=600%'
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

      // Block 0
      tl.fromTo(
        blocks[0],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        0
      )
      tl.to(blocks[0], { opacity: 0, y: -24, duration: 0.5 }, 0.85)
      // Block 1
      tl.fromTo(
        blocks[1],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        0.85
      )
      tl.to(blocks[1], { opacity: 0, y: -24, duration: 0.5 }, 1.65)
      // Block 2
      tl.fromTo(
        blocks[2],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.65
      )
      tl.to(blocks[2], { opacity: 0, y: -24, duration: 0.5 }, 2.45)
      // Block 3
      tl.fromTo(
        blocks[3],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        2.45
      )
      tl.to(blocks[3], { opacity: 0, y: -24, duration: 0.5 }, 3.25)
      // Block 4
      tl.fromTo(
        blocks[4],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        3.25
      )
      tl.to(blocks[4], { opacity: 0, y: -24, duration: 0.5 }, 4.05)
      // Block 5
      tl.fromTo(
        blocks[5],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        4.05
      )
      tl.to(blocks[5], { opacity: 0, y: -24, duration: 0.5 }, 4.85)
      // Block 6: CTAs + footer
      tl.fromTo(
        blocks[6],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        4.85
      )
    },
    { scope: sectionRef, dependencies: [firstName] }
  )

  const baseClasses =
    'absolute inset-0 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center'
  const proseClasses = 'max-w-2xl mx-auto space-y-6 text-left'

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative min-h-screen w-full"
      style={{ background: sectionBg }}
      aria-label="Tour"
    >
      {/* Block 0: Personal Welcome */}
      <div
        ref={(el) => {
          blocksRef.current[0] = el
        }}
        className={baseClasses}
      >
        <div className={proseClasses}>
          <h1
            className="text-3xl font-semibold sm:text-4xl md:text-5xl text-center mb-8"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            {greeting}
          </h1>
          <div
            className="space-y-4 text-lg sm:text-xl leading-relaxed"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            <p>
              You completed the self-screen. You were identified as a movement
              leader—someone whose work, alignment, and practice match what this
              space is designed for. That outcome was not automatic. This place
              exists for people like you.
            </p>
            <p>You are now inside.</p>
          </div>
        </div>
      </div>

      {/* Block 1: What Movemental Is */}
      <div
        ref={(el) => {
          blocksRef.current[1] = el
        }}
        className={baseClasses}
      >
        <div className={proseClasses}>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            What Movemental Is
          </h2>
          <div
            className="space-y-4 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            <p>
              Movemental is not a social network. It is not a content marketing
              agency. It is not a SaaS tool you tinker with. It is not a
              publishing house in the traditional sense.
            </p>
            <p>
              Instead, it is a credibility network. A structured digital
              architecture. A place where embodied leaders codify and connect
              their work. A shared infrastructure for work that already exists.
            </p>
          </div>
        </div>
      </div>

      {/* Block 2: You Already Have the Hard Part */}
      <div
        ref={(el) => {
          blocksRef.current[2] = el
        }}
        className={baseClasses}
      >
        <div className={proseClasses}>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            You Already Have the Hard Part
          </h2>
          <div
            className="space-y-4 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            <p>
              You already have credibility offline. You already have
              intellectual or theological substance. You already have lived
              authority.
            </p>
            <p>
              What you lack is digital structure, not depth. This is
              reassurance, not flattery.
            </p>
          </div>
        </div>
      </div>

      {/* Block 3: What Is Missing */}
      <div
        ref={(el) => {
          blocksRef.current[3] = el
        }}
        className={baseClasses}
      >
        <div className={proseClasses}>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            What Is Missing
          </h2>
          <div
            className="space-y-4 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            <p>
              Structure. Ownership. Coherence. Technical optimization. Network
              amplification. Faithful translation. Continuity across formats.
            </p>
            <p>
              These are the gaps. Not your credibility. Not your message.
            </p>
          </div>
        </div>
      </div>

      {/* Block 4: Here Is How This Works */}
      <div
        ref={(el) => {
          blocksRef.current[4] = el
        }}
        className={baseClasses}
      >
        <div className={proseClasses}>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            Here Is How This Works
          </h2>
          <ol
            className="space-y-5 text-base sm:text-lg leading-relaxed list-decimal list-inside"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            <li>
              Codify what already exists. Turn your sermons, articles, courses,
              and books into a structured body of work.
            </li>
            <li>
              Structure it inside a coherent platform. One place. Your voice.
              Your ownership.
            </li>
            <li>
              Connect it within a credibility network. Other leaders. Shared
              discovery. Mutual amplification.
            </li>
            <li>
              Optimize and translate so it can be found. Faithful presentation.
              Clear pathways. Continuity across formats.
            </li>
          </ol>
        </div>
      </div>

      {/* Block 5: At Some Point, You Will Decide */}
      <div
        ref={(el) => {
          blocksRef.current[5] = el
        }}
        className={baseClasses}
      >
        <div className={proseClasses}>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-center"
            style={{ fontFamily: fontHeading, color: textPrimary }}
          >
            At Some Point, You Will Decide
          </h2>
          <div
            className="space-y-4 text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: fontBody, color: textSecondary }}
          >
            <p>
              There is a formal path to joining the network. It requires
              commitment. It is not automatic. It is intentional.
            </p>
            <p>You do not need to decide today.</p>
            <p>
              There are two paths available: one for when you are ready, one for
              when you need more clarity.
            </p>
          </div>
        </div>
      </div>

      {/* Block 6: CTAs + Footer */}
      <div
        ref={(el) => {
          blocksRef.current[6] = el
        }}
        className={baseClasses}
      >
        <div className="max-w-2xl mx-auto space-y-10 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/decided"
              className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-lg bg-scarlet-rush-500 px-6 font-semibold text-white transition-colors hover:bg-scarlet-rush-600"
            >
              I&apos;ve Decided
            </Link>
            <Link
              href="/decide"
              className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-lg border border-sage-400 px-6 font-medium text-bright-snow-100 transition-colors hover:bg-sage-800/50"
            >
              Help Me Decide
            </Link>
          </div>
          <p
            className="text-sm"
            style={{ fontFamily: fontAccent, color: textMuted }}
          >
            This space exists to support embodied movement, not replace it.
          </p>
        </div>
      </div>
    </section>
  )
}
