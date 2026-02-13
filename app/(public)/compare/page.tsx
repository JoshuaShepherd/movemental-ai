import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Check, X, ArrowRight, HelpCircle } from 'lucide-react'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: 'Compare Your Options | Movemental',
  description: 'If you need a movement platform: Movemental, agency, or SaaS? See what you get—and what you don’t—with each option. Real comparison, real numbers.',
  openGraph: {
    title: 'Compare Your Options | Movemental',
    description: 'Movemental vs agency vs SaaS. Cost, playbook, platform, network—and what only Movemental gives you.',
    type: 'website',
  },
  alternates: {
    canonical: '/compare',
  },
}

// Research-backed comparison. Sources: _docs/site-docs/compare-options-sources.md
const COMPARE_ROWS: {
  category: string
  feature: string
  movemental: string | true
  agency: string | true | false
  saas: string | true | false
  note?: string
}[] = [
  // ——— Cost & pricing ———
  { category: 'Cost & pricing', feature: 'Upfront cost', movemental: '$1,000', agency: '~$175,000', saas: '$0', note: 'Agency: typical custom platform $50K–$150K+ (Clutch, GoodFirms). SaaS: monthly only.' },
  { category: 'Cost & pricing', feature: 'Ongoing cost', movemental: '10% of your content revenue', agency: '10–20% of build cost/year (maintenance)', saas: '$39–$399/mo + 0–7.5% transaction fees', note: 'Teachable 7.5% on Starter; Thinkific 0% on paid plans. Payment processing ~2.9%+$0.30 separate.' },
  { category: 'Cost & pricing', feature: 'Revenue you keep', movemental: '90%', agency: '100% (after large upfront)', saas: '~70–85% (after fees)', note: 'Publishers ~10%; platforms take fees + processing.' },
  { category: 'Cost & pricing', feature: 'Time to launch', movemental: '3–4 weeks', agency: '6–12 months', saas: 'Days (self-setup)', note: 'Agency: Clutch avg 9 months. Movemental: from fit to live.' },
  // ——— Digital playbook ———
  { category: 'Digital playbook', feature: 'Content pipeline (existing → evergreen → courses → circulation)', movemental: true, agency: false, saas: false },
  { category: 'Digital playbook', feature: 'One home (single hub for you + work + network)', movemental: true, agency: 'Only if scoped', saas: 'Subdomain or add-on domain', note: 'SaaS: you’re on their platform, not a true owned home.' },
  { category: 'Digital playbook', feature: 'Author legibility (E-E-A-T, who you are + who points to you)', movemental: true, agency: 'If included in scope', saas: false, note: 'Movemental is built for credibility amplification.' },
  { category: 'Digital playbook', feature: 'Content as nodes (findable, linked, structured)', movemental: true, agency: 'If SEO/strategy included', saas: 'Courses only; no movement-wide graph', note: 'SaaS focuses on course catalog, not credibility graph.' },
  { category: 'Digital playbook', feature: 'Voice-preserving AI (your body of work, not generic)', movemental: true, agency: false, saas: 'Generic AI tools', note: 'Movemental: AI amplifies your voice; SaaS: generic assistants.' },
  // ——— Platform ———
  { category: 'Platform', feature: 'You own the platform', movemental: true, agency: true, saas: false, note: 'Agency: you own what they build. SaaS: you rent.' },
  { category: 'Platform', feature: 'Custom domain', movemental: true, agency: true, saas: 'Often (sometimes extra)', note: 'Thinkific/Teachable/Kajabi support custom domain.' },
  { category: 'Platform', feature: 'Books, articles, courses in one place', movemental: true, agency: 'If scoped', saas: 'Courses + maybe blog', note: 'SaaS is course-first; articles/blog vary by product.' },
  { category: 'Platform', feature: 'You own audience data', movemental: true, agency: true, saas: false, note: 'SaaS: platform controls list and behavior data.' },
  { category: 'Platform', feature: 'No algorithm dependency (your site, your rules)', movemental: true, agency: true, saas: false, note: 'SaaS: discovery and reach depend on platform algorithms.' },
  // ——— Network & scenius ———
  { category: 'Network & scenius', feature: 'Peer network of movement leaders', movemental: true, agency: false, saas: false },
  { category: 'Network & scenius', feature: 'Cross-promotion & shared discovery', movemental: true, agency: false, saas: false, note: 'SaaS: you compete with other creators on same platform.' },
  { category: 'Network & scenius', feature: 'Credibility graph (who points to you, visible)', movemental: true, agency: false, saas: false },
  { category: 'Network & scenius', feature: 'Scenius: Alan, Brad, and the people in it', movemental: true, agency: false, saas: false, note: 'The most valuable part—only with Movemental.' },
  { category: 'Network & scenius', feature: 'Bounded ecology (curated, not a marketplace)', movemental: true, agency: false, saas: false, note: 'Movemental: ~100 leaders, mutual elevation. SaaS: open marketplace.' },
  // ——— Launch & support ———
  { category: 'Launch & support', feature: 'Phased onboarding (Discovery → Research → Build → Launch)', movemental: true, agency: 'Similar (project phases)', saas: false, note: 'SaaS: self-serve setup; no movement-specific process.' },
  { category: 'Launch & support', feature: 'Content migration from existing work', movemental: true, agency: 'If scoped', saas: 'Manual / limited', note: 'Movemental: AI-assisted from your sermons, talks, writing.' },
  { category: 'Launch & support', feature: 'Launch with content live (not empty templates)', movemental: true, agency: 'If scoped', saas: 'You fill it yourself', note: 'Movemental: platform launches with your content.' },
  { category: 'Launch & support', feature: 'Network onboarding (meet the scenius)', movemental: true, agency: false, saas: false },
]

function CellValue({
  value,
  isMovemental,
}: {
  value: string | true | false
  isMovemental?: boolean
}) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
        <Check className="h-5 w-5 shrink-0" aria-hidden />
        <span>Included</span>
      </span>
    )
  if (value === false)
    return (
      <span className="inline-flex items-center justify-center gap-1 text-muted-foreground">
        <X className="h-5 w-5 shrink-0" aria-hidden />
        <span>—</span>
      </span>
    )
  return (
    <span className={isMovemental ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
      {value}
    </span>
  )
}

export default function ComparePage() {
  const categories = Array.from(new Set(COMPARE_ROWS.map((r) => r.category)))

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
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground w-[220px] sm:w-[260px]">
                    Feature
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30 w-[140px] sm:w-[160px]">
                    Movemental
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-muted-foreground w-[140px] sm:w-[160px]">
                    Agency
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-muted-foreground w-[140px] sm:w-[160px]">
                    SaaS
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <Fragment key={cat}>
                    <tr className="bg-muted/40">
                      <td
                        colSpan={4}
                        className="py-2 px-4 text-sm font-semibold text-foreground uppercase tracking-wider border-b border-border"
                      >
                        {cat}
                      </td>
                    </tr>
                    {COMPARE_ROWS.filter((r) => r.category === cat).map((row) => (
                      <tr
                        key={`${row.category}-${row.feature}`}
                        className="border-b border-border/80 hover:bg-muted/20 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-foreground align-top">
                          {row.feature}
                        </td>
                        <td className="py-3 px-3 text-center text-sm align-top bg-emerald-50/30 dark:bg-emerald-950/20">
                          <CellValue value={row.movemental} isMovemental />
                        </td>
                        <td className="py-3 px-3 text-center text-sm align-top">
                          <CellValue value={row.agency} />
                        </td>
                        <td className="py-3 px-3 text-center text-sm align-top">
                          <CellValue value={row.saas} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <HelpCircle className="h-4 w-4 shrink-0" />
            Agency and SaaS figures from public pricing and industry reports (2024–2025). See{' '}
            <Link href="/compare#sources" className="underline hover:text-foreground">
              sources
            </Link>
            .
          </p>
        </div>
      </section>

      {/* What only Movemental has */}
      <section className="py-16 sm:py-20 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            The part they can’t give you
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            An agency can build you a great site. A SaaS can host your courses. Neither gives you the <strong className="text-foreground">scenius</strong>—the network of movement leaders who vouch for each other, cross-promote, and make credibility visible. That’s the most valuable part. And it’s only here, with Alan, Brad, and the people already in it.
          </p>
          <Button asChild size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white">
            <Link href="/fit-check">
              See if you’re a fit
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
