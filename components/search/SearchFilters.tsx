'use client'

import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
  count: number
}

interface SearchFiltersProps {
  filters: {
    types: string[]
    topics: string[]
    dateRange: 'any' | 'week' | 'month' | 'year'
  }
  onChange: (filters: SearchFiltersProps['filters']) => void
  availableFilters: {
    types: FilterOption[]
    topics: FilterOption[]
  }
  onClear: () => void
  className?: string
}

export function SearchFilters({
  filters,
  onChange,
  availableFilters,
  onClear,
  className,
}: SearchFiltersProps) {
  const toggleType = (type: string) => {
    const types = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type]
    onChange({ ...filters, types })
  }

  const toggleTopic = (topic: string) => {
    const topics = filters.topics.includes(topic)
      ? filters.topics.filter((t) => t !== topic)
      : [...filters.topics, topic]
    onChange({ ...filters, topics })
  }

  const setDateRange = (dateRange: 'any' | 'week' | 'month' | 'year') => {
    onChange({ ...filters, dateRange })
  }

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.topics.length > 0 ||
    filters.dateRange !== 'any'

  return (
    <div className={cn('space-y-6', className)}>
      {/* Content Type */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Content Type</h3>
        <div className="space-y-2">
          {availableFilters.types.map((type) => (
            <label
              key={type.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.types.includes(type.value)}
                onChange={() => toggleType(type.value)}
                className="h-4 w-4 rounded border-muted-foreground/50 text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {type.label}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                ({type.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Topic</h3>
        <div className="space-y-2">
          {availableFilters.topics.map((topic) => (
            <label
              key={topic.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.topics.includes(topic.value)}
                onChange={() => toggleTopic(topic.value)}
                className="h-4 w-4 rounded border-muted-foreground/50 text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {topic.label}
              </span>
              <span className="text-xs text-muted-foreground ml-auto">
                ({topic.count})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Date</h3>
        <div className="space-y-2">
          {[
            { value: 'any', label: 'Any time' },
            { value: 'week', label: 'Past week' },
            { value: 'month', label: 'Past month' },
            { value: 'year', label: 'Past year' },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="dateRange"
                checked={filters.dateRange === option.value}
                onChange={() =>
                  setDateRange(option.value as 'any' | 'week' | 'month' | 'year')
                }
                className="h-4 w-4 border-muted-foreground/50 text-primary focus:ring-primary"
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="text-sm text-primary hover:underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
