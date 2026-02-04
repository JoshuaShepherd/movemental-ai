'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface PathDiagramProps {
  className?: string
}

const PATH_STEPS = [
  { id: 'existing', label: 'Start with existing work' },
  { id: 'voice', label: 'Clarify voice and lane' },
  { id: 'corpus', label: 'Build a living digital corpus' },
  { id: 'rhythm', label: 'Establish a sustainable rhythm' },
]

/**
 * PathDiagram - Simple vertical path showing the four-step journey
 */
export function PathDiagram({ className }: PathDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-md mx-auto', className)}
    >
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />

        {/* Steps */}
        <div className="space-y-0">
          {PATH_STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
              className="relative flex items-center gap-4 py-4"
            >
              {/* Step number circle */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                <span className="text-lg font-semibold text-primary">{index + 1}</span>
              </div>

              {/* Step label */}
              <p className="text-lg text-foreground">{step.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
