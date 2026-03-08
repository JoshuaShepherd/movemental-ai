'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { ScrollProgress } from '@/components/why-movemental/ScrollProgress'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { PathDiagram } from './diagrams/PathDiagram'
import { PlaybookFlowDiagram } from './diagrams/PlaybookFlowDiagram'
import { ContentPipelineDiagram } from './diagrams/ContentPipelineDiagram'
import { VoiceComparisonDemo } from './diagrams/VoiceComparisonDemo'
import { LaunchTimelineDiagram } from './diagrams/LaunchTimelineDiagram'

interface HowItWorksNewContainerProps {
  className?: string
}

const SECTIONS = [
  { id: 'the-path', label: 'The Path' },
  { id: 'the-playbook', label: 'Playbook' },
  { id: 'the-content-pipeline', label: 'Pipeline' },
  { id: 'where-ai-helps', label: 'AI Role' },
  { id: 'voice-preservation', label: 'Voice' },
  { id: '30-day-launch', label: 'Launch' },
  { id: 'rule-of-life', label: 'After' },
]

export function HowItWorksNewContainer({ className }: HowItWorksNewContainerProps) {
  const [expandedPlaybookNode, setExpandedPlaybookNode] = useState<string | null>(null)

  return (
    <div className={cn('min-h-screen', className)}>
      <ScrollProgress />
      <SectionNav sections={SECTIONS} sticky />

      {/* SECTION 1 — the-path */}
      <section id="the-path">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              A Clear Path — Not a <strong>Content Treadmill</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental is not about creating more content.
              </p>
              <p>
                It begins with what you have already created and helps it become a <strong className="text-foreground">living, discoverable body of work</strong>.
              </p>
              <p>
                The process is simple, finite, and designed to fit within the rhythms of embodied leadership.
              </p>
            </div>

            <PathDiagram className="my-8" />
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 2 — the-playbook */}
      <section id="the-playbook">
        <NarrativeSection background="muted">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              A Proven Playbook — <strong>Shown, Not Dumped</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental follows a disciplined content playbook developed through decades of thought leadership, publishing, and long-term circulation.
              </p>
              <p>
                It prioritizes work that <strong className="text-foreground">compounds over time</strong> rather than chasing attention.
              </p>
            </div>

            <PlaybookFlowDiagram
              expandedNode={expandedPlaybookNode}
              onNodeToggle={setExpandedPlaybookNode}
              className="my-8"
            />
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 3 — the-content-pipeline */}
      <section id="the-content-pipeline">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              What Happens to the Work <strong>You&apos;re Already Doing</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental begins with your existing body of work — sermons, talks, books, notes, archives.
              </p>
              <p className="text-foreground font-medium">
                Creation is not accelerated.<br />
                Circulation is.
              </p>
            </div>

            <ContentPipelineDiagram className="my-8" />
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 4 — where-ai-helps */}
      <section id="where-ai-helps">
        <NarrativeSection background="dark">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center" variant="dark">
              What AI Does — and <strong>What It Doesn&apos;t</strong>
            </NarrativeStatement>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              {/* AI Assists With */}
              <div className="p-8 rounded-lg bg-sage-800/50 border border-sage-700">
                <h3 className="text-xl font-semibold mb-6 text-white">AI Assists With</h3>
                <ul className="space-y-3 text-sage-300">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">+</span>
                    <span>Pattern recognition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">+</span>
                    <span>Drafting from your material</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">+</span>
                    <span>Editing and formatting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">+</span>
                    <span>Translation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">+</span>
                    <span>SEO as background translation</span>
                  </li>
                </ul>
              </div>

              {/* Humans Retain */}
              <div className="p-8 rounded-lg bg-sage-800/50 border border-sage-700">
                <h3 className="text-xl font-semibold mb-6 text-white">Humans Retain</h3>
                <ul className="space-y-3 text-sage-300">
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">&bull;</span>
                    <span>Voice</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">&bull;</span>
                    <span>Theological judgment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">&bull;</span>
                    <span>Discernment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">&bull;</span>
                    <span>Course design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">&bull;</span>
                    <span>Honesty with audience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-white mt-1">&bull;</span>
                    <span>Formation decisions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-sage-300">
                AI is used to <strong className="text-white">reduce digital burden</strong> — not replace human judgment or vocation.
              </p>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 5 — voice-preservation */}
      <section id="voice-preservation">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Preserving <strong>Voice and Integrity</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                AI assistance is only useful if your voice remains intact.
              </p>
              <p>
                Movemental tools are designed to <strong className="text-foreground">adapt to your language, tone, and theological posture</strong> — not overwrite them.
              </p>
            </div>

            <VoiceComparisonDemo className="my-8" />

            <p className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
              No claim of perfection. The process is iterative and human-reviewed.
            </p>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 6 — 30-day-launch */}
      <section id="30-day-launch">
        <NarrativeSection background="muted">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              A 30-Day Launch — Not an <strong>Endless Setup</strong>
            </NarrativeStatement>

            <LaunchTimelineDiagram className="my-8" />

            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-muted-foreground">
                The process is primarily <strong className="text-foreground">self-directed</strong>, with optional human touchpoints for deeper work.
              </p>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 7 — rule-of-life */}
      <section id="rule-of-life">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              After Launch: A Sustainable <strong>Rule of Life</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental is designed to integrate into your existing rhythms — not replace them.
              </p>
              <p>
                Most leaders commit approximately <strong className="text-foreground">three hours per week</strong>.
              </p>
              <p>
                Sermons, writing, teaching, and local ministry continue.
              </p>
              <p>
                The platform becomes an anchor for circulation, not a demand for constant output.
              </p>
            </div>

            {/* End quietly — no CTA here */}
            <div className="h-8" />
          </div>
        </NarrativeSection>
      </section>

      {/* FINAL CTA — Minimal, discernment-oriented */}
      <section id="cta">
        <NarrativeSection background="muted">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <p className="text-xl sm:text-2xl text-muted-foreground">
              If you&apos;re curious what this would look like for your work, the next step is <strong className="text-foreground">discernment</strong> — not commitment.
            </p>

            <div className="pt-4">
              <Button asChild size="lg" className="group h-14 px-8 text-lg font-semibold">
                <Link href="/fit-check">
                  Take the Self-Screen
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </NarrativeSection>
      </section>
    </div>
  )
}
