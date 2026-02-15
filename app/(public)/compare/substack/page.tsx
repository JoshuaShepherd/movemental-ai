import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Substack vs Movemental: An Honest Guide | Movemental',
  description:
    'If you’re deciding between Substack and Movemental, here’s how we’d frame it—when each makes sense, and what you get for your 10%.',
  openGraph: {
    title: 'Substack vs Movemental: An Honest Guide | Movemental',
    description:
      'If you’re deciding between Substack and Movemental, here’s how we’d frame it—when each makes sense, and what you get for your 10%.',
    type: 'website',
  },
  alternates: {
    canonical: '/compare/substack',
  },
}

export default function CompareSubstackPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-12 sm:py-16 px-4 bg-gradient-to-b from-sage-900 via-sage-900 to-sage-800">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1 text-sm text-sage-300 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Compare
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Substack vs Movemental: an honest guide
          </h1>
          <p className="text-lg text-sage-300">
            If you’re deciding between Substack and Movemental, here’s how we’d frame it—when each
            makes sense, and what you get for your 10%.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-2xl mx-auto prose prose-slate dark:prose-invert prose-headings:font-semibold prose-p:text-muted-foreground prose-li:text-muted-foreground">
          <h2>Same revenue share, different value</h2>
          <p>
            Both Substack and Movemental take 10% of your content revenue. The difference isn’t
            cost—it’s what you get for that 10%. Substack gives you a newsletter platform:
            publish articles, build an email list, optionally charge for subscriptions. Movemental
            gives you a full platform (books, articles, courses), voice-preserving AI, and a
            credibility network—the scenius of movement leaders who vouch for each other.
          </p>

          <h2>When Substack makes sense</h2>
          <ul>
            <li>You mainly want to write and send a newsletter.</li>
            <li>You’re okay with newsletter-only—no courses, no books as structured products.</li>
            <li>You want to launch in minutes with zero upfront cost.</li>
            <li>You’re fine with discovery via Substack’s algorithm (Recommendations, discovery tab).</li>
            <li>You don’t need a movement-specific network or credibility graph.</li>
          </ul>

          <h2>When Movemental makes sense</h2>
          <ul>
            <li>You want one home for books, articles, and courses—not just a newsletter.</li>
            <li>You want platform ownership—your site, your rules, not rented infrastructure.</li>
            <li>You care about credibility through relationships—who points to you, visible—not algorithm-driven discovery.</li>
            <li>You want AI that amplifies your voice from your body of work, not generic tools.</li>
            <li>You want to be part of the scenius—Alan, Brad, and movement leaders who cross-promote and make credibility visible.</li>
          </ul>

          <h2>Side by side</h2>
          <div className="rounded-lg border bg-card overflow-hidden not-prose my-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-semibold">Dimension</th>
                  <th className="text-left py-3 px-4 font-semibold">Substack</th>
                  <th className="text-left py-3 px-4 font-semibold">Movemental</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="py-3 px-4 font-medium">Upfront cost</td>
                  <td className="py-3 px-4 text-muted-foreground">$0</td>
                  <td className="py-3 px-4 text-muted-foreground">$1,000</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Revenue share</td>
                  <td className="py-3 px-4 text-muted-foreground">10% + Stripe</td>
                  <td className="py-3 px-4 text-muted-foreground">10%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Content types</td>
                  <td className="py-3 px-4 text-muted-foreground">Newsletter, articles</td>
                  <td className="py-3 px-4 text-muted-foreground">Books, articles, courses</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Platform ownership</td>
                  <td className="py-3 px-4 text-muted-foreground">Rent (Substack’s platform)</td>
                  <td className="py-3 px-4 text-muted-foreground">Own</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Discovery</td>
                  <td className="py-3 px-4 text-muted-foreground">Algorithm (Recommendations)</td>
                  <td className="py-3 px-4 text-muted-foreground">Relational (credibility graph)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Scenius / peer network</td>
                  <td className="py-3 px-4 text-muted-foreground">No</td>
                  <td className="py-3 px-4 text-muted-foreground">Yes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Time to launch</td>
                  <td className="py-3 px-4 text-muted-foreground">Minutes</td>
                  <td className="py-3 px-4 text-muted-foreground">3–4 weeks</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The short version: Substack is excellent for newsletter-first writers who want to
            publish quickly and cheaply. Movemental is for movement leaders who want one owned
            platform—books, articles, courses—and a credibility network. Neither is wrong. Choose
            based on what you’re building.
          </p>

          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600">
              <Link href="/fit-check">
                See if you&apos;re a fit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/compare">Back to full comparison</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
