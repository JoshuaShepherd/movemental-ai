import { Metadata } from 'next'
import { AIBookReader } from './AIBookReader'
import { BOOK_METADATA } from '@/lib/data/ai-book-chapters'

export const metadata: Metadata = {
  title: `Reading: ${BOOK_METADATA.title} | Movemental`,
  description: BOOK_METADATA.description,
}

interface PageProps {
  searchParams: Promise<{ chapter?: string }>
}

export default async function BookReadPage({ searchParams }: PageProps) {
  const params = await searchParams
  const initialChapter = params.chapter ? parseInt(params.chapter, 10) : 1

  return <AIBookReader initialChapter={initialChapter} />
}
