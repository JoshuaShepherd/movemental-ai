'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { ConfidenceChecklist } from '../visualizations/ConfidenceChecklist'

interface WhyThisHoldsProps {
  className?: string
}

export function WhyThisHolds({ className }: WhyThisHoldsProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <NarrativeStatement alignment="center">
        This is where <strong>skeptics relax.</strong>
      </NarrativeStatement>

      <div className="max-w-4xl mx-auto">
        <ConfidenceChecklist />
      </div>

      {/* Additional context */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-muted-foreground">
          These aren&apos;t hopes. They&apos;re structural advantages built into the model.
          Each one compounds with the others.
        </p>
      </div>
    </div>
  )
}
