import { Metadata } from 'next'
import { WhyMovementalNewContainer } from '@/components/why-movemental/WhyMovementalNewContainer'

export const metadata: Metadata = {
  title: 'Why Movemental (Full) | Movemental',
  description: 'The full explanation: your content is transformative but it doesn\'t move. Why that happens, who we serve, what Movemental is, and why the old trade-off no longer holds.',
  openGraph: {
    title: 'Why Movemental — Full Narrative',
    description: 'Complete narrative: the problem, what we mean by move, four structural reasons, who it\'s for, what Movemental is, and why now.',
    type: 'website',
  },
}

export default function WhyMovementalNewPage() {
  return <WhyMovementalNewContainer />
}
