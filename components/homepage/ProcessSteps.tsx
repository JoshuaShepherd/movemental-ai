'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle, Map, Rocket } from 'lucide-react'
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
    title: 'Self-Screen',
    description:
      'We\'re focused on movement leaders. Take the Self-Screen—one question, multiple choices—to see if we\'re built for you.',
    icon: CheckCircle,
    hasCTA: true,
    ctaText: 'Take Self-Screen',
    ctaLink: '/fit-check',
  },
  {
    number: 2,
    title: 'Map Your Content & Credibility',
    description:
      'We inventory your existing work and relationships—books, articles, courses, collaborators—and organize it into a structure designed for discovery and linking.',
    icon: Map,
    hasCTA: true,
    ctaText: 'Learn More',
    ctaLink: '/why-movemental',
  },
  {
    number: 3,
    title: 'Launch Into the Network',
    description:
      'In 2–4 weeks, your work goes live on a platform where credibility and amplification compound together. Your content finally moves.',
    icon: Rocket,
  },
]

export function ProcessSteps({ className }: ProcessStepsProps) {
  return (
    <section
      className={cn(
        'py-20 sm:py-28 bg-sage-950',
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            From Self-Screen to Launch
          </h2>
          <p className="text-lg text-sage-300 max-w-2xl mx-auto">
            A clear path from discernment to a platform where your content compounds
          </p>
        </div>

        {/* Process steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                'relative p-6 sm:p-8 rounded-2xl',
                'bg-sage-900/50 border border-sage-800',
                'hover:border-sage-700 transition-colors'
              )}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-500/10">
                  <step.icon className="w-6 h-6 text-cyan-400" />
                </div>
              </div>

              {/* Step number badge */}
              <div className="absolute top-6 right-6 text-xs font-medium text-sage-400">
                Step {step.number}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sage-300 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* CTA button (if applicable) */}
              {step.hasCTA && step.ctaLink && (
                <Button
                  asChild
                  variant="secondary"
                  className="bg-white text-sage-900 hover:bg-sage-100"
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
