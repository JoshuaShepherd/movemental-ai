'use client'

import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface SearchEmptyStateProps {
  query: string
  hasFilters?: boolean
  onClearFilters?: () => void
  className?: string
}

export function SearchEmptyState({
  query,
  hasFilters = false,
  onClearFilters,
  className,
}: SearchEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>

      <h2 className="text-xl font-semibold mb-2">
        No results for &quot;{query}&quot;
      </h2>

      <p className="text-muted-foreground mb-6 max-w-md">
        We couldn&apos;t find any content matching your search. Try adjusting your
        search terms or filters.
      </p>

      <div className="space-y-2 text-sm text-muted-foreground mb-8">
        <p className="font-medium text-foreground">Try:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Using different keywords</li>
          <li>Checking your spelling</li>
          {hasFilters && <li>Removing some filters</li>}
          <li>Searching for broader terms</li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {hasFilters && onClearFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            Clear Filters
          </Button>
        )}
        <Button asChild>
          <Link href="/book">Browse All Content</Link>
        </Button>
      </div>
    </div>
  )
}
