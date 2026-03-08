'use client'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Heart, Eye, MessageSquare, Clock, Calendar, Trophy } from 'lucide-react'

interface Stat {
  label: string
  value: string | number
  icon?: 'heart' | 'eye' | 'message' | 'clock' | 'calendar' | 'trophy'
  change?: {
    value: number
    type: 'increase' | 'decrease'
  }
}

interface ProfileStatsDisplayProps {
  /** Section title */
  title?: string
  /** Array of stats */
  stats: Stat[]
  /** Layout variant */
  variant?: 'row' | 'grid'
  /** Custom class name */
  className?: string
}

const iconMap = {
  heart: Heart,
  eye: Eye,
  message: MessageSquare,
  clock: Clock,
  calendar: Calendar,
  trophy: Trophy,
}

export function ProfileStatsDisplay({
  title,
  stats,
  variant = 'grid',
  className,
}: ProfileStatsDisplayProps) {
  if (variant === 'row') {
    return (
      <div className={cn('', className)}>
        {title && (
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            {title}
          </h3>
        )}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon ? iconMap[stat.icon] : null

            return (
              <div key={index} className="flex items-center gap-2">
                {Icon && (
                  <Icon
                    className={cn(
                      'h-4 w-4',
                      stat.icon === 'heart' ? 'text-pink-500' : 'text-muted-foreground'
                    )}
                  />
                )}
                <span className="font-semibold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('', className)}>
      {title && (
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          {title}
        </h3>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon ? iconMap[stat.icon] : null

          return (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      stat.icon === 'heart' ? 'bg-pink-100' : 'bg-muted'
                    )}
                  >
                    <Icon
                      className={cn(
                        'h-5 w-5',
                        stat.icon === 'heart' ? 'text-pink-500' : 'text-muted-foreground'
                      )}
                    />
                  </div>
                )}
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
              {stat.change && (
                <p
                  className={cn(
                    'text-xs mt-2',
                    stat.change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {stat.change.type === 'increase' ? '+' : '-'}
                  {Math.abs(stat.change.value)}% from last month
                </p>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
