'use client'

import { cn } from '@/lib/utils'
import { Clock } from 'lucide-react'

interface ReadingTimeProps {
  totalMinutes: number
  currentProgress?: number // 0-100
  format?: 'remaining' | 'total' | 'both'
  className?: string
}

export function ReadingTime({
  totalMinutes,
  currentProgress = 0,
  format = 'remaining',
  className,
}: ReadingTimeProps) {
  const remainingMinutes = Math.ceil(totalMinutes * (1 - currentProgress / 100))
  
  const formatTime = (minutes: number) => {
    if (minutes < 1) return 'Less than 1 min'
    if (minutes === 1) return '1 min'
    return `${minutes} min`
  }

  return (
    <div className={cn('flex items-center gap-1.5 text-sm text-muted-foreground', className)}>
      <Clock className="h-4 w-4" />
      <span>
        {format === 'total' && formatTime(totalMinutes)}
        {format === 'remaining' && `${formatTime(remainingMinutes)} remaining`}
        {format === 'both' && `${formatTime(remainingMinutes)} of ${formatTime(totalMinutes)} remaining`}
      </span>
    </div>
  )
}
