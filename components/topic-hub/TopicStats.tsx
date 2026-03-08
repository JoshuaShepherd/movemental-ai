'use client'

import { BookOpen, Users, TrendingUp, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TopicStatsProps {
  stats: {
    totalPieces: number
    contributors: number
    thisMonth: number
    trending?: boolean
  }
  className?: string
}

export function TopicStats({ stats, className }: TopicStatsProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-4 gap-4',
        className
      )}
    >
      <div className="p-4 bg-card border rounded-xl">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <BookOpen className="h-4 w-4" />
          <span className="text-xs">Total Pieces</span>
        </div>
        <p className="text-2xl font-bold">{stats.totalPieces}</p>
      </div>

      <div className="p-4 bg-card border rounded-xl">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Users className="h-4 w-4" />
          <span className="text-xs">Contributors</span>
        </div>
        <p className="text-2xl font-bold">{stats.contributors}</p>
      </div>

      <div className="p-4 bg-card border rounded-xl">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <Calendar className="h-4 w-4" />
          <span className="text-xs">This Month</span>
        </div>
        <p className="text-2xl font-bold">{stats.thisMonth}</p>
      </div>

      <div className="p-4 bg-card border rounded-xl">
        <div className="flex items-center gap-2 text-muted-foreground mb-1">
          <TrendingUp className="h-4 w-4" />
          <span className="text-xs">Status</span>
        </div>
        <p className="text-lg font-semibold">
          {stats.trending ? (
            <span className="text-green-600">Trending</span>
          ) : (
            <span className="text-muted-foreground">Active</span>
          )}
        </p>
      </div>
    </div>
  )
}
