'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Search, ChevronDown, ChevronRight, Tag } from 'lucide-react'

interface Category {
  id: string
  name: string
  color: string
  count?: number
}

interface TagItem {
  id: string
  name: string
}

interface CategorySidebarProps {
  /** Array of categories */
  categories: Category[]
  /** Currently selected category ID (null for "All") */
  selectedCategory: string | null
  /** Category selection handler */
  onCategorySelect: (categoryId: string | null) => void
  /** Popular tags */
  tags?: TagItem[]
  /** Selected tags */
  selectedTags?: string[]
  /** Tag selection handler */
  onTagSelect?: (tagId: string) => void
  /** Search query */
  searchQuery?: string
  /** Search change handler */
  onSearchChange?: (query: string) => void
  /** Custom class name */
  className?: string
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  tags = [],
  selectedTags = [],
  onTagSelect,
  searchQuery = '',
  onSearchChange,
  className,
}: CategorySidebarProps) {
  const [isTagsExpanded, setIsTagsExpanded] = useState(true)

  return (
    <aside className={cn('w-64 flex-shrink-0', className)}>
      {/* Search */}
      {onSearchChange && (
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search members..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Categories
        </h3>
        <nav className="space-y-1">
          {/* All categories option */}
          <button
            onClick={() => onCategorySelect(null)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
              selectedCategory === null
                ? 'bg-primary/10 text-primary font-medium'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            )}
          >
            <span className="w-2 h-2 rounded-full bg-muted-foreground" />
            All categories
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
                selectedCategory === category.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="flex-1 text-left truncate">{category.name}</span>
              {category.count !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {category.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tags */}
      {tags.length > 0 && onTagSelect && (
        <div>
          <button
            onClick={() => setIsTagsExpanded(!isTagsExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3"
          >
            <span className="flex items-center gap-2">
              <Tag className="h-3 w-3" />
              Tags
            </span>
            {isTagsExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {isTagsExpanded && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => onTagSelect(tag.id)}
                  className={cn(
                    'px-2 py-1 text-xs rounded-md transition-colors',
                    selectedTags.includes(tag.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
