'use client'

import { cn } from '@/lib/utils'
import { Heart, MessageSquare, ExternalLink, FileText, Link2 } from 'lucide-react'

interface Contribution {
  id: string
  title: string
  type: 'post' | 'reply' | 'link' | 'topic'
  url: string
  date: string
  likes?: number
  replies?: number
}

interface TopContributionsProps {
  /** Section title */
  title: string
  /** Array of contributions */
  contributions: Contribution[]
  /** Max items to show */
  maxItems?: number
  /** Custom class name */
  className?: string
}

const typeIcons = {
  post: FileText,
  reply: MessageSquare,
  link: Link2,
  topic: FileText,
}

export function TopContributions({
  title,
  contributions,
  maxItems = 5,
  className,
}: TopContributionsProps) {
  const visibleContributions = contributions.slice(0, maxItems)

  if (visibleContributions.length === 0) {
    return (
      <div className={cn('', className)}>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground italic">No contributions yet.</p>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
        {title}
      </h3>
      <div className="space-y-2">
        {visibleContributions.map((contribution) => {
          const Icon = typeIcons[contribution.type]
          
          return (
            <a
              key={contribution.id}
              href={contribution.url}
              className="flex items-start gap-3 p-2 -mx-2 rounded-md hover:bg-accent transition-colors group"
            >
              <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary group-hover:underline truncate">
                  {contribution.title}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{contribution.date}</span>
                  {contribution.likes !== undefined && contribution.likes > 0 && (
                    <span className="flex items-center gap-1">
                      <Heart className="h-3 w-3 text-pink-500" />
                      {contribution.likes}
                    </span>
                  )}
                  {contribution.replies !== undefined && contribution.replies > 0 && (
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {contribution.replies}
                    </span>
                  )}
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </a>
          )
        })}
      </div>
    </div>
  )
}
