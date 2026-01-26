'use client'

import { EReaderContainer } from '@/components/e-reader'
import { ALL_CHAPTERS, BOOK_METADATA } from '@/lib/data/ai-book-chapters'

interface AIBookReaderProps {
  initialChapter?: number
}

// Transform our book data to match EReaderContainer's expected format
const BOOK_DATA = {
  title: BOOK_METADATA.title,
  slug: 'movemental-ai-book',
  chapters: ALL_CHAPTERS.map((chapter) => ({
    number: chapter.number,
    title: chapter.title,
    slug: chapter.slug,
    content: chapter.content,
  })),
}

export function AIBookReader({ initialChapter = 1 }: AIBookReaderProps) {
  return (
    <EReaderContainer
      book={BOOK_DATA}
      initialChapter={initialChapter}
      backHref="/book"
    />
  )
}
