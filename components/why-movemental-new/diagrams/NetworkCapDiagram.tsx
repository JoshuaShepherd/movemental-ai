'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface NetworkCapDiagramProps {
  className?: string
}

/**
 * NetworkCapDiagram - Simple network diagram capped at ~100 nodes
 * Shows bounded network size
 */
export function NetworkCapDiagram({ className }: NetworkCapDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Generate node positions in a rough circle/grid pattern
  const generateNodes = (count: number) => {
    const nodes = []
    const rows = Math.ceil(Math.sqrt(count))
    const cols = Math.ceil(count / rows)

    for (let i = 0; i < count; i++) {
      const row = Math.floor(i / cols)
      const col = i % cols
      // Add some randomness for organic feel
      const jitterX = (Math.random() - 0.5) * 8
      const jitterY = (Math.random() - 0.5) * 8
      nodes.push({
        x: 10 + (col / (cols - 1)) * 80 + jitterX,
        y: 15 + (row / (rows - 1)) * 70 + jitterY,
      })
    }
    return nodes
  }

  // Use fewer nodes for visual clarity (represents 100)
  const nodes = generateNodes(36) // 6x6 grid representing bounded network

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
        style={{ maxHeight: '250px' }}
      >
        {/* Boundary circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className="stroke-border"
          strokeWidth="0.5"
          strokeDasharray="2 2"
        />

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={1.5}
            className="fill-primary/60"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.2, delay: i * 0.01 }}
          />
        ))}

        {/* Label */}
        <text
          x="50"
          y="97"
          textAnchor="middle"
          className="fill-muted-foreground text-[4px]"
        >
          bounded at 100
        </text>
      </svg>
    </motion.div>
  )
}
