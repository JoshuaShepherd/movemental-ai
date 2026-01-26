'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { OnboardingHero } from './OnboardingHero'
import { Timeline, TimelineHorizontal } from './Timeline'
import { OnboardingCTA } from './OnboardingCTA'
import { ONBOARDING_PHASES } from '@/lib/schemas/onboarding-path'

interface OnboardingPathContainerProps {
  className?: string
}

export function OnboardingPathContainer({ className }: OnboardingPathContainerProps) {
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>(null)

  const handlePhaseToggle = useCallback((phaseId: string) => {
    setExpandedPhaseId(prev => prev === phaseId ? null : phaseId)
  }, [])

  const handleStartJourney = useCallback(() => {
    // Scroll to the phases section
    document.getElementById('phases')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className={cn('min-h-screen', className)}>
      {/* Hero Section */}
      <OnboardingHero onStartJourney={handleStartJourney} />

      {/* Phases Section */}
      <section id="phases" className="py-16 sm:py-24 bg-background">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Section header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
              The Journey
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Four Phases to Launch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each phase builds on the last, ensuring your platform reflects your authentic voice 
              and is ready to serve your community from day one.
            </p>
          </div>

          {/* Horizontal timeline preview (desktop only) */}
          <TimelineHorizontal phases={ONBOARDING_PHASES} className="mb-12" />

          {/* Vertical timeline with expandable cards */}
          <Timeline
            phases={ONBOARDING_PHASES}
            expandedPhaseId={expandedPhaseId}
            onPhaseToggle={handlePhaseToggle}
          />
        </div>
      </section>

      {/* What Makes This Different Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              What Makes This Different
            </h2>
            <p className="text-lg text-muted-foreground">
              This isn&apos;t a DIY platform or a generic template.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Movement-First',
                description: 'Built specifically for movement leaders with missional theology and incarnational practice at the core.',
              },
              {
                title: 'Evidence-Based',
                description: 'AI-powered content analysis ensures your platform reflects your actual voice and body of work.',
              },
              {
                title: 'Launch-Ready',
                description: 'Your platform launches with content, not empty templates. Ready to serve from day one.',
              },
              {
                title: 'Network Effects',
                description: 'Connect with other movement leaders. Cross-pollinate ideas. Amplify reach together.',
              },
              {
                title: 'Owned, Not Rented',
                description: 'Your platform, your audience, your data. No algorithmic gatekeeping.',
              },
              {
                title: 'AI-Amplified',
                description: 'Movemental Intelligence helps create, curate, and connect your content across the network.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <OnboardingCTA />
    </div>
  )
}
