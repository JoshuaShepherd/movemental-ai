'use client'

import { cn } from '@/lib/utils'
import { PhaseCard } from './PhaseCard'
import type { OnboardingPhase } from '@/lib/schemas/onboarding-path'

interface TimelineProps {
  phases: OnboardingPhase[]
  expandedPhaseId?: string | null
  onPhaseToggle?: (phaseId: string) => void
  className?: string
}

export function Timeline({
  phases,
  expandedPhaseId,
  onPhaseToggle,
  className,
}: TimelineProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Timeline connector line - visible on larger screens */}
      <div className="absolute left-[2.25rem] top-0 bottom-0 w-0.5 bg-border hidden md:block" />

      {/* Phase cards */}
      <div className="space-y-4 md:space-y-6">
        {phases.map((phase, index) => (
          <div key={phase.id} className="relative">
            {/* Timeline dot - visible on larger screens */}
            <div className="absolute left-[1.75rem] top-9 w-2.5 h-2.5 rounded-full border-2 border-background bg-border z-10 hidden md:block">
              {phase.status === 'completed' && (
                <div className="absolute inset-0 rounded-full bg-emerald-500" />
              )}
              {phase.status === 'current' && (
                <div className="absolute inset-0 rounded-full bg-primary animate-pulse" />
              )}
            </div>

            {/* Phase card with left margin on larger screens */}
            <div className="md:ml-16">
              <PhaseCard
                phase={phase}
                isExpanded={expandedPhaseId === phase.id}
                onToggle={() => onPhaseToggle?.(phase.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Horizontal timeline for desktop (alternative layout)
export function TimelineHorizontal({
  phases,
  className,
}: {
  phases: OnboardingPhase[]
  className?: string
}) {
  return (
    <div className={cn('hidden lg:block', className)}>
      {/* Timeline track */}
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 h-1 bg-muted" />
        
        {/* Phase indicators */}
        <div className="relative flex justify-between">
          {phases.map((phase, index) => (
            <div
              key={phase.id}
              className="flex flex-col items-center"
              style={{ width: `${100 / phases.length}%` }}
            >
              {/* Dot */}
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold z-10',
                  phase.status === 'completed' && 'bg-emerald-500 text-white',
                  phase.status === 'current' && 'bg-primary text-primary-foreground ring-4 ring-primary/20',
                  phase.status === 'upcoming' && 'bg-muted text-muted-foreground'
                )}
              >
                {phase.number}
              </div>
              
              {/* Label */}
              <div className="mt-4 text-center">
                <p className="font-semibold text-foreground">{phase.title}</p>
                <p className="text-sm text-muted-foreground">{phase.weekRange}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
