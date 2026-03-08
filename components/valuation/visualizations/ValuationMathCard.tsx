'use client'

import { cn } from '@/lib/utils'
import { valuationMultiples, formatCurrency } from '../data/valuation-data'

interface ValuationMathCardProps {
  arr: number
  className?: string
}

export function ValuationMathCard({ arr, className }: ValuationMathCardProps) {
  const lowValuation = arr * valuationMultiples.low
  const midValuation = arr * valuationMultiples.mid
  const highValuation = arr * valuationMultiples.high

  return (
    <div className={cn('space-y-6', className)}>
      {/* The Formula */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <div className="p-4 rounded-lg bg-muted/50 border min-w-[140px]">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">ARR</p>
          <p className="text-2xl font-bold">{formatCurrency(arr)}</p>
        </div>
        <span className="text-2xl text-muted-foreground">×</span>
        <div className="p-4 rounded-lg bg-muted/50 border min-w-[140px]">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Multiple</p>
          <p className="text-2xl font-bold">{valuationMultiples.low}–{valuationMultiples.high}×</p>
        </div>
        <span className="text-2xl text-muted-foreground">=</span>
        <div className="p-4 rounded-lg bg-primary/10 border-primary/20 border min-w-[180px]">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Valuation</p>
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(lowValuation)}–{formatCurrency(highValuation)}
          </p>
        </div>
      </div>

      {/* Multiple Range Visualization */}
      <div className="max-w-md mx-auto pt-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Conservative (6×)</span>
          <span>Mid (9×)</span>
          <span>Aggressive (12×)</span>
        </div>
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/50 via-primary to-primary/80 rounded-full"
            style={{ width: '100%' }}
          />
          {/* Marker for mid-point */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-1 h-5 bg-foreground rounded"
            style={{ left: '50%' }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{formatCurrency(lowValuation)}</span>
          <span>{formatCurrency(midValuation)}</span>
          <span>{formatCurrency(highValuation)}</span>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {valuationMultiples.basis}
      </p>
    </div>
  )
}
