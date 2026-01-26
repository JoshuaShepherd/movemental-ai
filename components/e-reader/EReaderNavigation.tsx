'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EReaderNavigationProps {
  hasPrev: boolean
  hasNext: boolean
  prevTitle?: string
  nextTitle?: string
  onPrev: () => void
  onNext: () => void
  className?: string
}

export function EReaderNavigation({
  hasPrev,
  hasNext,
  prevTitle,
  nextTitle,
  onPrev,
  onNext,
  className,
}: EReaderNavigationProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-4 border-t bg-background',
        className
      )}
    >
      <Button
        variant="outline"
        onClick={onPrev}
        disabled={!hasPrev}
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">
          {prevTitle ? `Previous: ${prevTitle}` : 'Previous'}
        </span>
        <span className="sm:hidden">Prev</span>
      </Button>

      <Button
        variant="outline"
        onClick={onNext}
        disabled={!hasNext}
        className="gap-2"
      >
        <span className="hidden sm:inline">
          {nextTitle ? `Next: ${nextTitle}` : 'Next'}
        </span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
