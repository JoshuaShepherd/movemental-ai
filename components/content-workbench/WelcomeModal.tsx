'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface WelcomeModalProps {
  /** Is the modal open */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
  /** "Take Tour" click handler */
  onTakeTour?: () => void
  /** Modal title */
  title?: string
  /** Modal description */
  description?: string
  /** Preview image URL */
  previewImageUrl?: string
  /** Primary button text */
  primaryButtonText?: string
  /** Secondary button text */
  secondaryButtonText?: string
  /** Custom class name */
  className?: string
}

export function WelcomeModal({
  isOpen,
  onClose,
  onTakeTour,
  title = 'Welcome to the Workbench',
  description = 'Create beautiful content with our powerful editor. Take a quick tour to learn the basics.',
  previewImageUrl,
  primaryButtonText = 'Take the Tour',
  secondaryButtonText = 'Skip for now',
  className,
}: WelcomeModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div
        className={cn(
          'fixed inset-x-4 top-[15%] mx-auto max-w-md bg-background rounded-xl shadow-2xl z-50 overflow-hidden',
          className
        )}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Preview image */}
        {previewImageUrl && (
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 relative">
            <img
              src={previewImageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">{description}</p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button onClick={onTakeTour} className="w-full">
              {primaryButtonText}
            </Button>
            <Button variant="ghost" onClick={onClose} className="w-full">
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
