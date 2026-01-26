'use client'

import { cn } from '@/lib/utils'
import type { AnswerOption } from '@/lib/schemas/fit-check'

interface ScaleInputProps {
  options: AnswerOption[]
  selectedId: string | null
  onSelect: (option: AnswerOption) => void
  lowLabel?: string
  highLabel?: string
  className?: string
}

export function ScaleInput({
  options,
  selectedId,
  onSelect,
  lowLabel = 'Not important',
  highLabel = 'Critical',
  className,
}: ScaleInputProps) {
  return (
    <div className={cn('w-full', className)}>
      {/* Scale buttons */}
      <div className="flex justify-center gap-1 sm:gap-2">
        {options.map((option) => {
          const isSelected = option.id === selectedId
          const value = parseInt(option.label)
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option)}
              aria-label={`Select ${option.label}`}
              className={cn(
                'relative flex flex-col items-center justify-center',
                'h-12 w-10 sm:h-14 sm:w-12 md:h-16 md:w-14',
                'rounded-lg border-2 font-semibold transition-all duration-200',
                'hover:border-primary/50 hover:scale-105',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground scale-110'
                  : 'border-muted bg-card text-foreground'
              )}
            >
              <span className="text-lg sm:text-xl">{value}</span>
            </button>
          )
        })}
      </div>

      {/* Scale labels */}
      <div className="mt-3 flex justify-between px-2">
        <span className="text-xs sm:text-sm text-muted-foreground max-w-[100px] text-left">
          {lowLabel}
        </span>
        <span className="text-xs sm:text-sm text-muted-foreground max-w-[100px] text-right">
          {highLabel}
        </span>
      </div>

      {/* Keyboard hint (desktop only) */}
      <p className="mt-4 text-center text-xs text-muted-foreground/60 hidden md:block">
        Press 0-9 on your keyboard to select, or 1+0 for 10
      </p>
    </div>
  )
}
