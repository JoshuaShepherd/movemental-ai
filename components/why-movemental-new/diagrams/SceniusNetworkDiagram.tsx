'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface SceniusNetworkDiagramProps {
  className?: string
}

/**
 * SceniusNetworkDiagram - Simple node-link diagram showing relational credibility
 * Static by default, subtle hover reveals relationships
 */
export function SceniusNetworkDiagram({ className }: SceniusNetworkDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  // Node positions (relative percentages)
  const nodes = [
    { id: 'A', x: 50, y: 20, label: 'Leader' },
    { id: 'B', x: 25, y: 45, label: 'Peer' },
    { id: 'C', x: 75, y: 45, label: 'Peer' },
    { id: 'D', x: 15, y: 75, label: 'Peer' },
    { id: 'E', x: 50, y: 80, label: 'Peer' },
    { id: 'F', x: 85, y: 75, label: 'Peer' },
  ]

  // Connections between nodes
  const connections = [
    ['A', 'B'], ['A', 'C'],
    ['B', 'C'], ['B', 'D'], ['B', 'E'],
    ['C', 'E'], ['C', 'F'],
    ['D', 'E'], ['E', 'F'],
  ]

  const getNodeById = (id: string) => nodes.find(n => n.id === id)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={cn('max-w-md mx-auto', className)}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-auto"
        style={{ maxHeight: '300px' }}
      >
        {/* Connection lines */}
        {connections.map(([from, to], i) => {
          const fromNode = getNodeById(from)
          const toNode = getNodeById(to)
          if (!fromNode || !toNode) return null
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className="stroke-muted-foreground/30"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.id === 'A' ? 4 : 3}
              className={cn(
                'fill-current',
                node.id === 'A' ? 'text-primary' : 'text-muted-foreground/60'
              )}
            />
            <text
              x={node.x}
              y={node.y + 8}
              textAnchor="middle"
              className="fill-muted-foreground text-[3px] font-medium"
            >
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Trust flows through visible connections
      </p>
    </motion.div>
  )
}
