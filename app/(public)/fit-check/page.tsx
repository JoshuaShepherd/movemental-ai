import { Metadata } from 'next'
import { FitCheckContainer } from '@/components/fit-check'

export const metadata: Metadata = {
  title: 'Fit Check | Movemental',
  description: 'Take a 60-second assessment to determine if Movemental is right for you. Discover your alignment with movement leadership.',
  openGraph: {
    title: 'Is Movemental Right for You?',
    description: 'Take a 60-second assessment to discover your fit with the Movemental platform.',
    type: 'website',
  },
}

export default function FitCheckPage() {
  return <FitCheckContainer />
}
