'use client'

import { cn } from '@/lib/utils'

interface MetricCardProps {
  label: string
  value: string
  sublabel?: string
  highlighted?: boolean
  variant?: 'default' | 'success' | 'muted'
  size?: 'default' | 'large'
  className?: string
}

export function MetricCard({
  label,
  value,
  sublabel,
  highlighted = false,
  variant = 'default',
  size = 'default',
  className,
}: MetricCardProps) {
  const variantClasses = {
    default: 'bg-card border',
    success: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800',
    muted: 'bg-muted/50 border-muted',
  }

  const valueClasses = {
    default: 'text-foreground',
    success: 'text-emerald-700 dark:text-emerald-400',
    muted: 'text-muted-foreground',
  }

  return (
    <div
      className={cn(
        'rounded-xl p-6 transition-all',
        variantClasses[variant],
        highlighted && 'ring-2 ring-primary ring-offset-2',
        className
      )}
    >
      <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
      <p
        className={cn(
          'font-bold tracking-tight',
          size === 'large' ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl',
          valueClasses[variant]
        )}
      >
        {value}
      </p>
      {sublabel && (
        <p className="text-sm text-muted-foreground mt-2">{sublabel}</p>
      )}
    </div>
  )
}
