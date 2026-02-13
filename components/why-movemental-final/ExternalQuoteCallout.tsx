'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'
import { fontHeading, fontBody, fontAccent } from './typography'

gsap.registerPlugin(ScrollTrigger)

interface ExternalQuoteCalloutProps {
  quote: string
  attribution?: string
  source?: string
  sourceUrl?: string
  /** Light (for muted/dark bg) or dark (for light bg) */
  variant?: 'light' | 'dark'
  /** Optional: custom ScrollTrigger start (e.g. "top 80%") */
  triggerStart?: string
}

/**
 * GSAP scroll-triggered external quote callout — stands out as editorial reference.
 * Fades in on scroll with subtle scale; attribution + optional source link.
 */
export function ExternalQuoteCallout({
  quote,
  attribution,
  source,
  sourceUrl,
  variant = 'light',
  triggerStart = 'top 85%',
}: ExternalQuoteCalloutProps) {
  const blockRef = useRef<HTMLQuoteElement>(null)

  useGSAP(
    () => {
      const el = blockRef.current
      if (!el) return

      gsap.set(el, { opacity: 0, y: 20 })

      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: triggerStart,
          end: 'top 60%',
          scrub: 1,
        },
      })
    },
    { scope: blockRef }
  )

  const isDark = variant === 'dark'
  // Light variant: light callout for dark sections (stands out). Dark variant: dark callout for light sections.
  const borderColor = isDark ? 'var(--color-sage-600)' : 'var(--color-sage-400)'
  const bgColor = isDark
    ? 'rgba(26, 35, 26, 0.85)'
    : 'rgba(248, 250, 248, 0.95)'

  return (
    <blockquote
      ref={blockRef}
      className="relative mx-auto max-w-3xl py-10 sm:py-14 px-6 sm:px-10 rounded-xl border-l-4 my-16 shadow-lg"
      style={{
        borderLeftColor: borderColor,
        background: bgColor,
        backdropFilter: 'blur(8px)',
      }}
    >
      <p
        className="text-xl sm:text-2xl md:text-3xl leading-relaxed italic"
        style={{
          fontFamily: fontHeading,
          color: isDark ? 'var(--color-bright-snow-100)' : 'var(--color-sage-900)',
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {(attribution || source) && (
        <footer className="mt-6 flex flex-col gap-1">
          {attribution && (
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                fontFamily: fontAccent,
                color: isDark ? 'var(--color-sage-400)' : 'var(--color-sage-600)',
              }}
            >
              {attribution}
            </span>
          )}
          {source && sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm hover:underline transition-colors w-fit"
              style={{
                fontFamily: fontBody,
                color: isDark ? 'var(--color-sage-300)' : 'var(--color-sage-600)',
              }}
            >
              {source}
              <ExternalLink className="h-3.5 w-3.5 opacity-70 shrink-0" />
            </a>
          ) : source ? (
            <span
              className="text-sm"
              style={{
                fontFamily: fontBody,
                color: isDark ? 'var(--color-sage-400)' : 'var(--color-sage-600)',
              }}
            >
              {source}
            </span>
          ) : null}
        </footer>
      )}
    </blockquote>
  )
}
