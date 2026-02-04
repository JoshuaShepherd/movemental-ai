'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, useInView } from 'framer-motion'

interface LaunchTimelineDiagramProps {
  className?: string
}

const TIMELINE_WEEKS = [
  {
    week: 1,
    title: 'Week 1',
    activities: [
      'Platform setup',
      'Profile + corpus ingestion',
    ],
  },
  {
    week: 2,
    title: 'Week 2',
    activities: [
      'Voice and lane clarification',
      'Evergreen priorities identified',
    ],
  },
  {
    week: 3,
    title: 'Week 3',
    activities: [
      'Core content published',
      'Feedback loop established',
    ],
  },
  {
    week: 4,
    title: 'Week 4',
    activities: [
      'Launch',
      'Sustainable rhythm defined',
    ],
  },
]

/**
 * LaunchTimelineDiagram - Week-by-week vertical timeline for 30-day launch
 */
export function LaunchTimelineDiagram({ className }: LaunchTimelineDiagramProps) {
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
        {/* Vertical connector line */}
        <div className="absolute left-[1.25rem] top-4 bottom-4 w-0.5 bg-border" />

        {/* Weeks */}
        <div className="space-y-6">
          {TIMELINE_WEEKS.map((week, index) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.15 }}
              className="relative flex gap-6"
            >
              {/* Week indicator */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-background border-2 border-primary flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-primary">{week.week}</span>
              </div>

              {/* Week content */}
              <div className="flex-1 pb-2">
                <h4 className="font-semibold text-foreground mb-2">{week.title}</h4>
                <ul className="space-y-1">
                  {week.activities.map((activity, actIndex) => (
                    <li
                      key={actIndex}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
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
