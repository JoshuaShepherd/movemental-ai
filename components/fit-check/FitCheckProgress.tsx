'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface FitCheckProgressProps {
  currentQuestion: number
  totalQuestions: number
  className?: string
}

export function FitCheckProgress({
  currentQuestion,
  totalQuestions,
  className,
}: FitCheckProgressProps) {
  const progress = (currentQuestion / totalQuestions) * 100

  return (
    <div className={cn('w-full space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span className="text-muted-foreground">
          {Math.round(progress)}% complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
