import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Integrate Your Substack into Movemental | Movemental',
  description:
    "It's not Movemental versus Substack. It's whether you want to integrate your Substack into your Movemental platform. Why and how.",
  openGraph: {
    title: 'Integrate Your Substack into Movemental | Movemental',
    description:
      "It's not Movemental versus Substack. It's whether you want to integrate your Substack into your Movemental platform. Why and how.",
    type: 'website',
  },
  alternates: {
    canonical: '/compare/substack-integration',
  },
}

export default function SubstackIntegrationPage() {
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
            Integrate your Substack into Movemental
          </h1>
          <p className="compare-substack-hero-subtitle text-sage-200/95 max-w-2xl">
            It&apos;s not Movemental versus Substack. It&apos;s whether you want your Substack
            inside your Movemental platform. Here&apos;s why you might, and how it works.
          </p>
        </div>
      </section>

      {/* Content — inverted pyramid, pragmatic */}
      <section className="py-14 sm:py-20 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="compare-substack-section-heading text-foreground mt-10 first:mt-0 mb-4">
            The short version
          </h2>
          <p className="compare-substack-body text-muted-foreground mb-8">
            You can connect your existing Substack to your Movemental site. Your newsletter stays
            where it is—we pull your posts into your one home so readers see everything in one
            place and our AI can use your full corpus. It&apos;s optional. There&apos;s no
            either/or: you keep Substack if you want, and add Movemental as your owned platform
            with books, articles, courses, and the scenius. Integration just brings the newsletter
            into that home.
          </p>

          <h2 className="compare-substack-section-heading text-foreground mt-12 mb-4">
            Why integrate?
          </h2>
          <ul className="compare-substack-body text-muted-foreground list-disc pl-5 space-y-2 mb-10">
            <li>
              <strong className="text-foreground">One place for readers.</strong> Point people to
              one site—your Movemental platform—instead of splitting them between Substack and
              somewhere else.
            </li>
            <li>
              <strong className="text-foreground">Your voice corpus stays complete.</strong> Our
              AI uses your full body of work. Substack posts become part of that; drafts and
              repurposing stay on-brand.
            </li>
            <li>
              <strong className="text-foreground">One platform to maintain.</strong> You keep
              publishing on Substack if you like. We mirror it. You get one front door, one
              archive, one story for your audience.
            </li>
            <li>
              <strong className="text-foreground">No throwaway.</strong> You don&apos;t abandon
              what you&apos;ve built. Pragmatic move: one home, integrate what you&apos;ve got.
            </li>
          </ul>

          <h2 className="compare-substack-section-heading text-foreground mt-12 mb-4">
            How it works
          </h2>
          <p className="compare-substack-body text-muted-foreground mb-4">
            You connect your Substack publication (we use its RSS or API). New posts flow into your
            Movemental site automatically. They show up in your article archive and feed alongside
            anything you publish directly on Movemental. Readers see one coherent place.
          </p>
          <p className="compare-substack-body text-muted-foreground mb-4">
            Paid subscriptions can stay on Substack for now. We&apos;re not replacing your billing
            or asking you to migrate overnight—we&apos;re giving you one front door and one corpus.
            If you later want to move paid readers to Movemental, that&apos;s a separate step you
            can take when it makes sense.
          </p>
          <p className="compare-substack-body text-muted-foreground mb-10">
            Bottom line: you keep writing where you write. We pull it in. Your platform, your
            rules, your content in one place.
          </p>

          <h2 className="compare-substack-section-heading text-foreground mt-12 mb-4">
            Who it&apos;s for
          </h2>
          <p className="compare-substack-body text-muted-foreground mb-12">
            Movemental leaders who already have a Substack, or who want a newsletter but also want
            books, courses, and the scenius. The pragmatic choice is one home—Movemental—and
            integrate your Substack so nothing gets left behind and your audience has one place to
            go.
          </p>

          <div className="mt-14 pt-10 border-t border-border flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4">
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
            <p className="compare-substack-body text-muted-foreground text-sm">
              Deciding between Substack and Movemental?{' '}
              <Link
                href="/compare/substack"
                className="text-foreground font-medium underline underline-offset-2 hover:no-underline"
              >
                Read our honest Substack vs Movemental guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
