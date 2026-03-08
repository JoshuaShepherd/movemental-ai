'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface ConcentricCirclesDiagramProps {
  className?: string
}

/**
 * ConcentricCirclesDiagram - Shows total addressable community vs current reach
 * Concentric circles with labels
 */
export function ConcentricCirclesDiagram({ className }: ConcentricCirclesDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const circles = [
    { r: 40, label: 'Your Community', fill: 'fill-sage-700/30' },
    { r: 28, label: 'Aware of You', fill: 'fill-sage-600/40' },
    { r: 15, label: 'Currently Reached', fill: 'fill-emerald-500/50' },
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-sm mx-auto', className)}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ maxHeight: '280px' }}
      >
        {/* Concentric circles */}
        {circles.map((circle, i) => (
          <motion.circle
            key={i}
            cx="50"
            cy="45"
            r={circle.r}
            className={cn(circle.fill, 'stroke-sage-500/30')}
            strokeWidth="0.5"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          />
        ))}

        {/* Labels */}
        <text x="50" y="92" textAnchor="middle" className="fill-sage-400 text-[3.5px]">
          Your total addressable community
        </text>
      </svg>

      <div className="flex justify-center gap-6 mt-4 text-xs text-sage-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-sage-700/30" />
          <span>Potential</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
          <span>Current</span>
        </div>
      </div>
    </motion.div>
  )
}
