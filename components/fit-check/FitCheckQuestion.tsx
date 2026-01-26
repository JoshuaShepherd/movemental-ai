'use client'

import { cn } from '@/lib/utils'
import { AnswerCard } from './AnswerCard'
import { ScaleInput } from './ScaleInput'
import type { FitCheckQuestion as QuestionType, AnswerOption } from '@/lib/schemas/fit-check'

interface FitCheckQuestionProps {
  question: QuestionType
  selectedOptionId: string | null
  onSelect: (option: AnswerOption) => void
  className?: string
}

export function FitCheckQuestion({
  question,
  selectedOptionId,
  onSelect,
  className,
}: FitCheckQuestionProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4',
        className
      )}
    >
      {/* Category badge */}
      <span className="mb-4 inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        {question.category}
      </span>

      {/* Question text */}
      <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold text-foreground leading-tight mb-3">
        {question.question}
      </h2>

      {/* Subtext (if provided) */}
      {question.subtext && (
        <p className="text-center text-sm sm:text-base text-muted-foreground mb-8 max-w-lg">
          {question.subtext}
        </p>
      )}

      {/* Answer options */}
      <div className="w-full mt-4">
        {question.type === 'numeric' ? (
          <ScaleInput
            options={question.options}
            selectedId={selectedOptionId}
            onSelect={onSelect}
          />
        ) : (
          <div className="space-y-3">
            {question.options.map((option) => (
              <AnswerCard
                key={option.id}
                option={option}
                isSelected={option.id === selectedOptionId}
                onSelect={onSelect}
                showShortcut={question.type !== 'visual'}
              />
            ))}
          </div>
        )}
      </div>

      {/* Keyboard hint for non-numeric questions */}
      {question.type !== 'numeric' && (
        <p className="mt-6 text-center text-xs text-muted-foreground/60 hidden md:block">
          Press <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">A</kbd>-
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">{String.fromCharCode(64 + question.options.length)}</kbd>{' '}
          to select, <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">Enter</kbd> to continue
        </p>
      )}
    </div>
  )
}
