'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { BookOpen, ArrowRight, Network } from 'lucide-react'

interface BeforeAfterCirculationProps {
  className?: string
}

/**
 * BeforeAfterCirculation - Before/After comparison showing isolated vs networked content
 */
export function BeforeAfterCirculation({ className }: BeforeAfterCirculationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-3xl mx-auto', className)}
    >
      <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
        {/* Before: Isolated */}
        <div className="p-6 rounded-lg border bg-background text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted/50 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground mb-2">Before</p>
          <p className="text-sm text-muted-foreground">
            Isolated content.<br />
            Siloed. Unlinked.<br />
            Undiscoverable.
          </p>
        </div>

        {/* Arrow */}
        <div className="hidden md:flex items-center justify-center">
          <ArrowRight className="w-8 h-8 text-muted-foreground/50" />
        </div>
        <div className="md:hidden flex justify-center">
          <ArrowRight className="w-6 h-6 text-muted-foreground/50 rotate-90" />
        </div>

        {/* After: Networked */}
        <div className="p-6 rounded-lg border bg-background text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
            <Network className="w-8 h-8 text-primary" />
          </div>
          <p className="text-sm font-medium text-foreground mb-2">After</p>
          <p className="text-sm text-muted-foreground">
            Networked circulation.<br />
            Connected. Discoverable.<br />
            Compounding.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
