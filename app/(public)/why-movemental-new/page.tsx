import { Metadata } from 'next'
import { WhyMovementalNewContainer } from '@/components/why-movemental-new'

export const metadata: Metadata = {
  title: 'Why Movemental | Movemental',
  description: 'Movemental began by building for Alan Hirsch. Learn why credibility is now relational, and why this matters.',
  openGraph: {
    title: 'Why Movemental Exists',
    description: 'Credibility is restored through visible human networks. Movemental is structured as a scenius network.',
    type: 'website',
  },
}

export default function WhyMovementalNewPage() {
  return <WhyMovementalNewContainer />
}
