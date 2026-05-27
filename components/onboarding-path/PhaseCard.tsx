'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  ChevronDown, 
  CheckCircle2, 
  Circle,
  Compass,
  Search,
  Layout,
  Rocket,
  Clock
} from 'lucide-react'
import type { OnboardingPhase, PhaseStatus } from '@/lib/schemas/onboarding-path'

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  Compass,
  Search,
  Layout,
  Rocket,
}

interface PhaseCardProps {
  phase: OnboardingPhase
  isExpanded?: boolean
  onToggle?: () => void
  className?: string
}

const statusColors: Record<PhaseStatus, string> = {
  completed: 'border-emerald-500 bg-emerald-500/5',
  current: 'border-primary bg-primary/5 ring-2 ring-primary/20',
  upcoming: 'border-border bg-card',
}

const statusBadgeColors: Record<PhaseStatus, string> = {
  completed: 'bg-emerald-500 text-white',
  current: 'bg-primary text-primary-foreground',
  upcoming: 'bg-muted text-muted-foreground',
}

export function PhaseCard({
  phase,
  isExpanded = false,
  onToggle,
  className,
}: PhaseCardProps) {
  const [localExpanded, setLocalExpanded] = useState(isExpanded)
  const expanded = onToggle ? isExpanded : localExpanded
  const handleToggle = onToggle || (() => setLocalExpanded(!localExpanded))
  
  const Icon = iconMap[phase.icon] || Circle

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-300',
        statusColors[phase.status],
        className
      )}
    >
      {/* Header - always visible */}
      <button
        onClick={handleToggle}
        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
        aria-expanded={expanded}
      >
        <div className="flex items-start gap-4">
          {/* Phase icon */}
          <div
            className={cn(
              'flex items-center justify-center w-14 h-14 rounded-xl shrink-0',
              phase.status === 'completed' && 'bg-emerald-500/10 text-emerald-500',
              phase.status === 'current' && 'bg-primary/10 text-primary',
              phase.status === 'upcoming' && 'bg-muted text-muted-foreground'
            )}
          >
            {phase.status === 'completed' ? (
              <CheckCircle2 className="h-7 w-7" />
            ) : (
              <Icon className="h-7 w-7" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                {/* Phase number and status */}
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium',
                      statusBadgeColors[phase.status]
                    )}
                  >
                    Phase {phase.number}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {phase.weekRange}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                  {phase.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {phase.subtitle}
                </p>
              </div>

              {/* Expand indicator */}
              <ChevronDown
                className={cn(
                  'h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            </div>

            {/* Brief description - visible when collapsed */}
            {!expanded && (
              <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                {phase.description}
              </p>
            )}
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6">
            {/* Full description */}
            <p className="text-muted-foreground mb-6">
              {phase.description}
            </p>

            {/* Activities */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Key Activities
              </h4>
              <ul className="space-y-3">
                {phase.activities.map((activity) => (
                  <li key={activity.id} className="flex gap-3">
                    <div className="mt-1.5 shrink-0">
                      {phase.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground/50" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {activity.title}
                      </p>
                      {activity.description && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {activity.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Time estimate */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated time:</span>
                <span className="font-medium text-foreground">{phase.timeEstimate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
