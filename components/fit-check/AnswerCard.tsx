'use client'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { AnswerOption } from '@/lib/schemas/fit-check'

interface AnswerCardProps {
  option: AnswerOption
  isSelected: boolean
  onSelect: (option: AnswerOption) => void
  showShortcut?: boolean
  className?: string
}

export function AnswerCard({
  option,
  isSelected,
  onSelect,
  showShortcut = true,
  className,
}: AnswerCardProps) {
  return (
    <Card
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(option)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(option)
        }
      }}
      className={cn(
        'relative cursor-pointer p-4 transition-all duration-200',
        'hover:border-primary/50 hover:shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'min-h-[56px] flex items-center',
        isSelected && 'border-primary bg-primary/5 ring-2 ring-primary',
        className
      )}
    >
      <div className="flex w-full items-center gap-3">
        {/* Keyboard shortcut badge */}
        {showShortcut && option.shortcut && (
          <span
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-medium',
              'bg-muted text-muted-foreground',
              isSelected && 'bg-primary text-primary-foreground border-primary'
            )}
          >
            {option.shortcut}
          </span>
        )}
        
        {/* Option content */}
        <div className="flex-1 min-w-0">
          <span className={cn(
            'block font-medium text-base',
            isSelected && 'text-primary'
          )}>
            {option.label}
          </span>
          {option.description && (
            <span className="block text-sm text-muted-foreground mt-0.5">
              {option.description}
            </span>
          )}
        </div>

        {/* Selection indicator */}
        <div
          className={cn(
            'h-5 w-5 shrink-0 rounded-full border-2 transition-colors',
            isSelected
              ? 'border-primary bg-primary'
              : 'border-muted-foreground/30'
          )}
        >
          {isSelected && (
            <svg
              className="h-full w-full text-primary-foreground"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </Card>
  )
}
