'use client'

import { cn } from '@/lib/utils'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { yearOneProjection, formatCurrency } from '../data/valuation-data'

interface ARRBreakdownChartProps {
  className?: string
}

export function ARRBreakdownChart({ className }: ARRBreakdownChartProps) {
  const data = [
    {
      name: 'Platform Fees',
      value: yearOneProjection.platformFees.value,
      color: 'hsl(220, 13%, 69%)', // muted gray
      isRecurring: false,
    },
    {
      name: 'Revenue Share',
      value: yearOneProjection.revenueShare.value,
      color: 'hsl(160, 60%, 45%)', // emerald
      isRecurring: true,
    },
  ]

  const totalValue = yearOneProjection.totalARR.value

  return (
    <div className={cn('space-y-6', className)}>
      {/* Main ARR Display */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
          Year One ARR Target
        </p>
        <p className="text-5xl sm:text-6xl font-bold tracking-tight">
          {formatCurrency(totalValue)}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {yearOneProjection.totalARR.note}
        </p>
      </div>

      {/* Chart + Breakdown */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Donut Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(value as number)}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown List */}
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.name}
              className={cn(
                'p-4 rounded-lg border',
                item.isRecurring
                  ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800'
                  : 'bg-muted/30 border-muted'
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.isRecurring ? (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        ✓ Counts toward ARR (recurring)
                      </span>
                    ) : (
                      <span>Non-recurring (one-time)</span>
                    )}
                  </p>
                </div>
                <p className="text-xl font-bold">{formatCurrency(item.value)}</p>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Combined Revenue</p>
                <p className="text-xs text-muted-foreground">
                  Platform fees + revenue share
                </p>
              </div>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(yearOneProjection.platformFees.value + yearOneProjection.revenueShare.value)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Clarification */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
        <p className="text-sm">
          <strong className="text-amber-700 dark:text-amber-400">Note on ARR:</strong>{' '}
          <span className="text-muted-foreground">
            Only the 10% revenue share is truly recurring. Platform fees are one-time but
            contribute to Year 1 total revenue. The $800k ARR target reflects the recurring
            revenue run-rate at year-end.
          </span>
        </p>
      </div>
    </div>
  )
}
