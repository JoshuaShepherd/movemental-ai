'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Lightbulb, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface Step {
  /** Step number */
  number: number
  /** Step title */
  title: string
  /** Step description */
  description: string
  /** Lucide icon component */
  icon: LucideIcon
  /** Whether this step has a CTA button */
  hasCTA?: boolean
  /** CTA text (if hasCTA is true) */
  ctaText?: string
  /** CTA link (if hasCTA is true) */
  ctaLink?: string
}

interface ProcessStepsProps {
  /** Optional additional class names */
  className?: string
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Check Your Fit',
    description:
      'Take the 60-second Fit Check to discover if Movemental is the right platform for your movement. We help movement leaders who are ready to own their digital presence.',
    icon: CheckCircle,
    hasCTA: true,
    ctaText: 'Take Fit Check',
    ctaLink: '/fit-check',
  },
  {
    number: 2,
    title: 'Understand the Problem',
    description:
      'Learn why movement leaders lose 85-90% of their revenue to traditional publishers and rental platforms—and how Movemental changes that equation.',
    icon: Lightbulb,
  },
  {
    number: 3,
    title: 'Launch Your Platform',
    description:
      'In 2-4 weeks, go from fit-confirmed to live platform. Complete digital publishing infrastructure—content, commerce, community—for $1,000 instead of $50K-$150K.',
    icon: Rocket,
  },
]

export function ProcessSteps({ className }: ProcessStepsProps) {
  return (
    <section
      className={cn(
        'py-20 sm:py-28 bg-slate-950',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            From Fit Check to Launch
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A clear path from discernment to your own digital publishing platform
          </p>
        </div>

        {/* Process steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                'relative p-6 sm:p-8 rounded-2xl',
                'bg-slate-900/50 border border-slate-800',
                'hover:border-slate-700 transition-colors'
              )}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10">
                  <step.icon className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              {/* Step number badge */}
              <div className="absolute top-6 right-6 text-xs font-medium text-slate-600">
                Step {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* CTA button (if applicable) */}
              {step.hasCTA && step.ctaLink && (
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white text-slate-900 hover:bg-slate-100"
                >
                  <Link href={step.ctaLink}>{step.ctaText}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
