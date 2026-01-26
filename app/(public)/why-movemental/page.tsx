import { Metadata } from 'next'
import { WhyMovementalContainer } from '@/components/why-movemental'

export const metadata: Metadata = {
  title: 'Why Movemental | Movemental',
  description: 'Discover why Movemental exists—solving the problem of revenue extraction and platform dependency for movement leaders.',
  openGraph: {
    title: 'Why Movemental Exists',
    description: 'Movement leaders lose 85-90% of revenue to traditional publishers. Learn how we\'re changing that.',
    type: 'website',
  },
}

export default function WhyMovementalPage() {
  return <WhyMovementalContainer />
}
