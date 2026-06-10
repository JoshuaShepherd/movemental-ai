"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import type { NarrativeIntelSlug } from "@/components/intel-artifacts/types";

import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";

import {
  type AudienceId,
  FORMATION_COPY,
  FORMATION_RELATIONAL_STOPS,
  type IntelligenceField,
} from "./fragmentation-story-content";
import { FragmentationIntelArtifact } from "./fragmentation-story-intel-artifact";

const INFORMATIONAL_STOPS: Array<{
  t: string;
  l: string;
  slug: NarrativeIntelSlug;
  ar: string;
  label: string;
}> = [
  { t: "58%", l: "6%", slug: "order-of-service-structured-units", ar: "927/1152", label: "Dissonance" },
  { t: "32%", l: "25%", slug: "book-fragments-of-form", ar: "896/1200", label: "Action" },
  { t: "56%", l: "44%", slug: "sketch-converge-diverge-flow", ar: "1/1", label: "Reflection" },
  { t: "36%", l: "64%", slug: "module-formal-systems-intro", ar: "928/1152", label: "Community" },
  { t: "48%", l: "83%", slug: "session-essential-structures-card", ar: "928/1152", label: "Local Embodied Practice" },
];

export function FragmentationStoryStageFormation({
  audience,
  field,
}: {
  audience: AudienceId;
  field: IntelligenceField;
}) {
  const formationRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const formEl = formationRef.current;
    if (!formEl) return;

    const trail = formEl.querySelector<SVGPathElement>(".pathway-trail");
    const relTrail = formEl.querySelector<SVGPathElement>(".pathway-rel-trail");
    const stops = formEl.querySelectorAll<HTMLElement>("[data-path-stop]");
    const relStops = formEl.querySelectorAll<HTMLElement>("[data-rel-stop]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!trail) return;

    const len = trail.getTotalLength();
    trail.style.strokeDasharray = `${len}`;
    trail.style.strokeDashoffset = `${len}`;

    if (relTrail) {
      const rlen = relTrail.getTotalLength();
      relTrail.style.strokeDasharray = `${rlen}`;
      relTrail.style.strokeDashoffset = `${rlen}`;
    }

    if (reduced) {
      trail.style.strokeDashoffset = "0";
      if (relTrail) relTrail.style.strokeDashoffset = "0";
      gsap.set(stops, { opacity: 1, y: 0, scale: 1 });
      gsap.set(relStops, { opacity: 1, y: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(stops, { opacity: 0.35, y: 14, scale: 0.94 });
    gsap.set(relStops, { opacity: 0.35, y: -8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formEl,
        start: "top 70%",
        end: "bottom 50%",
        scrub: 0.6,
      },
    });
    tl.to(trail, { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" }, 0);
    if (relTrail) {
      tl.to(relTrail, { strokeDashoffset: 0, duration: 1.2, ease: "power1.inOut" }, 0.15);
    }
    tl.fromTo(
      stops,
      { opacity: 0.35, y: 14, scale: 0.94 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.12,
        duration: 0.45,
        ease: "power2.out",
      },
      0.1
    );
    if (relStops.length > 0) {
      tl.fromTo(
        relStops,
        { opacity: 0.35, y: -8 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.35,
          ease: "power2.out",
        },
        0.25
      );
    }

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.removeEventListener("load", onLoad);
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [audience, field]);

  return (
    <Section id="stage-formation" variant="midnight" spacing="lg">
      <Container>
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
            {FORMATION_COPY.eyebrow}
          </p>
          <h2 className="text-balance text-3xl tracking-tight text-inverse-foreground sm:text-4xl">
            {FORMATION_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-inverse-foreground/75">
            {FORMATION_COPY.lede}
          </p>
        </header>

        <div ref={formationRef} className="relative mx-auto aspect-[1000/560] w-full max-w-4xl">
          <svg
            className="absolute inset-0 h-full w-full text-inverse-foreground/25"
            viewBox="0 0 1000 560"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <filter id="formation-glow" x="-10%" y="-20%" width="120%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="formation-info-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" className="text-pathway-accent" />
                <stop offset="40%" stopColor="currentColor" stopOpacity="1" className="text-pathway-accent" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.75" className="text-pathway-accent" />
              </linearGradient>
              <linearGradient id="formation-rel-grad" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" className="text-pathway-accent" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0.85" className="text-pathway-accent" />
              </linearGradient>
            </defs>

            {/* Informational arc — ghost guide */}
            <path
              d="M 60 255 Q 155 120, 250 141 Q 345 170, 440 247 Q 540 280, 640 158 Q 740 120, 830 211"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Informational arc — glowing trail that draws on scroll */}
            <path
              className="pathway-trail"
              d="M 60 255 Q 155 120, 250 141 Q 345 170, 440 247 Q 540 280, 640 158 Q 740 120, 830 211"
              fill="none"
              stroke="url(#formation-info-grad)"
              strokeWidth="5"
              strokeLinecap="round"
              filter="url(#formation-glow)"
            />

            {/* Relational arc — ghost guide */}
            <path
              d="M 60 460 L 240 440 L 440 470 L 640 440 L 830 450"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeDasharray="3 6"
              strokeLinecap="round"
            />
            {/* Relational arc — draws with a subtle glow */}
            <path
              className="pathway-rel-trail"
              d="M 60 460 L 240 440 L 440 470 L 640 440 L 830 450"
              fill="none"
              stroke="url(#formation-rel-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#formation-glow)"
            />
          </svg>

          {INFORMATIONAL_STOPS.map((stop, i) => (
            <div
              key={stop.label}
              data-path-stop
              className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 opacity-[0.35] will-change-transform motion-reduce:opacity-100"
              style={{ top: stop.t, left: stop.l }}
            >
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-eyebrow text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient">
                <div
                  className="relative isolate w-full"
                  style={{ aspectRatio: stop.ar.replace("/", " / ") }}
                >
                  <div className="absolute inset-0 min-h-0 min-w-0">
                    <FragmentationIntelArtifact
                      slug={stop.slug}
                      audience={audience}
                      field={field}
                      variant="thumb"
                      embedded
                      className="h-full w-full"
                      aria-label=""
                    />
                  </div>
                </div>
              </div>
              <span className="text-center text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/70">
                {stop.label}
              </span>
            </div>
          ))}

          {FORMATION_RELATIONAL_STOPS.map((stop, i) => (
            <div
              key={stop.label}
              data-rel-stop
              className="absolute flex w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 opacity-[0.35] will-change-transform motion-reduce:opacity-100"
              style={{ top: stop.t, left: stop.l }}
            >
              <span className="rounded-full bg-inverse-foreground/15 px-2 py-0.5 text-xs font-semibold uppercase tracking-eyebrow text-inverse-foreground/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative w-full overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient">
                <div
                  className="relative isolate w-full"
                  style={{ aspectRatio: stop.ar.replace("/", " / ") }}
                >
                  <div className="absolute inset-0 min-h-0 min-w-0">
                    <FragmentationIntelArtifact
                      slug={stop.slug}
                      audience={audience}
                      field={field}
                      variant="thumb"
                      embedded
                      className="h-full w-full"
                      aria-label=""
                    />
                  </div>
                </div>
              </div>
              <span className="text-center text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/70">
                {stop.label}
              </span>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/50">
          Top · Informational formation &nbsp;·&nbsp; Bottom · Relational formation
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
          {FORMATION_COPY.captions.map((c) => (
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
      </Container>
    </Section>
  );
}
