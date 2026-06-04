import { Metadata } from 'next'
import { MainFlowLanding } from '@/components/main-flow'

export const metadata: Metadata = {
  title: 'Movemental — For movement leaders',
  description:
    "We help movement leaders make the work they've already created findable, owned, and part of a credibility network—so it can move.",
}

export default function MainFlowPage() {
  return <MainFlowLanding />
}
