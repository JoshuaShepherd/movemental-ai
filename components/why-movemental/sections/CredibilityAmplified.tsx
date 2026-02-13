'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

const STATS = [
  {
    number: '100',
    label: 'Structured Ideas',
    description:
      'Core frameworks extracted, organized, and made permanently discoverable.',
  },
  {
    number: '1,000',
    label: 'Discoverable Nodes',
    description:
      'Individual content modules — chapters, lessons, articles — each addressable and searchable.',
  },
  {
    number: '10%',
    label: 'Compounded Credibility',
    description:
      'Structured content compounds visibility month over month through network connections.',
  },
]

export function CredibilityAmplified() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <NarrativeSection>
      <div className="space-y-16 sm:space-y-24">
        <NarrativeStatement alignment="center">
          <strong>Credibility Amplified</strong>
        </NarrativeStatement>

        <div ref={ref} className="grid md:grid-cols-3 gap-12 md:gap-8 max-w-4xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="text-center"
            >
              <p className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground">
                {stat.number}
              </p>
              <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary">
                {stat.label}
              </p>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center space-y-2">
          <p className="text-xl sm:text-2xl font-light text-muted-foreground tracking-tight">
            Structure creates <strong className="text-foreground font-semibold">leverage.</strong>
          </p>
          <p className="text-xl sm:text-2xl font-light text-muted-foreground tracking-tight">
            Leverage creates <strong className="text-foreground font-semibold">amplification.</strong>
          </p>
        </div>
      </div>
    </NarrativeSection>
  )
}
