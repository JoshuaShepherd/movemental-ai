'use client'

import { cn } from '@/lib/utils'

interface AudienceReachGaugeProps {
  ownReach: number
  networkReach: number
  amplification: number
  className?: string
}

export function AudienceReachGauge({
  ownReach,
  networkReach,
  amplification,
  className,
}: AudienceReachGaugeProps) {
  // Calculate gauge angle (0-180 degrees)
  const maxAmplification = 100
  const gaugeAngle = Math.min((amplification / maxAmplification) * 180, 180)

  return (
    <div className={cn('p-6 bg-card border rounded-xl', className)}>
      <h3 className="text-lg font-semibold mb-6">Audience Reach</h3>

      {/* Gauge */}
      <div className="relative w-48 h-24 mx-auto mb-6">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 200 100">
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            className="text-muted"
          />
          {/* Progress arc */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="16"
            strokeDasharray={`${(gaugeAngle / 180) * 283} 283`}
            className="text-primary"
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-3xl font-bold">{amplification}x</span>
          <span className="text-xs text-muted-foreground">Amplification</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Your content</p>
          <p className="text-lg font-semibold">
            {ownReach.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Network reach</p>
          <p className="text-lg font-semibold">
            {networkReach.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}
