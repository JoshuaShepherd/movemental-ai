'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fontHeading, fontAccent } from './typography'

gsap.registerPlugin(ScrollTrigger)

const sectionBg = 'var(--color-sage-950, #161d16)'
const textPrimary = 'var(--color-bright-snow-100, #f8faf8)'
const textSecondary = 'var(--color-bright-snow-200, #e8ece8)'
const textMuted = 'var(--color-sage-400, #8a9a8a)'

/**
 * GSAP scroll-driven section: trust collapse, the middle (publication/wisdom),
 * shutdown → hyperlocal + AI-mediated, so what = rebuilding the middle.
 * Placed after the network (SceniusVisualization) on why-movemental-final.
 */
export function TrustCollapseMiddleSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const blocksRef = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const section = sectionRef.current
      const blocks = blocksRef.current.filter(Boolean) as HTMLDivElement[]
      if (!section || blocks.length === 0) return

      const scrollLength = '+=400%'
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: scrollLength,
          pin: true,
          scrub: 0.9,
        },
      })

      // All blocks start hidden
      gsap.set(blocks, { opacity: 0, y: 28 })

      // Block 0: non face-to-face as likely fake as real
      tl.fromTo(blocks[0], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(blocks[0], { opacity: 0, y: -24, duration: 0.5 }, 0.8)
      // Block 1: scale incomprehensible
      tl.fromTo(blocks[1], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 0.8)
      tl.to(blocks[1], { opacity: 0, y: -24, duration: 0.5 }, 1.5)
      // Block 2: confusion + overwhelm → shutdown
      tl.fromTo(blocks[2], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 1.5)
      tl.to(blocks[2], { opacity: 0, y: -24, duration: 0.5 }, 2.2)
      // Block 3: what they shut down = what they can't verify = anything not LIVE
      tl.fromTo(blocks[3], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 2.2)
      tl.to(blocks[3], { opacity: 0, y: -24, duration: 0.5 }, 2.9)
      // Block 4: trust becomes hyperlocal + AI-mediated; in between, collapse
      tl.fromTo(blocks[4], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 2.9)
      tl.to(blocks[4], { opacity: 0, y: -24, duration: 0.5 }, 3.6)
      // Block 5: what lived in the middle — publication, wisdom
      tl.fromTo(blocks[5], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 3.6)
      tl.to(blocks[5], { opacity: 0, y: -24, duration: 0.5 }, 4.2)
      // Block 6: embodiment spectrum — traverse all 3, predominantly middle, and it's gone
      tl.fromTo(blocks[6], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 4.2)
      tl.to(blocks[6], { opacity: 0, y: -24, duration: 0.5 }, 4.8)
      // Block 7: for most, done — online / TV / print trust done
      tl.fromTo(blocks[7], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.6 }, 4.8)
      tl.to(blocks[7], { opacity: 0, y: -24, duration: 0.5 }, 5.4)
      // Block 8: so what — the middle is where movement leaders live; rebuilding
      tl.fromTo(blocks[8], { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7 }, 5.4)
      tl.to(blocks[8], { opacity: 0.92, duration: 0.3 }, 6)
    },
    { scope: sectionRef, dependencies: [] }
  )

  const baseClasses =
    'absolute inset-0 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center'

  const content: Array<{
    lead: string
    body?: string
    small?: string
  }> = [
    {
      lead:
        'Because of AI, anything that isn\'t face-to-face can be fake or real—and you often can\'t tell.',
    },
    {
      lead: 'The volume of that content is beyond what any person can take in.',
    },
    {
      lead: 'The result is confusion and overwhelm.',
      body: 'Which leads to shutdown.',
    },
    {
      lead: 'What do people shut down?',
      body:
        'What they can\'t verify. And they can\'t verify what wasn\'t live. The people you\'re called to form? They shut down what they can\'t find.',
    },
    {
      lead: 'For most people, trust is becoming two things:',
      body: 'Hyperlocal. And AI-mediated.',
      small: 'In between, trust collapses.',
    },
    {
      lead: 'What used to live in that middle?',
      body: 'Publication. Wisdom—personal and collective.',
    },
    {
      lead: 'Movement leaders work across all three: hyperlocal, middle, digital.',
      body: 'But most have taught and published in the middle. And that middle is gone.',
    },
    {
      lead: 'For most people, not being able to tell what\'s real—plus the speed and scale—means they\'re done.',
      body: 'Online trust, done. TV trust, done. Print trust, done.',
    },
    {
      lead: 'So what?',
      body:
        'The middle is where movement leaders live. Rebuilding trust there—through relational credibility, through networks of verified humans—is the work.',
    },
  ]

  return (
    <section
      id="trust-collapse"
      ref={sectionRef}
      className="relative min-h-screen w-full"
      style={{ background: sectionBg }}
      aria-label="Trust collapse and the middle"
    >
      {content.map((item, i) => (
        <div
          key={i}
          ref={(el) => {
            blocksRef.current[i] = el
          }}
          className={baseClasses}
        >
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <p
              className="text-xl leading-relaxed sm:text-2xl md:text-3xl"
              style={{ fontFamily: fontHeading, color: textPrimary }}
            >
              {item.lead}
            </p>
            {item.body && (
              <p
                className="text-lg sm:text-xl md:text-2xl font-medium"
                style={{ fontFamily: fontHeading, color: textSecondary }}
              >
                {item.body}
              </p>
            )}
            {item.small && (
              <p
                className="text-sm uppercase tracking-widest pt-2"
                style={{ fontFamily: fontAccent, color: textMuted }}
              >
                {item.small}
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
