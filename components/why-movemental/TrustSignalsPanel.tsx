'use client'

import { cn } from '@/lib/utils'
import { Mic2, Users, Shield } from 'lucide-react'

export const TRUST_SIGNALS = [
  {
    id: 'voice',
    icon: Mic2,
    title: 'Your voice',
    detail: 'AI reflects your actual body of work—not a generic tone.',
  },
  {
    id: 'peers',
    icon: Users,
    title: 'Peers, not ads',
    detail: 'Credibility through connection to trusted leaders, not promotion.',
  },
  {
    id: 'ownership',
    icon: Shield,
    title: 'You own it',
    detail: 'Your platform, your audience, your data. No algorithmic gatekeeping.',
  },
] as const

interface TrustSignalsPanelProps {
  variant?: 'default' | 'dark'
  className?: string
}

export function TrustSignalsPanel({ variant = 'default', className }: TrustSignalsPanelProps) {
  const isDark = variant === 'dark'
  const cardBg = isDark ? 'bg-white/5 border-white/10' : 'bg-background border-border'
  const titleClass = isDark ? 'text-white' : 'text-foreground'
  const detailClass = isDark ? 'text-sage-300' : 'text-muted-foreground'
  const iconClass = isDark ? 'text-emerald-400' : 'text-primary'

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6',
        className
      )}
    >
      {TRUST_SIGNALS.map((item) => {
        const Icon = item.icon
        return (
          <div
            key={item.id}
            className={cn(
              'rounded-xl border p-6 flex flex-col',
              cardBg
            )}
          >
            <div className={cn('mb-3 flex items-center justify-center w-10 h-10 rounded-lg', iconClass)}>
              <Icon className="h-5 w-5" aria-hidden />
            </div>
            <h3 className={cn('font-semibold text-lg', titleClass)}>{item.title}</h3>
            <p className={cn('mt-1 text-sm', detailClass)}>{item.detail}</p>
          </div>
        )
      })}
    </div>
  )
}
