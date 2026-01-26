'use client'

import { cn } from '@/lib/utils'
import { ReadingTime } from './ReadingTime'

interface ChapterHeaderProps {
  chapterNumber?: number
  title: string
  subtitle?: string
  readingTime?: number // in minutes
  className?: string
}

export function ChapterHeader({
  chapterNumber,
  title,
  subtitle,
  readingTime,
  className,
}: ChapterHeaderProps) {
  return (
    <header className={cn('mb-12 sm:mb-16', className)}>
      {/* Chapter number */}
      {chapterNumber && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider mb-4">
          Chapter {chapterNumber}
        </p>
      )}

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-6">
          {subtitle}
        </p>
      )}

      {/* Reading time */}
      {readingTime && (
        <ReadingTime totalMinutes={readingTime} format="total" />
      )}
    </header>
  )
}
