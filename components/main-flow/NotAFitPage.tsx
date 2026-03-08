'use client'

import Link from 'next/link'
import { ArrowRight, Users, BookOpen } from 'lucide-react'

export type NotAFitVariant = 'affinity' | 'content'

const AFFINITY = {
  title: "You're in the right neighborhood.",
  body: [
    <>
      We're <strong>focused</strong> on movement leaders and creators first—the people who will run
      the platforms (like Alan Hirsch, Brad Brisco, and others in the network). You're the kind of
      person those platforms are <em>for</em>: readers, learners, and the people movement content is
      meant to form. We're not ready to send you to a specific leader's site yet—we're building
      that.
    </>,
    <>For now, you can stay close and get notified when we're there:</>,
  ],
  primaryCta: { label: 'Explore the book', href: '/learn' },
  secondaryLinks: [
    { label: 'About us', href: '/about' },
    { label: "Why we're focused this way", href: '/why-movemental' },
  ],
  tertiaryLink: { label: 'Notify me when leader platforms are live', href: '/contact' },
  focusTitle: "Why we're focused",
  focusBody:
    "Movemental is focused on a small number of movement leaders first so we can build a real credibility network—one where content is discoverable through people who already trust each other—instead of another broad platform. That only works if we stay narrow at the start. When those leaders' platforms are live, you'll be the kind of person we want there.",
  icon: Users,
}

const CONTENT = {
  title: "You create content—we're just not in the same niche yet.",
  body: [
    <>
      Right now we're <strong>focused</strong> on movement leaders and mDNA-aligned
      creators—people whose content and practice are rooted in apostolic movement. You're clearly a
      content creator (and maybe doing similar work with digital and AI); we're just not set up to
      serve you well yet. We'd rather point you to something useful than overpromise.
    </>,
    <>We're glad you're here. Here's how you can learn from us where you are:</>,
  ],
  primaryCta: { label: 'Get the AI book', href: '/book' },
  secondaryLinks: [
    { label: "Why we're focused on 100 movement leaders first", href: '/why-movemental' },
  ],
  tertiaryLink: { label: 'Notify me when the playbook for content + AI is ready', href: '/contact' },
  focusTitle: "Why we're focused",
  focusBody:
    "Movemental is focused on a small number of movement leaders first so we can build a real credibility network—one where content is discoverable through people who already trust each other—instead of another broad platform. That only works if we stay narrow at the start. We're exploring a playbook and tools for creators like you later.",
  icon: BookOpen,
}

interface NotAFitPageProps {
  variant: NotAFitVariant
}

/**
 * Not-a-fit graceful redirect page (from html/main-flow/not-a-fit-affinity.html and not-a-fit-content.html).
 * Shared layout; copy and CTAs vary by variant.
 */
export function NotAFitPage({ variant }: NotAFitPageProps) {
  const data = variant === 'affinity' ? AFFINITY : CONTENT
  const Icon = data.icon

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sage-100 via-sage-50 to-white">
      <header className="shrink-0 py-4 px-6 border-b border-sage-200 bg-white/80 backdrop-blur-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-bold text-lg tracking-tight text-sage-900 hover:opacity-85 transition-opacity"
          >
            Movemental
          </Link>
          <Link
            href="/fit-check"
            className="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors"
          >
            Back to Self-Screen
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-10 px-6">
        <div className="max-w-[32rem] mx-auto text-center">
          <div
            className="w-[4.5rem] h-[4.5rem] mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-sage-500/15 to-sage-600/10"
            aria-hidden
          >
            <Icon className="w-9 h-9 text-sage-600" />
          </div>
          <h1
            className="text-[1.75rem] font-bold leading-tight text-[#1a1a2e] mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {data.title}
          </h1>
          {data.body.map((paragraph, i) => (
            <p key={i} className="text-[1.0625rem] leading-relaxed text-[#475569] mb-6">
              {paragraph}
            </p>
          ))}

          <div className="flex flex-col items-center gap-3 mb-6">
            <Link
              href={data.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 min-w-[14rem] py-4 px-6 text-lg font-semibold text-white rounded-full bg-scarlet-rush-500 hover:bg-scarlet-rush-600 transition-colors"
            >
              {data.primaryCta.label}
              <ArrowRight className="w-5 h-5 shrink-0" aria-hidden />
            </Link>
          </div>
          <p className="text-[0.9375rem] mb-4">
            {data.secondaryLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 && ' · '}
                <Link
                  href={link.href}
                  className="text-sage-600 font-medium underline underline-offset-2 hover:text-sage-800"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <Link
              href={data.tertiaryLink.href}
              className="text-sm text-sage-600 hover:text-sage-800 transition-colors"
            >
              {data.tertiaryLink.label}
            </Link>
          </div>

          <div className="mt-8 p-5 bg-white/70 border border-sage-200 rounded-lg text-left">
            <p className="text-xs font-semibold tracking-wide uppercase text-sage-600 mb-2">
              {data.focusTitle}
            </p>
            <p className="text-[0.9375rem] leading-snug text-[#475569] m-0">
              {data.focusBody}
            </p>
          </div>
        </div>
      </main>

      <footer className="shrink-0 py-4 px-6 border-t border-sage-200 bg-white text-center">
        <Link
          href="/"
          className="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors"
        >
          Back to home
        </Link>
      </footer>
    </div>
  )
}
