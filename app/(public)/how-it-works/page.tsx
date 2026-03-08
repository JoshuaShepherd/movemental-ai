import { Metadata } from 'next'
import { OnboardingPathContainer } from '@/components/onboarding-path'

export const metadata: Metadata = {
  title: 'How It Works | Movemental',
  description: 'Your path to platform launch in 3-4 weeks. Discover the four phases: Discovery & Vision, Content Research, Platform Architecture, and Network Integration.',
  openGraph: {
    title: 'How It Works | Movemental',
    description: 'From fit confirmed to live in 3-4 weeks. See the journey to launching your movement platform.',
    type: 'website',
  },
  alternates: {
    canonical: '/how-it-works',
  },
}

export default function HowItWorksPage() {
  return <OnboardingPathContainer />
}
