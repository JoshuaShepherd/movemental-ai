'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ContributorCard } from './ContributorCard'
import { cn } from '@/lib/utils'

interface Contributor {
  name: string
  slug: string
  avatar?: string
  pieceCount: number
}

interface LeaderContributorsProps {
  title?: string
  contributors: Contributor[]
  viewAllHref?: string
  className?: string
}

export function LeaderContributors({
  title = 'Topic Contributors',
  contributors,
  viewAllHref,
  className,
}: LeaderContributorsProps) {
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

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-4 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
        {contributors.map((contributor) => (
          <ContributorCard
            key={contributor.slug}
            contributor={contributor}
            className="flex-shrink-0 w-32 sm:w-auto"
          />
        ))}
      </div>
    </section>
  )
}
