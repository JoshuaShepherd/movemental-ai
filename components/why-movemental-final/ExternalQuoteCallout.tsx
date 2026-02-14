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
  // Gray/supplemental styling: muted so block quotes set aside rather than demand attention.
  // Light variant: on dark sections use sage-400/500. Dark variant: on light sections use sage-600/500.
  const borderColor = isDark ? 'var(--color-sage-500)' : 'var(--color-sage-500)'
  const bgColor = isDark
    ? 'rgba(26, 35, 26, 0.5)'
    : 'rgba(61, 90, 61, 0.08)'
  const quoteColor = isDark ? 'var(--color-sage-400)' : 'var(--color-sage-600)'

  return (
    <blockquote
      ref={blockRef}
      className="relative mx-auto max-w-3xl py-8 sm:py-10 px-6 sm:px-8 rounded-xl border-l-4 my-12"
      style={{
        borderLeftColor: borderColor,
        background: bgColor,
        backdropFilter: 'blur(6px)',
      }}
    >
      <p
        className="text-lg sm:text-xl md:text-2xl leading-relaxed italic"
        style={{
          fontFamily: fontHeading,
          color: quoteColor,
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
                color: isDark ? 'var(--color-sage-500)' : 'var(--color-sage-500)',
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
                color: isDark ? 'var(--color-sage-500)' : 'var(--color-sage-500)',
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
                color: isDark ? 'var(--color-sage-500)' : 'var(--color-sage-500)',
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
