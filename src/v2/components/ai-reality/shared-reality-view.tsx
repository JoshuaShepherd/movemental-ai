"use client";

import React from "react";
import Link from "next/link";
import { MovementalLogo } from "@/components/brand/movemental-logo";
import type { AiRealityOrgPayload } from "@/lib/ai-reality/types";

interface SharedRealityViewProps {
  payload: AiRealityOrgPayload;
  orgName?: string;
}

export function SharedRealityView({ payload, orgName = "Organization" }: SharedRealityViewProps) {
  const isProvisional = payload.respondedCount <= 1;

  return (
    <div className="min-h-screen bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)] pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 flex h-[3.6rem] items-center justify-between border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)]/90 px-4 backdrop-blur-md sm:px-8">
        <Link href="/" className="flex items-center">
          <MovementalLogo className="h-8 w-auto text-[var(--color-ink-band-ink)]" />
        </Link>
        <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
          Shared · Read Only
        </span>
      </header>

      {/* Main Content Article */}
      <article className="mx-auto max-w-3xl px-6 pt-12 sm:px-10 sm:pt-16">
        {/* Title Section with Notebook Margin */}
        <section className="relative pl-6 sm:pl-8">
          <span
            className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
            aria-hidden="true"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            Organizational AI Reality Assessment
          </p>
          <h1 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl text-[var(--color-ink-band-ink)]">
            {orgName} · Shared Read-Back
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-ink-band-ink)]/90 leading-relaxed">
            Where your leadership team actually stands across the four stages of the Movemental Path.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
              {payload.respondedCount} of {payload.invitedCount || payload.respondedCount} leaders responded
            </span>
            {isProvisional && (
              <span className="rounded-full border border-[var(--color-ink-band-border)] px-3 py-0.5 font-mono text-[10px] uppercase text-[var(--color-ink-band-ink-muted)]">
                Provisional
              </span>
            )}
          </div>
        </section>

        {/* The Path Progress Bars */}
        <section className="mt-12">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            The Path
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-band-ink)]">
            Movemental stages in order. Alignment requires completing each stage before advancing.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            {payload.orderedPath.map((stageName, idx) => {
              const stageData = payload.stages[stageName];
              const score = stageData?.mean ?? 50;
              const isHere = stageName === payload.dominantGap;

              return (
                <div
                  key={stageName}
                  className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-4 shadow-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[var(--color-ink-band-ink-muted)]">
                        0{idx + 1}
                      </span>
                      <span className="font-serif text-base font-medium text-[var(--color-ink-band-ink)]">
                        {stageName}
                      </span>
                      {isHere && (
                        <span className="font-serif italic text-sm text-[var(--color-ink-band-blue)] ml-2">
                          you are here
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs text-[var(--color-ink-band-ink-muted)]">
                      {Math.round(score)}% readiness
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[var(--color-ink-band-surface)] border border-[var(--color-ink-band-border)]">
                    <div
                      className={`h-full transition-all ${
                        isHere
                          ? "bg-[var(--color-ink-band-blue)]"
                          : "bg-[var(--color-ink-band-ink)]"
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, score))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dominant Gap Card */}
        <section className="mt-10 rounded-2xl border border-[var(--color-ink-band-ink)] bg-[var(--color-ink-band-paper)] p-6 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-blue)] font-semibold">
            Your Sharpest Gap
          </p>
          <h2 className="mt-2 font-serif text-xl sm:text-2xl font-medium text-[var(--color-ink-band-ink)]">
            {payload.dominantGapLine || "Your organization lacks a ratified AI Safety Charter."}
          </h2>
          <p className="mt-2 text-xs text-[var(--color-ink-band-ink-muted)] leading-relaxed">
            Until boundaries are written and formally ratified by leadership, experimentation and training remain unprotected.
          </p>
        </section>

        {/* Team Spread / Agreement Matrix */}
        <section className="mt-10">
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
            Team Agreement & Divergence
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {payload.orderedPath.map((stageName) => {
              const stageData = payload.stages[stageName];
              const spread = stageData?.spread ?? 0;

              return (
                <div
                  key={stageName}
                  className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-4"
                >
                  <p className="font-serif text-sm font-semibold">{stageName}</p>
                  <p className="mt-1 font-mono text-xs text-[var(--color-ink-band-ink-muted)]">
                    {spread > 25 ? "High Split" : spread > 10 ? "Moderate Split" : "Aligned"}
                  </p>
                  <p className="mt-2 text-[10px] font-mono text-[var(--color-ink-band-ink-muted)]">
                    Spread: {Math.round(spread)} pts
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Next Action Callout */}
        <section className="mt-12 rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-lg font-medium">Ready to close the safety gap?</h3>
            <p className="text-xs text-[var(--color-ink-band-ink-muted)] mt-1">
              Explore the five charter layers or sprint with Movemental.
            </p>
          </div>
          <Link
            href="/agent/path/safety"
            className="rounded-full bg-[var(--color-ink-band-ink)] px-6 py-2.5 text-xs font-medium text-white hover:opacity-90 whitespace-nowrap"
          >
            Explore Safety Stage →
          </Link>
        </section>
      </article>
    </div>
  );
}
