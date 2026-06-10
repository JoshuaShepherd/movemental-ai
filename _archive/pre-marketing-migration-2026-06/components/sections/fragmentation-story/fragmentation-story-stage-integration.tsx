"use client";

import type { CSSProperties, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef } from "react";

import type { NarrativeIntelSlug } from "@/components/intel-artifacts/types";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { cn } from "@/lib/utils";

import {
  type AudienceId,
  getFullStorySnippet,
  INTEGRATION_COPY,
  type IntelligenceField,
} from "./fragmentation-story-content";
import {
  FragmentationIntelArtifact,
  FRAGMENTATION_INTEGRATION_NODE_WEBP_SIZES,
} from "./fragmentation-story-intel-artifact";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
};

const SPOKE_TARGETS: Array<[number, number]> = [
  [18, 18],
  [50, 6],
  [82, 18],
  [94, 50],
  [82, 82],
  [50, 94],
  [18, 82],
  [6, 50],
];

function IntegrationSpokeSvg() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-inverse-foreground/30"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="int-spoke" x1="50" y1="50" x2="100" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.65" className="text-pathway-accent" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {SPOKE_TARGETS.map(([x, y]) => (
        <motion.line
          key={`${x}-${y}`}
          x1="50"
          y1="50"
          x2={x}
          y2={y}
          stroke="url(#int-spoke)"
          strokeWidth="0.55"
          strokeLinecap="round"
          initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
            delay: prefersReducedMotion ? 0 : 0.15,
          }}
        />
      ))}
    </svg>
  );
}

function IntegrationHubHalo() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        background:
          "radial-gradient(closest-side, color-mix(in srgb, var(--primary) 22%, transparent) 0%, transparent 70%)",
      }}
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.25 }}
    />
  );
}

function Node({
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
      data-int-node
      className={cn(
        "absolute isolate overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient will-change-transform motion-reduce:opacity-100",
        /* Baseline legibility before/during scrub — GSAP animates to full opacity */
        "opacity-[0.4] motion-reduce:opacity-100",
        highlight && "ring-2 ring-inverse-foreground ring-offset-2 ring-offset-inverse-surface"
      )}
      style={style}
    >
      <div className="absolute inset-0 min-h-0 min-w-0">
        <FragmentationIntelArtifact
          slug={slug}
          audience={audience}
          field={field}
          variant="thumb"
          webpSizes={FRAGMENTATION_INTEGRATION_NODE_WEBP_SIZES}
          embedded
          className="h-full w-full"
          aria-label=""
        />
      </div>
    </figure>
  );
}

function IdeThumb({
  slug,
  audience,
  field,
}: {
  slug: NarrativeIntelSlug;
  audience: AudienceId;
  field: IntelligenceField;
}) {
  return (
    <span className="relative isolate block size-9 shrink-0 overflow-hidden rounded-sm bg-card">
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
    </span>
  );
}

function IdeTreeGroup({ folder, children }: { folder: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <p className="mb-1.5 font-mono text-xs text-pathway-accent">{folder}</p>
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}

function IdeFileRow({
  name,
  ext,
  slug,
  audience,
  field,
  active,
}: {
  name: string;
  ext: string;
  slug: NarrativeIntelSlug;
  audience: AudienceId;
  field: IntelligenceField;
  active?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-md px-1.5 py-1 font-mono text-xs",
        active ? "bg-primary/15 text-inverse-foreground" : "text-inverse-foreground/75"
      )}
    >
      <IdeThumb slug={slug} audience={audience} field={field} />
      <span className="min-w-0 truncate">{name}</span>
      <span className="shrink-0 text-inverse-foreground/45">.{ext}</span>
    </li>
  );
}

function IntegrationIdePanel({
  audience,
  field,
}: {
  audience: AudienceId;
  field: IntelligenceField;
}) {
  return (
    <div className="mt-10 overflow-hidden rounded-[var(--radius-md)] bg-inverse-foreground/[0.06] shadow-ambient">
      <div className="flex flex-wrap items-center gap-2 bg-inverse-foreground/[0.08] px-3 py-2.5">
        <span className="flex gap-1" aria-hidden>
          <span className="size-2.5 rounded-full bg-inverse-foreground/20" />
          <span className="size-2.5 rounded-full bg-inverse-foreground/20" />
          <span className="size-2.5 rounded-full bg-inverse-foreground/20" />
        </span>
        <span className="rounded bg-inverse-foreground/10 px-2 py-1 font-mono text-xs text-inverse-foreground/90">
          fragments-of-form.md
        </span>
        <span className="rounded px-2 py-1 font-mono text-xs text-inverse-foreground/50">
          formal-systems.md
        </span>
        <span className="rounded px-2 py-1 font-mono text-xs text-inverse-foreground/50">
          ep-12-rhythms.md
        </span>
        <span className="ml-auto font-mono text-xs text-inverse-foreground/45">
          14 files · schema v3
        </span>
      </div>
      <div className="grid max-h-[min(28rem,55vh)] grid-cols-1 divide-y divide-inverse-foreground/10 lg:max-h-none lg:grid-cols-[minmax(0,12rem)_1fr_minmax(0,11rem)] lg:divide-x lg:divide-y-0">
        <aside className="max-h-48 overflow-y-auto p-3 lg:max-h-none">
          <IdeTreeGroup folder="books/">
            <IdeFileRow
              active
              name="fragments-of-form"
              ext="md"
              slug="book-fragments-of-form"
              audience={audience}
              field={field}
            />
            <IdeFileRow
              name="principles-of-design"
              ext="md"
              slug="cover-principles-design-fragmentation"
              audience={audience}
              field={field}
            />
          </IdeTreeGroup>
          <IdeTreeGroup folder="courses/">
            <IdeFileRow
              name="formal-systems"
              ext="md"
              slug="module-formal-systems-intro"
              audience={audience}
              field={field}
            />
            <IdeFileRow
              name="essential-structures"
              ext="md"
              slug="session-essential-structures-card"
              audience={audience}
              field={field}
            />
          </IdeTreeGroup>
          <IdeTreeGroup folder="podcasts/">
            <IdeFileRow
              name="ep-12-rhythms"
              ext="md"
              slug="podcast-card-abstract-structures"
              audience={audience}
              field={field}
            />
          </IdeTreeGroup>
          <IdeTreeGroup folder="threads/">
            <IdeFileRow
              name="bi-vocational-07mar"
              ext="md"
              slug="email-thread-multi-participant"
              audience={audience}
              field={field}
            />
            <IdeFileRow
              name="cohort-chat-12mar"
              ext="md"
              slug="mobile-chat-skeleton-bubbles"
              audience={audience}
              field={field}
            />
          </IdeTreeGroup>
        </aside>
        <div className="min-h-0 overflow-x-auto bg-inverse-surface/40 p-3">
          <pre className="font-mono text-xs leading-relaxed text-inverse-foreground/85">
            <span className="text-pathway-accent">---</span>
            {"\n"}
            <span className="text-pathway-accent">title</span>: &quot;Fragments of Form&quot;
            {"\n"}
            <span className="text-pathway-accent">type</span>: book
            {"\n"}
            <span className="text-pathway-accent">slug</span>: &quot;fragments-of-form&quot;
            {"\n"}
            <span className="text-pathway-accent">author</span>: &quot;Alan Hirsch&quot;
            {"\n"}
            <span className="text-pathway-accent">published</span>: 2024-09-12
            {"\n"}
            <span className="text-pathway-accent">tags</span>: [formation, architecture, movement]
            {"\n"}
            <span className="text-pathway-accent">audiences</span>: [movement-leader, church]
            {"\n"}
            <span className="text-pathway-accent">connections</span>:{"\n"}
            {"  "}- module: &quot;formal-systems&quot;
            {"\n"}
            {"  "}- podcast: &quot;ep-12-rhythms&quot;
            {"\n"}
            {"  "}- thread: &quot;bi-vocational-07mar&quot;
            {"\n"}
            <span className="text-pathway-accent">---</span>
            {"\n\n"}
            <span className="text-base font-medium text-inverse-foreground">
              Fragments of Form
            </span>
            {"\n\n"}
            <span className="text-inverse-foreground/70">
              The cost of coherence loss in a distributed body of work isn&apos;t
              {"\n"}
              friction. It&apos;s drift — the slow, invisible migration of meaning
              {"\n"}
              away from its source until no version of the work
              {"\n"}
              agrees with any other.
            </span>
          </pre>
        </div>
        <aside className="max-h-48 overflow-y-auto p-3 lg:max-h-none">
          <p className="mb-2 text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground/55">
            Parsed schema
          </p>
          <ul className="space-y-3 text-left text-xs text-inverse-foreground/80">
            <li>
              <span className="block text-inverse-foreground/50">type</span>
              <span>book</span>
            </li>
            <li>
              <span className="block text-inverse-foreground/50">title</span>
              <span>Fragments of Form</span>
            </li>
            <li>
              <span className="block text-inverse-foreground/50">tags</span>
              <span className="mt-1 flex flex-wrap gap-1">
                {["formation", "architecture", "movement"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-inverse-foreground/10 px-1.5 py-0.5 text-xs text-inverse-foreground/85"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <span className="block text-inverse-foreground/50">audiences</span>
              <span className="mt-1 flex flex-wrap gap-1">
                {["movement-leader", "church"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-inverse-foreground/10 px-1.5 py-0.5 text-xs text-inverse-foreground/85"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <span className="block text-inverse-foreground/50">connections</span>
              <span className="mt-1 flex flex-wrap gap-1">
                {[
                  "module · formal-systems",
                  "podcast · ep-12",
                  "thread · 07mar",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-inverse-foreground/10 px-1.5 py-0.5 text-xs text-inverse-foreground/85"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </li>
            <li>
              <span className="block text-inverse-foreground/50">indexed_by</span>
              <span className="mt-1 flex flex-wrap gap-1">
                {["search", "AI", "pathway"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-inverse-foreground/10 px-1.5 py-0.5 text-xs text-inverse-foreground/85"
                  >
                    {t}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

export function FragmentationStoryStageIntegration({ audience, field }: Props) {
  const integrationRef = useRef<HTMLDivElement | null>(null);
  const snippet = getFullStorySnippet(audience, field);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const intEl = integrationRef.current;
    if (!intEl) return;

    const nodes = intEl.querySelectorAll<HTMLElement>("[data-int-node]");
    const lines = intEl.querySelectorAll<SVGLineElement>("line");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dashLines = () => {
      lines.forEach((ln) => {
        const len = Math.hypot(
          Number(ln.getAttribute("x2")) - Number(ln.getAttribute("x1")),
          Number(ln.getAttribute("y2")) - Number(ln.getAttribute("y1"))
        );
        ln.style.strokeDasharray = `${len * 1.4}`;
        ln.style.strokeDashoffset = `${len * 1.4}`;
      });
    };

    if (reduced) {
      gsap.set(nodes, { opacity: 1, scale: 1 });
      lines.forEach((ln) => {
        ln.style.strokeDasharray = "none";
        ln.style.strokeDashoffset = "0";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    dashLines();
    gsap.set(nodes, { opacity: 0.38, scale: 0.92 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: intEl,
        start: "top 72%",
        end: "bottom 40%",
        scrub: 0.6,
      },
    });
    tl.fromTo(
      nodes,
      { opacity: 0.38, scale: 0.92 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.04,
        duration: 0.4,
        ease: "power2.out",
      },
      0
    );
    tl.to(
      lines,
      { strokeDashoffset: 0, stagger: 0.02, duration: 0.6, ease: "power1.inOut" },
      0.2
    );

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [audience, field]);

  return (
    <Section
      id="stage-integration"
      variant="midnight"
      spacing="lg"
      className="scroll-mt-28"
    >
      <Container>
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
            {INTEGRATION_COPY.eyebrow}
          </p>
          <h2 className="text-balance text-3xl tracking-tight text-inverse-foreground sm:text-4xl">
            {INTEGRATION_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-inverse-foreground/75">
            {INTEGRATION_COPY.lede}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-inverse-foreground/60">
            {snippet}
          </p>
        </header>

        <div
          ref={integrationRef}
          className="relative mx-auto mb-12 aspect-[16/10] w-full max-w-4xl"
        >
          <IntegrationSpokeSvg />
          <IntegrationHubHalo />
          <Node
            slug="core-hub-to-fragment-nodes"
            audience={audience}
            field={field}
            style={{
              top: "50%",
              left: "50%",
              width: "8.5rem",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="order-of-service-structured-units"
            audience={audience}
            field={field}
            style={{
              top: "18%",
              left: "18%",
              width: "5.5rem",
              aspectRatio: "927/1152",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="book-fragments-of-form"
            audience={audience}
            field={field}
            style={{
              top: "6%",
              left: "50%",
              width: "5.75rem",
              aspectRatio: "896/1200",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="cover-principles-design-fragmentation"
            audience={audience}
            field={field}
            style={{
              top: "18%",
              left: "82%",
              width: "5.5rem",
              aspectRatio: "928/1152",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="podcast-card-abstract-structures"
            audience={audience}
            field={field}
            style={{
              top: "50%",
              left: "94%",
              width: "5.75rem",
              aspectRatio: "1",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="mobile-chat-skeleton-bubbles"
            audience={audience}
            field={field}
            style={{
              top: "82%",
              left: "82%",
              width: "5.5rem",
              aspectRatio: "928/1152",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="module-formal-systems-intro"
            audience={audience}
            field={field}
            style={{
              top: "94%",
              left: "50%",
              width: "5.75rem",
              aspectRatio: "928/1152",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="email-thread-multi-participant"
            audience={audience}
            field={field}
            style={{
              top: "82%",
              left: "18%",
              width: "5.5rem",
              aspectRatio: "927/1152",
              transform: "translate(-50%, -50%)",
            }}
          />
          <Node
            slug="formal-design-systems-split-flow"
            audience={audience}
            field={field}
            style={{
              top: "50%",
              left: "6%",
              width: "6rem",
              aspectRatio: "1312/816",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-3">
          {INTEGRATION_COPY.captions.map((c) => (
            <div
              key={c.t}
              className="rounded-[var(--radius-md)] bg-inverse-foreground/5 p-5 text-left"
            >
              <p className="text-sm font-semibold text-inverse-foreground">{c.t}</p>
              <p className="mt-2 text-sm leading-relaxed text-inverse-foreground/75">
                {c.b}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/55">
            What it looks like underneath
          </p>
          <h3 className="mt-3 text-xl tracking-tight text-inverse-foreground sm:text-2xl">
            Every artifact becomes typed content.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-inverse-foreground/70">
            The book, the module, the podcast, the thread—each gets a markdown body plus a JSON
            schema of who it relates to, what it&apos;s about, and where it lives. That&apos;s the
            information architecture powering everything that follows.
          </p>
        </div>

        <IntegrationIdePanel audience={audience} field={field} />
      </Container>
    </Section>
  );
}
