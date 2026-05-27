'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, FileText, Video, User, GraduationCap, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchResultCardProps {
  result: {
    type: 'article' | 'book' | 'course' | 'video' | 'leader'
    title: string
    slug: string
    excerpt: string
    thumbnail?: string
    author?: {
      name: string
      avatar?: string
    }
    topics: string[]
    metadata: string
  }
  className?: string
}

const typeConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  article: {
    icon: <FileText className="h-3.5 w-3.5" />,
    label: 'Article',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  book: {
    icon: <BookOpen className="h-3.5 w-3.5" />,
    label: 'Book',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  course: {
    icon: <GraduationCap className="h-3.5 w-3.5" />,
    label: 'Course',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  video: {
    icon: <Video className="h-3.5 w-3.5" />,
    label: 'Video',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
  leader: {
    icon: <User className="h-3.5 w-3.5" />,
    label: 'Leader',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
}

export function SearchResultCard({ result, className }: SearchResultCardProps) {
  const config = typeConfig[result.type]

  // Course and article detail pages not yet implemented
  const href =
    result.type === 'leader'
      ? `/profile/${result.slug}`
      : result.type === 'book'
      ? `/books/${result.slug}`
      : result.type === 'course'
      ? `/learn`
      : result.type === 'video'
      ? `/book`
      : `/book` // Articles not yet implemented - link to AI book

  return (
    <Link
      href={href}
      className={cn(
        'block p-4 sm:p-6 bg-card border rounded-xl hover:border-primary/50 hover:shadow-md transition-all group',
        className
      )}
    >
      <div className="flex gap-4 sm:gap-6">
        {/* Thumbnail */}
        {result.thumbnail && (
          <div className="flex-shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-muted">
            <Image
              src={result.thumbnail}
              alt={result.title}
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Type Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium mb-2',
              config.color
            )}
          >
            {config.icon}
            {config.label}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {result.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {result.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {/* Author */}
            {result.author && (
              <div className="flex items-center gap-1.5">
                {result.author.avatar ? (
                  <Image
                    src={result.author.avatar}
                    alt={result.author.name}
                    width={16}
                    height={16}
                    className="rounded-full"
                  />
                ) : (
                  <User className="h-3.5 w-3.5" />
                )}
                <span>{result.author.name}</span>
              </div>
            )}

            {/* Metadata (reading time, chapters, etc.) */}
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{result.metadata}</span>
            </div>

            {/* Topics */}
            {result.topics.length > 0 && (
              <div className="hidden sm:flex items-center gap-1.5">
                {result.topics.slice(0, 2).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-0.5 bg-muted rounded-full"
                  >
                    {topic}
                  </span>
                ))}
                {result.topics.length > 2 && (
                  <span className="text-muted-foreground">
                    +{result.topics.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
