'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { 
  Globe, 
  Lock, 
  MoreHorizontal, 
  Star, 
  Clock,
  Folder,
  FileText
} from 'lucide-react'

interface ContentCard {
  id: string
  title: string
  thumbnail?: string
  type: 'document' | 'presentation' | 'folder' | 'image'
  isPublic?: boolean
  isShared?: boolean
  isFavorite?: boolean
  author?: {
    name: string
    avatarUrl?: string
  }
  lastViewed?: string
  url?: string
}

interface ContentCardGridProps {
  /** Array of content items */
  content: ContentCard[]
  /** Favorite toggle handler */
  onFavoriteToggle?: (id: string) => void
  /** Card click handler */
  onCardClick?: (id: string) => void
  /** Options menu click handler */
  onOptionsClick?: (id: string) => void
  /** Custom class name */
  className?: string
}

const typeIcons = {
  document: FileText,
  presentation: FileText,
  folder: Folder,
  image: FileText,
}

export function ContentCardGrid({
  content,
  onFavoriteToggle,
  onCardClick,
  onOptionsClick,
  className,
}: ContentCardGridProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  if (content.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground">No content yet</h3>
        <p className="text-sm text-muted-foreground/70 mt-1">
          Create your first piece of content to get started
        </p>
      </div>
    )
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4', className)}>
      {content.map((item) => {
        const TypeIcon = typeIcons[item.type]
        const initials = item.author?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

        return (
          <Card
            key={item.id}
            className={cn(
              'group relative overflow-hidden cursor-pointer transition-all',
              'hover:shadow-lg hover:ring-2 hover:ring-primary/20'
            )}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onCardClick?.(item.id)}
          >
            {/* Thumbnail */}
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
              {item.thumbnail ? (
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <TypeIcon className="h-12 w-12 text-primary/30" />
                </div>
              )}

              {/* Overlay badges */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                {item.isPublic ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/90 text-white text-xs rounded-full">
                    <Globe className="h-3 w-3" />
                    Site
                  </span>
                ) : item.isShared ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/90 text-white text-xs rounded-full">
                    Shared
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-muted/90 text-muted-foreground text-xs rounded-full">
                    <Lock className="h-3 w-3" />
                    Private
                  </span>
                )}
              </div>

              {/* Favorite button */}
              {hoveredId === item.id && onFavoriteToggle && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onFavoriteToggle(item.id)
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-background/90 rounded-full hover:bg-background transition-colors"
                >
                  <Star
                    className={cn(
                      'h-4 w-4',
                      item.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                    )}
                  />
                </button>
              )}
            </div>

            {/* Content info */}
            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{item.title}</h3>
                  {item.author && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.author.avatarUrl ? (
                          <img
                            src={item.author.avatarUrl}
                            alt={item.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-2xs font-medium text-primary">
                            {initials}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground truncate">
                        {item.author.name}
                      </span>
                    </div>
                  )}
                </div>
                {onOptionsClick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onOptionsClick(item.id)
                    }}
                    className="p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                )}
              </div>

              {item.lastViewed && (
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <Clock className="h-3 w-3" />
                  {item.lastViewed}
                </p>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
