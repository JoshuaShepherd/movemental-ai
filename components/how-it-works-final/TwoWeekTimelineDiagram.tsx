'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface TwoWeekTimelineDiagramProps {
  className?: string
}

const WEEKS = [
  {
    week: 1,
    title: 'Week 1',
    activities: [
      'Platform setup & profile',
      'Corpus ingestion (your existing work)',
      'Voice and lane clarification',
    ],
  },
  {
    week: 2,
    title: 'Week 2',
    activities: [
      'Core content structured & published',
      'Feedback loop established',
      'Launch & sustainable rhythm',
    ],
  },
]

/**
 * 2-week onboarding timeline using the playbook and pipeline.
 */
export function TwoWeekTimelineDiagram({ className }: TwoWeekTimelineDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('max-w-xl mx-auto', className)}
    >
      <div className="relative">
        <div className="absolute left-[1.25rem] top-4 bottom-4 w-0.5 bg-border" />
        <div className="space-y-6">
          {WEEKS.map((w, index) => (
            <motion.div
              key={w.week}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.2 }}
              className="relative flex gap-6"
            >
              <div className="relative z-10 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{w.week}</span>
              </div>
              <div className="flex-1 pb-2">
                <h4 className="font-semibold text-foreground mb-2">{w.title}</h4>
                <ul className="space-y-1">
                  {w.activities.map((activity, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1.5">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
