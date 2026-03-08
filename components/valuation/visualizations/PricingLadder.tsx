'use client'

import { cn } from '@/lib/utils'
import { Lock, Check, Clock } from 'lucide-react'
import { pricingCohorts } from '../data/valuation-data'

interface PricingLadderProps {
  className?: string
}

export function PricingLadder({ className }: PricingLadderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Desktop: Horizontal Steps */}
      <div className="hidden md:flex items-end gap-2">
        {pricingCohorts.map((cohort, index) => {
          const heightPercent = 40 + (index * 20) // 40%, 60%, 80%, 100%
          const isCurrent = cohort.status === 'current'

          return (
            <div
              key={cohort.range}
              className="flex-1 flex flex-col items-center"
            >
              <div
                className={cn(
                  'w-full rounded-t-lg transition-all relative overflow-hidden',
                  isCurrent
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
                style={{ height: `${heightPercent * 2}px` }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-2xl font-bold">{cohort.feeDisplay}</span>
                  <span className="text-xs opacity-80">+ {cohort.revShare}</span>
                </div>
                {isCurrent && (
                  <div className="absolute top-2 right-2">
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                      Open
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3 text-center">
                <p className="font-medium text-sm">{cohort.leaders}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {isCurrent ? (
                    <Check className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <Clock className="h-3 w-3 text-muted-foreground" />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {isCurrent ? 'Enrolling' : 'Future'}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {/* Lock indicator */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full h-[240px] rounded-t-lg bg-slate-900 text-white flex flex-col items-center justify-center p-4">
            <Lock className="h-8 w-8 mb-2 opacity-80" />
            <span className="text-lg font-bold">Closed</span>
            <span className="text-xs opacity-60 text-center mt-1">
              After 100
            </span>
          </div>
          <div className="mt-3 text-center">
            <p className="font-medium text-sm">100+ leaders</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <Lock className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Vertical List */}
      <div className="md:hidden space-y-3">
        {pricingCohorts.map((cohort) => {
          const isCurrent = cohort.status === 'current'

          return (
            <div
              key={cohort.range}
              className={cn(
                'p-4 rounded-lg border flex items-center justify-between',
                isCurrent
                  ? 'bg-primary/10 border-primary'
                  : 'bg-muted/30 border-muted'
              )}
            >
              <div>
                <p className="font-medium">{cohort.leaders}</p>
                <div className="flex items-center gap-1 mt-1">
                  {isCurrent ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs text-emerald-600">Open now</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Future cohort</span>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className={cn('text-xl font-bold', isCurrent && 'text-primary')}>
                  {cohort.feeDisplay}
                </p>
                <p className="text-sm text-muted-foreground">+ {cohort.revShare}</p>
              </div>
            </div>
          )
        })}

        {/* Lock */}
        <div className="p-4 rounded-lg bg-slate-900 text-white flex items-center justify-between">
          <div>
            <p className="font-medium">After 100 leaders</p>
            <div className="flex items-center gap-1 mt-1">
              <Lock className="h-3 w-3 opacity-60" />
              <span className="text-xs opacity-60">Enrollment closes</span>
            </div>
          </div>
          <Lock className="h-6 w-6 opacity-60" />
        </div>
      </div>
    </div>
  )
}
