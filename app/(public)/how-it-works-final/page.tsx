import { Metadata } from 'next'
import { HowItWorksFinalContainer } from '@/components/how-it-works-final/HowItWorksFinalContainer'

export const metadata: Metadata = {
  title: 'How Movemental Works | Movemental',
  description:
    'A clear path from your existing work to a living system. The playbook we used for Alan, the content pipeline, AI\'s role, and a 2-week onboarding.',
  openGraph: {
    title: 'How Movemental Works — Your Work Here, Our Vision, the Playbook',
    description:
      'Your work is here. It should also be here. Cheap and fast stewardship. The full digital playbook, content pipeline, AI\'s role, and 2-week launch.',
    type: 'website',
  },
}

export default function HowItWorksFinalPage() {
  return <HowItWorksFinalContainer />
}
