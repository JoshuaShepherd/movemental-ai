'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export const CONTENT_MOVEMENT_STAGES = [
  {
    id: 'offline',
    label: 'Offline',
    short: 'Not online',
    description: 'Books, talks, notes that aren’t digitized or searchable.',
  },
  {
    id: 'siloed',
    label: 'Siloed',
    short: 'Scattered',
    description: 'Content lives in many places with no single home.',
  },
  {
    id: 'unstructured',
    label: 'Unstructured',
    short: 'Unreadable',
    description: 'Search and AI can’t reliably find or use it.',
  },
  {
    id: 'unlinked',
    label: 'Unlinked',
    short: 'No network',
    description: 'Not connected to peers or trusted contexts.',
  },
  {
    id: 'moving',
    label: 'Moving',
    short: 'Discoverable & connected',
    description: 'Finds the right people and compounds over time.',
  },
] as const

interface ContentMovementDiagnosticProps {
  variant?: 'light' | 'dark'
  className?: string
}

export function ContentMovementDiagnostic({
  variant = 'dark',
  className,
}: ContentMovementDiagnosticProps) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = CONTENT_MOVEMENT_STAGES.find((s) => s.id === activeId)

  const isDark = variant === 'dark'
  const labelClass = isDark ? 'text-sage-300' : 'text-muted-foreground'
  const cardClass = isDark
    ? 'bg-white/5 border-white/10 hover:bg-white/10'
    : 'bg-muted/30 border-border hover:bg-muted/50'
  const activeCardClass = isDark
    ? 'bg-white/15 border-sage-400 ring-1 ring-sage-400/30'
    : 'bg-primary/5 border-primary ring-1 ring-primary/20'

  return (
    <div className={cn('w-full max-w-4xl mx-auto', className)}>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:items-stretch">
        {CONTENT_MOVEMENT_STAGES.map((stage, index) => {
          const isActive = activeId === stage.id
          const isLast = index === CONTENT_MOVEMENT_STAGES.length - 1
          return (
            <div key={stage.id} className="flex flex-1 flex-col sm:flex-row items-stretch gap-2">
              <button
                type="button"
                onClick={() => setActiveId(stage.id === activeId ? null : stage.id)}
                className={cn(
                  'flex-1 min-w-0 rounded-lg border p-3 sm:p-4 text-left transition-all',
                  cardClass,
                  isActive && activeCardClass
                )}
              >
                <span
                  className={cn(
                    'block text-xs font-semibold uppercase tracking-wider',
                    isDark ? (isActive ? 'text-white' : 'text-sage-400') : 'text-foreground'
                  )}
                >
                  {stage.label}
                </span>
                <span className={cn('block mt-0.5 text-xs sm:text-sm', labelClass)}>
                  {stage.short}
                </span>
              </button>
              {!isLast && (
                <div
                  className={cn(
                    'hidden sm:block w-px self-center shrink-0',
                    isDark ? 'bg-white/20' : 'bg-border'
                  )}
                  aria-hidden
                />
              )}
            </div>
          )
        })}
      </div>
      {active && (
        <p
          className={cn(
            'mt-4 text-center text-sm max-w-xl mx-auto',
            isDark ? 'text-sage-300' : 'text-muted-foreground'
          )}
        >
          {active.description}
        </p>
      )}
    </div>
  )
}
