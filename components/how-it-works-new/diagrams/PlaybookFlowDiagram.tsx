'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface PlaybookFlowDiagramProps {
  expandedNode: string | null
  onNodeToggle: (nodeId: string | null) => void
  className?: string
}

const PLAYBOOK_NODES = [
  {
    id: 'existing',
    label: 'Existing Work',
    description: 'Books, sermons, talks, articles, notes — the raw material of decades.',
    example: 'A leader\'s 15 years of sermon archives',
  },
  {
    id: 'evergreen',
    label: 'Evergreen Content',
    description: 'Timeless articles and resources that answer recurring questions.',
    example: 'Core theological frameworks rewritten for web discovery',
  },
  {
    id: 'courses',
    label: 'Courses & Deep Work',
    description: 'Structured learning paths for those ready to go deeper.',
    example: 'A 6-week formation course built from existing teaching',
  },
  {
    id: 'translation',
    label: 'Translation & Circulation',
    description: 'Adapting content for new contexts, languages, and discovery channels.',
    example: 'Spanish translation, podcast summaries, newsletter digests',
  },
  {
    id: 'compounding',
    label: 'Long-Term Compounding',
    description: 'Work that finds new audiences over years, not days.',
    example: 'An article written in 2020 still generating traffic in 2030',
  },
]

/**
 * PlaybookFlowDiagram - Vertical flow with collapsible nodes
 */
export function PlaybookFlowDiagram({
  expandedNode,
  onNodeToggle,
  className,
}: PlaybookFlowDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const handleToggle = (nodeId: string) => {
    onNodeToggle(expandedNode === nodeId ? null : nodeId)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-xl mx-auto', className)}
    >
      <div className="space-y-0">
        {PLAYBOOK_NODES.map((node, index) => (
          <div key={node.id}>
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            >
              <button
                type="button"
                onClick={() => handleToggle(node.id)}
                className={cn(
                  'w-full p-4 rounded-lg border text-left transition-all',
                  expandedNode === node.id
                    ? 'bg-primary/5 border-primary/30'
                    : 'bg-background border-border hover:border-primary/20 hover:bg-muted/30'
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-foreground">{node.label}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-muted-foreground shrink-0 transition-transform',
                      expandedNode === node.id && 'rotate-180'
                    )}
                  />
                </div>

                {/* Expanded content */}
                <div
                  className={cn(
                    'grid transition-all duration-200',
                    expandedNode === node.id ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted-foreground mb-3">
                      {node.description}
                    </p>
                    <p className="text-xs text-muted-foreground/70 italic">
                      Example: {node.example}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Arrow connector (except after last node) */}
            {index < PLAYBOOK_NODES.length - 1 && (
              <div className="flex justify-center py-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="text-muted-foreground/50"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </motion.div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
