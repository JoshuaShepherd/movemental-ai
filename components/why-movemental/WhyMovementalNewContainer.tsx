'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { NarrativeStatement } from './NarrativeStatement'
import { NarrativeSection } from './NarrativeSection'
import { ScrollProgress } from './ScrollProgress'
import { SectionNav } from './SectionNav'
import { PullQuote } from './PullQuote'
import { ContentMovementDiagnostic } from './ContentMovementDiagnostic'
import { TrustSignalsPanel } from './TrustSignalsPanel'

interface WhyMovementalNewContainerProps {
  className?: string
}

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'move', label: 'What We Mean by Move' },
  { id: 'reasons', label: 'Four Reasons' },
  { id: 'who', label: 'Who It\'s For' },
  { id: 'solution', label: 'What Movemental Is' },
  { id: 'goal', label: 'The Goal' },
  { id: 'tradeoff', label: 'Why Now' },
  { id: 'outro', label: 'Outro' },
]

export function WhyMovementalNewContainer({ className }: WhyMovementalNewContainerProps) {
  const [tradeoffOpen, setTradeoffOpen] = useState(false)

  return (
    <div className={cn('min-h-screen', className)}>
      <ScrollProgress />

      <SectionNav sections={SECTIONS} sticky />

      {/* Intro: The problem is not that you lack transformative content */}
      <section id="intro">
        <NarrativeSection background="dark">
          <NarrativeStatement alignment="center" variant="dark">
            The problem is not that you lack <strong>transformative content.</strong>
          </NarrativeStatement>
          <div className="mt-12 sm:mt-16">
            <NarrativeStatement alignment="center" variant="dark" delay={0.1}>
              The problem is that your content <strong>does not move.</strong>
            </NarrativeStatement>
          </div>
          <p className="mt-8 max-w-2xl mx-auto text-center text-sage-300 text-lg sm:text-xl">
            Most movement leaders have already done the hard work. Their content exists. Their ideas are sound. But those ideas remain locked in formats and silos that the modern world cannot find.
          </p>
          <div className="mt-12 sm:mt-16">
            <ContentMovementDiagnostic variant="dark" className="mt-8" />
          </div>
        </NarrativeSection>
      </section>

      {/* What we mean by "move" */}
      <section id="move">
        <NarrativeSection>
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              By <strong>&ldquo;move,&rdquo;</strong> we mean something specific:
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p className="text-center">
                Content that <strong className="text-foreground">circulates</strong> beyond its original audience.
              </p>
              <p className="text-center">
                Content that <strong className="text-foreground">connects</strong> to related ideas and voices.
              </p>
              <p className="text-center">
                Content that <strong className="text-foreground">compounds</strong> in influence over time.
              </p>
              <p className="text-center">
                Content that <strong className="text-foreground">carries credibility</strong> into new contexts.
              </p>
            </div>

            <NarrativeStatement alignment="center" delay={0.1}>
              Not virality. Not hype. <strong>Movement.</strong>
            </NarrativeStatement>

            <PullQuote
              quote="Credibility is the prerequisite for meaningful amplification. Without it, reach is just noise."
              size="large"
            />
          </div>
        </NarrativeSection>
      </section>

      {/* Four structural reasons */}
      <section id="reasons">
        <NarrativeSection background="muted">
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              There are <strong>four structural reasons</strong> this happens—and none of them are your fault.
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-8 text-lg sm:text-xl">
              <div className="p-6 rounded-lg bg-background border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">1. Content does not fully live online.</strong>
                  <br />
                  <span className="text-base">Books sit on shelves. Talks exist in recordings. Years of insight remain in formats the digital world cannot easily access.</span>
                </p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">2. Content is siloed and solitary.</strong>
                  <br />
                  <span className="text-base">Each leader operates alone—their platform disconnected from the broader movement they belong to.</span>
                </p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">3. Content is not legible to discovery systems.</strong>
                  <br />
                  <span className="text-base">Search engines and AI systems cannot surface what they cannot read. This is a technical constraint, not a quality judgment.</span>
                </p>
              </div>
              <div className="p-6 rounded-lg bg-background border">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">4. Content is not linked into credibility networks.</strong>
                  <br />
                  <span className="text-base">Without connections to trusted peers and movements, even excellent content struggles to earn the trust it deserves.</span>
                </p>
              </div>
            </div>

            <NarrativeStatement alignment="center" delay={0.2}>
              These are <strong>historical constraints</strong>—not personal failures. The tools and structures available to movement leaders have not, until recently, allowed content to be discoverable, connected, and moving at the same time.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* Who this is for */}
      <section id="who">
        <NarrativeSection>
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              Movemental is built for a <strong>specific kind of leader.</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg bg-muted/30 border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">This is for you if…</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• You have years of content that deserves a longer life</li>
                  <li>• You lead within a movement, not just an audience</li>
                  <li>• You care more about formation than followers</li>
                  <li>• You want your work to outlive the algorithm</li>
                  <li>• You&apos;re willing to be part of something larger than your brand</li>
                </ul>
              </div>
              <div className="p-8 rounded-lg bg-muted/30 border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">This is not for you if…</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• You&apos;re just starting to create content</li>
                  <li>• You want maximum reach with minimum depth</li>
                  <li>• You prefer to operate independently of peers</li>
                  <li>• You&apos;re looking for a quick growth hack</li>
                  <li>• You&apos;re not ready to invest in long-term stewardship</li>
                </ul>
              </div>
            </div>

            <NarrativeStatement alignment="center" delay={0.1}>
              We are not trying to serve everyone. <strong>We are trying to serve you well.</strong>
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* What Movemental is */}
      <section id="solution">
        <NarrativeSection background="muted">
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              Movemental is a <strong>relational credibility network.</strong>
            </NarrativeStatement>

            <NarrativeStatement alignment="center" delay={0.1}>
              Not a growth hack. Not an SEO trick. <strong>Not a content mill.</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-8 text-lg text-muted-foreground">
              <p className="text-center">
                We help your content become <strong className="text-foreground">discoverable</strong>—not by gaming algorithms, but by making it legible to the systems people actually use to find ideas.
              </p>
              <p className="text-center">
                We connect your work to <strong className="text-foreground">trusted peers</strong>—not as cross-promotion, but as mutual credibility that compounds over time.
              </p>
              <p className="text-center">
                We use AI as a <strong className="text-foreground">translation layer</strong>—helping your existing content reach new formats and contexts without losing your voice.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <TrustSignalsPanel className="my-8" />
            </div>

            <div className="max-w-3xl mx-auto p-8 rounded-lg bg-background border border-border border-l-4 border-l-primary">
              <p className="text-lg sm:text-xl text-muted-foreground italic mb-4">
                Imagine a book you wrote five years ago.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                With Movemental, that book becomes living content—its chapters surface when someone searches for the questions you answered. Its ideas connect to essays by colleagues in your movement. A leader in another country discovers your framework through a network they already trust.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                Your credibility compounds. Your reach grows. But you&apos;re not chasing an algorithm or performing for metrics.
              </p>
              <p className="text-base sm:text-lg text-foreground font-medium">
                You&apos;re simply letting good work find the people it was made for.
              </p>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* The goal is not more content */}
      <section id="goal">
        <NarrativeSection background="dark">
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center" variant="dark">
              The goal is not <strong>more content.</strong>
            </NarrativeStatement>

            <NarrativeStatement alignment="center" variant="dark" delay={0.1}>
              The goal is <strong>time returned</strong>—to people, to formation, to the embodied work that cannot be digitized.
            </NarrativeStatement>

            <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl font-bold text-white">Ownership</p>
                <p className="text-sage-300">Your platform. Your audience. Your data.</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl font-bold text-white">Sustainability</p>
                <p className="text-sage-300">Revenue that funds the mission, not the middleman.</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl sm:text-5xl font-bold text-white">Connection</p>
                <p className="text-sage-300">A network of trusted peers, not isolated competition.</p>
              </div>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* Why the old trade-off no longer holds (expandable) */}
      <section id="tradeoff">
        <NarrativeSection>
          <div className="max-w-3xl mx-auto">
            <button
              type="button"
              onClick={() => setTradeoffOpen(!tradeoffOpen)}
              className={cn(
                'w-full flex items-center justify-between gap-4 p-4 rounded-lg border text-left transition-colors',
                tradeoffOpen ? 'bg-muted/50 border-primary/30' : 'bg-muted/20 border-border hover:bg-muted/30'
              )}
            >
              <span className="font-semibold text-foreground">
                Why the old trade-off no longer holds
              </span>
              <ChevronDown
                className={cn('h-5 w-5 text-muted-foreground shrink-0 transition-transform', tradeoffOpen && 'rotate-180')}
              />
            </button>
            <div
              className={cn(
                'grid transition-all duration-200',
                tradeoffOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <div className="pt-6 space-y-6 text-muted-foreground">
                  <p>
                    Movement leaders have historically lost most of their value to the systems that distribute their work. Traditional publishers take the vast majority of book revenue; authors keep a small fraction. Digital platforms (Substack, Patreon, Teachable, etc.) own the audience, capture most revenue through fees and revenue sharing, and push optimization for algorithms instead of movements. Custom development has meant $50K–$150K and 6–12 months—making true platform ownership impossible for most leaders. Going it alone has meant low domain authority, poor discoverability, and no network effects.
                  </p>
                  <p>
                    So leaders were forced to choose: revenue retention, platform ownership, or accessibility. They could not have all three. That was not a moral failure; it was the structure of the market.
                  </p>
                  <p>
                    Technology and economics have changed. AI-assisted development, shared infrastructure, and new pricing make it possible to build a real platform in 3–4 weeks for a fraction of the old cost. Movemental offers a path to ownership (your platform, your audience, your data), revenue retention (you keep the vast majority of what you earn), and network effects (discoverability and credibility through the Movemental network). The constraint has been removed; the trade-off no longer has to apply.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* Outro + CTAs */}
      <section id="outro">
        <NarrativeSection>
          <NarrativeStatement alignment="center">
            <strong>Movemental exists</strong> to help content that matters find the people it was made for.
          </NarrativeStatement>

          <div className="mt-16 sm:mt-24 text-center space-y-8">
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              If this resonates, the next step is simple: see if we&apos;re the right fit for each other.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button asChild size="lg" className="group h-14 px-8 text-lg font-semibold">
                <Link href="/fit-check">
                  Is This You?
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
                <Link href="/how-it-works-new">
                  See How It Works
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg">
                <Link href="/ai-vision">Explore Our AI Posture</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-4">
              <Link href="/why-movemental" className="underline hover:text-foreground">Original Why Movemental page</Link>
            </p>
          </div>
        </NarrativeSection>
      </section>
    </div>
  )
}
