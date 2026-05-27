'use client'

import { cn } from '@/lib/utils'

interface NarrativeSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'muted' | 'dark'
}

/**
 * NarrativeSection - A section wrapper with generous vertical spacing
 * 
 * Used to group narrative statements with proper visual separation.
 */
export function NarrativeSection({ 
  children, 
  className,
  id,
  background = 'default'
}: NarrativeSectionProps) {
  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted/30',
    dark: 'bg-sage-900 text-white',
  }

  return (
    <section
      id={id}
      className={cn(
        'py-24 sm:py-32 md:py-40 px-4',
        backgroundClasses[background],
        className
      )}
    >
      <div className="container max-w-5xl mx-auto">
        {children}
      </div>
    </section>
  )
}
