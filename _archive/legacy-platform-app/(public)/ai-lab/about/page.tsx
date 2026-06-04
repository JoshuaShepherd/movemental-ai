import { Metadata } from 'next'
import { AILabAboutContent } from '@/components/ai-lab/AILabAboutContent'

export const metadata: Metadata = {
  title: 'How We Do AI & the AI Lab | Movemental',
  description:
    'How Movemental does AI: scenius-enhanced intelligence, amplification not replacement, and the AI Lab—a configurable learning companion for movement leaders.',
  openGraph: {
    title: 'How We Do AI & the AI Lab | Movemental',
    description:
      'Learn how Movemental Intelligence works and how the AI Lab adapts to how you want to learn.',
    type: 'website',
  },
}

export default function AILabAboutPage() {
  return <AILabAboutContent />
}
