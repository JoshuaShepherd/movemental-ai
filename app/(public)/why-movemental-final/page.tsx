import { Metadata } from 'next'
import { LateralPinIndicator } from '@/components/why-movemental-final/LateralPinIndicator'
import { PlaybookPinSection } from '@/components/why-movemental-final/PlaybookPinSection'
import { SceniusVisualization } from '@/components/scenius-visualization/SceniusVisualization'
import { HorizontalPanelsSection } from '@/components/why-movemental-final/HorizontalPanelsSection'
import { LinkingVisualizationsTabbedSection } from '@/components/why-movemental-final/LinkingVisualizationsTabbedSection'
import { LayeredPinningSection } from '@/components/why-movemental-final/LayeredPinningSection'

export const metadata: Metadata = {
  title: 'Why Movemental | Movemental',
  description:
    'Movemental began by building for Alan Hirsch. Reflected understanding: calling, audience, content, constraints, and commerce.',
  openGraph: {
    title: 'Why Movemental — Reflected Understanding',
    description:
      'Explore why Movemental exists through the lens of Alan Hirsch: calling, audience, existing content, constraints, and commerce.',
    type: 'website',
  },
}

export default function WhyMovementalFinalPage() {
  return (
    <>
      <LateralPinIndicator />
      <PlaybookPinSection />
      <SceniusVisualization />
      <HorizontalPanelsSection />
      <LinkingVisualizationsTabbedSection />
      <LayeredPinningSection />
    </>
  )
}
