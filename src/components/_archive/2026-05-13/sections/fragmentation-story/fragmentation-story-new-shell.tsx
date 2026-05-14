"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";

import { ARTIFACT_IDS, ARTIFACT_META } from "./fragmentation-artifact-map";
import {
  type AudienceId,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationStoryDock } from "./fragmentation-story-dock";
import {
  FragmentationStoryNewWayfinding,
  type NewChapterId,
} from "./fragmentation-story-new-wayfinding";
import { FragmentationStoryOutroCta } from "./fragmentation-story-outro-cta";
import { FragmentationStoryStageActivationNew } from "./fragmentation-story-stage-activation-new";
import { FragmentationStoryStageFormationNew } from "./fragmentation-story-stage-formation-new";
import { FragmentationStoryStageFragmentation } from "./fragmentation-story-stage-fragmentation";
import { FragmentationStoryStageIntegrationNew } from "./fragmentation-story-stage-integration-new";
import { FragmentationStoryStageMovementNew } from "./fragmentation-story-stage-movement-new";
import { FragmentationStoryStageMultiplicationNew } from "./fragmentation-story-stage-multiplication-new";
import { FragmentationIntelArtifact } from "./fragmentation-story-intel-artifact";

export type FragmentationStoryNewShellProps = {
  initialAudience: AudienceId;
  initialField: IntelligenceField;
  initialNodeCount: number;
};

const STAGE_SECTION_IDS: { chapter: NewChapterId; sectionId: string }[] = [
  { chapter: "fragmentation", sectionId: "stage-fragmentation" },
  { chapter: "integration", sectionId: "stage-integration" },
  { chapter: "activation", sectionId: "stage-activation" },
  { chapter: "formation", sectionId: "stage-formation" },
  { chapter: "multiplication", sectionId: "stage-multiplication" },
  { chapter: "movement", sectionId: "stage-movement" },
];

/**
 * Carry-forward strip between Stage 1 (Fragmentation) and Stage 2
 * (Integration). The editorial point: these fourteen artifacts don't
 * disappear — they re-compose.
 */
function CarryForwardStrip({
  audience,
  field,
}: {
  audience: AudienceId;
  field: IntelligenceField;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <Section
      variant="section"
      spacing="sm"
      aria-label="Fourteen artifacts carry forward into re-composition"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-center">
          <div className="min-w-0 max-w-prose">
            <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
              Carry forward
            </p>
            <p className="mt-3 max-w-xl text-balance text-xl font-medium tracking-tight text-foreground sm:text-2xl">
              These fourteen don&apos;t disappear.{" "}
              <em className="not-italic text-primary">They re-compose.</em>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The next five stages are the same intelligence, re-arranged. Watch the ids travel —
              the scatter field turns into a library, a live surface, a formation arc, a
              reproducible infrastructure, and finally a field.
            </p>
          </div>
          <ul
            className="flex min-w-0 gap-2 overflow-x-auto py-2 lg:flex-wrap lg:overflow-visible"
            aria-label="Artifacts carried forward"
          >
            {ARTIFACT_IDS.map((id, i) => {
              const meta = ARTIFACT_META[id];
              return (
                <motion.li
                  key={id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{
                    duration: 0.35,
                    delay: prefersReducedMotion ? 0 : i * 0.03,
                    ease: "easeOut",
                  }}
                  className="shrink-0"
                >
                  <figure
                    className="relative isolate block size-14 overflow-hidden rounded-[var(--radius-sm)] bg-card shadow-ambient"
                    title={meta.label}
                  >
                    <div className="absolute inset-0">
                      <FragmentationIntelArtifact
                        slug={meta.slug}
                        audience={audience}
                        field={field}
                        variant="thumb"
                        embedded
                        className="h-full w-full"
                        aria-label={meta.label}
                      />
                    </div>
                  </figure>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

export function FragmentationStoryNewShell({
  initialAudience,
  initialField,
  initialNodeCount,
}: FragmentationStoryNewShellProps) {
  const [audience, setAudience] = useState<AudienceId>(initialAudience);
  const [field, setField] = useState<IntelligenceField>(initialField);
  const [movementNodeCount, setMovementNodeCount] = useState<number>(initialNodeCount);
  const [activeChapter, setActiveChapter] = useState<NewChapterId>("fragmentation");
  const rootRef = useRef<HTMLDivElement | null>(null);

  /* URL sync — same contract as /fragmentation */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("audience", audience);
    url.searchParams.set("field", field);
    url.searchParams.set("nodes", String(movementNodeCount));
    window.history.replaceState(null, "", url.toString());
  }, [audience, field, movementNodeCount]);

  /* IntersectionObserver drives the wayfinding active state */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = STAGE_SECTION_IDS.map(({ chapter, sectionId }) => {
      const el = document.getElementById(sectionId);
      return el ? { chapter, el } : null;
    }).filter((x): x is { chapter: NewChapterId; el: HTMLElement } => x !== null);

    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.2)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!best) return;
        const match = targets.find((t) => t.el === best.target);
        if (match) setActiveChapter(match.chapter);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    targets.forEach((t) => io.observe(t.el));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      <div className="sticky top-16 z-40">
        <FragmentationStoryDock
          audience={audience}
          onAudienceChange={setAudience}
          field={field}
          onFieldChange={setField}
        />
        <FragmentationStoryNewWayfinding active={activeChapter} />
      </div>

      <FragmentationStoryStageFragmentation audience={audience} field={field} />
      <CarryForwardStrip audience={audience} field={field} />

      {/*
       * The existing integration stage renders its own <Section id="integration">.
       * We add an anchor wrapper with the canonical stage-* id used by the new
       * wayfinding, so deep-links work and the IntersectionObserver tracks it.
       */}
      <div id="stage-integration" className="scroll-mt-40 lg:scroll-mt-44">
        <FragmentationStoryStageIntegrationNew audience={audience} field={field} />
      </div>

      <div id="stage-activation" className="scroll-mt-40 lg:scroll-mt-44">
        <FragmentationStoryStageActivationNew audience={audience} field={field} />
      </div>

      <div id="stage-formation" className="scroll-mt-40 lg:scroll-mt-44">
        <FragmentationStoryStageFormationNew audience={audience} field={field} />
      </div>

      <div id="stage-multiplication" className="scroll-mt-40 lg:scroll-mt-44">
        <FragmentationStoryStageMultiplicationNew audience={audience} field={field} />
      </div>

      <div id="stage-movement" className="scroll-mt-40 lg:scroll-mt-44">
        <FragmentationStoryStageMovementNew
          audience={audience}
          nodeCount={movementNodeCount}
          onNodeCountChange={setMovementNodeCount}
        />
      </div>

      <FragmentationStoryOutroCta />
    </div>
  );
}
