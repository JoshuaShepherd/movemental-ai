'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface NudgePopupProps {
  id: string
  headline: string
  description: string
  primaryAction: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  position?: 'top-center' | 'top-right' | 'bottom-right'
  onDismiss: () => void
  showDontShowAgain?: boolean
  className?: string
}

export function NudgePopup({
  id,
  headline,
  description,
  primaryAction,
  secondaryAction,
  position = 'top-center',
  onDismiss,
  showDontShowAgain = true,
  className,
}: NudgePopupProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if this nudge was dismissed permanently
    const dismissed = localStorage.getItem(`nudge-dismissed-${id}`)
    if (!dismissed) {
      // Delay for animation
      const timer = setTimeout(() => setIsVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [id])

  const handleDismiss = (permanent: boolean = false) => {
    setIsVisible(false)
    if (permanent) {
      localStorage.setItem(`nudge-dismissed-${id}`, 'true')
    }
    setTimeout(onDismiss, 200)
  }

  if (!isVisible) return null

  const positionClasses = {
    'top-center': 'top-20 left-1/2 -translate-x-1/2',
    'top-right': 'top-20 right-4',
    'bottom-right': 'bottom-4 right-4',
  }

  return (
    <div
      className={cn(
        'fixed z-50 w-80 bg-popover border rounded-xl shadow-lg',
        'transition-all duration-200',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
        positionClasses[position],
        className
      )}
    >
      {/* Close button */}
      <button
        onClick={() => handleDismiss(false)}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </button>

      <div className="p-5">
        {/* Headline */}
        <h3 className="text-lg font-semibold text-foreground pr-6 mb-2">
          {headline}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" onClick={primaryAction.onClick}>
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button
              variant="outline"
              size="sm"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>

        {/* Don't show again */}
        {showDontShowAgain && (
          <button
            onClick={() => handleDismiss(true)}
            className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Don&apos;t show this again
          </button>
        )}
      </div>
    </div>
  )
}
