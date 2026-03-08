'use client'

import { cn } from '@/lib/utils'

interface BlockQuoteProps {
  children: React.ReactNode
  citation?: string
  className?: string
}

export function BlockQuote({ children, citation, className }: BlockQuoteProps) {
  return (
    <figure className={cn('my-8 sm:my-12', className)}>
      <blockquote className="relative pl-6 sm:pl-8 border-l-4 border-primary/30">
        <p className="text-lg sm:text-xl italic text-foreground/80 leading-relaxed">
          {children}
        </p>
      </blockquote>
      {citation && (
        <figcaption className="mt-3 pl-6 sm:pl-8 text-sm text-muted-foreground">
          — {citation}
        </figcaption>
      )}
    </figure>
  )
}
