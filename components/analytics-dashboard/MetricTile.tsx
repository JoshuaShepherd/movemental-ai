'use client'

import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricTileProps {
  label: string
  value: string | number
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    percentage: number
  }
  icon?: LucideIcon
  onClick?: () => void
  className?: string
}

export function MetricTile({
  label,
  value,
  trend,
  icon: Icon,
  onClick,
  className,
}: MetricTileProps) {
  const TrendIcon =
    trend?.direction === 'up'
      ? TrendingUp
      : trend?.direction === 'down'
      ? TrendingDown
      : Minus

  const trendColor =
    trend?.direction === 'up'
      ? 'text-green-600'
      : trend?.direction === 'down'
      ? 'text-red-600'
      : 'text-muted-foreground'

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        'p-6 bg-card border rounded-xl text-left transition-all',
        onClick && 'hover:border-primary/50 hover:shadow-md cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>

      <p className="text-3xl font-bold mb-1">{value}</p>

      {trend && (
        <div className={cn('flex items-center gap-1 text-sm', trendColor)}>
          <TrendIcon className="h-4 w-4" />
          <span>
            {trend.direction === 'up' ? '+' : trend.direction === 'down' ? '-' : ''}
            {trend.percentage}%
          </span>
          <span className="text-muted-foreground">vs last period</span>
        </div>
      )}
    </button>
  )
}
