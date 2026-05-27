'use client'

import { TopicHero } from './TopicHero'
import { FeaturedContentGrid } from './FeaturedContentGrid'
import { LeaderContributors } from './LeaderContributors'
import { RelatedTopics } from './RelatedTopics'
import { TopicStats } from './TopicStats'
import { cn } from '@/lib/utils'

interface TopicHubContainerProps {
  topic: {
    title: string
    slug: string
    description: string
    icon: string
    color: string
    articleCount: number
    contributorCount: number
  }
  featuredContent: {
    type: 'article' | 'book' | 'course' | 'video'
    title: string
    slug: string
    image?: string
    author: { name: string; avatar?: string }
    metadata: string
  }[]
  contributors: {
    name: string
    slug: string
    avatar?: string
    pieceCount: number
  }[]
  relatedTopics: {
    title: string
    slug: string
    icon: string
  }[]
  stats: {
    totalPieces: number
    contributors: number
    thisMonth: number
    trending?: boolean
  }
  className?: string
}

export function TopicHubContainer({
  topic,
  featuredContent,
  contributors,
  relatedTopics,
  stats,
  className,
}: TopicHubContainerProps) {
  return (
    <div className={cn('', className)}>
      {/* Hero */}
      <TopicHero topic={topic} />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-12 sm:space-y-16">
        {/* Stats */}
        <TopicStats stats={stats} />

        {/* Featured Content */}
        <FeaturedContentGrid
          content={featuredContent}
          viewAllHref={`/topics/${topic.slug}/content`}
        />

        {/* Contributors */}
        <LeaderContributors
          contributors={contributors}
          viewAllHref={`/topics/${topic.slug}/contributors`}
        />

        {/* Related Topics */}
        <RelatedTopics topics={relatedTopics} />
      </div>
    </div>
  )
}
