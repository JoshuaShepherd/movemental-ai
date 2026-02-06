'use client'

import { PublishTimeSuggestions } from './PublishTimeSuggestions'
import { CrossTenantCitation } from './CrossTenantCitation'
import { RelatedFromNetwork } from './RelatedFromNetwork'
import { PillarClusterGraph } from './PillarClusterGraph'
import { NetworkCalendar } from './NetworkCalendar'
import { CoAuthorshipFlow } from './CoAuthorshipFlow'
import { NetworkDigest } from './NetworkDigest'
import { ContextualNudges } from './ContextualNudges'
import { TagAggregation } from './TagAggregation'
import { ImpactDashboard } from './ImpactDashboard'

export function LinkingVisualizationsPage() {
  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-sage-950, #0d120d)' }}
    >
      {/* Hero */}
      <header className="px-6 pt-24 pb-16 text-center md:pt-32 md:pb-20">
        <h1
          className="mx-auto max-w-3xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            color: 'var(--color-bright-snow, #f0f4f0)',
          }}
        >
          How Platforms Link Together
        </h1>
        <p
          className="mx-auto mt-4 max-w-2xl text-lg opacity-70"
          style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
        >
          Visual simulations of every cross-tenant feature — from automated
          citations to network calendars and co-authorship flows.
        </p>
      </header>

      {/* Sections */}
      <div className="mx-auto max-w-5xl space-y-12 px-4 pb-24 md:px-6">
        <PublishTimeSuggestions />
        <CrossTenantCitation />
        <RelatedFromNetwork />
        <PillarClusterGraph />
        <NetworkCalendar />
        <CoAuthorshipFlow />
        <NetworkDigest />
        <ContextualNudges />
        <TagAggregation />
        <ImpactDashboard />
      </div>
    </div>
  )
}
