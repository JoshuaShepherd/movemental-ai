'use client'

import { ScrollRevealBlock } from './ScrollRevealBlock'
import { cn } from '@/lib/utils'

interface NetworkVisualizationProps {
  className?: string
}

export function NetworkVisualization({ className }: NetworkVisualizationProps) {
  // Simple network visualization using CSS
  const nodes = [
    { x: 50, y: 30, size: 'lg', label: 'You' },
    { x: 20, y: 50, size: 'md', label: '' },
    { x: 35, y: 70, size: 'md', label: '' },
    { x: 65, y: 70, size: 'md', label: '' },
    { x: 80, y: 50, size: 'md', label: '' },
    { x: 50, y: 85, size: 'sm', label: '' },
    { x: 10, y: 30, size: 'sm', label: '' },
    { x: 90, y: 30, size: 'sm', label: '' },
  ]

  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 2], [2, 5], [3, 5], [3, 4],
    [1, 6], [4, 7],
  ]

  return (
    <ScrollRevealBlock className={cn('', className)}>
      <div className="relative w-full aspect-video max-w-lg mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden">
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map(([from, to], index) => (
            <line
              key={index}
              x1={`${nodes[from].x}%`}
              y1={`${nodes[from].y}%`}
              x2={`${nodes[to].x}%`}
              y2={`${nodes[to].y}%`}
              stroke="rgba(99, 102, 241, 0.3)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => {
          const sizeClass =
            node.size === 'lg'
              ? 'w-12 h-12'
              : node.size === 'md'
              ? 'w-8 h-8'
              : 'w-5 h-5'

          return (
            <div
              key={index}
              className={cn(
                'absolute rounded-full transform -translate-x-1/2 -translate-y-1/2',
                sizeClass,
                index === 0
                  ? 'bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg shadow-purple-500/30'
                  : 'bg-gradient-to-br from-indigo-500 to-purple-600 opacity-70'
              )}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
            >
              {node.label && (
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                  {node.label}
                </span>
              )}
            </div>
          )
        })}

        {/* Labels */}
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <p className="text-sm text-slate-400">
            Leaders connected, ideas flowing
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Cross-pollination at scale
          </p>
        </div>
      </div>
    </ScrollRevealBlock>
  )
}
