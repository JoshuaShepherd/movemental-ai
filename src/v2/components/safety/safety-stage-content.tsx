"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  SAFETY_READBACK_COPY,
  SAFETY_CHARTER_DOCUMENTS,
  SAFETY_DOORS,
} from "@/lib/agent-room/data/safety-charter";
import { MovementalLogo } from "@/components/brand/movemental-logo";

const PATH_STAGES = [
  { n: "01", title: "Safety", gloss: "Governance & Charter", here: true },
  { n: "02", title: "Sandbox", gloss: "Contained Experimentation", dim: true },
  { n: "03", title: "Training", gloss: "Staff Formation", dim: true },
  { n: "04", title: "Tech", gloss: "System Architecture", dim: true },
];

export function SafetyStageContent() {
  const [openDoc, setOpenDoc] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)]">
      {/* Sticky Header / Mast */}
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

      {/* Hero Section */}
      <section className="border-b border-[var(--color-ink-band-border)] bg-[radial-gradient(120%_70%_at_50%_0%,var(--color-ink-band-paper)_0%,var(--color-ink-band-bg)_70%)] py-12 sm:py-16">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 sm:px-10 lg:grid-cols-[1fr_22rem]">
          {/* Hero Left with Notebook Margin */}
          <div className="relative pl-6 sm:pl-8">
            <span
              className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-35"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Stage 01 · Safety
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight text-[var(--color-ink-band-ink)] sm:text-5xl lg:text-6xl">
              AI Safety is about{" "}
              <span className="relative inline-block whitespace-nowrap text-[var(--color-ink-band-blue)]">
                human trust
                <svg
                  viewBox="0 0 240 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-[var(--color-ink-band-blue)] pointer-events-none overflow-visible"
                >
                  <path
                    d="M2 7 C 48 2, 96 10, 144 5 S 216 3, 238 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-band-ink)]/90">
              {SAFETY_READBACK_COPY.reframe}
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-ink-band-ink-muted)]">
              {SAFETY_READBACK_COPY.nextMove}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#charter"
                className="rounded-full bg-[var(--color-ink-band-ink)] px-6 py-3 font-sans text-sm font-medium text-[var(--color-ink-band-bg)] shadow transition hover:opacity-90"
              >
                See both ways to do it
              </a>
              <Link
                href="/field-guide"
                className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] hover:underline"
              >
                Get the free Handbook →
              </Link>
            </div>

            <div className="mt-6">
              <p
                style={{ fontFamily: "var(--font-ink-hand)" }}
                className="text-2xl text-[var(--color-ink-band-blue)]"
              >
                &ldquo;It starts with Safety. The rest comes after.&rdquo;
              </p>
            </div>
          </div>

          {/* Hero Right: The Path Box */}
          <div className="rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-6 shadow-sm">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              The Path
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {PATH_STAGES.map((stage) => (
                <div
                  key={stage.n}
                  className={`flex items-center justify-between rounded-lg border p-3 ${
                    stage.here
                      ? "border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-surface)] font-semibold text-[var(--color-ink-band-ink)]"
                      : "border-[var(--color-ink-band-border)] opacity-60 text-[var(--color-ink-band-ink-muted)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs">{stage.n}</span>
                    <span className="font-serif text-sm">{stage.title}</span>
                  </div>
                  <span className="font-mono text-[10px] uppercase">
                    {stage.here ? "You are here" : stage.gloss}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-[var(--color-ink-band-border)] pt-4 text-xs text-[var(--color-ink-band-ink-muted)]">
              Each step earns the next. Skip one and the ones after it have nothing to stand on.
            </p>
          </div>
        </div>
      </section>

      {/* Charter Section */}
      <section id="charter" className="border-b border-[var(--color-ink-band-border)] py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Your next step · Safety
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl text-[var(--color-ink-band-ink)]">
              Write and ratify your AI Safety Charter.
            </h2>
            <p className="mt-4 text-base text-[var(--color-ink-band-ink-muted)]">
              Five plain documents that decide what your organization will and won&rsquo;t do with AI. Here they are, and here is what&rsquo;s missing until you write them.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SAFETY_CHARTER_DOCUMENTS.map((doc, idx) => {
              const isOpen = openDoc === doc.id;
              const rot = idx % 2 === 0 ? "-rotate-1" : "rotate-1";
              return (
                <div
                  key={doc.id}
                  className="flex flex-col justify-between rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-5 shadow-sm transition hover:border-[var(--color-ink-band-ink)]"
                >
                  <div>
                    <div className="flex items-baseline justify-between text-xs font-mono text-[var(--color-ink-band-ink-muted)]">
                      <span>Layer {doc.layer}</span>
                      <span className="uppercase text-[var(--color-ink-band-blue)]">DRAFT</span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg font-semibold text-[var(--color-ink-band-ink)]">
                      {doc.title}
                    </h3>
                    <p className="font-mono text-xs uppercase text-[var(--color-ink-band-ink-muted)]">
                      {doc.sub}
                    </p>

                    {/* Threat Sticky Note */}
                    <div
                      className={`mt-4 inline-block self-start rounded-[3px_6px_4px_5px/6px_3px_5px_4px] bg-[var(--color-ink-band-sticky)] p-2.5 shadow-sm ${rot} mix-blend-multiply border border-[var(--color-ink-band-border)]/50`}
                    >
                      <p
                        style={{ fontFamily: "var(--font-ink-hand)" }}
                        className="text-lg leading-snug text-[var(--color-ink-band-blue)]"
                      >
                        &ldquo;{doc.threat}&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--color-ink-band-border)] pt-4">
                    <button
                      type="button"
                      onClick={() => setOpenDoc(isOpen ? null : doc.id)}
                      className="text-left font-sans text-xs font-medium text-[var(--color-ink-band-blue)] hover:underline"
                    >
                      {isOpen ? "Hide affirmation ↑" : `${doc.affTitle} ↓`}
                    </button>
                    {isOpen && (
                      <div className="mt-3 space-y-2 text-xs text-[var(--color-ink-band-ink-muted)]">
                        {doc.body.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                        <ul className="mt-2 list-disc pl-4 space-y-1">
                          {doc.aff.map((a, aIdx) => (
                            <li key={aIdx}>{a}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 text-sm text-[var(--color-ink-band-ink-muted)]">
            The sticky notes name what&rsquo;s missing today. Open any layer to read what the document affirms.
          </p>
        </div>
      </section>

      {/* Where You Stand */}
      <section className="border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="relative max-w-2xl pl-6 sm:pl-8">
            <span
              className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-35"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Where you stand
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl text-[var(--color-ink-band-ink)]">
              Safety isn&rsquo;t done until it&rsquo;s ratified.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-band-ink-muted)]">
              A draft in a folder doesn&rsquo;t protect anyone. A signed charter does. If you have a draft your board hasn&rsquo;t ratified, you&rsquo;re still on Safety — you&rsquo;re just close, and the last stretch is exactly what we can help you finish.
            </p>
          </div>
        </div>
      </section>

      {/* Two Ways To Do It */}
      <section id="two-ways" className="py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
          <div className="text-center max-w-xl mx-auto">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Two ways to do it
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
              Do it yourself, or build your dashboard.
            </h2>
            <p className="mt-3 text-sm text-[var(--color-ink-band-ink-muted)]">
              Both get you to a ratified charter. The honest question is which one you&rsquo;ll actually finish.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {SAFETY_DOORS.map((door) => (
              <div
                key={door.id}
                className={`flex flex-col justify-between rounded-2xl border p-8 shadow-sm ${
                  door.featured
                    ? "border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-paper)] ring-2 ring-[var(--color-ink-band-blue)]/20"
                    : "border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)]"
                }`}
              >
                <div>
                  <span className="inline-block rounded-full bg-[var(--color-ink-band-surface)] px-3 py-1 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                    {door.badge}
                  </span>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-semibold text-[var(--color-ink-band-ink)]">
                      {door.priceAmount}
                    </span>
                    <span className="font-mono text-xs text-[var(--color-ink-band-ink-muted)]">
                      {door.pricePeriod}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium text-[var(--color-ink-band-ink)]">
                    {door.tagline}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--color-ink-band-ink-muted)]">
                    {door.body}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-[var(--color-ink-band-border)] pt-6 text-xs text-[var(--color-ink-band-ink)]">
                    {door.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--color-ink-band-blue)]">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href={door.paid ? "/enroll" : "/field-guide"}
                    className={`block w-full rounded-full py-3 text-center text-sm font-medium transition ${
                      door.featured
                        ? "bg-[var(--color-ink-band-blue)] text-white hover:opacity-90"
                        : "border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] text-[var(--color-ink-band-ink)] hover:bg-[var(--color-ink-band-paper)]"
                    }`}
                  >
                    {door.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-2xl mx-auto border-l-2 border-[var(--color-ink-band-blue)] pl-4">
            <p className="text-sm leading-relaxed text-[var(--color-ink-band-ink)]">
              The hard part was never knowing what to do. It&rsquo;s finishing on a Tuesday, when a parent calls and the deadline hits and the blank page wins. The dashboard exists so the page is never blank.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
