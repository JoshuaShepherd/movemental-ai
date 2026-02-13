'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { NarrativeSection } from '../NarrativeSection'
import { NarrativeStatement } from '../NarrativeStatement'

const STEPS = [
  {
    title: 'Content Extraction',
    details: [
      'Audit existing content—books, talks, articles, courses.',
      'Identify core frameworks, themes, and signature ideas.',
      'Capture the raw material that defines the leader\'s contribution.',
    ],
  },
  {
    title: 'Canonical Structuring',
    details: [
      'Organize content into a coherent knowledge architecture.',
      'Establish relationships between ideas, themes, and bodies of work.',
      'Create a single source of truth for the leader\'s output.',
    ],
  },
  {
    title: 'Modularization',
    details: [
      'Break content into reusable, addressable modules.',
      'Each module can stand alone or connect to larger narratives.',
      'Content can be surfaced, remixed, and delivered in multiple formats.',
    ],
  },
  {
    title: 'Platformization',
    details: [
      'Deploy modular content into a leader-owned platform.',
      'Books, courses, articles, resources—all in one place.',
      'The leader controls the experience, audience, and data.',
    ],
  },
  {
    title: 'AI Integration',
    details: [
      'Add AI tools that respect the leader\'s voice and intent.',
      'Writing assistance, repurposing, intelligent search.',
      'AI as translation layer—not replacement.',
    ],
  },
  {
    title: 'Distribution Network',
    details: [
      'Connect the platform to the Movemental credibility network.',
      'Structured content becomes discoverable across the movement.',
      'Peer connections compound credibility and reach.',
    ],
  },
  {
    title: 'Feedback & Amplification',
    details: [
      'Measure what resonates. Surface what compounds.',
      'Content that connects earns visibility through trust, not algorithms.',
      'Structure creates leverage; leverage creates amplification.',
    ],
  },
]

export function MovementalPlaybook() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <NarrativeSection background="muted">
      <div className="space-y-16 sm:space-y-24">
        <div>
          <NarrativeStatement alignment="center">
            <strong>The Movemental Playbook</strong>
          </NarrativeStatement>
          <p className="mt-6 text-center text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            It followed a structured content architecture.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {STEPS.map((step, index) => (
            <div key={step.title} className="border rounded-lg bg-background">
              <button
                type="button"
                onClick={() => toggle(index)}
                className={cn(
                  'w-full flex items-center justify-between gap-4 p-5 text-left transition-colors rounded-lg',
                  openIndex === index ? 'bg-muted/50' : 'hover:bg-muted/30'
                )}
              >
                <span className="flex items-center gap-4">
                  <span className="text-sm font-mono text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-semibold text-foreground text-lg">
                    {step.title}
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-200',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={cn(
                  'grid transition-all duration-200',
                  openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pl-14 space-y-2">
                    {step.details.map((detail) => (
                      <p key={detail} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NarrativeSection>
  )
}
