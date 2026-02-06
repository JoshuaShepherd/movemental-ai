'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Layered pinning — panels stack on top of each other as you scroll.
 * Same structure as GSAP "layered pinning with infinite looping" demo,
 * but without infinite looping. Uses our color palette and fonts.
 */
const PANELS = [
  { num: 1, variant: 'sage' as const },
  { num: 2, variant: 'default' as const },
  { num: 3, variant: 'orchid' as const },
  { num: 4, variant: 'default' as const },
  { num: 5, variant: 'scarlet' as const },
] as const

const PANEL_COUNT = 6 // description + 5 numbered panels

export function LayeredPinningSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const panels = gsap.utils.toArray<HTMLElement>('.layered-panel', containerRef.current)
      if (!panels.length) return

      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          pinSpacing: false,
        })
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        snap: 1 / PANEL_COUNT,
      })
    },
    { scope: containerRef, dependencies: [PANEL_COUNT] }
  )

  return (
    <div ref={containerRef}>
      {/* Description panel */}
      <section
        className="layered-panel flex min-h-screen flex-col items-center justify-center px-6 text-center"
        style={{
          background: 'var(--color-sage-900)',
        }}
      >
        <h1
          className="mb-4 text-3xl font-bold md:text-4xl"
          style={{
            fontFamily: 'var(--font-playfair), Georgia, serif',
            color: 'var(--color-bright-snow-100)',
          }}
        >
          Layered pinning with infinite looping
        </h1>
        <p
          className="mb-12 max-w-md text-lg"
          style={{ color: 'var(--color-bright-snow-400)' }}
        >
          Use pinning to layer panels on top of each other as you scroll.
        </p>
        <div
          className="flex flex-col items-center gap-2"
          style={{ color: 'var(--color-bright-snow-500)' }}
        >
          <span className="text-sm">Scroll down</span>
          <div
            className="h-6 w-6 rotate-[-90deg] border-r-2 border-b-2"
            style={{ borderColor: 'var(--color-bright-snow-500)' }}
          />
        </div>
      </section>

      {/* Numbered panels */}
      {PANELS.map((panel) => (
        <section
          key={panel.num}
          className="layered-panel flex min-h-screen items-center justify-center"
          style={{
            background:
              panel.variant === 'sage'
                ? 'var(--color-sage-700)'
                : panel.variant === 'orchid'
                  ? 'var(--color-velvet-orchid-800)'
                  : panel.variant === 'scarlet'
                    ? 'var(--color-scarlet-rush-800)'
                    : 'var(--color-sage-950)',
          }}
        >
          <h2
            className="text-8xl font-bold md:text-9xl"
            style={{
              fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
              color: 'var(--color-bright-snow-100)',
            }}
          >
            {panel.num}
          </h2>
        </section>
      ))}
    </div>
  )
}
