'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { PricingLadder } from '../visualizations/PricingLadder'

interface PricingStructureProps {
  className?: string
}

export function PricingStructure({ className }: PricingStructureProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <NarrativeStatement alignment="center">
        Pricing rewards <strong>early believers.</strong>
      </NarrativeStatement>

      <PricingLadder />

      {/* Explanation */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="p-6 rounded-xl bg-muted/30 border">
          <h4 className="font-semibold mb-3">Why the escalating fee structure?</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="font-bold text-foreground shrink-0">1.</span>
              <span>
                <strong className="text-foreground">Trust.</strong> Early leaders take on more risk.
                Lower fees honor that.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-foreground shrink-0">2.</span>
              <span>
                <strong className="text-foreground">Network value.</strong> Later entrants benefit
                from a more established network—higher fees reflect that.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold text-foreground shrink-0">3.</span>
              <span>
                <strong className="text-foreground">Service quality.</strong> Capping at 100 ensures
                every leader gets dedicated attention. Scarcity is intentional.
              </span>
            </li>
          </ul>
        </div>

        <div className="p-5 rounded-lg bg-slate-900 text-white">
          <p className="text-sm">
            <strong>After 100 leaders, enrollment closes.</strong> This isn&apos;t artificial
            scarcity—it&apos;s a commitment to service quality and network integrity. We&apos;d
            rather serve 100 leaders exceptionally than 1,000 adequately.
          </p>
        </div>
      </div>
    </div>
  )
}
