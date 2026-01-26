'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Play, Image as ImageIcon, Music, File, Clock, MoreHorizontal } from 'lucide-react'

type MediaType = 'video' | 'image' | 'audio' | 'document'

interface MediaCardProps {
  /** Media ID */
  id: string
  /** Media title */
  title: string
  /** Media type */
  type: MediaType
  /** Thumbnail URL */
  thumbnailUrl?: string
  /** Duration (for video/audio) */
  duration?: string
  /** Last modified */
  lastModified?: string
  /** Is selected */
  isSelected?: boolean
  /** Click handler */
  onClick?: () => void
  /** Options click handler */
  onOptionsClick?: () => void
  /** Custom class name */
  className?: string
}

const typeIcons = {
  video: Play,
  image: ImageIcon,
  audio: Music,
  document: File,
}

const typeColors = {
  video: 'bg-purple-100 text-purple-600',
  image: 'bg-blue-100 text-blue-600',
  audio: 'bg-green-100 text-green-600',
  document: 'bg-amber-100 text-amber-600',
}

export function MediaCard({
  id,
  title,
  type,
  thumbnailUrl,
  duration,
  lastModified,
  isSelected = false,
  onClick,
  onOptionsClick,
  className,
}: MediaCardProps) {
  const Icon = typeIcons[type]

  return (
    <Card
      className={cn(
        'group overflow-hidden cursor-pointer transition-all',
        'hover:shadow-lg',
        isSelected && 'ring-2 ring-primary',
        className
      )}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className={cn('p-3 rounded-full', typeColors[type])}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        )}

        {/* Play overlay for video */}
        {type === 'video' && thumbnailUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-5 w-5 text-slate-900 ml-0.5" />
            </div>
          </div>
        )}

        {/* Duration badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
            {duration}
          </div>
        )}

        {/* Options button */}
        {onOptionsClick && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onOptionsClick()
            }}
            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-medium text-sm truncate">{title}</h3>
        {lastModified && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            {lastModified}
          </p>
        )}
      </div>
    </Card>
  )
}
