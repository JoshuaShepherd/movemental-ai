'use client'

import { cn } from '@/lib/utils'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { GSAPHeroTextSection } from '@/components/why-movemental-final/GSAPHeroTextSection'
import { SceniusVisualization } from '@/components/scenius-visualization/SceniusVisualization'
import { TrustCollapseMiddleSection } from '@/components/why-movemental-final/TrustCollapseMiddleSection'
import { CredibilityCrisisSection } from '@/components/why-movemental-final/CredibilityCrisisSection'
import {
  CredibilityCrisis,
  MovementalPlaybook,
  FragmentedToPlatform,
  AlanProof,
  CredibilityAmplified,
  NetworkEffect,
  Invitation,
} from '@/components/why-movemental/sections'
import { fontBody } from '@/components/why-movemental-final/typography'

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'network', label: 'Network' },
  { id: 'trust-collapse', label: 'Trust Collapse' },
  { id: 'credibility-crisis', label: 'Credibility Crisis' },
  { id: 'fragmentation', label: 'Crisis' },
  { id: 'playbook', label: 'Playbook' },
  { id: 'transformation', label: 'Transformation' },
  { id: 'proof', label: 'Proof' },
  { id: 'amplification', label: 'Amplification' },
  { id: 'network-effect', label: 'Network Effect' },
  { id: 'invitation', label: 'Invitation' },
]

export function WhyMovementalFinalContainer({ className }: { className?: string }) {
  return (
    <div className={cn('min-h-screen', className)} style={{ fontFamily: fontBody }}>
      <SectionNav sections={SECTIONS} sticky />

      <GSAPHeroTextSection />

      <section id="network" aria-label="Scenius network">
        <SceniusVisualization />
      </section>

      <TrustCollapseMiddleSection />
      <CredibilityCrisisSection />

      {/* Section 1 — The Credibility Crisis (fragmented reality) */}
      <section id="fragmentation">
        <CredibilityCrisis />
      </section>

      {/* Section 2 — The Movemental Playbook */}
      <section id="playbook">
        <MovementalPlaybook />
      </section>

      {/* Section 3 — From Fragmented to Platform */}
      <section id="transformation">
        <FragmentedToPlatform />
      </section>

      {/* Section 4 — The Alan Proof */}
      <section id="proof">
        <AlanProof />
      </section>

      {/* Section 5 — Credibility Amplified */}
      <section id="amplification">
        <CredibilityAmplified />
      </section>

      {/* Section 6 — The Network Effect */}
      <section id="network-effect">
        <NetworkEffect />
      </section>

      {/* Section 7 — Invitation */}
      <section id="invitation">
        <Invitation />
      </section>
    </div>
  )
}
