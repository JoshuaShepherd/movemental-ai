'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Play, Volume2, VolumeX, Maximize, Share2, Clock } from 'lucide-react'

interface VideoEmbedProps {
  /** Video source URL (YouTube, Vimeo, or direct URL) */
  src: string
  /** Video title */
  title?: string
  /** Video description */
  description?: string
  /** Thumbnail URL */
  thumbnailUrl?: string
  /** Show "Watch Later" button */
  showWatchLater?: boolean
  /** Show "Share" button */
  showShare?: boolean
  /** Aspect ratio */
  aspectRatio?: '16:9' | '4:3' | '1:1'
  /** Caption text */
  caption?: string
  /** Custom class name */
  className?: string
}

export function VideoEmbed({
  src,
  title,
  description,
  thumbnailUrl,
  showWatchLater = false,
  showShare = false,
  aspectRatio = '16:9',
  caption,
  className,
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const aspectRatioClasses = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  }

  // Detect video type and create embed URL
  const getEmbedUrl = () => {
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const videoId = src.includes('youtu.be')
        ? src.split('/').pop()
        : src.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (src.includes('vimeo.com')) {
      const videoId = src.split('/').pop()
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`
    }
    return src
  }

  return (
    <div className={cn('', className)}>
      {/* Video container */}
      <div
        className={cn(
          'relative rounded-xl overflow-hidden bg-slate-900',
          aspectRatioClasses[aspectRatio]
        )}
      >
        {isPlaying ? (
          <iframe
            src={getEmbedUrl()}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            {/* Thumbnail */}
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
            )}

            {/* Play button overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-slate-900 ml-1" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Info and actions */}
      {(title || description || showWatchLater || showShare) && (
        <div className="mt-4">
          {/* Title and description */}
          {(title || description) && (
            <div className="mb-3">
              {title && <h3 className="font-semibold text-lg">{title}</h3>}
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          )}

          {/* Actions */}
          {(showWatchLater || showShare) && (
            <div className="flex items-center gap-2">
              {showWatchLater && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  <Clock className="h-4 w-4" />
                  Watch Later
                </button>
              )}
              {showShare && (
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  <Share2 className="h-4 w-4" />
                  Share
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Caption */}
      {caption && (
        <p className="text-sm text-muted-foreground mt-3 text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
}
