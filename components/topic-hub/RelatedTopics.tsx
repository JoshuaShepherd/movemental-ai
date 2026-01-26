'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface RelatedTopic {
  title: string
  slug: string
  icon: string
}

interface RelatedTopicsProps {
  topics: RelatedTopic[]
  className?: string
}

export function RelatedTopics({ topics, className }: RelatedTopicsProps) {
  if (topics.length === 0) return null

  return (
    <section className={cn('', className)}>
      <h2 className="text-xl font-bold mb-4">Explore Related Topics</h2>

      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full hover:bg-muted/80 transition-colors group"
          >
            <span className="text-lg">{topic.icon}</span>
            <span className="text-sm font-medium group-hover:text-primary transition-colors">
              {topic.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
