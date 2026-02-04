'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface VoiceComparisonDemoProps {
  className?: string
}

// Placeholder text demonstrating voice preservation
const ORIGINAL_TEXT = `The church has always been a sent people. Mission is not something we add to our identity—it is constitutive of who we are. When we lose sight of this, we become something other than the church Jesus intended.`

const ASSISTED_TEXT = `The church has always been a sent people. Mission is not something we add to our identity—it is constitutive of who we are. When we lose sight of this, we become something other than the church Jesus intended.

The implications are profound: every local congregation exists as an outpost of the kingdom, called to embody good news in its particular place.`

/**
 * VoiceComparisonDemo - Side-by-side comparison showing voice preservation
 */
export function VoiceComparisonDemo({ className }: VoiceComparisonDemoProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-4xl mx-auto', className)}
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Original */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-lg border bg-background"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-muted-foreground" />
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Original
            </h4>
          </div>
          <p className="text-foreground leading-relaxed text-sm sm:text-base">
            {ORIGINAL_TEXT}
          </p>
        </motion.div>

        {/* AI-assisted */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-lg border border-primary/20 bg-primary/5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <h4 className="text-sm font-semibold text-primary uppercase tracking-wider">
              AI-assisted (voice preserved)
            </h4>
          </div>
          <p className="text-foreground leading-relaxed text-sm sm:text-base">
            {ASSISTED_TEXT}
          </p>
        </motion.div>
      </div>

      {/* TODO: Add interactive demo with real voice samples when available */}
    </motion.div>
  )
}
