import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Alignment | Movemental',
  description: 'How Movemental\'s economic model works: shared infrastructure and aligned incentives. Upfront commitment and 90/10 revenue alignment.',
  openGraph: {
    title: 'Alignment | Movemental',
    description: 'Shared infrastructure and aligned incentives for movement leaders.',
    type: 'website',
  },
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* 1. Opening Framing */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            Alignment
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Movemental is built on shared infrastructure and aligned incentives. This page explains how that alignment works.
          </p>
        </header>

        {/* 2. The Model */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            The model
          </h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Movemental provides shared digital infrastructure. Creators retain ownership and the majority of revenue. Movemental sustains the system through shared alignment.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>Upfront infrastructure commitment</li>
            <li>Ongoing revenue alignment (90 / 10)</li>
          </ul>
        </section>

        {/* 3. Upfront Infrastructure Commitment */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Upfront infrastructure commitment
          </h2>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            The current upfront amount is $1,000. It funds onboarding, architecture configuration, and initial corpus structuring. This work would otherwise require high-cost custom consulting; the upfront reflects your commitment to shared infrastructure rather than a one-off project.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The amount may be adjusted over time as the commons grows. There is no artificial scarcity or limited-time framing.
          </p>
        </section>

        {/* 4. Ongoing Revenue Alignment */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Ongoing alignment
          </h2>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            90% of content revenue remains with the creator. 10% sustains and evolves the shared infrastructure. Movemental only succeeds when creators succeed.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Intellectual property remains owned by the creator. Movemental does not take ownership of your content.
          </p>
        </section>

        {/* 5. What This Includes */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What this includes
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>Structured digital architecture</li>
            <li>Corpus codification</li>
            <li>Discoverability optimization</li>
            <li>AI integration and translation support</li>
            <li>Network credibility alignment</li>
            <li>E-commerce pathways</li>
          </ul>
        </section>

        {/* 6. What This Does Not Include */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What this does not include
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>Full-time content production</li>
            <li>Personal brand management</li>
            <li>Guaranteed traffic or virality</li>
            <li>Replacement of embodied leadership</li>
          </ul>
        </section>

        {/* 7. Time & Boundary */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Time and boundary
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The model is designed to require no more than two hours per week. Movemental supports embodied work; it does not consume it.
          </p>
        </section>

        {/* 8. Closing + Routing */}
        <section className="pt-6 border-t border-border">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            If you want to see how this fits your situation, start with the Self-Screen. If you are still weighing the decision, use the discernment companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link href="/fit-check">Take the Self-Screen</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/decide">Help me decide</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/decided">I&apos;ve decided</Link>
            </Button>
          </div>
        </section>
      </article>
    </div>
  )
}
