'use client'

import { cn } from '@/lib/utils'

interface PricingToggleProps {
  value: 'monthly' | 'annual'
  onChange: (value: 'monthly' | 'annual') => void
  className?: string
}

export function PricingToggle({ value, onChange, className }: PricingToggleProps) {
  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <span
        className={cn(
          'text-sm font-medium transition-colors',
          value === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        Monthly
      </span>
      
      <button
        onClick={() => onChange(value === 'monthly' ? 'annual' : 'monthly')}
        className="relative w-14 h-8 rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <div
          className={cn(
            'absolute top-1 w-6 h-6 rounded-full bg-primary transition-transform',
            value === 'annual' ? 'translate-x-7' : 'translate-x-1'
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'text-sm font-medium transition-colors',
            value === 'annual' ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          Annual
        </span>
        <span className="text-xs bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full font-medium">
          Save 20%
        </span>
      </div>
    </div>
  )
}
