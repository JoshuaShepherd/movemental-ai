'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface SectionWrapperProps {
  title: string
  subtitle?: string
  badge?: string
  children: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({
  title,
  subtitle,
  badge,
  children,
  className,
  id,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'relative rounded-2xl border border-white/[0.06] p-6 md:p-10',
        className
      )}
      style={{ backgroundColor: 'var(--color-sage-950, #161d16)' }}
    >
      <div className="mb-8">
        {badge && (
          <span
            className="mb-3 inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wide"
            style={{
              fontFamily: 'var(--font-space-grotesk, "Space Grotesk", monospace)',
              backgroundColor: 'rgba(110, 145, 110, 0.15)',
              color: 'var(--color-sage-400, #8fb38f)',
            }}
          >
            {badge}
          </span>
        )}
        <h2
          className="text-2xl md:text-3xl font-bold tracking-tight"
          style={{
            fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
            color: 'var(--color-bright-snow, #f0f4f0)',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="mt-2 max-w-2xl text-base opacity-70"
            style={{ color: 'var(--color-bright-snow, #f0f4f0)' }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </motion.section>
  )
}
