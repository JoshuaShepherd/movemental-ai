import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check, X } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What Movemental Is (and Is Not) | Movemental',
  description: 'Clear expectations about what Movemental offers—and what it doesn\'t. A relational credibility network for movement leaders.',
  openGraph: {
    title: 'What Movemental Is (and Is Not)',
    description: 'Clear expectations about what Movemental offers for movement leaders.',
    type: 'website',
  },
}

export default function WhatIsMovementalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            What Movemental Is
            <span className="block text-muted-foreground text-3xl sm:text-4xl mt-2">(and What It&apos;s Not)</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We believe in setting clear expectations. Here&apos;s what you&apos;re getting into.
          </p>
        </div>
      </section>

      {/* What It Is / Is Not */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* What It IS */}
            <div className="p-8 rounded-xl border-2 border-primary/20 bg-primary/5">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                What Movemental IS
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">
                    <strong>A relational credibility network</strong> that connects movement leaders to trusted peers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">
                    <strong>A publishing infrastructure</strong> that makes your existing content discoverable and enduring
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">
                    <strong>An ownership model</strong> where you control your platform, audience, and revenue
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">
                    <strong>A stewardship commitment</strong> to serving movement leaders without extraction
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">
                    <strong>A long-term partnership</strong> designed for content that compounds over years, not weeks
                  </span>
                </li>
              </ul>
            </div>

            {/* What It IS NOT */}
            <div className="p-8 rounded-xl border bg-muted/30">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <X className="h-5 w-5 text-muted-foreground" />
                </div>
                What Movemental IS NOT
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">A generic website builder</strong>—this is purpose-built for movement leaders with established content
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">A social media platform</strong>—we&apos;re not competing for attention or optimizing for engagement metrics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">A content mill</strong>—we help your voice reach further, not replace it with AI-generated filler
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">A growth hack</strong>—we build credibility, not vanity metrics
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">A platform for beginners</strong>—this is for leaders with years of content ready to steward
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Who This Is For</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-background border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">You&apos;re a good fit if…</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>• You&apos;ve written books, led movements, or shaped communities over years</li>
                <li>• You have content that deserves to outlive algorithms</li>
                <li>• You care about formation more than follower counts</li>
                <li>• You&apos;re willing to be part of a network of peers, not just a solo brand</li>
                <li>• You want sustainable stewardship, not quick wins</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-background border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">This isn&apos;t for you if…</h3>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li>• You&apos;re just getting started creating content</li>
                <li>• You want rapid growth at any cost</li>
                <li>• You prefer to work in isolation from other leaders</li>
                <li>• You need results in weeks, not months</li>
                <li>• You&apos;re looking for fully automated content creation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Compare */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">How We&apos;re Different</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm">
                <strong className="text-foreground">vs. Traditional Publishers:</strong>{' '}
                <span className="text-muted-foreground">You keep 90% of revenue and own your audience directly.</span>
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm">
                <strong className="text-foreground">vs. Substack/Medium:</strong>{' '}
                <span className="text-muted-foreground">Full platform ownership, not rented space on someone else&apos;s domain.</span>
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm">
                <strong className="text-foreground">vs. Kajabi/Teachable:</strong>{' '}
                <span className="text-muted-foreground">Network credibility effects and AI-powered discoverability built in.</span>
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <p className="text-sm">
                <strong className="text-foreground">vs. Custom Development:</strong>{' '}
                <span className="text-muted-foreground">Launch in weeks for $1K instead of months for $50K+.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Still reading? That&apos;s a good sign.
          </h2>
          <p className="text-muted-foreground mb-8">
            If this resonates, take the Fit Check to see if we&apos;re right for each other.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="group">
              <Link href="/fit-check">
                Take the Fit Check
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/why-movemental">
                Read the Full Story
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
