import { Metadata } from 'next'
import { SceniusVisualization } from '@/components/scenius-visualization'

export const metadata: Metadata = {
  title: 'Scenius Visualization | Movemental',
  description:
    'Explore the scenius — the collective genius network — behind the missional movement, centered on Alan Hirsch.',
  openGraph: {
    title: 'Scenius Visualization — The Network Behind the Movement',
    description:
      'A scroll-driven network graph revealing ~100 interconnected leaders in the missional movement.',
    type: 'website',
  },
}

export default function SceniusVisualizationPage() {
  return <SceniusVisualization />
}
