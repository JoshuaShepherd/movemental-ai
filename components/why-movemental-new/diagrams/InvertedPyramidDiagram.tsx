'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface InvertedPyramidDiagramProps {
  className?: string
}

/**
 * InvertedPyramidDiagram - Shows downward scaling philosophy
 * Inverted pyramid: depth over volume
 */
export function InvertedPyramidDiagram({ className }: InvertedPyramidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-xs mx-auto', className)}
    >
      <svg
        viewBox="0 0 100 80"
        className="w-full h-auto"
        style={{ maxHeight: '200px' }}
      >
        {/* Inverted pyramid (pointing down) */}
        <motion.polygon
          points="20,10 80,10 50,70"
          className="fill-primary/20 stroke-primary/40"
          strokeWidth="0.5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Horizontal lines showing depth levels */}
        {[20, 35, 50].map((y, i) => (
          <motion.line
            key={y}
            x1={20 + (y - 10) * 0.5}
            y1={y}
            x2={80 - (y - 10) * 0.5}
            y2={y}
            className="stroke-primary/30"
            strokeWidth="0.3"
            strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
          />
        ))}

        {/* Labels */}
        <text x="50" y="8" textAnchor="middle" className="fill-muted-foreground text-[3px]">
          breadth
        </text>
        <text x="50" y="77" textAnchor="middle" className="fill-primary text-[3.5px] font-medium">
          depth
        </text>

        {/* Arrow pointing down */}
        <motion.path
          d="M50,58 L50,65 M47,62 L50,65 L53,62"
          className="stroke-primary"
          strokeWidth="0.8"
          fill="none"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        />
      </svg>

      <p className="text-center text-sm text-muted-foreground mt-2">
        Scaling depth, not volume
      </p>
    </motion.div>
  )
}
