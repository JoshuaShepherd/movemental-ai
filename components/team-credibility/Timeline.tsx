'use client'

import { cn } from '@/lib/utils'
import { TimelineMilestone, Milestone } from './TimelineMilestone'

interface TimelineProps {
  milestones: Milestone[]
  className?: string
}

export function Timeline({ milestones, className }: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Desktop: Horizontal */}
      <div className="hidden md:block">
        {/* Timeline track */}
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />

        {/* Milestones */}
        <div className="relative flex justify-between">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="relative"
              style={{ width: `${100 / milestones.length}%` }}
            >
              <TimelineMilestone
                milestone={milestone}
                isFirst={index === 0}
                isLast={index === milestones.length - 1}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical */}
      <div className="md:hidden">
        {/* Timeline track */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon
            return (
              <div key={milestone.id} className="flex gap-4">
                {/* Icon */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-muted shrink-0">
                  <Icon className="h-6 w-6 text-muted-foreground" />
                </div>

                {/* Content */}
                <div className="pt-2">
                  <p className="text-lg font-bold text-foreground">{milestone.year}</p>
                  <p className="text-sm text-muted-foreground">{milestone.label}</p>
                  {milestone.description && (
                    <p className="mt-1 text-xs text-muted-foreground/70">
                      {milestone.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
