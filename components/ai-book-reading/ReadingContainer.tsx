'use client'

import { cn } from '@/lib/utils'
import { ReadingProgress } from './ReadingProgress'
import { TableOfContents } from './TableOfContents'
import { ChapterNav } from './ChapterNav'
import { ChapterHeader } from './ChapterHeader'

interface Chapter {
  id: string
  number: number
  title: string
  href: string
}

interface ReadingContainerProps {
  children: React.ReactNode
  chapter?: {
    number?: number
    title: string
    subtitle?: string
    readingTime?: number
  }
  chapters?: Chapter[]
  currentChapterId?: string
  previousChapter?: { id: string; title: string; href: string }
  nextChapter?: { id: string; title: string; href: string }
  showProgress?: boolean
  showTableOfContents?: boolean
  className?: string
}

export function ReadingContainer({
  children,
  chapter,
  chapters,
  currentChapterId,
  previousChapter,
  nextChapter,
  showProgress = true,
  showTableOfContents = true,
  className,
}: ReadingContainerProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Progress bar */}
      {showProgress && <ReadingProgress position="top" />}

      {/* Table of contents sidebar (desktop) */}
      {showTableOfContents && chapters && chapters.length > 0 && (
        <TableOfContents
          chapters={chapters}
          currentChapterId={currentChapterId}
          variant="sidebar"
        />
      )}

      {/* Main reading area */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Chapter header */}
        {chapter && (
          <ChapterHeader
            chapterNumber={chapter.number}
            title={chapter.title}
            subtitle={chapter.subtitle}
            readingTime={chapter.readingTime}
          />
        )}

        {/* Content */}
        <article className="prose-reading">
          {children}
        </article>

        {/* Chapter navigation */}
        {(previousChapter || nextChapter) && (
          <ChapterNav
            previousChapter={previousChapter}
            nextChapter={nextChapter}
          />
        )}
      </main>
    </div>
  )
}
