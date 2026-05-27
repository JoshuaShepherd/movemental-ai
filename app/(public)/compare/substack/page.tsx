import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Substack vs Movemental: An Honest Guide | Movemental',
  description:
    "If you're deciding between Substack and Movemental, here's how we'd frame it—when each makes sense, and what you get for your 10%.",
  openGraph: {
    title: 'Substack vs Movemental: An Honest Guide | Movemental',
    description:
      "If you're deciding between Substack and Movemental, here's how we'd frame it—when each makes sense, and what you get for your 10%.",
    type: 'website',
  },
  alternates: {
    canonical: '/compare/substack',
  },
}

export default function CompareSubstackPage() {
  return (
    <div className="compare-substack-page min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-14 sm:py-20 px-4 bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-sm text-sage-300 hover:text-white mb-8 transition-colors font-medium tracking-wide"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden />
            Back to Compare
          </Link>
          <h1 className="compare-substack-hero-title text-white mb-5">
            Substack vs Movemental: an honest guide
          </h1>
          <p className="compare-substack-hero-subtitle text-sage-200/95 max-w-2xl">
            If you're deciding between Substack and Movemental, here's how we'd frame it—when each
            makes sense, and what you get for your 10%.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 sm:py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="compare-substack-section-heading text-foreground mt-10 first:mt-0 mb-4">
            Same revenue share, different value
          </h2>
          <p className="compare-substack-body text-muted-foreground mb-8">
            Both Substack and Movemental take 10% of your content revenue. The difference isn't
            cost—it's what you get for that 10%. Substack gives you a newsletter platform:
            publish articles, build an email list, optionally charge for subscriptions. Movemental
            gives you a full platform (books, articles, courses), voice-preserving AI, and a
            credibility network—the scenius of movement leaders who vouch for each other.
          </p>

          <h2 className="compare-substack-section-heading text-foreground mt-12 mb-4">
            When Substack makes sense
          </h2>
          <ul className="compare-substack-body text-muted-foreground list-disc pl-5 space-y-2 mb-10">
            <li>You mainly want to write and send a newsletter.</li>
            <li>You're okay with newsletter-only—no courses, no books as structured products.</li>
            <li>You want to launch in minutes with zero upfront cost.</li>
            <li>You're fine with discovery via Substack's algorithm (Recommendations, discovery tab).</li>
            <li>You don't need a movement-specific network or credibility graph.</li>
          </ul>

          <h2 className="compare-substack-section-heading text-foreground mt-12 mb-4">
            When Movemental makes sense
          </h2>
          <ul className="compare-substack-body text-muted-foreground list-disc pl-5 space-y-2 mb-10">
            <li>You want one home for books, articles, and courses—not just a newsletter.</li>
            <li>You want platform ownership—your site, your rules, not rented infrastructure.</li>
            <li>You care about credibility through relationships—who points to you, visible—not algorithm-driven discovery.</li>
            <li>You want AI that amplifies your voice from your body of work, not generic tools.</li>
            <li>You want to be part of the scenius—Alan, Brad, and movement leaders who cross-promote and make credibility visible.</li>
          </ul>

          <h2 className="compare-substack-section-heading text-foreground mt-12 mb-5">
            Side by side
          </h2>
          <div className="compare-substack-table-wrap rounded-xl border border-border bg-card overflow-hidden my-10 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left py-4 px-5 text-foreground">Dimension</th>
                  <th className="text-left py-4 px-5 text-foreground">Substack</th>
                  <th className="text-left py-4 px-5 text-foreground">Movemental</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Upfront cost</td>
                  <td className="py-4 px-5 text-muted-foreground">$0</td>
                  <td className="py-4 px-5 text-muted-foreground">$1,000</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Revenue share</td>
                  <td className="py-4 px-5 text-muted-foreground">10% + Stripe</td>
                  <td className="py-4 px-5 text-muted-foreground">10%</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Content types</td>
                  <td className="py-4 px-5 text-muted-foreground">Newsletter, articles</td>
                  <td className="py-4 px-5 text-muted-foreground">Books, articles, courses</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Platform ownership</td>
                  <td className="py-4 px-5 text-muted-foreground">Rent (Substack's platform)</td>
                  <td className="py-4 px-5 text-muted-foreground">Own</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Discovery</td>
                  <td className="py-4 px-5 text-muted-foreground">Algorithm (Recommendations)</td>
                  <td className="py-4 px-5 text-muted-foreground">Relational (credibility graph)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Scenius / peer network</td>
                  <td className="py-4 px-5 text-muted-foreground">No</td>
                  <td className="py-4 px-5 text-muted-foreground">Yes</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium text-foreground">Time to launch</td>
                  <td className="py-4 px-5 text-muted-foreground">Minutes</td>
                  <td className="py-4 px-5 text-muted-foreground">3–4 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="compare-substack-body text-muted-foreground mb-8">
            The short version: Substack is excellent for newsletter-first writers who want to
            publish quickly and cheaply. Movemental is for movement leaders who want one owned
            platform—books, articles, courses—and a credibility network. Neither is wrong. Choose
            based on what you're building.
          </p>

          <div className="rounded-lg border border-border bg-muted/30 py-4 px-5 mb-12">
            <p className="compare-substack-body text-muted-foreground mb-2">
              <strong className="text-foreground">It's not either/or.</strong> If you're on
              Movemental (or going there), you can integrate your Substack into your platform—one
              home, your newsletter included.
            </p>
            <Link
              href="/compare/substack-integration"
              className="text-emerald-600 hover:text-emerald-700 font-medium text-base inline-flex items-center gap-1"
            >
              How to integrate your Substack into Movemental
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="mt-14 pt-10 border-t border-border flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base px-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href="/fit-check">
                See if you&apos;re a fit
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-border text-foreground font-medium hover:bg-muted/60"
            >
              <Link href="/compare">Back to full comparison</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
