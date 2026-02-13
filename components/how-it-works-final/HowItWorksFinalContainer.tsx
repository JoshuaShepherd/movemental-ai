'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { WorkHereVisionSection } from './WorkHereVisionSection'
import { PlaybookFlowDiagram } from '@/components/how-it-works-new/diagrams/PlaybookFlowDiagram'
import { ContentPipelineDiagram } from '@/components/how-it-works-new/diagrams/ContentPipelineDiagram'
import { TwoWeekTimelineDiagram } from './TwoWeekTimelineDiagram'

/**
 * How-it-works-final: Your work here → our vision → playbook → pipeline → AI role → 2-week timeline → CTA.
 */
export function HowItWorksFinalContainer({ className }: { className?: string }) {
  const [expandedPlaybookNode, setExpandedPlaybookNode] = useState<string | null>(null)

  return (
    <div className={cn('min-h-screen', className)}>
      {/* Hero */}
      <NarrativeSection background="dark">
        <div className="space-y-8 sm:space-y-10">
          <NarrativeStatement alignment="center" variant="dark">
            A clear path from your existing work to a living system.
          </NarrativeStatement>
          <p className="mx-auto max-w-2xl text-center text-lg text-sage-300 sm:text-xl">
            No hype. No black box. Just a repeatable process built around credible leadership.
          </p>
        </div>
      </NarrativeSection>

      {/* Your work is here / It should also be here */}
      <NarrativeSection background="default">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            Your work is here. <strong>It should also be here.</strong>
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground text-center">
            <p>
              Your sermons, books, talks, and notes already exist—in PDFs, on YouTube, in archives.
              We don&apos;t start from a blank page. We start with what you have and make it
              findable, linked, and part of a coherent platform. If it&apos;s cheap and fast, it&apos;s
              stewardship.
            </p>
          </div>
          <WorkHereVisionSection className="mt-10" />
        </div>
      </NarrativeSection>

      {/* Full digital playbook (Alan) */}
      <NarrativeSection background="muted">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            The full digital playbook we extracted and employed for <strong>Alan</strong>.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground text-center">
            <p>
              We begin with what already exists. We clarify your lane. We turn it into a coherent
              body of work that compounds over time.
            </p>
          </div>
          <PlaybookFlowDiagram
            expandedNode={expandedPlaybookNode}
            onNodeToggle={setExpandedPlaybookNode}
            className="my-8 max-w-xl"
          />
        </div>
      </NarrativeSection>

      {/* Content pipeline */}
      <NarrativeSection background="default">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            The <strong>content pipeline</strong>.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground text-center">
            <p>
              Your existing material becomes a living archive—then becomes evergreen content,
              courses, and translated circulation. Creation is not accelerated. Circulation is.
            </p>
          </div>
          <ContentPipelineDiagram className="my-8" />
        </div>
      </NarrativeSection>

      {/* AI's role */}
      <NarrativeSection background="dark">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center" variant="dark">
            <strong>AI&apos;s role</strong> — and what stays human.
          </NarrativeStatement>
          <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-lg bg-sage-800/50 border border-sage-700">
              <h3 className="text-xl font-semibold mb-6 text-white">AI assists with</h3>
              <ul className="space-y-3 text-sage-300">
                {[
                  'Drafting and structuring from your material',
                  'Pattern recognition and themes',
                  'Editing and formatting',
                  'Translation and SEO as background',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-lg bg-sage-800/50 border border-sage-700">
              <h3 className="text-xl font-semibold mb-6 text-white">Humans retain</h3>
              <ul className="space-y-3 text-sage-300">
                {[
                  'Voice and theological judgment',
                  'Discernment and course design',
                  'What to publish and when',
                  'Honesty with your audience',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-white mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto max-w-2xl text-center text-sage-300">
            Quality is preserved through feedback loops. AI helps draft; humans shape. The system
            learns your constraints over time.
          </p>
        </div>
      </NarrativeSection>

      {/* 2-week onboarding timeline */}
      <NarrativeSection background="muted">
        <div className="space-y-12 sm:space-y-16">
          <NarrativeStatement alignment="center">
            The <strong>2-week</strong> onboarding timeline.
          </NarrativeStatement>
          <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground text-center">
            <p>
              Platform setup, corpus ingestion, voice and lane clarification, then core content and
              launch. Sustainable rhythm from day one.
            </p>
          </div>
          <TwoWeekTimelineDiagram className="my-8" />
        </div>
      </NarrativeSection>

      {/* CTA */}
      <NarrativeSection background="default">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <p className="text-xl sm:text-2xl text-muted-foreground">
            If you&apos;re curious what this would look like for your work, the next step is{' '}
            <strong className="text-foreground">discernment</strong>—not commitment.
          </p>
          <div className="pt-4">
            <Button asChild size="lg" className="group h-14 px-8 text-lg font-semibold">
              <Link href="/fit-check">
                Take the Fit Check
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </NarrativeSection>
    </div>
  )
}
