import { Metadata } from 'next'
import { OnboardingPathContainer } from '@/components/onboarding-path'

export const metadata: Metadata = {
  title: 'Onboarding Path | Movemental',
  description: 'Your path to platform launch in 3-4 weeks. Discover the four phases: Discovery & Vision, Content Research, Platform Architecture, and Network Integration.',
  openGraph: {
    title: 'Your Path to Platform Launch | Movemental',
    description: 'From fit confirmed to live in 3-4 weeks. See the journey to launching your movement platform.',
    type: 'website',
  },
}

export default function OnboardingPage() {
  return <OnboardingPathContainer />
}
