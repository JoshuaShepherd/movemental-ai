'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { RecognitionOption } from '@/lib/schemas/fit-check'
import { Check, Info } from 'lucide-react'

interface RecognitionGateProps {
  options: RecognitionOption[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  promptText: string
  microcopy: string
  className?: string
}

export function RecognitionGate({
  options,
  selectedIds,
  onToggle,
  promptText,
  microcopy,
  className,
}: RecognitionGateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center w-full max-w-2xl mx-auto px-4',
        className
      )}
    >
      <p className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-white leading-tight mb-2">
        {promptText}
      </p>
      <p className="text-center text-sm text-sage-300 mb-8">
        {microcopy}
      </p>

      <div className="w-full space-y-3">
        {options.map((option) => {
          const isChecked = selectedIds.has(option.id)
          return (
            <Card
              key={option.id}
              role="checkbox"
              aria-checked={isChecked}
              tabIndex={0}
              onClick={() => onToggle(option.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onToggle(option.id)
                }
              }}
              className={cn(
                'relative cursor-pointer p-4 transition-all duration-200',
                'bg-sage-900/80 border-white/10 hover:border-sage-600',
                'focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 focus:ring-offset-sage-950',
                'min-h-[56px] flex items-center',
                isChecked && 'border-scarlet-rush-500 bg-scarlet-rush-500/10 ring-2 ring-scarlet-rush-500/50'
              )}
            >
              <div className="flex w-full items-start gap-3">
                <div
                  className={cn(
                    'h-5 w-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors mt-0.5',
                    isChecked
                      ? 'border-scarlet-rush-500 bg-scarlet-rush-500'
                      : 'border-white/30'
                  )}
                >
                  {isChecked && <Check className="h-3 w-3 text-white" />}
                </div>
                <span
                  className={cn(
                    'block font-medium text-base flex-1 text-left text-white',
                    isChecked && 'text-scarlet-rush-400'
                  )}
                >
                  {option.label}
                </span>
                {option.tooltip && (
                  <span
                    className="shrink-0 text-sage-400 hover:text-sage-300 transition-colors"
                    title={option.tooltip}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <Info className="h-4 w-4" aria-hidden />
                  </span>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
