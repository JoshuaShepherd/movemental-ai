"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

import {
  ARTIFACT_IDS_BY_PHASE,
  type ArtifactPhase,
  getScatterFrame,
  PHASE_CAPTIONS,
  type ScatterFrameEntry,
} from "./fragmentation-artifact-map";
import { FragmentationStageIntroBand } from "./fragmentation-stage-intro-band";
import {
  type AudienceId,
  getCostLedger,
  type IntelligenceField,
} from "./fragmentation-story-content";
import {
  FragmentationIntelArtifact,
  FRAGMENTATION_STORY_COMPOSITE_WEBP_SIZES,
} from "./fragmentation-story-intel-artifact";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
};

/** Stable 0–1 delay so tiles don’t drift in lockstep. */
function driftStagger(id: string): number {
  let s = 0;
  for (let i = 0; i < id.length; i++) s = (s + id.charCodeAt(i) * (i + 3)) % 997;
  return (s % 360) / 360;
}

const PHASES: ArtifactPhase[] = [1, 2, 3];

/** Millis between phases when the panel first enters the viewport. */
const PHASE_STEP_MS = 650;
const PHASE_FADE_MS = 450;

function isMatchingField(
  kind: ScatterFrameEntry["kind"],
  field: IntelligenceField
): boolean {
  if (kind === "both") return true;
  return kind === field;
}

export function FragmentationStoryStageFragmentation({ audience, field }: Props) {
  const frame = useMemo(() => getScatterFrame(audience), [audience]);
  const ledger = getCostLedger(audience, field);

  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  /** 0 = pre-reveal (all hidden); 1/2/3 = "up to and including phase N visible". */
  const [rawPhase, setRawPhase] = useState<0 | ArtifactPhase>(0);
  /** Reduced-motion readers always see the final frame, without state churn. */
  const visiblePhase: 0 | ArtifactPhase = prefersReducedMotion ? 3 : rawPhase;

  /** Intersection-driven phase runner. Non-blocking; no scrub, no pin. */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;

    let timers: number[] = [];
    const runPhases = () => {
      setRawPhase(1);
      timers.push(
        window.setTimeout(() => setRawPhase(2), PHASE_STEP_MS),
        window.setTimeout(() => setRawPhase(3), PHASE_STEP_MS * 2)
      );
    };

    let hasRun = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !hasRun) {
            hasRun = true;
            runPhases();
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };
  }, [prefersReducedMotion]);

  const activeCaption =
    visiblePhase === 0 ? PHASE_CAPTIONS[1] : PHASE_CAPTIONS[visiblePhase];

  return (
    <section
      ref={sectionRef}
      id="stage-fragmentation"
      className="scroll-mt-40 lg:scroll-mt-44"
      aria-labelledby="stage-fragmentation-band-heading"
    >
      <FragmentationStageIntroBand
        id="stage-fragmentation-band"
        surface="midnight"
        number={1}
        name="Fragmentation"
        lead="Your intelligence exists—but in pieces."
        knowledge="Your knowledge is scattered across content, platforms, and formats."
        relationships="Your relationships are spread across conversations, systems, and memory."
        conclusion={[
          "Nothing works together.",
          "Nothing compounds.",
          "And every interaction starts from scratch.",
        ]}
      />

      <Section variant="midnight" spacing="sm" className="min-w-0">
        {/* Composite — full container width, matches /fragmentation scatter proportions */}
        <Container className="mt-0">
          <div
            role="img"
            aria-label="The fragmented field — fourteen artifacts, loosely scattered, belonging together, none connected."
            className="relative mx-auto aspect-[10/16] w-full max-w-4xl md:aspect-[16/10]"
          >
            {frame.map((entry) => {
              const { id, tile, phase, kind } = entry;
              const phaseRevealed = visiblePhase >= phase;
              const fieldMatch = isMatchingField(kind, field);
              const driftOn = phaseRevealed && !prefersReducedMotion;
              const stagger = driftStagger(id);
              return (
                <figure
                  key={id}
                  className="absolute"
                  style={{
                    width: tile.w,
                    top: tile.t,
                    left: tile.l,
                    transform: `translate(-50%, -50%) rotate(${tile.rotate}deg)`,
                    transformOrigin: "center",
                    zIndex: phase + 4,
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: phaseRevealed ? (fieldMatch ? 1 : 0.55) : 0,
                      y: phaseRevealed ? (prefersReducedMotion ? 0 : [0, -3, 2, -2, 0]) : 12,
                      scale: phaseRevealed ? tile.s : tile.s * 0.96,
                      x: driftOn ? [0, 4, -3, 3, 0] : 0,
                    }}
                    transition={{
                      opacity: { duration: PHASE_FADE_MS / 1000, ease: "easeOut" },
                      scale: { duration: PHASE_FADE_MS / 1000, ease: "easeOut" },
                      y: driftOn
                        ? {
                            duration: 5.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: stagger,
                          }
                        : { duration: PHASE_FADE_MS / 1000, ease: "easeOut" },
                      x: driftOn
                        ? {
                            duration: 6.1,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: stagger + 0.12,
                          }
                        : { duration: PHASE_FADE_MS / 1000, ease: "easeOut" },
                    }}
                    className="relative isolate overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient"
                    style={{ aspectRatio: tile.ar.replace("/", " / ") }}
                  >
                    <div className="absolute inset-0 min-h-0 min-w-0">
                      <FragmentationIntelArtifact
                        slug={tile.slug}
                        audience={audience}
                        field={field}
                        variant="thumb"
                        webpSizes={FRAGMENTATION_STORY_COMPOSITE_WEBP_SIZES}
                        embedded
                        className="h-full w-full"
                        aria-label=""
                      />
                    </div>
                  </motion.div>
                </figure>
              );
            })}
          </div>

          {/* Phase caption — tightly paired with the composite */}
          <div
            aria-live="polite"
            className="mt-6 flex min-h-[2.25rem] items-center justify-center gap-3"
          >
            <PhaseDots current={visiblePhase} />
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCaption}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35 }}
                className="text-sm italic text-inverse-foreground/70"
              >
                {activeCaption}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mt-4 text-center text-xs text-inverse-foreground/55">
            Every tile is a live intel surface — the same library the next five stages re-compose.
          </p>

          {/* Cost ledger — sits beneath the full-width composite as a "receipt" */}
          <div className="mx-auto mt-12 max-w-2xl border-t border-inverse-foreground/15 pt-6">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/55">
              {ledger.eyebrow}
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-inverse-foreground/75 sm:text-base">
              {ledger.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 inline-block size-1 shrink-0 rounded-full bg-inverse-foreground/40"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </section>
  );
}

function PhaseDots({ current }: { current: ArtifactPhase | 0 }) {
  return (
    <span className="inline-flex gap-1.5" aria-hidden>
      {PHASES.map((p) => (
        <span
          key={p}
          className={cn(
            "block size-1.5 rounded-full transition-colors duration-300",
            current >= p ? "bg-primary" : "bg-inverse-foreground/20"
          )}
        />
      ))}
      <span className="sr-only">
        Showing phase {Math.max(1, current)} of 3:{" "}
        {ARTIFACT_IDS_BY_PHASE[(current || 1) as ArtifactPhase].length} artifacts visible.
      </span>
    </span>
  );
}
