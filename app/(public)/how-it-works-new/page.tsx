import { Metadata } from 'next'
import { HowItWorksNewContainer } from '@/components/onboarding-path/HowItWorksNewContainer'

export const metadata: Metadata = {
  title: 'How It Works (Full) | Movemental',
  description: 'The full path: order of understanding, four phases from fit to launch, what makes this different, what you get, pricing, and supporting pieces.',
  openGraph: {
    title: 'How Movemental Works — Full Path',
    description: 'From fit to live in 3–4 weeks. Four phases, what you get, and how it all fits together.',
    type: 'website',
  },
  alternates: {
    canonical: '/how-it-works-new',
  },
}

export default function HowItWorksNewPage() {
  return <HowItWorksNewContainer />
}
