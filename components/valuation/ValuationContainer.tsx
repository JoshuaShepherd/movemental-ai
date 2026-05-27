'use client'

import { cn } from '@/lib/utils'
import { ScrollProgress } from '@/components/why-movemental/ScrollProgress'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { HowWereValued } from './sections/HowWereValued'
import { PricingStructure } from './sections/PricingStructure'
import { RevenueFlow } from './sections/RevenueFlow'
import { YearOneProjection } from './sections/YearOneProjection'
import { MilestoneValuation } from './sections/MilestoneValuation'
import { WhyThisHolds } from './sections/WhyThisHolds'
import { Summary } from './sections/Summary'

interface ValuationContainerProps {
  className?: string
}

const SECTIONS = [
  { id: 'model', label: 'Model' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'year-one', label: 'Year One' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'confidence', label: 'Confidence' },
  { id: 'summary', label: 'Summary' },
]

export function ValuationContainer({ className }: ValuationContainerProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      <ScrollProgress />

      {/* Section Navigation */}
      <SectionNav sections={SECTIONS} sticky />

      {/* Section 1: How We're Valued (Model) */}
      <section id="model">
        <NarrativeSection background="dark">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-4">
              Section 1
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              How We&apos;re Valued
            </h2>
          </div>
          <HowWereValued />
        </NarrativeSection>
      </section>

      {/* Section 2: Pricing Structure */}
      <section id="pricing">
        <NarrativeSection>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Section 2
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Pricing Structure
            </h2>
          </div>
          <PricingStructure />
        </NarrativeSection>
      </section>

      {/* Section 3: Revenue Flow */}
      <section id="revenue">
        <NarrativeSection background="muted">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Section 3
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              How Revenue Actually Flows
            </h2>
          </div>
          <RevenueFlow />
        </NarrativeSection>
      </section>

      {/* Section 4: Year One Projection */}
      <section id="year-one">
        <NarrativeSection>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Section 4
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Year One Projection
            </h2>
          </div>
          <YearOneProjection />
        </NarrativeSection>
      </section>

      {/* Section 5: Milestones → Valuation */}
      <section id="milestones">
        <NarrativeSection background="muted">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Section 5
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Milestones → Valuation
            </h2>
          </div>
          <MilestoneValuation />
        </NarrativeSection>
      </section>

      {/* Section 6: Why This Holds */}
      <section id="confidence">
        <NarrativeSection>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Section 6
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why This Holds Up
            </h2>
          </div>
          <WhyThisHolds />
        </NarrativeSection>
      </section>

      {/* Section 7: Summary */}
      <section id="summary">
        <NarrativeSection background="dark">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-slate-400 mb-4">
              Summary
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Quiet Confidence
            </h2>
          </div>
          <Summary />
        </NarrativeSection>
      </section>
    </div>
  )
}
