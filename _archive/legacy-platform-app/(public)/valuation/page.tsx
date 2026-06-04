import type { Metadata } from 'next'
import { ValuationContainer } from '@/components/valuation'

export const metadata: Metadata = {
  title: 'The Business | Movemental',
  description:
    'Understand how Movemental is valued. Transparent ARR modeling, pricing structure, and milestone-based projections.',
  openGraph: {
    title: 'The Business | Movemental',
    description:
      'Understand how Movemental is valued. Transparent ARR modeling, pricing structure, and milestone-based projections.',
  },
}

export default function ValuationPage() {
  return <ValuationContainer />
}
