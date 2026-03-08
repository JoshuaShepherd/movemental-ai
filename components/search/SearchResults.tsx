'use client'

import { SearchResultCard } from './SearchResultCard'
import { cn } from '@/lib/utils'

interface SearchResult {
  type: 'article' | 'book' | 'course' | 'video' | 'leader'
  title: string
  slug: string
  excerpt: string
  thumbnail?: string
  author?: {
    name: string
    avatar?: string
  }
  topics: string[]
  metadata: string
}

interface SearchResultsProps {
  results: SearchResult[]
  totalCount: number
  query: string
  className?: string
}

export function SearchResults({
  results,
  totalCount,
  query,
  className,
}: SearchResultsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {totalCount.toLocaleString()} result{totalCount !== 1 ? 's' : ''} for{' '}
          <span className="font-medium text-foreground">&quot;{query}&quot;</span>
        </p>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((result) => (
          <SearchResultCard
            key={`${result.type}-${result.slug}`}
            result={result}
          />
        ))}
      </div>
    </div>
  )
}
