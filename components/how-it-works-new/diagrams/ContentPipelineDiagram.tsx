'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'

interface ContentPipelineDiagramProps {
  className?: string
}

const INPUTS = [
  'Sermons',
  'Talks',
  'Books',
  'Notes',
  'Archives',
]

const DISCERNMENT = [
  'voice',
  'themes',
  'primary lane',
  'what matters / what doesn\'t',
]

const OUTPUTS = [
  'articles',
  'courses',
  'collections',
  'translations',
]

/**
 * ContentPipelineDiagram - Shows the flow from inputs through discernment to outputs
 */
export function ContentPipelineDiagram({ className }: ContentPipelineDiagramProps) {
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
      {/* Desktop: horizontal layout */}
      <div className="hidden md:grid md:grid-cols-[1fr,auto,1fr,auto,1fr] gap-4 items-center">
        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-lg border bg-background"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Inputs
          </h4>
          <ul className="space-y-2">
            {INPUTS.map((input) => (
              <li key={input} className="text-foreground">{input}</li>
            ))}
          </ul>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-muted-foreground/50"
        >
          <ArrowRight className="w-8 h-8" />
        </motion.div>

        {/* Discernment Layer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-lg border-2 border-primary/30 bg-primary/5"
        >
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Discernment Layer
          </h4>
          <ul className="space-y-2">
            {DISCERNMENT.map((item) => (
              <li key={item} className="text-muted-foreground text-sm">{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="text-muted-foreground/50"
        >
          <ArrowRight className="w-8 h-8" />
        </motion.div>

        {/* Outputs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-lg border bg-background"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Evergreen Outputs
          </h4>
          <ul className="space-y-2">
            {OUTPUTS.map((output) => (
              <li key={output} className="text-foreground">{output}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Mobile: vertical layout */}
      <div className="md:hidden space-y-4">
        {/* Inputs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 rounded-lg border bg-background"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Inputs
          </h4>
          <div className="flex flex-wrap gap-2">
            {INPUTS.map((input) => (
              <span key={input} className="px-3 py-1 rounded-full bg-muted text-sm text-foreground">
                {input}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-muted-foreground/50" />
        </div>

        {/* Discernment Layer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 rounded-lg border-2 border-primary/30 bg-primary/5"
        >
          <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">
            Discernment Layer
          </h4>
          <ul className="space-y-1">
            {DISCERNMENT.map((item) => (
              <li key={item} className="text-muted-foreground text-sm">{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Arrow */}
        <div className="flex justify-center">
          <ArrowDown className="w-6 h-6 text-muted-foreground/50" />
        </div>

        {/* Outputs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="p-6 rounded-lg border bg-background"
        >
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Evergreen Outputs
          </h4>
          <div className="flex flex-wrap gap-2">
            {OUTPUTS.map((output) => (
              <span key={output} className="px-3 py-1 rounded-full bg-muted text-sm text-foreground">
                {output}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
