'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import { ScrollProgress } from '@/components/why-movemental/ScrollProgress'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { Timeline, TimelineHorizontal } from './Timeline'
import { ONBOARDING_PHASES } from '@/lib/schemas/onboarding-path'
import { getTotalWeeks } from '@/lib/schemas/onboarding-path'
import { WorkHereVisionSection } from '@/components/how-it-works-final/WorkHereVisionSection'
import { ContentPipelineDiagram } from '@/components/how-it-works-new/diagrams/ContentPipelineDiagram'
import { ContentPipelinePreviewAgent } from './ContentPipelinePreviewAgent'

interface OnboardingPathContainerProps {
  className?: string
}

const SECTIONS = [
  { id: 'order', label: 'Understanding' },
  { id: 'work-here', label: 'Your Work' },
  { id: 'path', label: 'The Path' },
  { id: 'phases', label: 'Four Phases' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'ai-role', label: 'AI Role' },
  { id: 'different', label: 'Different' },
  { id: 'get', label: 'What You Get' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'supporting', label: 'Support' },
  { id: 'summary', label: 'Summary' },
  { id: 'cta', label: 'Next Step' },
]

const WHAT_MAKES_DIFFERENT = [
  { title: 'Movement-First', description: 'Built for movement leaders with missional theology and incarnational practice at the core.' },
  { title: 'Evidence-Based', description: 'AI analyzes your content so the platform reflects your real voice and body of work.' },
  { title: 'Launch-Ready', description: 'Your platform launches with content, not empty templates. Ready to serve from day one.' },
  { title: 'Network Effects', description: 'Connect with other movement leaders. Cross-pollinate. Amplify reach together.' },
  { title: 'Owned, Not Rented', description: 'Your platform, your audience, your data. No algorithmic gatekeeping.' },
  { title: 'AI-Amplified', description: 'Movemental Intelligence helps create, curate, and connect your content across the network.' },
]

const WHAT_YOU_GET = [
  'A complete digital publishing platform — content, commerce, community, and analytics in one place.',
  'Your voice — the platform is configured from your existing content and identity, not a generic theme.',
  'Ownership — you own the platform, the audience relationship, and the data.',
  'Connection — you\'re part of the Movemental network: discoverability and credibility alongside trusted peers.',
  'Ongoing support — AI and tools that help your content stay discoverable, connected, and moving.',
]

const ORDER_STEPS = [
  'Self-Screen — Am I the right person for this?',
  'Why Movemental — What problem does this solve and why does it matter?',
  'How It Works — What actually happens from fit to launch?',
  'Team / Credibility — Who is behind this and why should I trust them?',
  'AI Book / Knowledge — What is the foundational thinking and posture?',
  'Learning Hub — How do I use the platform?',
  'Pricing & Access — What does it cost and what are the limits?',
]

const AI_ASSISTS = [
  'Drafting and structuring from your material',
  'Pattern recognition and themes',
  'Editing and formatting',
  'Translation and SEO as background',
]

const HUMANS_RETAIN = [
  'Voice and theological judgment',
  'Discernment and course design',
  'What to publish and when',
  'Honesty with your audience',
]

export function OnboardingPathContainer({ className }: OnboardingPathContainerProps) {
  const [expandedPhaseId, setExpandedPhaseId] = useState<string | null>(null)

  const handlePhaseToggle = useCallback((phaseId: string) => {
    setExpandedPhaseId(prev => prev === phaseId ? null : phaseId)
  }, [])

  const handleStartJourney = useCallback(() => {
    document.getElementById('phases')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <div className={cn('min-h-screen', className)}>
      <ScrollProgress />
      <SectionNav sections={SECTIONS} sticky />

      {/* Hero: bridge + path headline */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800">
        <div className="absolute inset-0 overflow-hidden opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/20" />
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          <p className="text-sage-300 text-sm sm:text-base font-medium mb-4">
            You&apos;ve seen the problem. Here&apos;s the path.
          </p>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
            <Clock className="h-4 w-4" />
            <span>{getTotalWeeks()} from fit to live</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
            How Movemental
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Works</span>
          </h1>
          <p className="text-lg sm:text-xl text-sage-300 mb-10 max-w-xl mx-auto">
            Four phases to get your content discoverable, connected, and moving. Your platform
            launches with content, not empty templates.
          </p>
          <Button
            onClick={handleStartJourney}
            size="lg"
            className="group h-14 px-8 text-lg font-semibold bg-white text-sage-900 hover:bg-sage-100"
          >
            See the four phases
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </section>

      {/* Order of understanding */}
      <section id="order">
        <NarrativeSection>
          <div className="space-y-12">
            <NarrativeStatement alignment="center">
              The right <strong>order</strong> to understand Movemental
            </NarrativeStatement>
            <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto">
              For someone who doesn&apos;t know, the path only makes sense after you understand why Movemental exists.
            </p>
            <ol className="max-w-2xl mx-auto space-y-4 list-decimal list-inside text-muted-foreground">
              {ORDER_STEPS.map((step, i) => (
                <li key={i} className="pl-2 text-left">
                  <span className="text-foreground font-medium">{step.split('—')[0]?.trim()}</span>
                  {step.includes('—') && (
                    <span> — {step.split('—').slice(1).join('—').trim()}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </NarrativeSection>
      </section>

      {/* NEW: Your work is here / It should also be here */}
      <section id="work-here">
        <NarrativeSection background="muted">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Your work is here. <strong>It should also be here.</strong>
            </NarrativeStatement>
            <div className="mx-auto max-w-3xl space-y-6 text-lg text-muted-foreground text-center">
              <p>
                Your sermons, books, talks, and notes already exist — in PDFs, on YouTube, in archives.
                We don&apos;t start from a blank page. We start with what you have and make it
                findable, linked, and part of a coherent platform.
              </p>
            </div>
            <WorkHereVisionSection className="mt-10" />
          </div>
        </NarrativeSection>
      </section>

      {/* Path intro */}
      <section id="path">
        <NarrativeSection>
          <div className="space-y-8">
            <NarrativeStatement alignment="center">
              From fit to live in <strong>3–4 weeks</strong>
            </NarrativeStatement>
            <p className="text-center text-lg text-muted-foreground max-w-3xl mx-auto">
              After you confirm fit and understand why Movemental exists, you go through four
              phases. Your platform launches with content, not empty templates—configured for your
              voice and connected to the Movemental network. Each phase builds on the last. The
              process is movement-first, evidence-based, and launch-ready.
            </p>
          </div>
        </NarrativeSection>
      </section>

      {/* Four phases */}
      <section id="phases">
        <NarrativeSection background="muted">
          <div className="space-y-12">
            <NarrativeStatement alignment="center">
              <strong>Four phases</strong> to launch
            </NarrativeStatement>
            <TimelineHorizontal phases={ONBOARDING_PHASES} className="mb-12" />
            <Timeline
              phases={ONBOARDING_PHASES}
              expandedPhaseId={expandedPhaseId}
              onPhaseToggle={handlePhaseToggle}
            />
          </div>
        </NarrativeSection>
      </section>

      {/* NEW: Content Pipeline */}
      <section id="pipeline">
        <NarrativeSection>
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              What happens to the work <strong>you&apos;re already doing</strong>
            </NarrativeStatement>
            <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground text-center">
              <p>
                Your existing work—sermons, talks, books, notes, archives—passes through a layer
                that identifies your voice, themes, and lane. What emerges is evergreen content
                structured for discovery.
              </p>
              <p className="text-foreground font-medium">
                We don&apos;t speed up creation. We speed up circulation.
              </p>
            </div>
            <ContentPipelineDiagram className="my-8" />
            <div className="mt-12 pt-10 border-t border-border">
              <ContentPipelinePreviewAgent />
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* NEW: AI's Role */}
      <section id="ai-role">
        <NarrativeSection background="dark">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center" variant="dark">
              <strong>AI&apos;s role</strong> — and what stays human
            </NarrativeStatement>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg bg-sage-800/50 border border-sage-700">
                <h3 className="text-xl font-semibold mb-6 text-white">AI assists with</h3>
                <ul className="space-y-3 text-sage-300">
                  {AI_ASSISTS.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-emerald-400 mt-1">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-lg bg-sage-800/50 border border-sage-700">
                <h3 className="text-xl font-semibold mb-6 text-white">Humans retain</h3>
                <ul className="space-y-3 text-sage-300">
                  {HUMANS_RETAIN.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-white mt-1">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="max-w-2xl mx-auto text-center text-sage-300">
              Quality is preserved through feedback loops. AI helps draft; humans shape. The system learns your constraints over time.
            </p>
          </div>
        </NarrativeSection>
      </section>

      {/* What makes this different */}
      <section id="different">
        <NarrativeSection>
          <div className="space-y-12">
            <NarrativeStatement alignment="center">
              This is not a <strong>DIY platform</strong> or a generic template.
            </NarrativeStatement>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHAT_MAKES_DIFFERENT.map((item) => (
                <div key={item.title} className="p-6 bg-background rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* What you get */}
      <section id="get">
        <NarrativeSection background="muted">
          <div className="space-y-10">
            <NarrativeStatement alignment="center">
              <strong>What you get</strong>
            </NarrativeStatement>
            <ul className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground">
              {WHAT_YOU_GET.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </NarrativeSection>
      </section>

      {/* Pricing and access */}
      <section id="pricing">
        <NarrativeSection>
          <div className="space-y-8 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Pricing and access
            </h2>
            <p className="text-muted-foreground">
              Movemental charges an upfront fee (far below the $50K–$150K norm) plus a revenue
              share so we're aligned with your success. You keep most of the revenue. Full pricing
              is on the Pricing page—after you understand why Movemental exists and what the path
              looks like, so you can evaluate it in context.
            </p>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </NarrativeSection>
      </section>

      {/* Supporting pieces */}
      <section id="supporting">
        <NarrativeSection background="muted">
          <div className="space-y-8 max-w-2xl mx-auto">
            <NarrativeStatement alignment="center">
              <strong>Supporting pieces</strong>
            </NarrativeStatement>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <strong className="text-foreground">Team / Credibility</strong> — Who built
                Movemental and who guides it.
              </li>
              <li>
                <strong className="text-foreground">AI Book / Knowledge Spine</strong> —
                Foundational language, discernment, and posture. Free and substantive.
              </li>
              <li>
                <strong className="text-foreground">Learning Hub</strong> — Guides and resources
                to use the platform.
              </li>
            </ul>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/team">Team</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/book">AI Book</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/learn">Learn</Link>
              </Button>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* Summary */}
      <section id="summary">
        <NarrativeSection background="dark">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">
              How it works in one pass
            </h2>
            <p className="text-sage-300 text-lg leading-relaxed">
              You confirm fit. You understand why Movemental exists (your content is transformative; it doesn&apos;t move; we fix that). You see the path: four phases over 3–4 weeks—Discovery & Vision, Content Research, Platform Architecture, Network & Launch. Your platform goes live with content and with connection to the Movemental network. You own it. You keep most of the revenue. You&apos;re part of a relational credibility network, not an isolated site. Supporting that: who we are (team), what we believe (AI book), and how to use it (learning hub). That&apos;s how Movemental works.
            </p>
          </div>
        </NarrativeSection>
      </section>

      {/* CTA */}
      <section id="cta">
        <NarrativeSection>
          <div className="text-center space-y-8">
            <NarrativeStatement alignment="center">
              <strong>Ready to begin?</strong>
            </NarrativeStatement>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              See if you&apos;re a fit. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="group h-14 px-8 text-lg font-semibold">
                <Link href="/fit-check">
                  Start with Self-Screen
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
                <Link href="/why-movemental">Why Movemental</Link>
              </Button>
            </div>
          </div>
        </NarrativeSection>
      </section>
    </div>
  )
}
