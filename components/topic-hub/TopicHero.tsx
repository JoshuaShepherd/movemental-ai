'use client'

import { Button } from '@/components/ui/button'
import { Bell, BookOpen, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopicHeroProps {
  topic: {
    title: string
    slug: string
    description: string
    icon: string
    color: string
    articleCount: number
    contributorCount: number
  }
  className?: string
}

const colorClasses: Record<string, string> = {
  blue: 'from-blue-600 to-blue-800',
  purple: 'from-purple-600 to-purple-800',
  green: 'from-green-600 to-green-800',
  orange: 'from-orange-600 to-orange-800',
  red: 'from-red-600 to-red-800',
  teal: 'from-teal-600 to-teal-800',
  indigo: 'from-indigo-600 to-indigo-800',
}

export function TopicHero({ topic, className }: TopicHeroProps) {
  const gradientClass = colorClasses[topic.color] || colorClasses.blue

  return (
    <section
      className={cn(
        'relative py-16 sm:py-24 px-4 bg-gradient-to-br text-white',
        gradientClass,
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon */}
        <div className="text-5xl sm:text-6xl mb-4">{topic.icon}</div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          {topic.title}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          {topic.description}
        </p>

        {/* Subscribe CTA */}
        <Button
          size="lg"
          className="h-12 px-6 bg-white text-sage-900 hover:bg-white/90 mb-8"
        >
          <Bell className="mr-2 h-4 w-4" />
          Subscribe to Topic
        </Button>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span>{topic.articleCount} pieces</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{topic.contributorCount} contributors</span>
          </div>
        </div>
      </div>
    </section>
  )
}
