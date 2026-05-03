"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";

import {
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStageIntroBand } from "./fragmentation-stage-intro-band";
import { FragmentationStoryStageActivation } from "./fragmentation-story-stage-activation";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
};

/**
 * Small live-query card that demonstrates the library *answering*.
 * One cycle every ~4s: question → typing → retrieved artifact.
 * Intentionally cheap — no simulation engine, just a scripted cycle.
 */

type Exchange = {
  q: string;
  a: { title: string; meta: string };
};

function getExchanges(audience: AudienceId, field: IntelligenceField): Exchange[] {
  if (field === "relational") {
    const rel: Record<AudienceId, Exchange[]> = {
      leader: [
        {
          q: "Who last carried the publisher conversation?",
          a: { title: "Thread — Publisher follow-up", meta: "Feb 14 · 6 participants" },
        },
        {
          q: "Which cohort alumni said yes to mentoring?",
          a: { title: "Cohort roster — Mar '26", meta: "9 active · 3 pending" },
        },
      ],
      nonprofit: [
        {
          q: "Donor notes from the March lunch?",
          a: { title: "Thread — Q1 donor cultivation", meta: "Mar 08 · 4 files attached" },
        },
        {
          q: "Which board member owns the accreditation relationship?",
          a: { title: "Stakeholder map — Board", meta: "Updated 2 days ago" },
        },
      ],
      church: [
        {
          q: "Whose family did we walk with this season?",
          a: { title: "Pastoral care — Lent", meta: "11 households · 3 elders" },
        },
        {
          q: "Who introduced us to the new members?",
          a: { title: "Welcome threads — Q1", meta: "7 new members · 5 introducers" },
        },
      ],
      institution: [
        {
          q: "Which field partners hosted students last term?",
          a: { title: "Field ed — Fall placements", meta: "12 sites · 28 students" },
        },
        {
          q: "Who mentored this cohort's theses?",
          a: { title: "Advisor roster — MA cohort", meta: "14 pairs · 3 in review" },
        },
      ],
    };
    return rel[audience];
  }
  const info: Record<AudienceId, Exchange[]> = {
    leader: [
      {
        q: "What does 'fragmentation' mean in the book again?",
        a: { title: "Fragments of Form · §2.1", meta: "Book chapter · 6 min read" },
      },
      {
        q: "When did I last teach the formal-systems intro?",
        a: { title: "Session — Formal systems intro", meta: "Jan 22 · 42 min · archived" },
      },
    ],
    nonprofit: [
      {
        q: "Grant language for outcomes in Program B?",
        a: { title: "Narrative — Program B outcomes", meta: "FY26 draft · v3" },
      },
      {
        q: "Board packet version with the updated KPIs?",
        a: { title: "Board packet — Q1 2026", meta: "PDF · 22 pages" },
      },
    ],
    church: [
      {
        q: "Curriculum scope for Easter season?",
        a: { title: "Curriculum — Eastertide", meta: "7 weeks · 3 tracks" },
      },
      {
        q: "Order of service from last Christmas Eve?",
        a: { title: "Order — Christmas Eve 2025", meta: "4 services · notes attached" },
      },
    ],
    institution: [
      {
        q: "Syllabus version used last fall?",
        a: { title: "Syllabus — FS625 · Fall 25", meta: "v4 · 14 weeks" },
      },
      {
        q: "Reader section on structural fragments?",
        a: { title: "Reader · §4 — Structural fragments", meta: "Printed + LMS" },
      },
    ],
  };
  return info[audience];
}

function LiveQueryCard({ audience, field }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const exchanges = useMemo(() => getExchanges(audience, field), [audience, field]);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "asking" | "thinking" | "answered">(
    prefersReducedMotion ? "answered" : "idle"
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timers: number[] = [];
    const cycle = () => {
      timers.push(
        window.setTimeout(() => setPhase("idle"), 0),
        window.setTimeout(() => setPhase("asking"), 250),
        window.setTimeout(() => setPhase("thinking"), 900),
        window.setTimeout(() => setPhase("answered"), 1700),
        window.setTimeout(() => {
          setIdx((i) => (i + 1) % exchanges.length);
        }, 4200)
      );
    };
    cycle();
    const interval = window.setInterval(cycle, 4600);
    return () => {
      window.clearInterval(interval);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [exchanges, prefersReducedMotion]);

  const current = exchanges[idx];

  return (
    <div
      aria-live="polite"
      className="overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient"
    >
      <div className="flex items-center gap-2 border-b border-border bg-elevated px-4 py-2.5">
        <span className="inline-flex size-2 rounded-full bg-primary" aria-hidden />
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          The library answers
        </p>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">live</span>
      </div>
      <div className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-6">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
            Query
          </p>
          <p className="min-h-[2.75rem] text-sm leading-relaxed text-foreground">
            {phase === "idle" ? "…" : current.q}
          </p>
        </div>
        <div className="min-w-0">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-eyebrow text-muted-foreground">
            Retrieved
          </p>
          <div className="min-h-[2.75rem]">
            <AnimatePresence mode="wait">
              {phase === "thinking" ? (
                <motion.div
                  key="thinking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1.5 pt-2"
                  aria-label="Retrieving"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="block size-1.5 rounded-full bg-primary"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              ) : phase === "answered" ? (
                <motion.div
                  key={`answered-${idx}`}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="rounded-md bg-primary/8 px-3 py-2 ring-1 ring-primary/20"
                >
                  <p className="text-sm font-medium text-foreground">{current.a.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{current.a.meta}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Activation on `/fragmentation-new`:
 *   intro band → live-query demo → reused activation visualization.
 */
export function FragmentationStoryStageActivationNew({ audience, field }: Props) {
  return (
    <>
      <FragmentationStageIntroBand
        id="stage-activation-band"
        surface="section"
        number={3}
        name="Activation"
        lead="Your intelligence becomes usable."
        knowledge="Your knowledge can be searched, retrieved, and applied in context."
        relationships="Your relationships can be surfaced, understood, and engaged at the right moment."
        conclusion={[
          "People can access what they need.",
          "AI can operate with real context.",
          "The system begins to respond, not just store.",
        ]}
      />
      <Section variant="section" spacing="sm" aria-label="Live query preview">
        <Container>
          <LiveQueryCard audience={audience} field={field} />
        </Container>
      </Section>
      <FragmentationStoryStageActivation audience={audience} field={field} />
    </>
  );
}
