'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { ValuationMathCard } from '../visualizations/ValuationMathCard'
import { arrComponents, yearOneProjection } from '../data/valuation-data'
import { Check, X } from 'lucide-react'

interface HowWereValuedProps {
  className?: string
}

export function HowWereValued({ className }: HowWereValuedProps) {
  return (
    <div className={cn('space-y-16', className)}>
      <NarrativeStatement alignment="center">
        <strong>Valuation</strong> follows a standard SaaS model.
      </NarrativeStatement>

      <ValuationMathCard arr={yearOneProjection.totalARR.value} />

      {/* What counts as ARR */}
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Counts as ARR */}
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-2">
              <Check className="h-5 w-5" />
              Counts Toward ARR
            </h4>
            <ul className="space-y-3">
              {arrComponents.recurring.map((item) => (
                <li key={item.name} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Does NOT count as ARR */}
          <div className="p-6 rounded-xl bg-muted/30 border">
            <h4 className="font-semibold mb-4 flex items-center gap-2">
              <X className="h-5 w-5 text-muted-foreground" />
              Does NOT Count Toward ARR
            </h4>
            <ul className="space-y-3">
              {arrComponents.nonRecurring.map((item) => (
                <li key={item.name} className="flex items-start gap-3">
                  <X className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
              <li className="flex items-start gap-3">
                <X className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Creator GMV</p>
                  <p className="text-xs text-muted-foreground">
                    Total revenue flowing through the platform belongs to creators
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Important distinction */}
        <div className="p-5 rounded-lg border-l-4 border-primary bg-primary/5">
          <p className="text-sm">
            <strong>Important:</strong> If creators generate $7.5M in platform revenue (GMV),
            Movemental&apos;s ARR is $750K (the 10% share)—not $7.5M. We value only what we earn,
            not what flows through.
          </p>
        </div>
      </div>
    </div>
  )
}
