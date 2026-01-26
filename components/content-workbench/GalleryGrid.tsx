'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  image: string
  author?: {
    name: string
    avatarUrl?: string
  }
  url?: string
}

interface GalleryGridProps {
  /** Section title */
  title?: string
  /** "View all" link URL */
  viewAllUrl?: string
  /** Array of gallery items */
  items: GalleryItem[]
  /** Columns per row */
  columns?: 3 | 4 | 5
  /** Enable carousel navigation */
  showNavigation?: boolean
  /** Dark background mode */
  darkMode?: boolean
  /** Custom class name */
  className?: string
}

export function GalleryGrid({
  title,
  viewAllUrl,
  items,
  columns = 4,
  showNavigation = true,
  darkMode = false,
  className,
}: GalleryGridProps) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const columnClasses = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  }

  return (
    <section
      className={cn(
        'py-8 px-4 rounded-xl',
        darkMode ? 'bg-slate-900' : 'bg-background',
        className
      )}
    >
      {/* Header */}
      {(title || viewAllUrl) && (
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h2
              className={cn(
                'text-xl font-semibold',
                darkMode && 'text-white'
              )}
            >
              {title}
            </h2>
          )}
          <div className="flex items-center gap-2">
            {viewAllUrl && (
              <a
                href={viewAllUrl}
                className={cn(
                  'text-sm font-medium hover:underline',
                  darkMode ? 'text-slate-300 hover:text-white' : 'text-primary'
                )}
              >
                View all
              </a>
            )}
            {showNavigation && items.length > columns && (
              <div className="flex items-center gap-1 ml-4">
                <button
                  onClick={() => setScrollPosition(Math.max(0, scrollPosition - 1))}
                  className={cn(
                    'p-1.5 rounded-full transition-colors',
                    darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-muted hover:bg-accent'
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setScrollPosition(Math.min(items.length - columns, scrollPosition + 1))
                  }
                  className={cn(
                    'p-1.5 rounded-full transition-colors',
                    darkMode
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-muted hover:bg-accent'
                  )}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className={cn('grid gap-4', columnClasses[columns])}>
        {items.slice(scrollPosition, scrollPosition + (columns * 2)).map((item) => (
          <Card
            key={item.id}
            className={cn(
              'group overflow-hidden cursor-pointer transition-all',
              'hover:shadow-lg hover:ring-2 hover:ring-primary/20',
              darkMode && 'bg-slate-800 border-slate-700'
            )}
          >
            <a href={item.url} className="block">
              {/* Image */}
              <div className="aspect-video bg-muted relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Author badge */}
                {item.author && (
                  <div className="absolute bottom-2 left-2">
                    <div className="w-8 h-8 rounded-full bg-background border-2 border-white overflow-hidden">
                      {item.author.avatarUrl ? (
                        <img
                          src={item.author.avatarUrl}
                          alt={item.author.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground">
                          {item.author.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="p-3">
                <h3
                  className={cn(
                    'font-medium text-sm truncate group-hover:text-primary transition-colors',
                    darkMode && 'text-white'
                  )}
                >
                  {item.title}
                </h3>
                {item.author && (
                  <p
                    className={cn(
                      'text-xs mt-1 truncate',
                      darkMode ? 'text-slate-400' : 'text-muted-foreground'
                    )}
                  >
                    by {item.author.name}
                  </p>
                )}
              </div>
            </a>
          </Card>
        ))}
      </div>
    </section>
  )
}
