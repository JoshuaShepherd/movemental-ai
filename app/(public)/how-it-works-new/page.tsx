import { Metadata } from 'next'
import { HowItWorksNewContainer } from '@/components/how-it-works-new'

export const metadata: Metadata = {
  title: 'How It Works | Movemental',
  description: 'A clear path from existing work to living digital corpus. Not a content treadmill — a proven playbook for circulation and compounding.',
  openGraph: {
    title: 'How Movemental Works',
    description: 'Start with what you have. Build a sustainable rhythm. Let your work find its people.',
    type: 'website',
  },
}

export default function HowItWorksNewPage() {
  return <HowItWorksNewContainer />
}
