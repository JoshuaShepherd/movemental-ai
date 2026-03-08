'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface NarrativeStatementProps {
  children: React.ReactNode
  className?: string
  alignment?: 'center' | 'left' | 'right'
  delay?: number
  /** Use light text colors for dark backgrounds */
  variant?: 'default' | 'dark'
}

/**
 * NarrativeStatement - A typography-focused statement component
 * 
 * Use <strong> tags within children to create bold emphasis.
 * The bold words should form a scannable summary when read alone.
 * 
 * @example
 * <NarrativeStatement>
 *   <strong>Movement leaders</strong> lose 85-90% of their revenue 
 *   to traditional publishers and digital platforms.
 * </NarrativeStatement>
 */
export function NarrativeStatement({ 
  children, 
  className,
  alignment = 'center',
  delay = 0,
  variant = 'default'
}: NarrativeStatementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const alignmentClasses = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={cn(
        'max-w-[900px]',
        alignmentClasses[alignment],
        className
      )}
    >
      <p
        className={cn(
          // Base typography
          'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
          'leading-snug sm:leading-snug md:leading-snug lg:leading-tight',
          'tracking-tight font-light',
          // Color variants
          variant === 'dark'
            ? 'text-sage-300 [&_strong]:text-white [&_strong]:font-bold'
            : 'text-muted-foreground [&_strong]:text-foreground [&_strong]:font-bold'
        )}
      >
        {children}
      </p>
    </motion.div>
  )
}
