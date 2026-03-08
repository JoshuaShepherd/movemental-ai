'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Clock, MoreVertical, FileText, Video, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

type ContentType = 'article' | 'video' | 'course' | 'page'
type ContentStatus = 'draft' | 'published' | 'archived'

interface ProjectCardProps {
  id: string
  title: string
  description?: string
  type: ContentType
  status: ContentStatus
  thumbnail?: string
  lastModified?: Date
  href: string
  className?: string
}

const typeIcons: Record<ContentType, React.ElementType> = {
  article: FileText,
  video: Video,
  course: BookOpen,
  page: FileText,
}

const statusColors: Record<ContentStatus, string> = {
  draft: 'bg-amber-500/10 text-amber-600',
  published: 'bg-emerald-500/10 text-emerald-600',
  archived: 'bg-slate-500/10 text-slate-600',
}

export function ProjectCard({
  id,
  title,
  description,
  type,
  status,
  thumbnail,
  lastModified,
  href,
  className,
}: ProjectCardProps) {
  const Icon = typeIcons[type]

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    return date.toLocaleDateString()
  }

  return (
    <Card
      className={cn(
        'group overflow-hidden hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <Link href={href}>
        {/* Thumbnail */}
        <div className="relative h-40 bg-muted">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon className="h-12 w-12 text-muted-foreground/30" />
            </div>
          )}
          
          {/* Status badge */}
          <span
            className={cn(
              'absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium capitalize',
              statusColors[status]
            )}
          >
            {status}
          </span>

          {/* More options */}
          <button
            onClick={(e) => {
              e.preventDefault()
              // Handle menu
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="h-4 w-4 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Type indicator */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
            <Icon className="h-3.5 w-3.5" />
            <span className="capitalize">{type}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          )}

          {/* Meta */}
          {lastModified && (
            <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatDate(lastModified)}</span>
            </div>
          )}
        </div>
      </Link>
    </Card>
  )
}
