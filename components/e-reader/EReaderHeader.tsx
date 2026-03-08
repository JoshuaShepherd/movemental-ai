'use client'

import Link from 'next/link'
import { ArrowLeft, List, Settings, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EReaderHeaderProps {
  bookTitle: string
  bookSlug: string
  currentChapter: number
  totalChapters: number
  onOpenTOC: () => void
  onOpenSettings: () => void
  onToggleBookmark: () => void
  isBookmarked?: boolean
  /** Custom back link URL. Defaults to /books/{bookSlug} */
  backHref?: string
  className?: string
}

export function EReaderHeader({
  bookTitle,
  bookSlug,
  currentChapter,
  totalChapters,
  onOpenTOC,
  onOpenSettings,
  onToggleBookmark,
  isBookmarked = false,
  backHref,
  className,
}: EReaderHeaderProps) {
  const backLink = backHref || `/books/${bookSlug}`

  return (
    <header
      className={cn(
        'sticky top-0 z-40 bg-background/95 backdrop-blur border-b',
        className
      )}
    >
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Back and Title */}
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="icon" asChild>
            <Link href={backLink}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <span className="font-medium truncate">{bookTitle}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onOpenTOC}>
            <List className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenSettings}>
            <Settings className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleBookmark}
            className={cn(isBookmarked && 'text-primary')}
          >
            <Bookmark
              className={cn('h-5 w-5', isBookmarked && 'fill-current')}
            />
          </Button>
          <span className="ml-2 text-sm text-muted-foreground whitespace-nowrap">
            Ch {currentChapter}/{totalChapters}
          </span>
        </div>
      </div>
    </header>
  )
}
