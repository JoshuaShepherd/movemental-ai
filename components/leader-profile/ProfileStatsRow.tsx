'use client'

import { cn } from '@/lib/utils'
import { Heart, Eye, MessageSquare, Clock, Calendar, Award } from 'lucide-react'

interface Stat {
  /** Stat label */
  label: string
  /** Stat value (number or string) */
  value: string | number
  /** Optional icon */
  icon?: 'heart' | 'eye' | 'message' | 'clock' | 'calendar' | 'award'
  /** Accent color for the value */
  accent?: boolean
  /** Click handler */
  onClick?: () => void
}

interface ProfileStatsRowProps {
  /** Array of stats to display */
  stats: Stat[]
  /** Layout variant */
  variant?: 'row' | 'grid'
  /** Size variant */
  size?: 'sm' | 'default'
  /** Custom class name */
  className?: string
}

const iconMap = {
  heart: Heart,
  eye: Eye,
  message: MessageSquare,
  clock: Clock,
  calendar: Calendar,
  award: Award,
}

export function ProfileStatsRow({
  stats,
  variant = 'row',
  size = 'default',
  className,
}: ProfileStatsRowProps) {
  return (
    <div
      className={cn(
        variant === 'row'
          ? 'flex flex-wrap items-center gap-x-6 gap-y-2'
          : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4',
        className
      )}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon ? iconMap[stat.icon] : null

        return (
          <div
            key={index}
            className={cn(
              'flex items-center gap-1.5',
              stat.onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
              variant === 'grid' && 'flex-col items-start'
            )}
            onClick={stat.onClick}
          >
            {Icon && (
              <Icon
                className={cn(
                  'text-muted-foreground',
                  size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4',
                  stat.accent && stat.icon === 'heart' && 'text-pink-500 fill-pink-500'
                )}
              />
            )}
            <span
              className={cn(
                'font-semibold',
                size === 'sm' ? 'text-sm' : 'text-base',
                stat.accent && 'text-primary'
              )}
            >
              {stat.value}
            </span>
            <span
              className={cn(
                'text-muted-foreground',
                size === 'sm' ? 'text-xs' : 'text-sm'
              )}
            >
              {stat.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
