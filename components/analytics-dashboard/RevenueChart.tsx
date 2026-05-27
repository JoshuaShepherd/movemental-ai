'use client'

import { cn } from '@/lib/utils'

interface DataPoint {
  label: string
  value: number
}

interface RevenueChartProps {
  data: DataPoint[]
  total: number
  average: number
  peak: number
  period: 'mtd' | 'qtd'
  onPeriodChange: (period: 'mtd' | 'qtd') => void
  className?: string
}

export function RevenueChart({
  data,
  total,
  average,
  peak,
  period,
  onPeriodChange,
  className,
}: RevenueChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className={cn('p-6 bg-card border rounded-xl', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Revenue</h3>
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <button
            onClick={() => onPeriodChange('mtd')}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md transition-colors',
              period === 'mtd'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            MTD
          </button>
          <button
            onClick={() => onPeriodChange('qtd')}
            className={cn(
              'px-3 py-1.5 text-sm rounded-md transition-colors',
              period === 'qtd'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            QTD
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 flex items-end gap-2 mb-6">
        {data.map((point, index) => {
          const height = (point.value / maxValue) * 100

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full bg-gradient-to-t from-primary/80 to-primary rounded-t transition-all hover:from-primary hover:to-primary/90"
                style={{ height: `${height}%` }}
                title={`$${point.value.toLocaleString()}`}
              />
              <span className="text-xs text-muted-foreground">
                {point.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-lg font-semibold">${total.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Avg/mo</p>
          <p className="text-lg font-semibold">${average.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Peak</p>
          <p className="text-lg font-semibold">${peak.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
