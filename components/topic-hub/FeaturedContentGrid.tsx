'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ContentCard } from './ContentCard'
import { cn } from '@/lib/utils'

interface Content {
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

interface FeaturedContentGridProps {
  title?: string
  content: Content[]
  viewAllHref?: string
  className?: string
}

export function FeaturedContentGrid({
  title = 'Featured Content',
  content,
  viewAllHref,
  className,
}: FeaturedContentGridProps) {
  return (
    <section className={cn('', className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <ContentCard key={`${item.type}-${item.slug}`} content={item} />
        ))}
      </div>
    </section>
  )
}
