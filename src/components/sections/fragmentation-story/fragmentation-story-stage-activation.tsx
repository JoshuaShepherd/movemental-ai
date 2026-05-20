"use client";

import type { CSSProperties, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import type { NarrativeIntelSlug } from "@/components/intel-artifacts/types";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

import type { AudienceId, IntelligenceField } from "./fragmentation-story-content";
import { ACTIVATION_COPY } from "./fragmentation-story-content";
import { FragmentationIntelArtifact } from "./fragmentation-story-intel-artifact";

function ActNode({
  slug,
  audience,
  field,
  style,
  highlight,
}: {
  slug: NarrativeIntelSlug;
  audience: AudienceId;
  field: IntelligenceField;
  style: CSSProperties;
  highlight?: boolean;
}) {
  return (
    <figure
      className={cn(
        "absolute isolate overflow-hidden rounded-[var(--radius-md)] bg-elevated shadow-ambient",
        highlight && "ring-2 ring-primary ring-offset-2 ring-offset-card"
      )}
      style={style}
    >
      <div className="absolute inset-0 min-h-0 min-w-0">
        <FragmentationIntelArtifact
          slug={slug}
          audience={audience}
          field={field}
          variant="thumb"
          embedded
          className="h-full w-full"
          aria-label=""
        />
      </div>
    </figure>
  );
}

function ActivationWorkspace({
  audience,
  field,
  vizRef,
}: {
  audience: AudienceId;
  field: IntelligenceField;
  vizRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={vizRef}
      className="mx-auto grid max-w-5xl gap-px overflow-hidden rounded-[var(--radius-md)] bg-muted p-px shadow-ambient lg:grid-cols-[minmax(0,11rem)_1fr_minmax(0,13rem)]"
    >
      <div data-activation-side="sources" className="bg-card p-3">
        <p className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Sources
        </p>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li className="font-medium text-foreground">Fragments of Form — Ch. 4</li>
          <li>Module · Formal Systems</li>
          <li>Podcast · Ep. 12</li>
          <li>Order of Service (v3)</li>
          <li>Email thread · 7 Mar</li>
          <li>Principles of Design</li>
        </ul>
      </div>
      <div className="relative aspect-square min-h-[14rem] w-full max-w-md justify-self-center bg-card p-4 lg:max-h-none">
        <svg
          className="pointer-events-none absolute inset-4 text-foreground/15"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            data-activation-spoke
            x1="50"
            y1="50"
            x2="14"
            y2="18"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          <line
            data-activation-spoke
            x1="50"
            y1="50"
            x2="86"
            y2="18"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          <line
            data-activation-spoke
            x1="50"
            y1="50"
            x2="14"
            y2="82"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          <line
            data-activation-spoke
            x1="50"
            y1="50"
            x2="86"
            y2="82"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          <line
            data-activation-spoke
            x1="50"
            y1="50"
            x2="6"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.4"
          />
          <line
            data-activation-spoke
            x1="50"
            y1="50"
            x2="94"
            y2="50"
            stroke="currentColor"
            strokeWidth="0.4"
          />
        </svg>
        <div
          data-activation-hub
          className="absolute left-1/2 top-1/2 aspect-[896/1200] w-[6rem] -translate-x-1/2 -translate-y-1/2"
        >
          <ActNode
            slug="book-fragments-of-form"
            audience={audience}
            field={field}
            highlight
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              transform: "none",
            }}
          />
        </div>
        <ActNode
          slug="module-formal-systems-intro"
          audience={audience}
          field={field}
          style={{
            top: "18%",
            left: "14%",
            width: "4rem",
            aspectRatio: "928 / 1152",
            transform: "translate(-50%, -50%)",
          }}
        />
        <ActNode
          slug="order-of-service-structured-units"
          audience={audience}
          field={field}
          style={{
            top: "18%",
            left: "86%",
            width: "4rem",
            aspectRatio: "927 / 1152",
            transform: "translate(-50%, -50%)",
          }}
        />
        <ActNode
          slug="formal-design-systems-split-flow"
          audience={audience}
          field={field}
          style={{
            top: "82%",
            left: "14%",
            width: "4rem",
            aspectRatio: "1312 / 816",
            transform: "translate(-50%, -50%)",
          }}
        />
        <ActNode
          slug="email-thread-multi-participant"
          audience={audience}
          field={field}
          style={{
            top: "82%",
            left: "86%",
            width: "4rem",
            aspectRatio: "927 / 1152",
            transform: "translate(-50%, -50%)",
          }}
        />
        <ActNode
          slug="podcast-card-abstract-structures"
          audience={audience}
          field={field}
          style={{
            top: "50%",
            left: "6%",
            width: "4rem",
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
          }}
        />
        <ActNode
          slug="cover-principles-design-fragmentation"
          audience={audience}
          field={field}
          style={{
            top: "50%",
            left: "94%",
            width: "4rem",
            aspectRatio: "928 / 1152",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      <div data-activation-side="answer" className="bg-card p-4">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-primary">
          Answer · grounded in your work
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Formation for bi-vocational teams</strong> rests on
          three moves from your corpus—reframe time as formation (Ch. 4,{" "}
          <em className="not-italic">Fragments of Form</em>), cluster practices into recurring
          rhythms (Module · Formal Systems), and anchor the rhythm with one shared artifact the
          whole team re-reads weekly.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          {["Ch. 4", "Module 3", "Ep. 12 · 04:12", "Email · 7 Mar"].map((t) => (
            <span key={t} className="rounded-full bg-muted px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="col-span-full flex flex-wrap items-center gap-2 bg-section px-4 py-3 text-sm lg:col-span-3">
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-xs font-medium text-primary">
          Ask
        </span>
        <span className="text-foreground">
          How do we frame formation for a bi-vocational team?
        </span>
        <span className="ml-auto rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
          14 sources
        </span>
      </div>
    </div>
  );
}

function SystemsRow() {
  const systems: Array<{ label: string; kind: "info" | "rel"; sub: string }> = [
    { label: "CMS", kind: "info", sub: "Content · versioned" },
    { label: "LMS", kind: "info", sub: "Courses · cohorts" },
    { label: "Database", kind: "info", sub: "Schema · graph" },
    { label: "CRM", kind: "rel", sub: "Identity · memory" },
    { label: "Comms", kind: "rel", sub: "Threaded · in-context" },
    { label: "Directory", kind: "rel", sub: "People · roles" },
  ];
  return (
    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {systems.map((s) => (
        <div
          key={s.label}
          className={cn(
            "rounded-[var(--radius-md)] p-4 shadow-ambient",
            s.kind === "info" ? "bg-card" : "bg-primary/[0.06]"
          )}
        >
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-eyebrow",
              s.kind === "info" ? "text-muted-foreground" : "text-primary"
            )}
          >
            {s.kind === "info" ? "Informational" : "Relational"}
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">{s.label}</p>
          <p className="mt-1 text-xs leading-snug text-muted-foreground">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}

export function FragmentationStoryStageActivation({
  audience,
  field,
}: {
  audience: AudienceId;
  field: IntelligenceField;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const vizRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const viz = vizRef.current;
    if (!section || !viz || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 63.999rem)").matches;
    if (reduced || narrow) return;

    gsap.registerPlugin(ScrollTrigger);

    const lines = viz.querySelectorAll<SVGLineElement>("[data-activation-spoke]");
    lines.forEach((ln) => {
      const len = ln.getTotalLength?.() ?? 60;
      ln.style.strokeDasharray = `${len}`;
      ln.style.strokeDashoffset = `${len}`;
    });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "center 38%",
          scrub: 0.75,
        },
      });
      tl.to(
        lines,
        {
          strokeDashoffset: 0,
          ease: "power1.inOut",
          stagger: 0.05,
          duration: 1,
        },
        0
      );
      const hub = viz.querySelector<HTMLElement>("[data-activation-hub]");
      if (hub) {
        tl.fromTo(
          hub,
          { scale: 0.94, opacity: 0.82 },
          { scale: 1, opacity: 1, duration: 0.85, ease: "power2.out" },
          0.12
        );
      }
      const sides = viz.querySelectorAll<HTMLElement>("[data-activation-side]");
      if (sides.length) {
        tl.fromTo(
          sides,
          { opacity: 0.55, y: 6 },
          { opacity: 1, y: 0, ease: "power2.out", stagger: 0.1, duration: 0.65 },
          0.08
        );
      }
    }, section);

    return () => ctx.revert();
  }, [audience, field]);

  return (
    <Section ref={sectionRef} id="stage-activation" variant="section" spacing="lg">
      <Container>
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
            {ACTIVATION_COPY.eyebrow}
          </p>
          <h2 className="text-balance text-3xl tracking-tight sm:text-4xl">
            {ACTIVATION_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {ACTIVATION_COPY.lede}
          </p>
        </header>
        <ActivationWorkspace audience={audience} field={field} vizRef={vizRef} />
        <SystemsRow />
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {ACTIVATION_COPY.captions.map((c) => (
            <div
              key={c.t}
              className="rounded-[var(--radius-md)] bg-card p-5 text-left shadow-ambient"
            >
              <p className="text-sm font-semibold text-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.b}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
