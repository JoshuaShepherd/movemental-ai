'use client'

import { useState, useEffect, useCallback } from 'react'
import { EReaderHeader } from './EReaderHeader'
import { EReaderProgress } from './EReaderProgress'
import { EReaderContent } from './EReaderContent'
import { EReaderTOC } from './EReaderTOC'
import { EReaderSettings } from './EReaderSettings'
import { EReaderNavigation } from './EReaderNavigation'
import { cn } from '@/lib/utils'

interface Chapter {
  number: number
  title: string
  slug: string
  content: string
}

interface EReaderContainerProps {
  book: {
    title: string
    slug: string
    chapters: Chapter[]
  }
  initialChapter?: number
  /** Custom back link URL. Defaults to /books/{book.slug} */
  backHref?: string
  className?: string
}

export function EReaderContainer({
  book,
  initialChapter = 1,
  backHref,
  className,
}: EReaderContainerProps) {
  const [currentChapter, setCurrentChapter] = useState(initialChapter)
  const [progress, setProgress] = useState(0)
  const [isTOCOpen, setIsTOCOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [completedChapters, setCompletedChapters] = useState<number[]>([])
  const [settings, setSettings] = useState<{
    fontSize: number
    theme: 'light' | 'sepia' | 'dark'
    lineSpacing: 'compact' | 'normal' | 'relaxed'
  }>({
    fontSize: 18,
    theme: 'light',
    lineSpacing: 'normal',
  })

  const chapter = book.chapters.find((c) => c.number === currentChapter)
  const prevChapter = book.chapters.find((c) => c.number === currentChapter - 1)
  const nextChapter = book.chapters.find((c) => c.number === currentChapter + 1)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrollProgress)))

      // Mark chapter as completed when scrolled to 90%
      if (scrollProgress > 90 && !completedChapters.includes(currentChapter)) {
        setCompletedChapters((prev) => [...prev, currentChapter])
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentChapter, completedChapters])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevChapter) {
        setCurrentChapter(prevChapter.number)
        window.scrollTo(0, 0)
      } else if (e.key === 'ArrowRight' && nextChapter) {
        setCurrentChapter(nextChapter.number)
        window.scrollTo(0, 0)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevChapter, nextChapter])

  const goToChapter = useCallback((chapterNumber: number) => {
    setCurrentChapter(chapterNumber)
    window.scrollTo(0, 0)
  }, [])

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chapter not found</p>
      </div>
    )
  }

  return (
    <div className={cn('min-h-screen', className)}>
      {/* Header */}
      <EReaderHeader
        bookTitle={book.title}
        bookSlug={book.slug}
        currentChapter={currentChapter}
        totalChapters={book.chapters.length}
        onOpenTOC={() => setIsTOCOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleBookmark={() => setIsBookmarked(!isBookmarked)}
        isBookmarked={isBookmarked}
        backHref={backHref}
      />

      {/* Progress */}
      <EReaderProgress progress={progress} />

      {/* Content */}
      <EReaderContent
        chapterTitle={chapter.title}
        content={chapter.content}
        fontSize={settings.fontSize}
        theme={settings.theme}
        lineSpacing={settings.lineSpacing}
      />

      {/* Navigation */}
      <EReaderNavigation
        hasPrev={!!prevChapter}
        hasNext={!!nextChapter}
        prevTitle={prevChapter?.title}
        nextTitle={nextChapter?.title}
        onPrev={() => prevChapter && goToChapter(prevChapter.number)}
        onNext={() => nextChapter && goToChapter(nextChapter.number)}
      />

      {/* TOC Panel */}
      <EReaderTOC
        chapters={book.chapters}
        currentChapter={currentChapter}
        completedChapters={completedChapters}
        onSelectChapter={goToChapter}
        onClose={() => setIsTOCOpen(false)}
        isOpen={isTOCOpen}
      />

      {/* Settings Panel */}
      <EReaderSettings
        settings={settings}
        onChange={setSettings}
        onClose={() => setIsSettingsOpen(false)}
        isOpen={isSettingsOpen}
      />
    </div>
  )
}
