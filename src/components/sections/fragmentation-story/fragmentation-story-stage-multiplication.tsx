"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import type { NarrativeIntelSlug } from "@/components/intel-artifacts/types";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

import type { AudienceId, InfraChannel, IntelligenceField } from "./fragmentation-story-content";
import {
  getMultiplicationEcosystem,
  MULTIPLICATION_COPY,
  MULTIPLICATION_INFRA,
  type MultiplicationCredibilityEdge,
  type MultiplicationOrbitNode,
} from "./fragmentation-story-content";
import { FragmentationIntelArtifact } from "./fragmentation-story-intel-artifact";

const HUB_TILES: NarrativeIntelSlug[] = [
  "book-fragments-of-form",
  "module-formal-systems-intro",
  "podcast-card-abstract-structures",
  "cover-principles-design-fragmentation",
  "email-thread-multi-participant",
  "core-hub-to-fragment-nodes",
];

function orbitLookup(orbit: MultiplicationOrbitNode[]) {
  return Object.fromEntries(orbit.map((n) => [n.id, n] as const));
}

function MultiplicationEcosystemDiagram({
  audience,
  field,
}: {
  audience: AudienceId;
  field: IntelligenceField;
}) {
  const { orbit, edges } = getMultiplicationEcosystem(audience);
  const byId = orbitLookup(orbit);

  const lineEndpoints = (e: MultiplicationCredibilityEdge) => {
    if (e.from === "center") {
      const t = byId[e.to];
      return t ? { x1: 50, y1: 50, x2: t.x, y2: t.y } : null;
    }
    const a = byId[e.from];
    const b = byId[e.to];
    if (!a || !b) return null;
    return { x1: a.x, y1: a.y, x2: b.x, y2: b.y };
  };

  return (
    <div
      data-mult-diagram
      className="relative mx-auto aspect-[16/11] w-full max-w-4xl"
      style={{ transformOrigin: "50% 50%" }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {edges.map((e) => {
          const seg = lineEndpoints(e);
          if (!seg) return null;
          const midX = (seg.x1 + seg.x2) / 2;
          const midY = (seg.y1 + seg.y2) / 2;
          const showLabel = e.label && e.label !== "Spine";
          return (
            <g key={`${e.from}-${e.to}`}>
              <line
                data-mult-spoke-line
                x1={seg.x1}
                y1={seg.y1}
                x2={seg.x2}
                y2={seg.y2}
                stroke="var(--foreground)"
                strokeOpacity={e.from === "center" ? 0.14 : 0.22}
                strokeWidth={e.from === "center" ? 0.28 : 0.22}
              />
              {showLabel ? (
                <text
                  x={midX}
                  y={midY - 1.2}
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                  className="select-none"
                  style={{ fontSize: "2.05px", fontWeight: 600 }}
                >
                  {e.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>

      <div
        data-mult-hub-wrap
        className="absolute left-1/2 top-1/2 z-10 w-[min(52%,15rem)] -translate-x-1/2 -translate-y-1/2 rounded-md bg-inverse-surface p-2.5 text-center shadow-ambient"
        style={{ transformOrigin: "50% 50%" }}
      >
        <span className="text-xs font-semibold uppercase tracking-eyebrow text-primary">
          Platform
        </span>
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {HUB_TILES.map((slug) => (
            <div
              key={slug}
              className="relative isolate aspect-square overflow-hidden rounded-sm bg-card"
            >
              <div className="absolute inset-0 min-h-0 min-w-0">
                <FragmentationIntelArtifact
                  slug={slug}
                  audience={audience}
                  field={field}
                  variant="tile"
                  embedded
                  className="h-full w-full"
                  aria-label=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {orbit.map((n) => (
        <div
          key={n.id}
          data-mult-orbit-card
          className="absolute z-20 max-w-[9.5rem] -translate-x-1/2 -translate-y-1/2 rounded-md bg-card p-2 shadow-ambient"
          style={{ left: `${n.x}%`, top: `${n.y}%`, transformOrigin: "50% 50%" }}
        >
          <p className="text-xs font-semibold leading-snug text-foreground">{n.title}</p>
          {n.subtitle ? (
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{n.subtitle}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function InfraCard({ channel }: { channel: InfraChannel }) {
  const isRel = channel.kind === "relational";
  return (
    <article
      data-mult-infra-card
      className={cn(
        "relative flex min-h-[9.5rem] flex-col gap-2.5 overflow-hidden rounded-md p-4 shadow-ambient",
        isRel ? "bg-primary/10" : "bg-card"
      )}
      style={{ transformOrigin: "50% 80%" }}
    >
      <header className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-foreground">{channel.label}</span>
        <span
          className={cn(
            "text-xs font-semibold uppercase tracking-eyebrow",
            isRel ? "text-primary" : "text-muted-foreground"
          )}
        >
          {isRel ? "Relational" : "Informational"}
        </span>
      </header>
      <p
        className={cn(
          "rounded-sm px-2 py-1.5 text-xs",
          isRel ? "bg-card/80 text-primary" : "bg-section text-muted-foreground"
        )}
      >
        {channel.example}
      </p>
      <p className="text-xs leading-snug text-muted-foreground">{channel.body}</p>
    </article>
  );
}

function InfrastructureOverlay() {
  const info = MULTIPLICATION_INFRA.filter((c) => c.kind === "informational");
  const rel = MULTIPLICATION_INFRA.filter((c) => c.kind === "relational");
  return (
    <div data-mult-infra-block className="mx-auto mt-16 max-w-5xl">
      <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            How it spreads
          </p>
          <h3 className="mt-1 text-xl tracking-tight text-foreground">
            Infrastructure across the field
          </h3>
        </div>
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Informational + Relational
        </p>
      </header>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {info.map((c) => (
          <InfraCard key={c.id} channel={c} />
        ))}
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rel.map((c) => (
          <InfraCard key={c.id} channel={c} />
        ))}
      </div>
    </div>
  );
}

export function FragmentationStoryStageMultiplication({
  audience,
  field,
}: {
  audience: AudienceId;
  field: IntelligenceField;
}) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 63.999rem)").matches;
    if (reduced || narrow) return;

    gsap.registerPlugin(ScrollTrigger);

    const diagram = root.querySelector<HTMLElement>("[data-mult-diagram]");
    const infraBlock = root.querySelector<HTMLElement>("[data-mult-infra-block]");
    const infraCards = root.querySelectorAll<HTMLElement>("[data-mult-infra-card]");
    const captions = root.querySelector<HTMLElement>("[data-mult-captions]");
    const svgLines = root.querySelectorAll<SVGLineElement>("[data-mult-spoke-line]");

    svgLines.forEach((ln) => {
      const len = ln.getTotalLength?.() ?? 40;
      ln.style.strokeDasharray = `${len}`;
      ln.style.strokeDashoffset = `${len}`;
    });

    gsap.set(infraCards, { autoAlpha: 0.22, y: 14, scale: 0.96 });
    if (infraBlock) gsap.set(infraBlock, { autoAlpha: 0.5 });
    if (captions) {
      Array.from(captions.children).forEach((el) => {
        gsap.set(el, { autoAlpha: 0.7, y: 6 });
      });
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          end: "center 22%",
          scrub: 0.85,
        },
      });

      if (svgLines.length) {
        tl.to(
          svgLines,
          { strokeDashoffset: 0, ease: "power1.inOut", stagger: 0.03, duration: 0.55 },
          0
        );
      }
      if (diagram) {
        tl.fromTo(
          diagram,
          { scale: 1, y: 0 },
          { scale: 0.93, y: 8, ease: "power1.in", duration: 0.42 },
          0.02
        ).to(diagram, { scale: 1, y: 0, ease: "power1.out", duration: 0.55 }, 0.38);
      }
      if (infraBlock) {
        tl.to(infraBlock, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, 0.28);
      }
      if (infraCards.length) {
        tl.to(
          infraCards,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            stagger: { each: 0.06, from: "start" },
            duration: 0.58,
          },
          0.34
        );
      }
      if (captions?.children.length) {
        tl.to(
          captions.children,
          { autoAlpha: 1, y: 0, ease: "power2.out", stagger: 0.06, duration: 0.48 },
          0.55
        );
      }
    }, root);

    return () => ctx.revert();
  }, [audience, field]);

  return (
    <Section ref={rootRef} id="stage-multiplication" variant="elevated" spacing="lg">
      <Container>
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            {MULTIPLICATION_COPY.eyebrow}
          </p>
          <h2 className="text-balance text-3xl tracking-tight sm:text-4xl">
            {MULTIPLICATION_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {MULTIPLICATION_COPY.lede}
          </p>
        </header>
        <MultiplicationEcosystemDiagram audience={audience} field={field} />
        <InfrastructureOverlay />
        <div
          data-mult-captions
          className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3"
        >
          {MULTIPLICATION_COPY.captions.map((c) => (
            <div
              key={c.t}
              className="rounded-md bg-card p-5 text-left text-sm shadow-ambient"
            >
              <p className="font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
