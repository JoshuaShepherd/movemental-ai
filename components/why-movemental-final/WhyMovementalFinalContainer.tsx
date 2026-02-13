'use client'

import { cn } from '@/lib/utils'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { GSAPHeroTextSection } from '@/components/why-movemental-final/GSAPHeroTextSection'
import { SceniusVisualization } from '@/components/scenius-visualization/SceniusVisualization'
import { TrustCollapseMiddleSection } from '@/components/why-movemental-final/TrustCollapseMiddleSection'
import { CredibilityCrisisSection } from '@/components/why-movemental-final/CredibilityCrisisSection'
import { fontBody } from '@/components/why-movemental-final/typography'

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'network', label: 'Network' },
  { id: 'trust-collapse', label: 'Trust Collapse' },
  { id: 'credibility-crisis', label: 'Credibility Crisis' },
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
    </div>
  )
}
