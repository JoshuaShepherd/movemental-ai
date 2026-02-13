import { Metadata } from 'next'
import { GSAPHeroTextSection } from '@/components/why-movemental-final/GSAPHeroTextSection'
import { SceniusVisualization } from '@/components/scenius-visualization/SceniusVisualization'
import { TrustCollapseMiddleSection } from '@/components/why-movemental-final/TrustCollapseMiddleSection'
import { CredibilityCrisisSection } from '@/components/why-movemental-final/CredibilityCrisisSection'
import { fontBody } from '@/components/why-movemental-final/typography'

export const metadata: Metadata = {
  title: 'Why Movemental | Movemental',
  description:
    'What if your best work could live online as a cohesive body of work? The credibility crisis, Alan Hirsch, and credibility amplification via the very tool behind it.',
  openGraph: {
    title: 'Why Movemental — The Credibility Crisis & Credibility Amplification',
    description:
      'There is a rapidly advancing credibility crisis. For us it was personal. Here is what we decided to do—and how we use the very tool behind the crisis to amplify what\'s real.',
    type: 'website',
  },
}

export default function WhyMovementalFinalPage() {
  return (
    <div style={{ fontFamily: fontBody }}>
      <GSAPHeroTextSection />
      <SceniusVisualization />
      <TrustCollapseMiddleSection />
      <CredibilityCrisisSection />
    </div>
  )
}
