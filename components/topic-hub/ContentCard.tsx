'use client'

import Link from 'next/link'
import Image from 'next/image'
import { BookOpen, FileText, Video, GraduationCap, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContentCardProps {
  content: {
    type: 'article' | 'book' | 'course' | 'video'
    title: string
    slug: string
    image?: string
    author: {
      name: string
      avatar?: string
    }
    metadata: string
  }
  className?: string
}

const typeConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  article: {
    icon: <FileText className="h-3 w-3" />,
    label: 'Article',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  book: {
    icon: <BookOpen className="h-3 w-3" />,
    label: 'Book',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  },
  course: {
    icon: <GraduationCap className="h-3 w-3" />,
    label: 'Course',
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  video: {
    icon: <Video className="h-3 w-3" />,
    label: 'Video',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

export function ContentCard({ content, className }: ContentCardProps) {
  const config = typeConfig[content.type]

  // Course detail pages not yet implemented - link to learn hub
  const href =
    content.type === 'book'
      ? `/books/${content.slug}`
      : content.type === 'course'
      ? `/learn`
      : content.type === 'video'
      ? `/book` // Videos not yet implemented - link to AI book
      : `/book` // Articles not yet implemented - link to AI book

  return (
    <Link
      href={href}
      className={cn(
        'block bg-card border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all group',
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[16/10] bg-muted relative overflow-hidden">
        {content.image ? (
          <Image
            src={content.image}
            alt={content.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {config.icon}
          </div>
        )}
        {/* Type Badge */}
        <div
          className={cn(
            'absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
            config.color
          )}
        >
          {config.icon}
          {config.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
          {content.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{content.author.name}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {content.metadata}
          </span>
        </div>
      </div>
    </Link>
  )
}
