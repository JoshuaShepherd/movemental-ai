import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { CompareOptionsTable } from '@/components/compare/CompareOptionsTable'
import { COMPARE_OPTIONS_ROWS } from '@/lib/compare-options-data'

export const metadata: Metadata = {
  title: 'Compare Your Options | Movemental',
  openGraph: {
    title: 'Compare Your Options | Movemental',
    description: 'Movemental vs agency vs SaaS. Cost, playbook, platform, network—and what only Movemental gives you.',
    type: 'website',
  },
  alternates: {
    canonical: '/compare',
  },
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            If you need to be doing this, here are your options.
          </h1>
          <p className="text-lg sm:text-xl text-sage-300 max-w-2xl mx-auto">
            Movemental, agency, or SaaS—what you get, what you pay, and what only one of them gives you: the scenius and the people in it.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <CompareOptionsTable rows={COMPARE_OPTIONS_ROWS} showSourcesLink={true} />
        </div>
      </section>

      {/* What only Movemental has */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            The part they can't give you
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            An agency can build you a great site. A SaaS can host your courses. Neither gives you the <strong className="text-foreground">scenius</strong>—the network of movement leaders who vouch for each other, cross-promote, and make credibility visible. That's the most valuable part. And it's only here, with Alan, Brad, and the people already in it.
          </p>
          <Button asChild size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white">
            <Link href="/fit-check">
              See if you're a fit
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-sage-900 to-sage-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to compare for yourself?
          </h2>
          <p className="text-sage-300 mb-8">
            Start with the fit check—a moment of recognition, not an application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 rounded-full shadow-lg shadow-emerald-500/25"
            >
              <Link href="/fit-check">
                Fit check
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full"
            >
              <Link href="/pricing">Pricing details</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sources (anchor for link) */}
      <section id="sources" className="py-12 px-4 border-t bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-foreground mb-3">Sources for this comparison</h2>
          <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
            <li>Agency costs: Custom platform/website development typically $50K–$150K+ (Clutch, GoodFirms, industry surveys); ~$175K used as representative upper range. Timeline 6–12 months, maintenance 10–20% annually.</li>
            <li>SaaS: Thinkific $49–$199/mo, 0% transaction fees on paid plans. Teachable $39–$249/mo, 7.5% transaction fee on Starter, 0% on higher tiers; payment processing 2.9%+$0.30. Kajabi $89–$399/mo, no transaction fees. (Official pricing and fee pages, 2024–2025.)</li>
            <li>Movemental: Internal docs (pricing, why Movemental, credibility playbook, how it works).</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
