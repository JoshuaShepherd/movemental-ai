'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { ARRBreakdownChart } from '../visualizations/ARRBreakdownChart'

interface YearOneProjectionProps {
  className?: string
}

export function YearOneProjection({ className }: YearOneProjectionProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <NarrativeStatement alignment="center">
        Year one target: <strong>~$800K ARR.</strong>
      </NarrativeStatement>

      <NarrativeStatement alignment="center" delay={0.1}>
        Aggressive but realistic. Conservative where it counts.
      </NarrativeStatement>

      <div className="max-w-3xl mx-auto">
        <ARRBreakdownChart />
      </div>

      {/* Bottom Line */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <p className="text-lg text-muted-foreground">
          This isn&apos;t a hockey-stick fantasy. It&apos;s a sum of:
        </p>
        <ul className="text-muted-foreground space-y-2">
          <li>• 25–50 leaders at $1k–$4k platform fees</li>
          <li>• 10% of their combined platform revenue (~$7.5M)</li>
          <li>• Multi-language expansion from flagship creators</li>
        </ul>
        <p className="text-sm text-muted-foreground pt-4 italic">
          Defensible. Auditable. Conservative.
        </p>
      </div>
    </div>
  )
}
