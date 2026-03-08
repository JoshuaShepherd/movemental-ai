'use client'

import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

/** Discriminated union so TypeScript narrows filler vs Component panels. */
type FillerPanel = { id: string; label: string; filler: true }
type ComponentPanel = { id: string; label: string; Component: () => React.ReactElement }
type LinkingPanel = FillerPanel | ComponentPanel

function isFillerPanel(panel: LinkingPanel): panel is FillerPanel {
  return 'filler' in panel && panel.filler === true
}

/**
 * Horizontal panels section — scroll vertically to move through panels.
 * Panel 1: intro filler. Panels 2–11: linking visualizations (one per panel).
 */
const LINKING_VIZ_PANELS: readonly LinkingPanel[] = [
  { id: 'intro', label: 'How platforms link together', filler: true },
  { id: 'publish-time', label: 'Publish-time link suggestions', Component: PublishTimeSuggestions },
  { id: 'cross-tenant', label: 'Cross-tenant citation', Component: CrossTenantCitation },
  { id: 'related', label: 'Related from network', Component: RelatedFromNetwork },
  { id: 'pillar', label: 'Pillar cluster graph', Component: PillarClusterGraph },
  { id: 'calendar', label: 'Network calendar', Component: NetworkCalendar },
  { id: 'coauthorship', label: 'Co-authorship flow', Component: CoAuthorshipFlow },
  { id: 'digest', label: 'Network digest', Component: NetworkDigest },
  { id: 'nudges', label: 'Contextual nudges', Component: ContextualNudges },
  { id: 'tags', label: 'Tag aggregation', Component: TagAggregation },
  { id: 'impact', label: 'Impact dashboard', Component: ImpactDashboard },
]

const PANEL_COUNT = LINKING_VIZ_PANELS.length

function PanelContent({
  panel,
  index,
}: {
  panel: LinkingPanel
  index: number
}) {
  if (isFillerPanel(panel)) {
    return (
      <div
        className="text-center px-8"
        style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
        }}
      >
        <h2
          className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
        >
          How platforms link together
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-lg opacity-70"
          style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
        >
          Visual simulations of every cross-tenant feature — from automated
          citations to network calendars and co-authorship flows.
        </p>
        <p
          className="mt-8 text-sm opacity-50"
          style={{
            fontFamily: 'var(--font-space-grotesk), system-ui, sans-serif',
            color: 'var(--color-bright-snow, #f0f4f0)',
          }}
        >
          Scroll to explore
        </p>
      </div>
    )
  }

  const { Component } = panel
  return (
    <div className="h-full w-full overflow-y-auto overflow-x-hidden">
      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6 md:py-12">
        <Component />
      </div>
    </div>
  )
}

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
          {LINKING_VIZ_PANELS.map((panel, i) => (
            <div
              key={panel.id}
              className={`flex h-full w-screen shrink-0 flex-col ${
                isFillerPanel(panel)
                  ? 'items-center justify-center'
                  : 'items-stretch justify-start'
              }`}
              style={{
                background:
                  i % 2 === 0
                    ? 'var(--color-sage-900)'
                    : 'var(--color-sage-950)',
                borderRight: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <PanelContent panel={panel} index={i} />
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
