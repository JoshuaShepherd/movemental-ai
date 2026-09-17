"use client";

import React from "react";
import Link from "next/link";
import { MovementalLogo } from "@/components/brand/movemental-logo";
import { LeaderBandV4 } from "./leader-band-v4";
import { LEADERS_V4 } from "@/v2/lib/leaders-v4";
import { FOUNDER_PROFILES } from "@/lib/founders/content";

const DOORS = [
  {
    label: "For Non-Profits",
    quote: "We don't have a policy, but our people are already using it on donor letters and grant applications.",
    note: "Start by naming what you will and won't do with AI, before a quiet leak or a grant rejection names it for you.",
    href: "/agent/nonprofits",
  },
  {
    label: "For Churches",
    quote: "Our pastors are using it for sermons and pastoral emails, and no one knows what is wise.",
    note: "Guard the sacred trust of preaching and pastoral care before adopting tools that dilute human presence.",
    href: "/agent/churches",
  },
  {
    label: "For Institutions",
    quote: "Our board wants to know if we have a stance, and our departments are all doing something different.",
    note: "One unified, board-ratified AI Safety Charter across your schools, networks, and leadership bodies.",
    href: "/agent/institutions",
  },
];

const STAGES = [
  {
    num: "01",
    title: "Safety",
    lead: "A ratified AI charter, data boundaries, and clear policy before anything goes live.",
    price: "Free with sign-in",
    detail:
      "Five plain documents your board can read and ratify. Establishes data boundaries, acceptable use, disclosure policy, and emergency escalation paths.",
    deliverable: "Board-ratified AI Safety Charter",
    href: "/agent/path/safety",
    cta: "View Safety Stage →",
  },
  {
    num: "02",
    title: "Sandbox",
    lead: "A private, safe environment for your staff to test without exposing organizational data.",
    price: "$4,500 / org",
    detail:
      "Zero-retention infrastructure, custom organizational system prompts, and structured testing protocols so teams experiment with confidence.",
    deliverable: "Private Sandbox Environment & Testing Log",
    href: "/program",
    cta: "Explore Sandbox Stage →",
  },
  {
    num: "03",
    title: "Training",
    lead: "Formation, prompt literacy, and theological discernment for your whole staff.",
    price: "$3,500 / cohort",
    detail:
      "A four-week guided cohort combining theological reflection, hands-on prompting mastery, and practical workflow redesign.",
    deliverable: "Staff Readiness Certification & Playbooks",
    href: "/program",
    cta: "Explore Training Stage →",
  },
  {
    num: "04",
    title: "Tech",
    lead: "Domain models and automated agents grounded in your verified corpus.",
    price: "Custom / Network",
    detail:
      "Production AI systems and verified RAG pipelines tailored to your theological framework, ministry scope, or institutional knowledge base.",
    deliverable: "Production Architecture & Maintenance Agreement",
    href: "/program",
    cta: "Explore Tech Stage →",
  },
];

const BEATS = [
  {
    tag: "SAFETY 01",
    q: "Is AI already in use across your organization without written policy?",
  },
  {
    tag: "SANDBOX 02",
    q: "Do you have a contained environment for testing before public release?",
  },
  {
    tag: "TRAINING 03",
    q: "Has your staff been formed in what AI can and cannot do faithfully?",
  },
  {
    tag: "TECH 04",
    q: "Are your models grounded in verified organizational knowledge?",
  },
  {
    tag: "REFUSALS 05",
    q: "Have you named what you will never allow an AI to do?",
  },
  {
    tag: "RATIFICATION 06",
    q: "Has your board signed and ratified your AI Safety Charter?",
  },
];

const FOUNDERS = [
  {
    name: "Alan Hirsch",
    cred: "Co-Founder & Chief Movement Officer",
    portrait: FOUNDER_PROFILES["alan-hirsch"].portrait,
    slug: "/about/alan-hirsch",
  },
  {
    name: "Brad Brisco",
    cred: "Co-Founder & CEO",
    portrait: FOUNDER_PROFILES["brad-brisco"].portrait,
    slug: "/about/brad-brisco",
  },
  {
    name: "Josh Shepherd",
    cred: "Founder & Architect",
    portrait: FOUNDER_PROFILES["josh-shepherd"].portrait,
    slug: "/about/josh-shepherd",
  },
];

export function HomeV4Content() {
  return (
    <div className="min-h-screen bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)]">
      {/* Sticky Header / Mast */}
      <header className="sticky top-0 z-40 grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)]/90 px-4 py-2 backdrop-blur-md sm:px-8">
        <Link href="/" className="flex items-center">
          <MovementalLogo className="h-8 w-auto text-[var(--color-ink-band-ink)]" />
        </Link>
        <nav className="hidden md:flex items-center justify-center gap-4 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
          <Link href="/agent/nonprofits" className="hover:text-[var(--color-ink-band-ink)]">
            Non-profits
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/agent/churches" className="hover:text-[var(--color-ink-band-ink)]">
            Churches
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/agent/institutions" className="hover:text-[var(--color-ink-band-ink)]">
            Institutions
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/agent/path/safety" className="hover:text-[var(--color-ink-band-ink)]">
            The path
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/program" className="hover:text-[var(--color-ink-band-ink)]">
            Pricing
          </Link>
          <span className="opacity-40">·</span>
          <Link href="/voices" className="hover:text-[var(--color-ink-band-ink)]">
            Voices
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/assess"
            className="rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink)] transition hover:border-[var(--color-ink-band-ink)]"
          >
            Map where we stand
          </Link>
          <Link
            href="/login"
            className="rounded-full p-2 text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
            aria-label="Log in"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="top"
        className="relative border-b border-[var(--color-ink-band-border)] bg-[radial-gradient(120%_80%_at_18%_0%,var(--color-ink-band-paper)_0%,var(--color-ink-band-bg)_74%)] pt-12 sm:pt-16"
      >
        <div className="mx-auto max-w-[1180px] px-6 sm:px-10 pb-12 sm:pb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            Non-profit · Church · Institution
          </p>

          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-[var(--color-ink-band-ink)] sm:text-5xl lg:text-6xl max-w-4xl">
            Navigate AI without eroding the trust you spent decades building.
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--color-ink-band-ink-muted)]">
              Your people are already using it — on emails, donor letters, grant applications,
              sermons — usually with no policy and no one deciding what&rsquo;s wise. The thing most
              at risk isn&rsquo;t the technology. It&rsquo;s{" "}
              <span className="relative inline-block whitespace-nowrap font-medium text-[var(--color-ink-band-ink)]">
                the trust your work depends on
                <svg
                  viewBox="0 0 340 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1.5 w-full h-2.5 overflow-visible pointer-events-none text-[var(--color-ink-band-blue)]"
                >
                  <path
                    d="M2 7 C 60 2, 120 10, 180 5 S 300 3, 338 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </p>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/assess"
                  className="relative isolate inline-flex items-center px-5 py-2.5 font-serif text-lg font-semibold text-[var(--color-ink-band-ink)] transition hover:opacity-90"
                >
                  <span
                    className="absolute inset-y-0.5 inset-x-0 -z-10 bg-[var(--color-ink-band-highlight)] mix-blend-multiply rounded-[6px_9px_7px_8px/9px_6px_8px_7px] -rotate-1 pointer-events-none"
                    aria-hidden="true"
                  />
                  Map where we actually stand
                </Link>
                <Link
                  href="#path"
                  className="rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-5 py-2.5 text-sm font-medium text-[var(--color-ink-band-ink)] transition hover:border-[var(--color-ink-band-ink)]"
                >
                  See the whole path
                </Link>
              </div>
              <p
                style={{ fontFamily: "var(--font-ink-hand)" }}
                className="text-2xl text-[var(--color-ink-band-blue)]"
              >
                Six honest questions. No wrong answers.
              </p>
            </div>
          </div>
        </div>

        {/* The 25 Movement Leaders Band */}
        <LeaderBandV4 />
      </section>

      {/* Dark Callout Section */}
      <section className="bg-[var(--color-ink-band-hero-dark)] text-[var(--color-ink-band-hero-ink)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <h2 className="font-serif text-2xl font-medium sm:text-4xl text-white max-w-2xl">
            AI is already inside your organization. The work now is to get it right.
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-highlight)]">
                It is already in use
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--color-ink-band-hero-ink)]/90">
                Across your staff — on donor records, member information, and the pastoral and
                personal things people trusted you with.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-highlight)]">
                No one has decided
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--color-ink-band-hero-ink)]/90">
                Not on paper. The day that surfaces — in a board meeting, a news story, or a quiet
                complaint — the trust you spent decades earning is what pays for it.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-highlight)]">
                It is one decision
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[var(--color-ink-band-hero-ink)]/90">
                Not a tooling problem, and not solved by being careful. Experimenting, training your
                people, building anything — all of it waits on this.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three Doors Section */}
      <section id="doors" className="border-b border-[var(--color-ink-band-border)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              Where would you like to start?
            </h2>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Three doors · one path
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DOORS.map((door) => (
              <article
                key={door.label}
                className="flex flex-col justify-between rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-6 sm:p-8 shadow-sm"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                    {door.label}
                  </p>
                  <p className="mt-3 font-serif text-xl sm:text-2xl font-normal leading-snug text-[var(--color-ink-band-ink)]">
                    &ldquo;{door.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm text-[var(--color-ink-band-ink-muted)] leading-relaxed">
                    {door.note}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-[var(--color-ink-band-border)]">
                  <Link
                    href={door.href}
                    className="inline-block rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] transition hover:border-[var(--color-ink-band-blue)]"
                  >
                    Start here →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The Path in Four Stages (Expandable Details Accordion) */}
      <section
        id="path"
        className="border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
                The path
              </p>
              <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-medium">
                One ordered path. It starts with Safety.
              </h2>
            </div>
            <p className="max-w-xl text-sm sm:text-base leading-relaxed text-[var(--color-ink-band-ink-muted)]">
              The order is not arbitrary. Safety first, because AI is already in the room. Sandbox
              before Training before Tech. Handing powerful tools to people who cannot yet steward
              them is replacement, not progress.
            </p>
          </div>

          <div className="mt-12 border-t border-[var(--color-ink-band-border)]">
            {STAGES.map((stage) => (
              <details
                key={stage.num}
                className="group border-b border-[var(--color-ink-band-border)] transition"
              >
                <summary className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 sm:gap-6 py-5 sm:py-6 cursor-pointer list-none select-none">
                  <span className="font-serif text-2xl font-normal text-[var(--color-ink-band-margin-red)]">
                    {stage.num}
                  </span>
                  <div>
                    <span className="block font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--color-ink-band-ink)]">
                      {stage.title}
                    </span>
                    <span className="block mt-1 text-sm sm:text-base text-[var(--color-ink-band-ink-muted)] leading-relaxed max-w-2xl">
                      {stage.lead}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <span className="hidden sm:inline-block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                      {stage.price}
                    </span>
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] text-base font-normal text-[var(--color-ink-band-ink)] transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </div>
                </summary>
                <div className="grid grid-cols-[3rem_1fr] gap-4 sm:gap-6 pb-6 pt-1">
                  <span />
                  <div className="border-l-2 border-[var(--color-ink-band-margin-red)] pl-4 max-w-2xl space-y-3">
                    <p className="text-sm leading-relaxed text-[var(--color-ink-band-ink)]">
                      {stage.detail}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                        Deliverable · {stage.deliverable}
                      </p>
                      <Link
                        href={stage.href}
                        className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] hover:underline"
                      >
                        {stage.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <p className="mt-6 text-sm italic text-[var(--color-ink-band-ink-muted)]">
            Each step earns the next. Skip one and the ones after it have nothing to stand on.
          </p>
        </div>
      </section>

      {/* Organizational Reality Map Section */}
      <section id="map" className="border-b border-[var(--color-ink-band-border)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_26rem] items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Organizational Reality Map
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-4xl font-medium max-w-xl">
              Six honest questions, then we mirror you back.
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--color-ink-band-ink-muted)] max-w-xl">
              No score, no lead form, no grade. You answer six questions about what is actually true
              in your organization; the concierge names your sharpest gaps across the four stages and
              where to start.
            </p>
            <div className="mt-8 flex flex-col gap-2">
              <Link
                href="/assess"
                className="relative isolate inline-flex items-center self-start px-5 py-2.5 font-serif text-lg font-semibold text-[var(--color-ink-band-ink)] transition hover:opacity-90"
              >
                <span
                  className="absolute inset-y-0.5 inset-x-0 -z-10 bg-[var(--color-ink-band-highlight)] mix-blend-multiply rounded-[6px_9px_7px_8px/9px_6px_8px_7px] -rotate-1 pointer-events-none"
                  aria-hidden="true"
                />
                Start the map
              </Link>
              <p
                style={{ fontFamily: "var(--font-ink-hand)" }}
                className="text-2xl text-[var(--color-ink-band-blue)]"
              >
                It takes about four minutes.
              </p>
            </div>
          </div>

          {/* Sample 6 Beats Notebook Card */}
          <ol className="rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-6 sm:p-7 shadow-sm space-y-4 list-none">
            {BEATS.map((beat) => (
              <li
                key={beat.tag}
                className="grid grid-cols-[5.5rem_1fr] items-baseline gap-3 border-b border-[var(--color-ink-band-border)] pb-3 last:border-b-0 last:pb-0"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-band-margin-red)]">
                  {beat.tag}
                </span>
                <span className="font-serif text-sm sm:text-base leading-snug text-[var(--color-ink-band-ink)]">
                  {beat.q}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Voices & Behind Movemental */}
      <section
        id="voices"
        className="border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl sm:text-4xl font-medium">Trusted voices</h2>
              <p className="mt-1 text-sm text-[var(--color-ink-band-ink-muted)] max-w-xl">
                Movement leaders who shape how organizations steward AI with theological and mission integrity.
              </p>
            </div>
            <Link
              href="/voices"
              className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] hover:underline"
            >
              See all voices →
            </Link>
          </div>

          {/* 25 Leaders Grid */}
          <div className="mt-8 grid grid-cols-5 gap-3 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-[repeat(25,minmax(0,1fr))]">
            {LEADERS_V4.map((leader) => (
              <Link
                key={leader.name}
                href="/voices"
                title={leader.name}
                className="group relative block aspect-square rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-0.5 transition-all hover:scale-110 hover:border-[var(--color-ink-band-ink)] hover:shadow-md"
              >
                <div
                  className="h-full w-full rounded-full bg-cover bg-top grayscale contrast-105 transition-all group-hover:grayscale-0"
                  style={{ backgroundImage: `url('${leader.fullImageUrl}')` }}
                  role="img"
                  aria-label={leader.name}
                />
              </Link>
            ))}
          </div>

          {/* Who's behind Movemental */}
          <div className="mt-16 pt-10 border-t border-[var(--color-ink-band-border)]">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Who&rsquo;s behind Movemental
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {FOUNDERS.map((founder) => (
                <Link
                  key={founder.name}
                  href={founder.slug}
                  className="group flex items-center gap-4 rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-4 transition hover:border-[var(--color-ink-band-ink)]"
                >
                  <div
                    className="h-14 w-14 shrink-0 rounded-full border border-[var(--color-ink-band-border)] bg-cover bg-top grayscale contrast-105 transition-all group-hover:grayscale-0"
                    style={{ backgroundImage: `url('${founder.portrait}')` }}
                    role="img"
                    aria-label={founder.name}
                  />
                  <div>
                    <p className="font-serif text-base font-semibold text-[var(--color-ink-band-ink)] group-hover:text-[var(--color-ink-band-blue)]">
                      {founder.name}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                      {founder.cred}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <p
              style={{ fontFamily: "var(--font-ink-hand)" }}
              className="mt-6 text-xl text-[var(--color-ink-band-blue)]"
            >
              Movemental took shape in 2026, out of a two-year conversation among Alan, Brad, and Josh.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section id="pricing" className="border-b border-[var(--color-ink-band-border)] py-16 sm:py-20">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium">
              Every stage has a free route.
            </h2>
            <Link
              href="/program"
              className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] hover:underline"
            >
              See full program & pricing →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                Reality Check
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold">Free</p>
              <p className="mt-2 text-xs text-[var(--color-ink-band-ink-muted)] leading-relaxed">
                Instant assessment across 6 organizational beats. Self-serve diagnostic with executive readback.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-paper)] p-6 ring-2 ring-[var(--color-ink-band-blue)]/20">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)]">
                Safety Sprint
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold">$1,000 flat</p>
              <p className="mt-2 text-xs text-[var(--color-ink-band-ink-muted)] leading-relaxed">
                A focused sprint with Josh Shepherd and the Movemental team to draft and ratify your organization&rsquo;s five-layer AI Safety Charter.
              </p>
            </div>

            <div className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                Scenius Cohort
              </p>
              <p className="mt-2 font-serif text-2xl font-semibold">Custom / Network</p>
              <p className="mt-2 text-xs text-[var(--color-ink-band-ink-muted)] leading-relaxed">
                For denominational networks and institutional cohorts embarking on collective discernment and deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)] py-12">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                The Path
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[var(--color-ink-band-ink)]">
                <Link href="/agent/path/safety">Safety</Link>
                <Link href="/assess">Map your reality</Link>
                <Link href="/program">Program & Pricing</Link>
                <Link href="/enroll">Enroll</Link>
                <Link href="/dashboard">Dashboard</Link>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                Read
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[var(--color-ink-band-ink)]">
                <Link href="/field-guide">Field Guide</Link>
                <Link href="/articles">Articles</Link>
                <Link href="/research">Research</Link>
                <Link href="/research/findings">Findings & Sources</Link>
                <Link href="/footnotes">Footnotes</Link>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                For You
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[var(--color-ink-band-ink)]">
                <Link href="/agent/churches">Churches</Link>
                <Link href="/agent/nonprofits">Non-profits</Link>
                <Link href="/agent/institutions">Institutions</Link>
                <Link href="/agent/churches/deck">Decks</Link>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                Movemental
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[var(--color-ink-band-ink)]">
                <Link href="/about">Founders</Link>
                <Link href="/voices">Voices</Link>
                <Link href="/agent/how-we-use-ai">How We Use AI</Link>
                <Link href="/login">Log In</Link>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                Legal
              </p>
              <div className="mt-3 flex flex-col gap-2 text-xs text-[var(--color-ink-band-ink)]">
                <Link href="/privacy">Privacy</Link>
                <Link href="/cookies">Cookies</Link>
                <Link href="/terms">Terms</Link>
                <Link href="/newsletter/confirm">Newsletter</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between border-t border-[var(--color-ink-band-border)] pt-6 text-xs text-[var(--color-ink-band-ink-muted)]">
            <p>© {new Date().getFullYear()} Movemental. All rights reserved.</p>
            <Link href="/footnotes" className="hover:underline">
              E-E-A-T Citation Registry (40 claims verified)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
