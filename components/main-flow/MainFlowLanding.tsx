'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

/**
 * Main-flow landing (from html/main-flow/index.html).
 * Hero, reinforcement, CTA. Uses shared PublicNavigation/PublicFooter from layout.
 */
export function MainFlowLanding() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[100vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
        aria-label="Introduction"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(180deg, var(--color-sage-900) 0%, var(--color-sage-900) 50%, var(--color-sage-950) 100%)',
          }}
        />
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(203, 52, 55, 0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[42rem] mx-auto text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-scarlet-rush-400 mb-6">
            For movement leaders
          </p>
          <h1
            className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.15] tracking-tight text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Your content is powerful.
            <br />
            <span
              className="bg-gradient-to-r from-scarlet-rush-400 via-cyan-400 to-scarlet-rush-400 bg-[length:200%_auto] bg-clip-text text-transparent"
              style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              It just isn’t moving.
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-sage-300 max-w-[36rem] mx-auto mb-10">
            We help movement leaders make the work they’ve already created findable, owned, and
            part of a credibility network—so it can move.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Link
              href="/fit-check"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-7 text-base font-semibold text-white rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 shadow-[0_4px_14px_rgba(203,52,55,0.25)] hover:shadow-[0_6px_20px_rgba(203,52,55,0.35)] transition-all"
            >
              Take the Self-Screen
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-7 text-base font-semibold text-sage-300 rounded-full bg-transparent hover:text-white hover:bg-white/10 transition-colors"
            >
              Sign in
            </Link>
          </div>
          <p className="text-sm text-sage-400">
            One question, multiple choices—we’ll point you to the right next step.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none -z-10"
          style={{
            background: 'linear-gradient(to top, var(--color-sage-950), transparent)',
          }}
        />
      </section>

      {/* Reinforcement */}
      <section className="py-16 px-6 bg-sage-50 text-[#1a1a2e]" aria-label="Who this is for">
        <div className="max-w-[40rem] mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-[#1a1a2e]">This is for you if:</h2>
          <ul className="flex flex-col gap-4">
            {[
              'You lead within a movement and create content—teaching, writing, courses, talks.',
              'You have credibility in the room but your best work is hard to find online.',
              "You want what you've already created to do more, without becoming a full-time content strategist.",
              "You're open to being part of a small network of peers who vouch for and carry each other's work.",
            ].map((item, i) => (
              <li key={i} className="relative pl-6 text-base leading-relaxed text-[#334155]">
                <span className="absolute left-0 text-sage-500 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{
          background: 'linear-gradient(180deg, var(--color-sage-900) 0%, var(--color-sage-950) 100%)',
        }}
        aria-label="Get started"
      >
        <div className="max-w-[32rem] mx-auto">
          <h2 className="text-[1.75rem] font-bold text-white mb-2">
            See if Movemental is built for you
          </h2>
          <p className="text-base text-sage-300 mb-6">One short step—no commitment.</p>
          <Link
            href="/fit-check"
            className="inline-flex items-center justify-center gap-2 py-4 px-8 text-lg font-semibold text-white rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 shadow-[0_4px_14px_rgba(203,52,55,0.25)] transition-all"
          >
            Take the Self-Screen
            <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
          </Link>
        </div>
      </section>
    </>
  )
}
