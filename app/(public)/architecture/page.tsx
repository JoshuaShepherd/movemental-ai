import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The architecture | Movemental',
  description: 'Shared digital infrastructure for movement leaders. What Movemental is, what is shared and owned, and how participation works.',
  openGraph: {
    title: 'The architecture | Movemental',
    description: 'Structural orientation to the Movemental model: multi-tenant commons, alignment, and participation.',
    type: 'website',
  },
}

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
        {/* 1. Opening Framing */}
        <header className="mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            The architecture
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Movemental is not a website builder, agency, or publisher. It is a shared digital infrastructure built for movement leaders in the age of AI. This page explains the structure behind the invitation.
          </p>
        </header>

        {/* 2. What Movemental Is */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What this is
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>A multi-tenant digital infrastructure for credible leaders.</li>
            <li>A structured environment for codifying existing work.</li>
            <li>A shared credibility network that strengthens discoverability.</li>
            <li>An AI-integrated system designed for longevity, not hype.</li>
            <li>An aligned economic model that preserves creator ownership.</li>
          </ul>
        </section>

        {/* 3. What Movemental Is Not */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            What this is not
          </h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-1">
            <li>Not a marketing agency.</li>
            <li>Not a personal branding accelerator.</li>
            <li>Not a content treadmill.</li>
            <li>Not a replacement for embodied leadership.</li>
            <li>Not a publishing house that owns your work.</li>
          </ul>
        </section>

        {/* 4. The Shared + The Owned */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            What is shared / what is owned
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wide mb-3">
                Shared
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-1">
                <li>Infrastructure</li>
                <li>Technical optimization</li>
                <li>AI systems</li>
                <li>Network credibility</li>
                <li>Ongoing platform evolution</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground uppercase tracking-wide mb-3">
                Owned by you
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-muted-foreground pl-1">
                <li>Intellectual property</li>
                <li>Creative voice</li>
                <li>Revenue (90%)</li>
                <li>Embodied calling and direction</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. The Economic Alignment */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Alignment
          </h2>
          <p className="text-muted-foreground mb-3 leading-relaxed">
            Movemental uses an upfront infrastructure commitment and a 10% revenue share. You keep 90% of content revenue. Alignment matters: we succeed only when creators succeed. Full pricing and terms are on the Pricing page.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <Link href="/pricing" className="text-foreground font-medium underline underline-offset-2 hover:no-underline">
              See pricing
            </Link>
          </p>
        </section>

        {/* 6. The Time Boundary */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Time and embodiment
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The architecture is designed for no more than two hours per week. Infrastructure carries the technical complexity. Your embodied work remains primary. The digital exists to support the physical, not replace it.
          </p>
        </section>

        {/* 7. How Participation Works */}
        <section className="mb-14">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Participation
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-1">
            <li>Self-Screen.</li>
            <li>Decide.</li>
            <li>Onboard and structure your corpus.</li>
            <li>Participate in the commons.</li>
          </ol>
        </section>

        {/* 8. Closing + CTA */}
        <section className="pt-6 border-t border-border">
          <p className="text-muted-foreground mb-6 leading-relaxed">
            This architecture exists to steward credible work in an environment that increasingly mediates discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 flex-wrap">
            <Button asChild size="lg">
              <Link href="/fit-check">Take the Self-Screen</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tour">Return to the tour</Link>
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
