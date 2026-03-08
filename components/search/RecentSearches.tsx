'use client'

import { Clock, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RecentSearchesProps {
  searches: string[]
  onSelect: (query: string) => void
  onRemove: (query: string) => void
  onClear: () => void
  className?: string
}

export function RecentSearches({
  searches,
  onSelect,
  onRemove,
  onClear,
  className,
}: RecentSearchesProps) {
  if (searches.length === 0) return null

  return (
    <div className={cn('', className)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent searches
        </span>
        <button
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <div
            key={search}
            className="group flex items-center gap-1 px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-muted/80 transition-colors"
          >
            <button
              onClick={() => onSelect(search)}
              className="hover:text-primary transition-colors"
            >
              {search}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onRemove(search)
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-background rounded-full"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
