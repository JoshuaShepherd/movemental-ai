'use client'

import { cn } from '@/lib/utils'

interface ReadingParagraphProps {
  children: React.ReactNode
  className?: string
}

export function ReadingParagraph({ children, className }: ReadingParagraphProps) {
  return (
    <p
      className={cn(
        'text-base sm:text-lg leading-relaxed sm:leading-relaxed text-foreground/90 mb-6',
        // Style nested elements
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_em]:italic',
        '[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-primary/80',
        '[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono',
        className
      )}
    >
      {children}
    </p>
  )
}
