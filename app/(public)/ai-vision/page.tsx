import { Metadata } from 'next'
import { AIVisionContainer } from '@/components/ai-vision'

export const metadata: Metadata = {
  title: 'Movemental Intelligence | AI Vision | Movemental',
  description: 'Discover how Movemental Intelligence amplifies authentic voices while maintaining theological depth. AI trained on movemental DNA across all domains.',
  openGraph: {
    title: 'Movemental Intelligence',
    description: 'AI that amplifies authentic voices while maintaining theological depth. Scenius-enhanced intelligence for movement leaders.',
    type: 'website',
  },
}

export default function AIVisionPage() {
  return <AIVisionContainer />
}
