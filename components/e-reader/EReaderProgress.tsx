'use client'

import { cn } from '@/lib/utils'

interface EReaderProgressProps {
  progress: number
  className?: string
}

export function EReaderProgress({ progress, className }: EReaderProgressProps) {
  return (
    <div className={cn('h-1 bg-muted', className)}>
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
