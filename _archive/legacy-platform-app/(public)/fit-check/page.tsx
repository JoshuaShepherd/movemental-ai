import { Metadata } from 'next'
import { FitCheckContainer } from '@/components/fit-check'

export const metadata: Metadata = {
  title: 'Self-Screen | Movemental',
  description: 'We\'re focused on movement leaders. Take the Self-Screen—one question, multiple choices—to see if we\'re built for you.',
  openGraph: {
    title: 'Self-Screen | Movemental',
    description: 'See if Movemental is built for you. One question, multiple choices.',
    type: 'website',
  },
}

export default function FitCheckPage() {
  return <FitCheckContainer />
}
