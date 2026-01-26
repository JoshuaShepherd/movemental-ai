'use client'

import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface Milestone {
  id: string
  year: string
  label: string
  description?: string
  icon: LucideIcon
  type?: 'product' | 'funding' | 'event' | 'milestone'
}

interface TimelineMilestoneProps {
  milestone: Milestone
  isFirst?: boolean
  isLast?: boolean
  className?: string
}

const typeColors = {
  product: 'bg-blue-500',
  funding: 'bg-emerald-500',
  event: 'bg-purple-500',
  milestone: 'bg-amber-500',
}

export function TimelineMilestone({
  milestone,
  isFirst,
  isLast,
  className,
}: TimelineMilestoneProps) {
  const Icon = milestone.icon
  const typeColor = typeColors[milestone.type || 'milestone']

  return (
    <div
      className={cn(
        'flex flex-col items-center text-center group',
        className
      )}
    >
      {/* Icon circle */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center',
          'w-16 h-16 rounded-full bg-background border-4 border-muted',
          'transition-all duration-200 group-hover:border-primary group-hover:scale-110'
        )}
      >
        <div
          className={cn(
            'absolute inset-2 rounded-full',
            typeColor,
            'opacity-10 group-hover:opacity-20 transition-opacity'
          )}
        />
        <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Year */}
      <p className="mt-4 text-xl font-bold text-foreground">{milestone.year}</p>

      {/* Label */}
      <p className="mt-1 text-sm text-muted-foreground max-w-[120px]">
        {milestone.label}
      </p>

      {/* Description (tooltip on hover) */}
      {milestone.description && (
        <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-popover text-popover-foreground text-xs p-2 rounded shadow-lg max-w-[200px]">
            {milestone.description}
          </div>
        </div>
      )}
    </div>
  )
}
