'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { NarrativeStatement } from './NarrativeStatement'
import { NarrativeSection } from './NarrativeSection'
import { ScrollProgress } from './ScrollProgress'
import { SectionNav } from './SectionNav'
import { StatisticsCallout } from './StatisticsCallout'
import { PullQuote } from './PullQuote'

interface WhyMovementalContainerProps {
  className?: string
}

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'problem', label: 'Part I' },
  { id: 'shift', label: 'Part II' },
  { id: 'solution', label: 'Part III' },
  { id: 'outro', label: 'Outro' },
]

export function WhyMovementalContainer({ className }: WhyMovementalContainerProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      <ScrollProgress />
      
      {/* Section Navigation */}
      <SectionNav sections={SECTIONS} sticky />

      {/* Section 1: Intro - The Problem */}
      <section id="intro">
        <NarrativeSection background="dark">
          <NarrativeStatement alignment="center" variant="dark">
            <strong>Movement leaders</strong> lose 85-90% of their revenue 
            to traditional publishers and digital platforms.
          </NarrativeStatement>
        </NarrativeSection>
      </section>

      {/* Section 2: Part I - The Reality */}
      <section id="problem">
        <NarrativeSection>
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="left" delay={0.1}>
              <strong>Traditional publishers</strong> take 90% of book revenue, 
              leaving authors with just 10%—for distribution that&apos;s increasingly 
              irrelevant in a digital world.
            </NarrativeStatement>

            {/* Statistics Callout */}
            <StatisticsCallout
              value="66%"
              context="of creators made most of their income from one revenue source in 2022 — brand deals."
              gradient="yellow-green"
              icons={['dollar', 'dollar']}
            />

            <NarrativeStatement alignment="right" delay={0.2}>
              <strong>Digital platforms</strong> own your audience, capture 70-90% 
              of revenue, and force you to optimize for algorithms instead of movements.
            </NarrativeStatement>

            <PullQuote
              quote="Social platforms are great for building audiences, not businesses. And the most successful creators have figured this out."
              size="large"
            />

            <NarrativeStatement alignment="left" delay={0.3}>
              <strong>Custom development</strong> costs $50K-$150K and takes 6-12 months, 
              making platform ownership impossible for most leaders.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* Section 3: Part II - The Structural Nature */}
      <section id="shift">
        <NarrativeSection background="muted">
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              This is <strong>not a moral failure.</strong>
            </NarrativeStatement>

            <NarrativeStatement alignment="center" delay={0.1}>
              Movement leaders used <strong>the best tools available.</strong> 
              The market simply did not offer a better alternative.
            </NarrativeStatement>

            <NarrativeStatement alignment="center" delay={0.2}>
              They faced an impossible choice: <strong>revenue retention</strong> versus 
              <strong> platform ownership</strong> versus <strong>accessibility.</strong>
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* Section 4: Part III - What Changed */}
      <section id="solution">
        <NarrativeSection>
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              <strong>That constraint has been removed.</strong>
            </NarrativeStatement>

            <NarrativeStatement alignment="left" delay={0.1}>
              <strong>AI-assisted development</strong> means full-stack platforms 
              can be built in hours, not months.
            </NarrativeStatement>

            <StatisticsCallout
              value="10x"
              context="faster platform development with AI-assisted workflows."
              gradient="blue-purple"
              icons={['zap', 'trending']}
            />

            <NarrativeStatement alignment="right" delay={0.2}>
              <strong>Shared infrastructure</strong> enables rapid deployment 
              with collective SEO benefits and network amplification.
            </NarrativeStatement>

            <NarrativeStatement alignment="left" delay={0.3}>
              <strong>Revolutionary pricing</strong> means $1,000 + 10% revenue share 
              instead of $50K-$150K upfront.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* Section 5: The New Reality */}
      <NarrativeSection background="dark">
        <div className="space-y-16 sm:space-y-24">
          <NarrativeStatement alignment="center" variant="dark">
            Movement leaders can now have <strong>all three.</strong>
          </NarrativeStatement>

          <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-bold text-white">90%</p>
              <p className="text-slate-400">Revenue Retention</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-bold text-white">$1K</p>
              <p className="text-slate-400">Platform Ownership</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl sm:text-5xl font-bold text-white">2-4</p>
              <p className="text-slate-400">Weeks to Launch</p>
            </div>
          </div>
        </div>
      </NarrativeSection>

      {/* Section 6: Outro - The Mission */}
      <section id="outro">
        <NarrativeSection>
          <NarrativeStatement alignment="center">
            <strong>Movemental exists</strong> to remove the barriers between 
            movement leaders and the people they&apos;re called to reach.
          </NarrativeStatement>

          <div className="mt-16 sm:mt-24 text-center">
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to see how we&apos;ll build your platform?
            </p>
            <Button 
              asChild 
              size="lg"
              className="group h-14 px-8 text-lg font-semibold"
            >
              <Link href="/onboarding">
                See Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </NarrativeSection>
      </section>
    </div>
  )
}
