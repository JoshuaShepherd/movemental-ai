'use client'

import { cn } from '@/lib/utils'
import { AlertCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'important' | 'tip'

interface DocsCalloutProps {
  type?: CalloutType
  title?: string
  children: React.ReactNode
  className?: string
}

const typeConfig: Record<CalloutType, { icon: typeof Info; colors: string }> = {
  info: {
    icon: Info,
    colors: 'bg-blue-500/10 border-blue-500/30 text-blue-700',
  },
  warning: {
    icon: AlertTriangle,
    colors: 'bg-amber-500/10 border-amber-500/30 text-amber-700',
  },
  important: {
    icon: AlertCircle,
    colors: 'bg-red-500/10 border-red-500/30 text-red-700',
  },
  tip: {
    icon: Lightbulb,
    colors: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700',
  },
}

export function DocsCallout({
  type = 'info',
  title,
  children,
  className,
}: DocsCalloutProps) {
  const { icon: Icon, colors } = typeConfig[type]

  return (
    <div className={cn('p-4 rounded-lg border my-6', colors, className)}>
      <div className="flex gap-3">
        <Icon className="h-5 w-5 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          {title && <p className="font-semibold mb-1">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    </div>
  )
}
