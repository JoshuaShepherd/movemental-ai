'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SearchInput } from './SearchInput'
import { SearchFilters } from './SearchFilters'
import { SearchResults } from './SearchResults'
import { SearchEmptyState } from './SearchEmptyState'
import { RecentSearches } from './RecentSearches'
import { SearchPagination } from './SearchPagination'
import { cn } from '@/lib/utils'

// Sample data - in production this would come from API/database
const SAMPLE_RESULTS = [
  {
    type: 'article' as const,
    title: 'The Formation Crisis: Why Spiritual Formation Matters More Than Ever',
    slug: 'formation-crisis',
    excerpt: 'In an age of distraction and digital overwhelm, the ancient practices of spiritual formation offer a path to depth and transformation that our souls desperately need.',
    thumbnail: '/api/placeholder/112/112',
    author: { name: 'Mindy Caliguire', avatar: '/api/placeholder/32/32' },
    topics: ['Formation', 'Psychology'],
    metadata: '8 min read',
  },
  {
    type: 'book' as const,
    title: 'The Forgotten Ways: Reactivating Apostolic Movements',
    slug: 'forgotten-ways',
    excerpt: 'A groundbreaking exploration of the six elements of missional DNA that powered the early church and can transform the church today.',
    thumbnail: '/api/placeholder/112/112',
    author: { name: 'Alan Hirsch' },
    topics: ['Leadership', 'Movement'],
    metadata: '14 chapters',
  },
  {
    type: 'course' as const,
    title: 'APEST Leadership Assessment & Development',
    slug: 'apest-course',
    excerpt: 'Discover your unique ministry calling through the fivefold ministry framework and learn how to develop your gifts.',
    thumbnail: '/api/placeholder/112/112',
    author: { name: 'Alan Hirsch' },
    topics: ['Leadership', 'APEST'],
    metadata: '6 modules',
  },
  {
    type: 'leader' as const,
    title: 'Tim Keel',
    slug: 'tim-keel',
    excerpt: 'Author, speaker, and practitioner exploring the intersection of creativity, theology, and organizational leadership.',
    thumbnail: '/api/placeholder/112/112',
    topics: ['Creativity', 'Leadership'],
    metadata: '23 pieces',
  },
  {
    type: 'article' as const,
    title: 'Network Effects: Why Connected Platforms Create Exponential Value',
    slug: 'network-effects',
    excerpt: 'Understanding how network participation amplifies reach and creates value that isolated platforms cannot achieve.',
    author: { name: 'Scott Shepherd' },
    topics: ['Platform', 'Strategy'],
    metadata: '12 min read',
  },
]

const AVAILABLE_FILTERS = {
  types: [
    { value: 'article', label: 'Articles', count: 89 },
    { value: 'book', label: 'Books', count: 23 },
    { value: 'course', label: 'Courses', count: 8 },
    { value: 'video', label: 'Videos', count: 15 },
    { value: 'leader', label: 'Leaders', count: 42 },
  ],
  topics: [
    { value: 'formation', label: 'Formation', count: 34 },
    { value: 'leadership', label: 'Leadership', count: 56 },
    { value: 'movement', label: 'Movement', count: 28 },
    { value: 'psychology', label: 'Psychology', count: 19 },
    { value: 'theology', label: 'Theology', count: 45 },
  ],
}

interface SearchContainerProps {
  className?: string
}

export function SearchContainer({ className }: SearchContainerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [hasSearched, setHasSearched] = useState(!!searchParams.get('q'))
  const [filters, setFilters] = useState({
    types: [] as string[],
    topics: [] as string[],
    dateRange: 'any' as 'any' | 'week' | 'month' | 'year',
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'formation practices',
    'APEST',
    'network effects',
  ])

  // Update URL when search changes
  const updateUrl = useCallback((newQuery: string) => {
    const params = new URLSearchParams()
    if (newQuery) params.set('q', newQuery)
    router.push(`/search?${params.toString()}`, { scroll: false })
  }, [router])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    setHasSearched(true)
    setCurrentPage(1)
    updateUrl(searchQuery)
    
    // Add to recent searches
    if (searchQuery && !recentSearches.includes(searchQuery)) {
      setRecentSearches((prev) => [searchQuery, ...prev.slice(0, 4)])
    }
  }

  const clearFilters = () => {
    setFilters({
      types: [],
      topics: [],
      dateRange: 'any',
    })
  }

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.topics.length > 0 ||
    filters.dateRange !== 'any'

  // Filter results based on current filters
  const filteredResults = SAMPLE_RESULTS.filter((result) => {
    if (filters.types.length > 0 && !filters.types.includes(result.type)) {
      return false
    }
    if (filters.topics.length > 0) {
      const hasMatchingTopic = result.topics.some((topic) =>
        filters.topics.includes(topic.toLowerCase())
      )
      if (!hasMatchingTopic) return false
    }
    return true
  })

  const totalPages = Math.ceil(filteredResults.length / 10)

  return (
    <div className={cn('', className)}>
      {/* Search Hero */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Search</h1>
        <div className="max-w-2xl mx-auto relative">
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSearch}
            autoFocus
          />
        </div>

        {/* Recent Searches (only show before search) */}
        {!hasSearched && (
          <div className="mt-6 max-w-2xl mx-auto">
            <RecentSearches
              searches={recentSearches}
              onSelect={handleSearch}
              onRemove={(search) =>
                setRecentSearches((prev) => prev.filter((s) => s !== search))
              }
              onClear={() => setRecentSearches([])}
            />
          </div>
        )}
      </div>

      {/* Results Section */}
      {hasSearched && (
        <div className="flex gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <SearchFilters
                filters={filters}
                onChange={setFilters}
                availableFilters={AVAILABLE_FILTERS}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4 flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMobileFilters(true)}
                className="gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                    {filters.types.length + filters.topics.length}
                  </span>
                )}
              </Button>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </div>

            {/* Results or Empty State */}
            {filteredResults.length > 0 ? (
              <>
                <SearchResults
                  results={filteredResults}
                  totalCount={filteredResults.length}
                  query={query}
                />
                <div className="mt-8">
                  <SearchPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </>
            ) : (
              <SearchEmptyState
                query={query}
                hasFilters={hasActiveFilters}
                onClearFilters={clearFilters}
              />
            )}
          </div>
        </div>
      )}

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SearchFilters
              filters={filters}
              onChange={setFilters}
              availableFilters={AVAILABLE_FILTERS}
              onClear={clearFilters}
            />
            <div className="mt-6 pt-6 border-t">
              <Button
                className="w-full"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
