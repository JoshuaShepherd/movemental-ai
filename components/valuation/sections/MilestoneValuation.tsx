'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { MilestoneTimeline } from '../visualizations/MilestoneTimeline'

interface MilestoneValuationProps {
  className?: string
}

export function MilestoneValuation({ className }: MilestoneValuationProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <NarrativeStatement alignment="center">
        If X is true, then <strong>Y follows.</strong>
      </NarrativeStatement>

      <div className="max-w-5xl mx-auto">
        <MilestoneTimeline />
      </div>

      {/* Logic explanation */}
      <div className="max-w-2xl mx-auto space-y-6">
        <p className="text-center text-muted-foreground">
          Each milestone unlocks the next. Valuations are computed from ARR × multiple,
          not aspirational storytelling.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/30 border text-sm">
            <p className="font-medium mb-1">Conservative Multiple (6×)</p>
            <p className="text-muted-foreground">
              Assumes modest growth, some churn, proving the model
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border text-sm">
            <p className="font-medium mb-1">Aggressive Multiple (12×)</p>
            <p className="text-muted-foreground">
              Assumes strong retention, network effects, category leadership
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground pt-4">
          Click any milestone above to see the full breakdown.
        </p>
      </div>
    </div>
  )
}
