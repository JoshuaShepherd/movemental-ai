'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Users, User, Lightbulb } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Overlap {
  name: string
  slug: string
  avatar?: string
  percentage: number
}

interface NetworkInsightsCardProps {
  overlapPercentage: number
  collaborationCount: number
  topOverlaps: Overlap[]
  className?: string
}

export function NetworkInsightsCard({
  overlapPercentage,
  collaborationCount,
  topOverlaps,
  className,
}: NetworkInsightsCardProps) {
  return (
    <div className={cn('p-6 bg-card border rounded-xl', className)}>
      <h3 className="text-lg font-semibold mb-6">Network Insights</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="h-4 w-4" />
            <span className="text-xs">Audience Overlap</span>
          </div>
          <p className="text-2xl font-bold">{overlapPercentage}%</p>
          <p className="text-xs text-muted-foreground">with network</p>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Lightbulb className="h-4 w-4" />
            <span className="text-xs">Collaboration</span>
          </div>
          <p className="text-2xl font-bold">{collaborationCount}</p>
          <p className="text-xs text-muted-foreground">opportunities</p>
        </div>
      </div>

      {/* Top Overlaps */}
      <div>
        <h4 className="text-sm font-medium mb-3">Top Overlaps</h4>
        <div className="space-y-2">
          {topOverlaps.map((overlap) => (
            <Link
              key={overlap.slug}
              href={`/profile/${overlap.slug}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                {overlap.avatar ? (
                  <Image
                    src={overlap.avatar}
                    alt={overlap.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{overlap.name}</p>
              </div>
              <span className="text-sm text-muted-foreground">
                {overlap.percentage}%
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
