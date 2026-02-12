'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Alan Hirsch reflected-understanding sections as list labels + slide content */
const SECTIONS = [
  {
    label: 'Calling',
    content:
      "You're called to reactivate what's latent. Not to invent a new church or a new ministry type, but to name and unlock what's already in the Body: the intelligence, the capacities, the apostolic and prophetic and evangelistic and shepherd and teacher functions that were always there and got buried under institution. Your job is to help the church remember itself—to recover its \"forgotten ways\" and its 5Q—so it can move again as movement, not only as organization.",
  },
  {
    label: 'Audience',
    content:
      "The people who respond to your work are movement-oriented: they care about multiplication, sentness, and the reactivation of the Body's full ministry. They don't just want better programs; they want the church to function as movement again. They're pastors, church planters, denominational and network leaders, seminary faculty and students, and practitioners in mission and formation.",
  },
  {
    label: 'Existing Content',
    content:
      "Your content lives in books (9+ with IVP and co-authors), organizational sites (100Movements, Forge, Future Travelers, 5Q Collective), academic contexts, conference and speaking, and training/consulting. The work is credible; the issue isn't authority, it's visibility, connection, and reuse. Much of the corpus is static or unpublished—not structured, linked, and easy to find.",
  },
  {
    label: 'Constraints',
    content:
      "Movement leaders with mDNA priorities live under time and money constraints that are emblematic, not personal failure. Time for content strategy, repurposing talks into articles, or building a unified digital home is scarce because the work is in the room—with leaders, churches, and movements. A platform that reduces the lift addresses those constraints without asking you to become a different kind of leader.",
  },
  {
    label: 'Commerce',
    content:
      "You're with a respected publisher (IVP). Trade publishing usually returns to the author on the order of 10–15% of revenue; the rest goes to publisher, distribution, and retail. If most of your public presence online is metadata and one substantive digital asset (the 5Q/APEST assessment), then almost no revenue is coming from digital content itself. That's the gap a platform built for you is meant to address.",
  },
] as const

const SECTION_COUNT = SECTIONS.length

export function LateralPinIndicator() {
  const pinSectionRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const listItemRefs = useRef<(HTMLLIElement | null)[]>([])
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(
    () => {
      const list = listRef.current
      const fill = fillRef.current
      const listItems = listItemRefs.current.filter(Boolean) as HTMLLIElement[]
      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[]

      if (!list || !fill || listItems.length !== SECTION_COUNT || slides.length !== SECTION_COUNT) {
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'center center',
          end: `+=${SECTION_COUNT * 50}%`,
          pin: true,
          scrub: true,
        },
      })

      // Initial fill height = 1/n, origin top left
      gsap.set(fill, {
        scaleY: 1 / SECTION_COUNT,
        transformOrigin: 'top left',
      })

      for (let i = 0; i < SECTION_COUNT; i++) {
        const previousItem = listItems[i - 1]
        if (previousItem) {
          tl.set(
            listItems[i],
            { color: 'var(--color-scarlet-rush-400)' },
            0.5 * i
          )
            .to(slides[i], { autoAlpha: 1, duration: 0.2 }, '<')
            .set(previousItem, { color: 'var(--color-bright-snow-400)' }, '<')
            .to(slides[i - 1], { autoAlpha: 0, duration: 0.2 }, '<')
        } else {
          gsap.set(listItems[i], { color: 'var(--color-scarlet-rush-400)' })
          gsap.set(slides[i], { autoAlpha: 1 })
        }
      }

      tl.to(
        fill,
        {
          scaleY: 1,
          transformOrigin: 'top left',
          ease: 'none',
          duration: tl.duration(),
        },
        0
      ).to({}, {}) // small pause at end before un-pin
    },
    { scope: pinSectionRef, dependencies: [SECTION_COUNT] }
  )

  return (
    <>
      <section
        className="flex min-h-screen w-full items-center justify-center"
        style={{
          background: 'var(--color-sage-900)',
          fontFamily: 'var(--font-inter), system-ui, sans-serif',
        }}
      >
        <h3
          className="text-lg font-medium"
          style={{ color: 'var(--color-bright-snow-400)' }}
        >
          Scroll down
        </h3>
      </section>

      <section
        ref={pinSectionRef}
        className="border-t border-b border-dashed"
        style={{
          minHeight: '100vh',
          background: 'var(--color-sage-900)',
          borderColor: 'rgba(255,255,255,0.15)',
        }}
      >
        <div
          className="mx-auto flex w-full max-w-[1200px] flex-wrap gap-8 px-4 py-12 md:flex-nowrap"
          style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
        >
          {/* List column: fill bar is positioned relative to this block, growing beside list items */}
          <div className="relative shrink-0">
            <div
              ref={fillRef}
              className="absolute left-0 top-0 h-full w-0.5"
              style={{
                width: 2,
                background: 'var(--color-scarlet-rush-400)',
                transformOrigin: 'top left',
              }}
            />
            <ul
              ref={listRef}
              className="flex list-none flex-col gap-2 pl-3 pr-2 text-left"
              style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
                color: 'var(--color-bright-snow-100)',
                margin: 0,
                padding: 0,
              }}
            >
              {SECTIONS.map((section, i) => (
                <li
                  key={section.label}
                  ref={(el) => {
                    listItemRefs.current[i] = el
                  }}
                  style={{
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                    fontWeight: 500,
                  }}
                >
                  {section.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[280px] flex-1">
            {SECTIONS.map((section, i) => (
              <div
                key={section.label}
                ref={(el) => {
                  slideRefs.current[i] = el
                }}
                className="absolute right-4 top-1/2 w-[90%] max-w-[420px] -translate-y-1/2 rounded-xl border p-6 opacity-0"
                style={{
                  visibility: 'hidden',
                  borderColor: 'rgba(255,255,255,0.15)',
                  background: 'rgba(22, 29, 22, 0.6)',
                  color: 'var(--color-bright-snow-200)',
                  fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                  lineHeight: 1.6,
                }}
              >
                <h4
                  className="mb-3 font-semibold"
                  style={{
                    fontFamily: 'var(--font-playfair), Georgia, serif',
                    color: 'var(--color-bright-snow-50)',
                    fontSize: '1.125rem',
                  }}
                >
                  {section.label}
                </h4>
                <p className="m-0">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
