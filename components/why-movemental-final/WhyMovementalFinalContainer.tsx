'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { GSAPHeroTextSection } from '@/components/why-movemental-final/GSAPHeroTextSection'
import { SceniusVisualization } from '@/components/scenius-visualization/SceniusVisualization'
import { VoicesJoiningSection } from '@/components/why-movemental-final/VoicesJoiningSection'
import { SoundFamiliarSection } from '@/components/why-movemental-final/SoundFamiliarSection'
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
import { useLinkedWriters } from '@/hooks/simplified/useLinkedWriters'

const BASE_SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'network', label: 'Network' },
  { id: 'sound-familiar', label: 'Sound Familiar' },
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
  const { data: linkedWriters } = useLinkedWriters()
  const sections = useMemo(() => {
    if (linkedWriters?.length) {
      const voices = { id: 'voices-joining', label: 'Voices Joining' }
      const networkIdx = BASE_SECTIONS.findIndex((s) => s.id === 'network')
      return [
        ...BASE_SECTIONS.slice(0, networkIdx + 1),
        voices,
        ...BASE_SECTIONS.slice(networkIdx + 1),
      ]
    }
    return BASE_SECTIONS
  }, [linkedWriters?.length])

  return (
    <div className={cn('min-h-screen', className)} style={{ fontFamily: fontBody }}>
      <SectionNav sections={sections} sticky />

      <GSAPHeroTextSection />

      <section id="network" aria-label="Scenius network">
        <SceniusVisualization />
      </section>

      <VoicesJoiningSection />
      <SoundFamiliarSection />
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
