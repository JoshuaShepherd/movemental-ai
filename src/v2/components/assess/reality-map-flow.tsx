"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BEAT_CATALOG, BEAT_CORE_ORDER, type BeatId } from "@/lib/agent-room/data/beat-catalog";
import { MovementalLogo } from "@/components/brand/movemental-logo";

const BEAT_SEQUENCE: BeatId[] = [...BEAT_CORE_ORDER, "refusals"];

export function RealityMapFlow() {
  const [step, setStep] = useState<"intro" | "quiz" | "readback">("intro");
  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentBeatKey = BEAT_SEQUENCE[currentBeatIndex];
  const beat = BEAT_CATALOG[currentBeatKey];

  const handleSelectOption = (label: string) => {
    const updated = { ...answers, [currentBeatKey]: label };
    setAnswers(updated);

    if (currentBeatIndex < BEAT_SEQUENCE.length - 1) {
      setCurrentBeatIndex(currentBeatIndex + 1);
    } else {
      setStep("readback");
    }
  };

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

      {/* Intro State */}
      {step === "intro" && (
        <section className="mx-auto max-w-[1080px] px-6 py-12 sm:px-10 sm:py-20">
          <div className="relative max-w-2xl pl-6 sm:pl-8">
            <span
              className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              Free · Organizational Reality Map
            </p>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl text-[var(--color-ink-band-ink)]">
              Find out where your organization actually stands.
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[var(--color-ink-band-ink)]/90">
              Six questions. Then we mirror your organization back to itself across the four stages of the path, and name the sharpest gaps. No score, no grade, and{" "}
              <span className="relative inline-block whitespace-nowrap font-medium text-[var(--color-ink-band-ink)]">
                no sales pitch
                <svg
                  viewBox="0 0 160 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="absolute left-0 right-0 -bottom-1 h-2 w-full text-[var(--color-ink-band-blue)] pointer-events-none overflow-visible"
                >
                  <path
                    d="M2 7 C 35 2, 70 10, 105 5 S 140 3, 158 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setStep("quiz")}
                className="rounded-full bg-[var(--color-ink-band-ink)] px-6 py-3 font-sans text-sm font-medium text-[var(--color-ink-band-bg)] shadow transition hover:opacity-90"
              >
                Start the six questions
              </button>
              <button
                type="button"
                onClick={() => {
                  setAnswers({
                    org_kind: "Church / Ministry",
                    reality: "Staff uses it informally",
                    visibility: "No central tracking",
                    decision: "Not yet written",
                    trust: "Confidential data at risk",
                    refusals: "We haven't named boundaries",
                  });
                  setStep("readback");
                }}
                className="rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] px-6 py-3 text-sm font-medium text-[var(--color-ink-band-ink)] hover:border-[var(--color-ink-band-ink)]"
              >
                See an example read-back
              </button>
            </div>

            <div className="mt-6">
              <p
                style={{ fontFamily: "var(--font-ink-hand)" }}
                className="text-2xl text-[var(--color-ink-band-blue)]"
              >
                &ldquo;Six honest questions. No wrong answers.&rdquo;
              </p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 border-t border-[var(--color-ink-band-border)] pt-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                What you get
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-band-ink)]">
                A read-back naming where you stand on Safety, Sandbox, Training, and Tech — and which gap is sharpest.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                What it costs
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-band-ink)]">
                Nothing. No email required to see your read-back.
              </p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                How long
              </p>
              <p className="mt-2 text-sm text-[var(--color-ink-band-ink)]">
                About two minutes. One question at a time.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Quiz / Active Beat State */}
      {step === "quiz" && beat && (
        <section className="mx-auto max-w-[1080px] px-6 py-12 sm:px-10">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
              Question {String(currentBeatIndex + 1).padStart(2, "0")} of {String(BEAT_SEQUENCE.length).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              {BEAT_SEQUENCE.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentBeatIndex
                      ? "w-6 bg-[var(--color-ink-band-blue)]"
                      : i < currentBeatIndex
                      ? "w-2 bg-[var(--color-ink-band-ink)]"
                      : "w-2 bg-[var(--color-ink-band-border)]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative mt-8 max-w-2xl pl-6 sm:pl-8">
            <span
              className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
              {beat.tag || "Reality Check"}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-medium sm:text-3xl text-[var(--color-ink-band-ink)]">
              {beat.question}
            </h2>

            <div className="mt-8 flex flex-col gap-3">
              {beat.options.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleSelectOption(opt.label)}
                  className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-4 text-left text-sm font-medium text-[var(--color-ink-band-ink)] shadow-sm transition hover:border-[var(--color-ink-band-blue)] hover:bg-[var(--color-ink-band-surface)]"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {beat.criteria && beat.criteria.length > 0 && (
              <div className="mt-8 rounded-lg bg-[var(--color-ink-band-surface)] p-4 text-xs text-[var(--color-ink-band-ink-muted)]">
                <p className="font-semibold text-[var(--color-ink-band-ink)]">
                  {beat.criteriaLead || "Why this question matters:"}
                </p>
                <ul className="mt-2 list-disc pl-4 space-y-1">
                  {beat.criteria.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Readback Summary State */}
      {step === "readback" && (
        <section className="mx-auto max-w-[1080px] px-6 py-12 sm:px-10 sm:py-16">
          <div className="relative max-w-2xl pl-6 sm:pl-8">
            <span
              className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-blue)] font-semibold">
              Assessment Complete · Organizational Read-Back
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium sm:text-4xl">
              Where your organization stands today.
            </h2>
            <p className="mt-4 text-sm text-[var(--color-ink-band-ink-muted)] leading-relaxed">
              Based on your answers, AI tools are already operating inside your workflow with unratified boundaries. The greatest immediate risk is not capability—it is institutional credibility and donor/pastoral trust.
            </p>

            <div className="mt-8 rounded-2xl border border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-paper)] p-6 shadow-sm ring-2 ring-[var(--color-ink-band-blue)]/20">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] font-semibold">
                Critical Priority · Stage 01
              </span>
              <h3 className="mt-1 font-serif text-xl font-semibold">
                Write & Ratify Your AI Safety Charter
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[var(--color-ink-band-ink-muted)]">
                Establish five plain governance layers (Use Statement, Data Boundaries, Staff Protocols, Verification, Escalation) before adopting more tooling.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/agent/path/safety"
                  className="rounded-full bg-[var(--color-ink-band-blue)] px-5 py-2 text-xs font-medium text-white hover:opacity-90"
                >
                  Explore Safety Stage →
                </Link>
                <Link
                  href="/enroll"
                  className="rounded-full border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] px-5 py-2 text-xs font-medium text-[var(--color-ink-band-ink)] hover:bg-[var(--color-ink-band-paper)]"
                >
                  Apply for Safety Sprint
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setCurrentBeatIndex(0);
                  setStep("intro");
                }}
                className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)] hover:underline"
              >
                ← Retake assessment
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
