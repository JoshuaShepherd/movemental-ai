'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Horizontal panels section — same structure as GSAP "infinite looped panels" demo
 * but without infinite looping. Scroll vertically to move through panels; stops at the last.
 * Placeholder content matches demo structure.
 */
const PANELS = [
  { id: '01', label: 'Panel 01' },
  { id: '02', label: 'Panel 02' },
  { id: '03', label: 'Panel 03' },
  { id: '04', label: 'Panel 04' },
] as const

const PANEL_COUNT = PANELS.length

export function HorizontalPanelsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track) return

      const scrollDistance = (PANEL_COUNT - 1) * 100
      gsap.to(track, {
        x: `-${scrollDistance}vw`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${(PANEL_COUNT - 1) * 100}%`,
          pin: true,
          scrub: true,
        },
      })
    },
    { scope: sectionRef, dependencies: [PANEL_COUNT] }
  )

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full overflow-hidden"
        style={{
          background: 'var(--color-sage-950)',
        }}
      >
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: 'max-content' }}
        >
          {PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className="flex h-full w-screen shrink-0 items-center justify-center"
              style={{
                background:
                  i % 2 === 0
                    ? 'var(--color-sage-900)'
                    : 'var(--color-sage-950)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div
                className="text-center"
                style={{
                  fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                }}
              >
                <span
                  className="block text-6xl font-bold md:text-8xl"
                  style={{
                    color: 'var(--color-scarlet-rush-400)',
                    fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
                  }}
                >
                  {panel.id}
                </span>
                <span
                  className="mt-2 block text-lg font-medium md:text-xl"
                  style={{ color: 'var(--color-bright-snow-400)' }}
                >
                  {panel.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section
        className="min-h-[50vh] w-full"
        style={{ background: 'var(--color-sage-950)' }}
      />
    </>
  )
}
