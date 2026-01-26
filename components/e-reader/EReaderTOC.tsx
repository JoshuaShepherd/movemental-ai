'use client'

import { X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Chapter {
  number: number
  title: string
  slug: string
}

interface EReaderTOCProps {
  chapters: Chapter[]
  currentChapter: number
  completedChapters: number[]
  onSelectChapter: (chapter: number) => void
  onClose: () => void
  isOpen: boolean
  className?: string
}

export function EReaderTOC({
  chapters,
  currentChapter,
  completedChapters,
  onSelectChapter,
  onClose,
  isOpen,
  className,
}: EReaderTOCProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 w-full max-w-sm bg-background z-50 shadow-xl',
          'transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Table of Contents</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chapters List */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          {chapters.map((chapter) => {
            const isCompleted = completedChapters.includes(chapter.number)
            const isCurrent = chapter.number === currentChapter

            return (
              <button
                key={chapter.number}
                onClick={() => {
                  onSelectChapter(chapter.number)
                  onClose()
                }}
                className={cn(
                  'w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-muted transition-colors',
                  isCurrent && 'bg-primary/10'
                )}
              >
                {/* Status */}
                <span
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0',
                    isCompleted
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    chapter.number
                  )}
                </span>

                {/* Title */}
                <span
                  className={cn(
                    'flex-1 truncate',
                    isCurrent && 'font-medium',
                    isCompleted && !isCurrent && 'text-muted-foreground'
                  )}
                >
                  {chapter.title}
                </span>

                {/* Current Badge */}
                {isCurrent && (
                  <span className="text-xs text-primary font-medium">
                    Current
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
