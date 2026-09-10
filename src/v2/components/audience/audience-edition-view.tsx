"use client";

import React from "react";
import Link from "next/link";
import { MovementalLogo } from "@/components/brand/movemental-logo";

export type AudienceType = "churches" | "nonprofits" | "institutions";

interface AudienceConfig {
  eyebrow: string;
  title: string;
  subhead: string;
  problemTitle: string;
  problems: { title: string; desc: string }[];
  solutionTitle: string;
  solutionDesc: string;
  deckSlug: string;
}

const AUDIENCE_CONFIGS: Record<AudienceType, AudienceConfig> = {
  churches: {
    eyebrow: "FOR CHURCHES & MINISTRIES",
    title: "Shepherd your church through the AI transition with theological integrity.",
    subhead: "AI tools are already being used for sermons, counseling notes, and administration. The question is how to guard sacred trust and human presence.",
    problemTitle: "The Four Pressures Facing Church Leadership",
    problems: [
      { title: "Sermon Authenticity", desc: "Congregations expect preaching that flows from pastoral prayer and spiritual formation, not unverified model generation." },
      { title: "Pastoral Confidentiality", desc: "Pastors handling counseling notes or prayer requests must ensure private data is never leaked to public AI training pools." },
      { title: "Volunteer Confusion", desc: "Staff and ministry volunteers adopt ad-hoc tools with zero policy, creating unmanaged exposure." },
      { title: "Board Uncertainty", desc: "Elders and boards want safety and discernment before approving technological initiatives." },
    ],
    solutionTitle: "The Movemental Church Safety Framework",
    solutionDesc: "Five plain layers ratified by your board. A clear boundary between administrative leverage and non-negotiable human pastoral ministry.",
    deckSlug: "churches",
  },
  nonprofits: {
    eyebrow: "FOR NON-PROFIT ORGANIZATIONS",
    title: "Protect donor trust and mission focus while navigating AI adoption.",
    subhead: "Non-profit staff are using AI for grant writing, donor appeals, and client case notes. You need clear governance to protect confidential records.",
    problemTitle: "The Four Vulnerabilities in Non-Profit Operations",
    problems: [
      { title: "Donor Data Exposure", desc: "Entering donor histories, giving patterns, and private correspondence into public LLMs violates stewardship." },
      { title: "Grant Credibility", desc: "Funders are using AI detection and demanding disclosures. Fabricated citations in applications destroy reputation." },
      { title: "Staff Shadow Usage", desc: "Teams experiment quietly because there is no official policy, creating compliance and security blindspots." },
      { title: "Resource Constraints", desc: "Non-profits cannot afford expensive corporate AI consultancies to write customized legal policies." },
    ],
    solutionTitle: "The Non-Profit Safety Sprint",
    solutionDesc: "A $1,000 flat sprint to audit existing tool use, establish data boundaries, and ratify an organizational AI charter in two weeks.",
    deckSlug: "nonprofits",
  },
  institutions: {
    eyebrow: "FOR SEMINARIES, COLLEGES & DENOMINATIONS",
    title: "Lead institutional discernment and institutional policy across your network.",
    subhead: "Theological seminaries, universities, and denominational networks face systemic challenges to formation, academic integrity, and organizational leadership.",
    problemTitle: "The Institutional Dilemma",
    problems: [
      { title: "Pedagogical & Formation Integrity", desc: "How do educators assess genuine intellectual and spiritual formation when models can generate competent academic prose?" },
      { title: "Denominational Cohesion", desc: "Member congregations look to institutional leadership for theological clarity and ethical guidance on AI." },
      { title: "Policy Fragmentation", desc: "Departments adopting divergent policies create student confusion and legal vulnerability." },
      { title: "Curricular Readiness", desc: "Preparing the next generation of leaders requires integrating AI literacy into leadership development." },
    ],
    solutionTitle: "The Movemental Institutional Cohort",
    solutionDesc: "Collaborative discernment, shared sandbox testing, and institutional charter ratification for leadership bodies.",
    deckSlug: "institutions",
  },
};

export function AudienceEditionView({ audience }: { audience: AudienceType }) {
  const config = AUDIENCE_CONFIGS[audience];

  return (
    <div className="min-h-screen bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-[3.6rem] items-center justify-between border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)]/90 px-4 backdrop-blur-md sm:px-8">
        <Link href="/" className="flex items-center">
          <MovementalLogo className="h-8 w-auto text-[var(--color-ink-band-ink)]" />
        </Link>

        {/* Audience Switcher Pills */}
        <div className="flex items-center gap-1 rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-1">
          <Link
            href="/agent/nonprofits"
            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
              audience === "nonprofits"
                ? "bg-[var(--color-ink-band-blue)] text-white shadow-sm"
                : "text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
            }`}
          >
            Non-profits
          </Link>
          <Link
            href="/agent/churches"
            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
              audience === "churches"
                ? "bg-[var(--color-ink-band-blue)] text-white shadow-sm"
                : "text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
            }`}
          >
            Churches
          </Link>
          <Link
            href="/agent/institutions"
            className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
              audience === "institutions"
                ? "bg-[var(--color-ink-band-blue)] text-white shadow-sm"
                : "text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
            }`}
          >
            Institutions
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <article className="mx-auto max-w-4xl px-6 pt-12 sm:px-10 sm:pt-16">
        <div className="relative pl-6 sm:pl-8">
          <span
            className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
            aria-hidden="true"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-blue)] font-semibold">
            {config.eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-5xl leading-tight text-[var(--color-ink-band-ink)]">
            {config.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-band-ink-muted)] leading-relaxed">
            {config.subhead}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/assess"
              className="rounded-full bg-[var(--color-ink-band-ink)] px-6 py-3 text-sm font-medium text-white shadow hover:opacity-90"
            >
              Start Free Reality Check
            </Link>
            <Link
              href={`/agent/${config.deckSlug}/deck`}
              className="rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-6 py-3 text-sm font-medium text-[var(--color-ink-band-ink)] hover:border-[var(--color-ink-band-ink)]"
            >
              View Executive Deck →
            </Link>
          </div>
        </div>

        {/* Problems Grid */}
        <section className="mt-16 border-t border-[var(--color-ink-band-border)] pt-12">
          <h2 className="font-serif text-2xl font-medium sm:text-3xl text-[var(--color-ink-band-ink)]">
            {config.problemTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {config.problems.map((prob, i) => (
              <div
                key={i}
                className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-6 shadow-sm"
              >
                <h3 className="font-serif text-lg font-semibold text-[var(--color-ink-band-ink)]">
                  {prob.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-ink-band-ink-muted)]">
                  {prob.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Solution Callout */}
        <section className="mt-12 rounded-2xl border border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-paper)] p-8 ring-2 ring-[var(--color-ink-band-blue)]/20">
          <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] font-semibold">
            The Movemental Response
          </p>
          <h2 className="mt-2 font-serif text-2xl font-semibold">
            {config.solutionTitle}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink-band-ink-muted)]">
            {config.solutionDesc}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/agent/path/safety"
              className="rounded-full bg-[var(--color-ink-band-blue)] px-5 py-2.5 text-xs font-medium text-white hover:opacity-90"
            >
              Explore The Safety Charter
            </Link>
            <Link
              href="/enroll"
              className="rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] px-5 py-2.5 text-xs font-medium text-[var(--color-ink-band-ink)] hover:bg-[var(--color-ink-band-paper)]"
            >
              Enroll in Sprint ($1,000)
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
