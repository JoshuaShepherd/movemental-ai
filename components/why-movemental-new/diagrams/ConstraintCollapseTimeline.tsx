'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface ConstraintCollapseTimelineProps {
  className?: string
}

/**
 * ConstraintCollapseTimeline - Shows historical constraints collapsing
 * Stacked bars that compress on scroll
 */
export function ConstraintCollapseTimeline({ className }: ConstraintCollapseTimelineProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const constraints = [
    { label: 'Development Teams', before: '100%', after: '10%' },
    { label: 'Time to Build', before: '100%', after: '15%' },
    { label: 'Capital Required', before: '100%', after: '5%' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-xl mx-auto', className)}
    >
      <div className="space-y-6">
        {constraints.map((constraint, i) => (
          <div key={constraint.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-sage-300">{constraint.label}</span>
              <span className="text-sage-500 text-xs">collapsed</span>
            </div>
            <div className="relative h-3 bg-sage-800 rounded-full overflow-hidden">
              {/* Before bar (full width, faded) */}
              <div className="absolute inset-0 bg-sage-700/50 rounded-full" />

              {/* After bar (collapsed) */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-emerald-500/70 rounded-full"
                initial={{ width: '100%' }}
                animate={isInView ? { width: constraint.after } : { width: '100%' }}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-sage-400 mt-6">
        Historical barriers have collapsed
      </p>
    </motion.div>
  )
}
