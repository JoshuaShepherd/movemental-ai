'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Play, Clock, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface VideoLearningCardProps {
  title: string
  thumbnail?: string
  duration: string
  href: string
  isWatched?: boolean
  progress?: number
  className?: string
}

export function VideoLearningCard({
  title,
  thumbnail,
  duration,
  href,
  isWatched,
  progress,
  className,
}: VideoLearningCardProps) {
  return (
    <Link href={href} className={cn('group', className)}>
      <Card className="overflow-hidden hover:shadow-md transition-all">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted">
          {thumbnail ? (
            <Image src={thumbnail} alt={title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Play overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
              <Play className="h-6 w-6 text-slate-900 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </div>

          {/* Watched indicator */}
          {isWatched && (
            <div className="absolute top-2 left-2">
              <CheckCircle2 className="h-6 w-6 text-emerald-500" fill="white" />
            </div>
          )}

          {/* Progress bar */}
          {progress !== undefined && progress > 0 && progress < 100 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
              <div
                className="h-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </div>
      </Card>
    </Link>
  )
}
