import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'You\'ve decided | Movemental',
  description: 'Structured offer for movement leaders: upfront infrastructure commitment and ongoing alignment through revenue share.',
  openGraph: {
    title: 'You\'ve decided to build inside the commons | Movemental',
    description: 'What this decision means and the structured offer.',
    type: 'website',
  },
}

export default function DecidedPage() {
  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* 1. Opening Acknowledgment */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            You&apos;ve decided to build inside the commons.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            This is a meaningful step. You are choosing to structure your life&apos;s work within shared infrastructure for discoverability and credibility in the age of AI.
          </p>
        </header>

        {/* 2. What This Decision Means */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What this decision means
          </h2>
          <p className="text-muted-foreground mb-3">By deciding, you are saying:</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>You want your work structured for discoverability.</li>
            <li>You are open to participating in a shared credibility network.</li>
            <li>You understand Movemental aligns incentives through shared revenue.</li>
            <li>You are building for longevity, not short-term amplification.</li>
          </ul>
        </section>

        {/* 3. The Structured Offer */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-foreground mb-8">
            The offer
          </h2>

          <h3 className="text-lg font-medium text-foreground mb-3">
            Upfront infrastructure commitment
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The upfront commitment is $1,000. This funds architecture, onboarding, and initial structuring of your presence on the platform. It is priced below comparable custom consulting so that credible movement leaders can enter without prohibitive cost.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-3">
            Ongoing alignment
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            10% of content revenue flows to Movemental. You retain 90%. Ownership of your intellectual property remains with you. Movemental maintains and evolves the shared infrastructure; you keep your work and your audience.
          </p>

          <h3 className="text-lg font-medium text-foreground mb-3 mt-8">
            What Movemental provides
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1 mb-6">
            <li>Structured digital architecture (multi-tenant, bespoke front-end).</li>
            <li>Codification of your existing corpus.</li>
            <li>Discoverability optimization.</li>
            <li>AI integration and translation support.</li>
            <li>E-commerce and monetization pathways.</li>
            <li>Networked credibility alignment.</li>
          </ul>

          <h3 className="text-lg font-medium text-foreground mb-3">
            What Movemental does not do
          </h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>We do not replace embodied leadership.</li>
            <li>We do not require full-time content production.</li>
            <li>We do not extract ownership of your work.</li>
            <li>We do not promise virality.</li>
          </ul>
        </section>

        {/* 4. Time & Embodiment Boundary */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Time and embodiment
          </h2>
          <p className="text-lg text-foreground mb-2">
            This requires no more than two hours per week.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Your primary calling remains embodied. Movemental supports your work; it does not consume it. The infrastructure carries the technical load so you can focus on what only you can do.
          </p>
        </section>

        {/* 5. What Happens Next */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What happens next
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-1">
            <li>Accept the structured offer.</li>
            <li>Complete payment.</li>
            <li>Begin onboarding, corpus intake, and architectural build.</li>
          </ol>
          <p className="text-muted-foreground mt-4 text-sm">
            We will schedule a kickoff conversation within five business days of acceptance.
          </p>
        </section>

        {/* 6. Decision Buttons */}
        <section className="flex flex-col sm:flex-row gap-4 sm:gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/checkout">Accept &amp; Continue</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
            <Link href="/decide">I still have questions</Link>
          </Button>
        </section>

        {/* 7. Optional Closing Line */}
        <p className="mt-14 text-muted-foreground text-center text-sm">
          This is not about scaling influence. It is about stewarding credibility.
        </p>
      </article>
    </div>
  )
}
