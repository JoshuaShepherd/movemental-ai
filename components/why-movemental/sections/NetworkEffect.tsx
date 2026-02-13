'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

// Node positions for the network diagram (percentage-based)
const NODES = [
  { x: 50, y: 20, size: 10, primary: true },
  { x: 25, y: 35, size: 7 },
  { x: 75, y: 35, size: 7 },
  { x: 15, y: 55, size: 5 },
  { x: 40, y: 50, size: 6 },
  { x: 60, y: 50, size: 6 },
  { x: 85, y: 55, size: 5 },
  { x: 30, y: 70, size: 5 },
  { x: 50, y: 75, size: 6 },
  { x: 70, y: 70, size: 5 },
  { x: 20, y: 85, size: 4 },
  { x: 80, y: 85, size: 4 },
]

// Connections between nodes (index pairs)
const CONNECTIONS = [
  [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6],
  [4, 5], [3, 7], [4, 8], [5, 8], [6, 9],
  [7, 10], [8, 7], [8, 9], [9, 11],
]

export function NetworkEffect() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <NarrativeSection background="dark">
      <div className="space-y-16 sm:space-y-24">
        <NarrativeStatement alignment="center" variant="dark">
          <strong>The Network Effect</strong>
        </NarrativeStatement>

        <p className="text-center text-lg sm:text-xl text-sage-300 max-w-2xl mx-auto">
          When structured content connects to structured systems, amplification multiplies.
          Each node in the network strengthens every other node.
        </p>

        {/* Network visualization */}
        <div ref={ref} className="max-w-2xl mx-auto">
          <svg viewBox="0 0 100 100" className="w-full" aria-hidden="true">
            {/* Connections */}
            {CONNECTIONS.map(([from, to], index) => (
              <motion.line
                key={`${from}-${to}`}
                x1={NODES[from].x}
                y1={NODES[from].y}
                x2={NODES[to].x}
                y2={NODES[to].y}
                stroke="currentColor"
                className="text-sage-600"
                strokeWidth={0.3}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { pathLength: 1, opacity: 0.6 }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 0.8, delay: 0.3 + index * 0.05 }}
              />
            ))}

            {/* Nodes */}
            {NODES.map((node, index) => (
              <motion.circle
                key={index}
                cx={node.x}
                cy={node.y}
                r={node.size / 5}
                className={node.primary ? 'fill-primary' : 'fill-sage-400'}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? { scale: 1, opacity: node.primary ? 1 : 0.7 }
                    : { scale: 0, opacity: 0 }
                }
                transition={{ duration: 0.4, delay: index * 0.06 }}
              />
            ))}
          </svg>
        </div>
      </div>
    </NarrativeSection>
  )
}
