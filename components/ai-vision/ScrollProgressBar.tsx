'use client'

import { cn } from '@/lib/utils'

interface ScrollProgressBarProps {
  progress: number
  className?: string
}

export function ScrollProgressBar({ progress, className }: ScrollProgressBarProps) {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 h-1 bg-muted z-50',
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
