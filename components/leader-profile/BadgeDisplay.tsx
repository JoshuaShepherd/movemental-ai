'use client'

import { cn } from '@/lib/utils'
import { 
  Award, 
  BookOpen, 
  Star, 
  Shield, 
  Zap, 
  Crown,
  CheckCircle,
  MessageCircle
} from 'lucide-react'

interface Badge {
  /** Badge identifier */
  id: string
  /** Badge name */
  name: string
  /** Badge description */
  description?: string
  /** Badge type for icon selection */
  type: 'author' | 'verified' | 'contributor' | 'expert' | 'moderator' | 'founder' | 'early-adopter' | 'active'
  /** Badge level (1-5) */
  level?: number
  /** Date earned */
  earnedAt?: string
}

interface BadgeDisplayProps {
  /** Array of badges to display */
  badges: Badge[]
  /** Display variant */
  variant?: 'inline' | 'grid' | 'list'
  /** Size variant */
  size?: 'sm' | 'default' | 'lg'
  /** Max badges to show (rest hidden behind "more") */
  maxVisible?: number
  /** Custom class name */
  className?: string
}

const badgeConfig: Record<Badge['type'], { icon: typeof Award; color: string; bgColor: string }> = {
  author: { icon: BookOpen, color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  verified: { icon: CheckCircle, color: 'text-blue-600', bgColor: 'bg-blue-100' },
  contributor: { icon: Star, color: 'text-amber-600', bgColor: 'bg-amber-100' },
  expert: { icon: Award, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  moderator: { icon: Shield, color: 'text-red-600', bgColor: 'bg-red-100' },
  founder: { icon: Crown, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  'early-adopter': { icon: Zap, color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  active: { icon: MessageCircle, color: 'text-pink-600', bgColor: 'bg-pink-100' },
}

export function BadgeDisplay({
  badges,
  variant = 'inline',
  size = 'default',
  maxVisible,
  className,
}: BadgeDisplayProps) {
  const visibleBadges = maxVisible ? badges.slice(0, maxVisible) : badges
  const hiddenCount = maxVisible ? Math.max(0, badges.length - maxVisible) : 0

  const sizeClasses = {
    sm: { icon: 'h-3 w-3', badge: 'px-2 py-0.5 text-xs gap-1', iconOnly: 'p-1' },
    default: { icon: 'h-4 w-4', badge: 'px-2.5 py-1 text-sm gap-1.5', iconOnly: 'p-1.5' },
    lg: { icon: 'h-5 w-5', badge: 'px-3 py-1.5 text-base gap-2', iconOnly: 'p-2' },
  }

  const layoutClasses = {
    inline: 'flex flex-wrap items-center gap-2',
    grid: 'grid grid-cols-2 sm:grid-cols-3 gap-2',
    list: 'flex flex-col gap-2',
  }

  return (
    <div className={cn(layoutClasses[variant], className)}>
      {visibleBadges.map((badge) => {
        const config = badgeConfig[badge.type]
        const Icon = config.icon

        if (variant === 'list') {
          return (
            <div
              key={badge.id}
              className={cn(
                'flex items-center gap-3 p-3 rounded-lg border bg-card',
                'hover:bg-accent/50 transition-colors cursor-default'
              )}
            >
              <div className={cn('rounded-full', config.bgColor, sizeClasses[size].iconOnly)}>
                <Icon className={cn(sizeClasses[size].icon, config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{badge.name}</p>
                {badge.description && (
                  <p className="text-xs text-muted-foreground truncate">{badge.description}</p>
                )}
              </div>
              {badge.level && (
                <span className="text-xs font-medium text-muted-foreground">
                  Lv.{badge.level}
                </span>
              )}
            </div>
          )
        }

        return (
          <div
            key={badge.id}
            className={cn(
              'inline-flex items-center rounded-full font-medium',
              config.bgColor,
              config.color,
              sizeClasses[size].badge
            )}
            title={badge.description}
          >
            <Icon className={sizeClasses[size].icon} />
            <span>{badge.name}</span>
          </div>
        )
      })}
      {hiddenCount > 0 && (
        <div
          className={cn(
            'inline-flex items-center rounded-full font-medium bg-muted text-muted-foreground',
            sizeClasses[size].badge
          )}
        >
          +{hiddenCount} more
        </div>
      )}
    </div>
  )
}
