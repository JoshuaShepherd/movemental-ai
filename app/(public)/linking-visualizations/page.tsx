import type { Metadata } from 'next'
import { LinkingVisualizationsPage } from '@/components/linking-visualizations'

export const metadata: Metadata = {
  title: 'Linking Visualizations — Movemental',
  description:
    'See how movement leader platforms connect through cross-tenant citations, shared calendars, co-authorship, and more.',
}

export default function Page() {
  return <LinkingVisualizationsPage />
}
