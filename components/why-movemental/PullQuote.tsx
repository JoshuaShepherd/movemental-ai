'use client'

import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'

interface PullQuoteProps {
  /** Quote text */
  quote: string
  /** Attribution */
  attribution?: string
  /** Role/title of person quoted */
  role?: string
  /** Size variant */
  size?: 'default' | 'large'
  /** Custom class name */
  className?: string
}

export function PullQuote({
  quote,
  attribution,
  role,
  size = 'default',
  className,
}: PullQuoteProps) {
  return (
    <blockquote
      className={cn(
        'relative my-8 py-8 px-6 border-l-4 border-primary bg-primary/5 rounded-r-lg',
        className
      )}
    >
      <Quote className="absolute -top-3 left-4 h-8 w-8 text-primary/20" />
      <p
        className={cn(
          'text-foreground/90 italic leading-relaxed',
          size === 'large' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
        )}
      >
        "{quote}"
      </p>
      {(attribution || role) && (
        <footer className="mt-4 text-sm text-muted-foreground">
          {attribution && <span className="font-medium">{attribution}</span>}
          {attribution && role && <span>, </span>}
          {role && <span>{role}</span>}
        </footer>
      )}
    </blockquote>
  )
}
