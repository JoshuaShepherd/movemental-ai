'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface ReadingProgressProps {
  variant?: 'bar' | 'text'
  position?: 'top' | 'floating'
  className?: string
}

export function ReadingProgress({
  variant = 'bar',
  position = 'top',
  className,
}: ReadingProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      const scrollProgress = (scrollTop / documentHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollProgress)))
    }

    window.addEventListener('scroll', calculateProgress)
    calculateProgress() // Initial calculation
    return () => window.removeEventListener('scroll', calculateProgress)
  }, [])

  if (variant === 'text') {
    return (
      <span className={cn('text-sm text-muted-foreground', className)}>
        {Math.round(progress)}% complete
      </span>
    )
  }

  return (
    <div
      className={cn(
        'z-50',
        position === 'top' && 'fixed top-0 left-0 right-0',
        position === 'floating' && 'fixed top-4 right-4 w-24',
        className
      )}
    >
      <Progress value={progress} className="h-1 rounded-none" />
    </div>
  )
}
