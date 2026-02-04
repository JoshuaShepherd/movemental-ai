import { Metadata } from 'next'
import { FitCheckContainer } from '@/components/fit-check'

export const metadata: Metadata = {
  title: 'Is Movemental Built for You? | Movemental',
  description: 'A moment of recognition — not an application. See if Movemental is built for leaders like you.',
  openGraph: {
    title: 'Is Movemental Built for You?',
    description: 'A moment of recognition — not an application.',
    type: 'website',
  },
}

export default function FitCheckPage() {
  return <FitCheckContainer />
}
