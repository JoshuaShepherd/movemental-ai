"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MovementalLogo } from "@/components/brand/movemental-logo";
import {
  PRICING_SAFETY_FREE,
  PRICING_SAFETY_PAID,
  PRICING_SANDBOX_FREE,
  PRICING_SANDBOX_DIGITAL,
  PRICING_TRAINING_FREE,
  PRICING_TRAINING_PAID,
  PRICING_TECH_FREE,
} from "@/lib/agent-room/data/pricing";

interface StageAccordionItem {
  id: string;
  step: string;
  title: string;
  descriptor: string;
  priceLine: string;
  freeOption: typeof PRICING_SAFETY_FREE;
  paidOption?: typeof PRICING_SAFETY_PAID;
}

const STAGES: StageAccordionItem[] = [
  {
    id: "stage-safety",
    step: "01",
    title: "Safety",
    descriptor: "Write and ratify your five-layer AI Safety Charter",
    priceLine: "Free or $1,000 sprint",
    freeOption: PRICING_SAFETY_FREE,
    paidOption: PRICING_SAFETY_PAID,
  },
  {
    id: "stage-sandbox",
    step: "02",
    title: "Sandbox",
    descriptor: "Contained experimentation on actual organizational workflows",
    priceLine: "Free or $5,000 license",
    freeOption: PRICING_SANDBOX_FREE,
    paidOption: PRICING_SANDBOX_DIGITAL,
  },
  {
    id: "stage-training",
    step: "03",
    title: "Training",
    descriptor: "Staff discernment, authorship principles, and prompt literacy",
    priceLine: "Free or cohort license",
    freeOption: PRICING_TRAINING_FREE,
    paidOption: PRICING_TRAINING_PAID,
  },
  {
    id: "stage-tech",
    step: "04",
    title: "Tech",
    descriptor: "Specialized models, RAG on verified corpus, and secure hosting",
    priceLine: "Free or modular builds",
    freeOption: PRICING_TECH_FREE,
  },
];

const REFUSALS = [
  {
    title: "No urgency",
    desc: "We don't use countdown timers, limited-time discounts, or 'spots filling fast.' Take your time.",
  },
  {
    title: "Prices are public",
    desc: "Flat and the same for a 500-person church and a 50,000-member denomination. Nothing is negotiated.",
  },
  {
    title: "The concierge says no",
    desc: "If a question is outside where your organization stands, our guidance says so and hands you to a person.",
  },
];

export function ProgramPageContent() {
  const [openStage, setOpenStage] = useState<string>("stage-safety");

  return (
    <div className="min-h-screen bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-[3.6rem] items-center justify-between border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)]/90 px-4 backdrop-blur-md sm:px-8">
        <Link href="/" className="flex items-center">
          <MovementalLogo className="h-8 w-auto text-[var(--color-ink-band-ink)]" />
        </Link>
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
        >
          ↑ Home
        </Link>
      </header>

      <main className="mx-auto max-w-4xl px-6 pt-12 sm:px-10 sm:pt-16">
        {/* Hero Section */}
        <section className="relative pl-6 sm:pl-8">
          <span
            className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
            aria-hidden="true"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-blue)] font-semibold">
            The Path
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-5xl leading-tight text-[var(--color-ink-band-ink)]">
            Four stages, in order. Every price public.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-band-ink-muted)] leading-relaxed max-w-2xl">
            The same figure for a 500-person church and a 50,000-member denomination. Nothing here is negotiated, and nothing here is quoted after a call.
          </p>

          <div className="mt-4">
            <p className="font-serif italic text-lg text-[var(--color-ink-band-blue)]">
              &ldquo;Each step earns the next.&rdquo;
            </p>
          </div>
        </section>

        {/* The Rail: Order is the Product */}
        <section className="mt-12 rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            The order is the product
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STAGES.map((s) => (
              <div key={s.id} className="rounded-lg bg-[var(--color-ink-band-paper)] p-3 border border-[var(--color-ink-band-border)]">
                <span className="font-mono text-xs text-[var(--color-ink-band-blue)] font-semibold">{s.step}</span>
                <p className="font-serif text-sm font-semibold mt-1">{s.title}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-[var(--color-ink-band-ink-muted)] leading-relaxed">
            Attempting tech before safety opens you to data breaches. Changing the order collapses the required human formation.
          </p>
        </section>

        {/* Accordion Stages Grid */}
        <section className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            Every route, every figure
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {STAGES.map((stage) => {
              const isOpen = openStage === stage.id;
              return (
                <div
                  key={stage.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? "border-[var(--color-ink-band-ink)] bg-[var(--color-ink-band-paper)] shadow-md"
                      : "border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] hover:border-[var(--color-ink-band-ink)]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenStage(isOpen ? "" : stage.id)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-semibold text-[var(--color-ink-band-blue)]">
                        {stage.step}
                      </span>
                      <div>
                        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[var(--color-ink-band-ink)]">
                          {stage.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-[var(--color-ink-band-ink-muted)] mt-1">
                          {stage.descriptor}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs uppercase text-[var(--color-ink-band-ink)] whitespace-nowrap ml-4">
                      {stage.priceLine}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="grid grid-cols-1 gap-6 border-t border-[var(--color-ink-band-border)] p-6 sm:grid-cols-2">
                      {/* Free / Self-Serve Route */}
                      <div className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-5 flex flex-col justify-between">
                        <div>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                            Self-Serve Route
                          </span>
                          <h3 className="font-serif text-lg font-semibold mt-1">{stage.freeOption.title}</h3>
                          <p className="font-mono text-xs text-[var(--color-ink-band-blue)] mt-1">{stage.freeOption.price}</p>
                          <p className="text-xs text-[var(--color-ink-band-ink-muted)] mt-3 leading-relaxed">
                            {stage.freeOption.descriptionPlain ||
                              `${stage.freeOption.descriptionBefore || ""}${stage.freeOption.descriptionEmphasis || ""}${stage.freeOption.descriptionAfter || ""}`}
                          </p>
                        </div>
                        <div className="mt-6">
                          <Link
                            href="/field-guide"
                            className="inline-block rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-4 py-2 text-xs font-medium text-[var(--color-ink-band-ink)] hover:border-[var(--color-ink-band-ink)]"
                          >
                            {stage.freeOption.ctaLabel}
                          </Link>
                        </div>
                      </div>

                      {/* Paid / Sprint Route */}
                      {stage.paidOption ? (
                        <div className="rounded-xl border border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-paper)] p-5 ring-1 ring-[var(--color-ink-band-blue)] flex flex-col justify-between">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-ink-band-blue)] font-semibold">
                              Done With Movemental
                            </span>
                            <h3 className="font-serif text-lg font-semibold mt-1">{stage.paidOption.title}</h3>
                            <p className="font-mono text-xs text-[var(--color-ink-band-blue)] mt-1">{stage.paidOption.price}</p>
                            <p className="text-xs text-[var(--color-ink-band-ink-muted)] mt-3 leading-relaxed">
                              {stage.paidOption.descriptionPlain}
                            </p>
                          </div>
                          <div className="mt-6">
                            <Link
                              href="/enroll"
                              className="inline-block rounded-full bg-[var(--color-ink-band-blue)] px-5 py-2 text-xs font-medium text-white hover:opacity-90"
                            >
                              {stage.paidOption.ctaLabel}
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-[var(--color-ink-band-border)] p-5 flex items-center justify-center">
                          <p className="font-mono text-xs uppercase text-[var(--color-ink-band-ink-muted)]">
                            Modular technical builds quoted per deployment
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Refusals Section */}
        <section className="mt-16 rounded-2xl border border-[var(--color-ink-band-ink)] bg-[var(--color-ink-band-paper)] p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            What this pricing refuses
          </p>
          <h2 className="mt-2 font-serif text-xl sm:text-2xl font-medium">
            No urgency. No scarcity. No spots filling fast.
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {REFUSALS.map((r, i) => (
              <div key={i} className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-4">
                <h3 className="font-serif text-sm font-semibold">{r.title}</h3>
                <p className="text-xs text-[var(--color-ink-band-ink-muted)] mt-1.5 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
