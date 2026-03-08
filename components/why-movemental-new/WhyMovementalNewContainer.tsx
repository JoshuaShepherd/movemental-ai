'use client'

import { cn } from '@/lib/utils'
import { NarrativeStatement } from '@/components/why-movemental/NarrativeStatement'
import { NarrativeSection } from '@/components/why-movemental/NarrativeSection'
import { ScrollProgress } from '@/components/why-movemental/ScrollProgress'
import { SectionNav } from '@/components/why-movemental/SectionNav'
import { SceniusNetworkDiagram } from './diagrams/SceniusNetworkDiagram'
import { BeforeAfterCirculation } from './diagrams/BeforeAfterCirculation'
import { ConstraintCollapseTimeline } from './diagrams/ConstraintCollapseTimeline'
import { NetworkCapDiagram } from './diagrams/NetworkCapDiagram'
import { ConcentricCirclesDiagram } from './diagrams/ConcentricCirclesDiagram'
import { InvertedPyramidDiagram } from './diagrams/InvertedPyramidDiagram'

interface WhyMovementalNewContainerProps {
  className?: string
}

const SECTIONS = [
  { id: 'what-we-built-first', label: 'Beginning' },
  { id: 'the-credibility-collapse', label: 'The Collapse' },
  { id: 'scenius-not-genius', label: 'Scenius' },
  { id: 'content-that-does-not-move', label: 'Circulation' },
  { id: 'credibility-and-amplification', label: 'Distinction' },
  { id: 'not-possible-until-now', label: 'Why Now' },
  { id: 'who-this-is-for', label: 'Who' },
  { id: 'why-100', label: 'The Cap' },
  { id: 'movement-is-offline', label: 'Offline' },
  { id: 'redefining-success', label: 'Success' },
  { id: 'relational-credibility', label: 'Networks' },
  { id: 'downward-scaling', label: 'Scaling' },
  { id: 'response-not-opportunity', label: 'Close' },
]

export function WhyMovementalNewContainer({ className }: WhyMovementalNewContainerProps) {
  return (
    <div className={cn('min-h-screen', className)}>
      <ScrollProgress />
      <SectionNav sections={SECTIONS} sticky />

      {/* SECTION 1 — what-we-built-first */}
      <section id="what-we-built-first">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              We Started by Building for <strong>Alan Hirsch</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental did not begin as a platform idea.
              </p>
              <p>
                It began by building a complete digital publishing system for Alan Hirsch.
              </p>
              <p>
                Not as a pilot.<br />
                Not as a prototype.<br />
                But as a finished, production-grade platform designed to steward decades of embodied theological work.
              </p>
              <p>
                Alan&apos;s voice carries global credibility earned through formation, risk, failure, and long obedience.
              </p>
              <p>
                Beginning here ensured that Movemental would be built for <strong className="text-foreground">depth, longevity, and seriousness</strong> — not trends, growth hacks, or virality.
              </p>
            </div>

            <NarrativeStatement alignment="center" delay={0.2}>
              Movemental begins with <strong>inheritance</strong>, not innovation.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 2 — the-credibility-collapse */}
      <section id="the-credibility-collapse">
        <NarrativeSection background="dark">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center" variant="dark">
              The <strong>Credibility Collapse</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-sage-300">
              <p>
                Visibility no longer signals trust.
              </p>
              <p>
                Digital saturation, algorithmic incentives, and AI-generated content have collapsed traditional markers of credibility.
              </p>
              <p>
                The problem is not only misinformation.
              </p>
              <p className="text-white font-medium">
                It is indistinguishability.
              </p>
              <p>
                Readers increasingly cannot tell who is speaking — or why they should listen.
              </p>
            </div>

            {/* TODO: Optional typographic animation: "Author" → "Anonymous" → "Synthetic" */}
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center gap-4 text-2xl sm:text-3xl text-sage-400 font-light">
                <span>Author</span>
                <span className="text-sage-600">→</span>
                <span>Anonymous</span>
                <span className="text-sage-600">→</span>
                <span className="text-sage-500">Synthetic</span>
              </div>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 3 — scenius-not-genius */}
      <section id="scenius-not-genius">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Credibility Is Now <strong>Relational</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Credibility is restored through visible human networks — not isolated amplification.
              </p>
              <p>
                When trusted peers publicly reference, link to, and vouch for one another, a <strong className="text-foreground">credibility ecology</strong> emerges.
              </p>
              <p>
                Movements have always functioned this way.
              </p>
              <p>
                The digital world largely has not.
              </p>
            </div>

            <SceniusNetworkDiagram className="my-8" />

            <NarrativeStatement alignment="center" delay={0.2}>
              Movemental is structured as a <strong>scenius network</strong> — not a creator platform.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 4 — content-that-does-not-move */}
      <section id="content-that-does-not-move">
        <NarrativeSection background="muted">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Most Credible Content <strong>Doesn&apos;t Move</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Most meaningful work already exists — but remains trapped:
              </p>
              <ul className="space-y-2 ml-4">
                <li>– offline</li>
                <li>– siloed</li>
                <li>– unlinked</li>
                <li>– undiscoverable</li>
              </ul>
              <p>
                This is not a failure of writing or thought.
              </p>
              <p className="text-foreground font-medium">
                It is a structural failure of circulation.
              </p>
              <p>
                Discovery, translation, and linking were historically inaccessible due to cost and complexity.
              </p>
            </div>

            <BeforeAfterCirculation className="my-8" />

            <NarrativeStatement alignment="center" delay={0.2}>
              Movemental treats <strong>circulation as infrastructure</strong>, not self-promotion.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 5 — credibility-and-amplification */}
      <section id="credibility-and-amplification">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Credibility and Amplification Are <strong>Not the Same Thing</strong>
            </NarrativeStatement>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="p-8 rounded-lg border bg-background">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Amplification</h3>
                <p className="text-muted-foreground text-lg">
                  Easy.<br />
                  Algorithmic.<br />
                  Purchasable.<br />
                  Volume-driven.
                </p>
              </div>
              <div className="p-8 rounded-lg border bg-background">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Credibility</h3>
                <p className="text-muted-foreground text-lg">
                  Embodied.<br />
                  Relational.<br />
                  Slow.<br />
                  Costly.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground text-center">
              <p>
                There is no inherent relationship between the two.
              </p>
              <p className="text-foreground font-medium">
                When amplification outruns credibility, meaning collapses.
              </p>
            </div>

            <NarrativeStatement alignment="center" delay={0.2}>
              Movemental exists to amplify only what has already been <strong>earned</strong>.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 6 — not-possible-until-now */}
      <section id="not-possible-until-now">
        <NarrativeSection background="dark">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center" variant="dark">
              Why This Wasn&apos;t <strong>Possible Until Now</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-sage-300">
              <p>
                Not because of &ldquo;AI content.&rdquo;
              </p>
              <p className="text-white font-medium">
                But because multiple constraints collapsed at once:
              </p>
              <ul className="space-y-2 ml-4">
                <li>– Complex systems can now be built by non-programmers</li>
                <li>– Agentic tooling collapses time and cost</li>
                <li>– Semantic structuring can happen in the background</li>
              </ul>
              <p>
                What once required teams, years, and massive capital can now be built by one person in months.
              </p>
            </div>

            <ConstraintCollapseTimeline className="my-8" />

            <NarrativeStatement alignment="center" variant="dark" delay={0.2}>
              Without this collapse of constraints, the Movemental model is <strong>impossible</strong>.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 7 — who-this-is-for */}
      <section id="who-this-is-for">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Who Movemental Is <strong>For</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental is for leaders with existing embodied credibility that is <strong className="text-foreground">under-leveraged digitally</strong>.
              </p>
            </div>

            <div className="max-w-3xl mx-auto p-8 rounded-lg border bg-muted/30">
              <h3 className="text-xl font-semibold mb-6 text-foreground">It is not for:</h3>
              <ul className="space-y-3 text-muted-foreground text-lg">
                <li>– beginners seeking reach</li>
                <li>– creators chasing virality</li>
                <li>– people outsourcing authorship to AI</li>
              </ul>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Admission functions like <strong className="text-foreground">vocational discernment</strong>, not onboarding.
              </p>
              <p className="text-foreground font-medium">
                Exclusion protects credibility.
              </p>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 8 — why-100 */}
      <section id="why-100">
        <NarrativeSection background="muted">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Why We Stop at <strong>100</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                The cap is not scarcity.
              </p>
              <p className="text-foreground font-medium">
                It is legibility.
              </p>
            </div>

            <div className="max-w-3xl mx-auto p-8 rounded-lg border bg-background">
              <p className="text-lg text-muted-foreground mb-4">At 100:</p>
              <ul className="space-y-2 text-lg text-muted-foreground ml-4">
                <li>– trust remains intelligible</li>
                <li>– stewardship remains personal</li>
                <li>– credibility costs are knowable</li>
              </ul>
            </div>

            <NetworkCapDiagram className="my-8" />

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground text-center">
              <p>
                Beyond that, the moral and relational dynamics change.
              </p>
            </div>

            <NarrativeStatement alignment="center" delay={0.2}>
              Movemental is <strong>intentionally bounded</strong>.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 9 — movement-is-offline */}
      <section id="movement-is-offline">
        <NarrativeSection background="default">
          <div className="space-y-16 sm:space-y-24">
            <NarrativeStatement alignment="center">
              Movement Is <strong>Offline</strong>
            </NarrativeStatement>

            {/* Manifesto-style typography */}
            <div className="max-w-3xl mx-auto space-y-8 text-2xl sm:text-3xl md:text-4xl font-light text-center">
              <p className="text-muted-foreground">
                Formation is <strong className="text-foreground font-normal">embodied</strong>.
              </p>
              <p className="text-muted-foreground">
                Mission is <strong className="text-foreground font-normal">local</strong>.
              </p>
              <p className="text-muted-foreground">
                Presence cannot be <strong className="text-foreground font-normal">automated</strong>.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground text-center">
              <p>
                Digital tools must remain secondary and constrained.
              </p>
              <p>
                AI is used to <strong className="text-foreground">reduce digital burden</strong> — not expand it.
              </p>
            </div>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 10 — redefining-success */}
      <section id="redefining-success">
        <NarrativeSection background="dark">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center" variant="dark">
              Redefining <strong>Success</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-sage-300">
              <p className="text-white font-medium">
                Success is not being heard by everyone.
              </p>
              <p>
                It is being heard by <strong className="text-white">your people</strong>.
              </p>
              <p>
                Every leader has a different total addressable community.
              </p>
              <p>
                Most are currently reaching only a fraction of those they already serve.
              </p>
            </div>

            <ConcentricCirclesDiagram className="my-8" />

            <NarrativeStatement alignment="center" variant="dark" delay={0.2}>
              Translation and circulation now matter more than <strong>production</strong>.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 11 — relational-credibility */}
      <section id="relational-credibility">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              Credibility Is Now <strong>Relational</strong>
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Institutions no longer carry trust on their own.
              </p>
              <p>
                Anonymous excellence is insufficient.
              </p>
              <p className="text-foreground font-medium">
                Credibility now emerges through visible human networks.
              </p>
            </div>

            {/* TODO: Author cards or linked references — minimal interaction */}
            <div className="max-w-3xl mx-auto grid sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-lg border bg-muted/20 text-center">
                <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Leader A references</p>
                <p className="text-sm font-medium text-foreground">Leader B</p>
              </div>
              <div className="p-6 rounded-lg border bg-muted/20 text-center">
                <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Leader B cites</p>
                <p className="text-sm font-medium text-foreground">Leader C</p>
              </div>
              <div className="p-6 rounded-lg border bg-muted/20 text-center">
                <div className="w-12 h-12 rounded-full bg-muted mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Leader C endorses</p>
                <p className="text-sm font-medium text-foreground">Leader A</p>
              </div>
            </div>

            <NarrativeStatement alignment="center" delay={0.2}>
              Movemental makes those networks <strong>legible</strong>.
            </NarrativeStatement>
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 12 — downward-scaling */}
      <section id="downward-scaling">
        <NarrativeSection background="muted">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              <strong>Downward</strong> Scaling
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental scales <strong className="text-foreground">depth</strong>, not volume.
              </p>
              <p>
                AI enables personalization at human scale.
              </p>
              <p>
                This is <strong className="text-foreground">prophetic modeling</strong> — not market domination.
              </p>
              <p>
                Formation requires shared commitments and limits.
              </p>
            </div>

            <InvertedPyramidDiagram className="my-8" />
          </div>
        </NarrativeSection>
      </section>

      {/* SECTION 13 — response-not-opportunity */}
      <section id="response-not-opportunity">
        <NarrativeSection background="default">
          <div className="space-y-12 sm:space-y-16">
            <NarrativeStatement alignment="center">
              A Response to <strong>Tension</strong>, Not Opportunity
            </NarrativeStatement>

            <div className="max-w-3xl mx-auto space-y-6 text-lg sm:text-xl text-muted-foreground">
              <p>
                Movemental did not begin as an AI company.
              </p>
              <p>
                It emerged from loss of meaning, discernment, and long vocational tension.
              </p>
              <p>
                It is a response to what is at risk of being lost.
              </p>
            </div>

            <NarrativeStatement alignment="center" delay={0.2}>
              The project is <strong>witness</strong> before it is product.
            </NarrativeStatement>

            {/* Let the page end in stillness — no CTA, no links */}
            <div className="h-16 sm:h-24" />
          </div>
        </NarrativeSection>
      </section>
    </div>
  )
}
