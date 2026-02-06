import { Metadata } from 'next'
import {
  CostConstraintsHero,
  CostConstraintsScroll,
  CostConstraintsPivot,
  CostConstraintsClosing,
} from '@/components/cost-constraints/CostConstraintsSection'

export const metadata: Metadata = {
  title: 'Cost & Constraints | Movemental',
  description:
    'Big claims require big evidence. See what it actually costs to build a platform like this — and how AI context coding changed the equation.',
  openGraph: {
    title: 'Cost & Constraints — Movemental',
    description:
      'A $500K platform built for $0. The receipts behind Movemental.',
    type: 'website',
  },
}

export default function CostConstraintsPage() {
  return (
    <>
      <CostConstraintsHero />
      <CostConstraintsScroll />
      <CostConstraintsPivot />
      <CostConstraintsClosing />
    </>
  )
}
