'use client'

import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'
import { PublishTimeSuggestions } from '@/components/linking-visualizations/PublishTimeSuggestions'
import { CrossTenantCitation } from '@/components/linking-visualizations/CrossTenantCitation'
import { RelatedFromNetwork } from '@/components/linking-visualizations/RelatedFromNetwork'
import { PillarClusterGraph } from '@/components/linking-visualizations/PillarClusterGraph'
import { NetworkCalendar } from '@/components/linking-visualizations/NetworkCalendar'
import { CoAuthorshipFlow } from '@/components/linking-visualizations/CoAuthorshipFlow'
import { NetworkDigest } from '@/components/linking-visualizations/NetworkDigest'
import { ContextualNudges } from '@/components/linking-visualizations/ContextualNudges'
import { TagAggregation } from '@/components/linking-visualizations/TagAggregation'
import { ImpactDashboard } from '@/components/linking-visualizations/ImpactDashboard'

gsap.registerPlugin(ScrollTrigger)

const TABS = [
  { id: 'publish-time', label: 'Publish-time links', Component: PublishTimeSuggestions },
  { id: 'cross-tenant', label: 'Cross-tenant citation', Component: CrossTenantCitation },
  { id: 'related', label: 'Related from network', Component: RelatedFromNetwork },
  { id: 'pillar', label: 'Pillar cluster', Component: PillarClusterGraph },
  { id: 'calendar', label: 'Network calendar', Component: NetworkCalendar },
  { id: 'coauthorship', label: 'Co-authorship flow', Component: CoAuthorshipFlow },
  { id: 'digest', label: 'Network digest', Component: NetworkDigest },
  { id: 'nudges', label: 'Contextual nudges', Component: ContextualNudges },
  { id: 'tags', label: 'Tag aggregation', Component: TagAggregation },
  { id: 'impact', label: 'Impact dashboard', Component: ImpactDashboard },
] as const

/**
 * One fixed panel with GSAP-powered tabs. Each tab shows a full-screen
 * linking visualization; views switch with animation. Section pins until
 * user scrolls down.
 */
export function LinkingVisualizationsTabbedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(0)

  const goToTab = useCallback((index: number) => {
    if (index === activeIndex) return
    prevIndexRef.current = activeIndex
    setActiveIndex(index)
  }, [activeIndex])

  useGSAP(
    () => {
      const section = sectionRef.current
      const content = contentRef.current
      if (!section || !content) return

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
      })
    },
    { scope: sectionRef }
  )

  useGSAP(
    () => {
      const content = contentRef.current
      if (!content) return

      const panels = content.querySelectorAll<HTMLElement>('[data-tab-panel]')
      const prev = prevIndexRef.current
      const next = activeIndex

      if (prev === next || !panels[next]) return

      const prevEl = panels[prev]
      const nextEl = panels[next]

      const tl = gsap.timeline()
      tl.to(prevEl, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.inOut',
      }).to(
        nextEl,
        {
          opacity: 1,
          duration: 0.25,
          ease: 'power2.inOut',
        },
        '-=0.1'
      )
    },
    { scope: contentRef, dependencies: [activeIndex] }
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{ background: 'var(--color-sage-950)' }}
    >
      {/* Tab bar */}
      <div
        className="flex shrink-0 flex-wrap items-center justify-center gap-1 border-b border-white/[0.08] px-4 py-3 md:gap-2 md:px-6 md:py-4"
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          background: 'var(--color-sage-900)',
        }}
      >
        <span
          className="mr-2 hidden text-xs font-medium uppercase tracking-wider opacity-60 md:mr-4 md:inline"
          style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
        >
          Explore
        </span>
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => goToTab(i)}
            className={cn(
              'rounded-full px-3 py-1.5 text-xs font-medium transition-colors md:px-4 md:py-2 md:text-sm',
              i === activeIndex
                ? 'bg-white/15 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            )}
            style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Full-screen content area: one panel visible at a time */}
      <div
        ref={contentRef}
        className="relative flex-1 overflow-hidden"
      >
        {TABS.map((tab, i) => {
          const Component = tab.Component
          return (
            <div
              key={tab.id}
              data-tab-panel
              className="absolute inset-0 overflow-y-auto overflow-x-hidden"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                pointerEvents: i === activeIndex ? 'auto' : 'none',
              }}
            >
              <div className="mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-10">
                <Component />
              </div>
            </div>
          )
        })}
      </div>

      <p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs opacity-40"
        style={{
          fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
          color: 'var(--color-bright-snow, #f0f4f0)',
        }}
      >
        Scroll down to continue
      </p>
    </section>
  )
}
