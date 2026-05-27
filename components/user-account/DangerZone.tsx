'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface DangerZoneProps {
  title: string
  description: string
  action: {
    label: string
    onClick: () => void
    confirmMessage?: string
  }
  className?: string
}

export function DangerZone({ title, description, action, className }: DangerZoneProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  const handleClick = () => {
    if (action.confirmMessage && !isConfirming) {
      setIsConfirming(true)
      return
    }
    action.onClick()
  }

  return (
    <div className={cn('border border-destructive/30 rounded-lg p-6', className)}>
      <div className="flex items-start gap-4">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4">{description}</p>

          {isConfirming ? (
            <div className="space-y-3">
              <p className="text-sm text-destructive font-medium">
                {action.confirmMessage || 'Are you sure? This action cannot be undone.'}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClick}
                >
                  Yes, {action.label}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsConfirming(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleClick}
            >
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
