import { Metadata } from 'next'
import { WhyMovementalContainer } from '@/components/why-movemental'

export const metadata: Metadata = {
  title: 'Why Movemental | Movemental',
  description: 'Your content is transformative. The problem is that it doesn\'t move. Learn why—and what we\'re doing about it.',
  openGraph: {
    title: 'Why Movemental Exists',
    description: 'Movement leaders have done the hard work. But their content remains locked in formats the world cannot find. We\'re changing that.',
    type: 'website',
  },
}

export default function WhyMovementalPage() {
  return <WhyMovementalContainer />
}
