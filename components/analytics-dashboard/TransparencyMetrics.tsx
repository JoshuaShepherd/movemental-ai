'use client'

import { cn } from '@/lib/utils'

interface BadgeDistribution {
  label: string
  percentage: number
  color: string
}

interface TransparencyMetricsProps {
  badgeCoverage: number
  distribution: BadgeDistribution[]
  className?: string
}

export function TransparencyMetrics({
  badgeCoverage,
  distribution,
  className,
}: TransparencyMetricsProps) {
  return (
    <div className={cn('p-6 bg-card border rounded-xl', className)}>
      <h3 className="text-lg font-semibold mb-6">AI Transparency</h3>

      {/* Badge Coverage */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Badge Usage</span>
          <span className="text-sm font-medium">{badgeCoverage}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${badgeCoverage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {badgeCoverage}% of content has transparency badges
        </p>
      </div>

      {/* Distribution */}
      <div>
        <h4 className="text-sm font-medium mb-3">Badge Distribution</h4>
        <div className="space-y-3">
          {distribution.map((badge) => (
            <div key={badge.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{badge.label}</span>
                <span className="text-sm text-muted-foreground">
                  {badge.percentage}%
                </span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all', badge.color)}
                  style={{ width: `${badge.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
