"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

import {
  type AudienceId,
  getClimaxCopy,
  getCostLedger,
  getScatterTilesForAudience,
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

function ScatterTilesStatic({
  audience,
  field,
  className,
}: {
  audience: AudienceId;
  field: IntelligenceField;
  className?: string;
}) {
  const tiles = useMemo(() => getScatterTilesForAudience(audience), [audience]);
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[10/16] w-full max-w-4xl md:aspect-[16/10]",
        className
      )}
    >
      {tiles.map((tile) => (
        <figure
          key={tile.key}
          className="absolute z-[1]"
          style={{
            width: tile.w,
            top: tile.t,
            left: tile.l,
            transform: `translate(-50%, -50%) rotate(${tile.rotate}deg) scale(${tile.s})`,
          }}
        >
          <div
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
          </div>
        </figure>
      ))}
    </div>
  );
}

export function FragmentationStoryScatter({ audience, field }: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const veilRef = useRef<HTMLDivElement | null>(null);
  const costRef = useRef<HTMLDivElement | null>(null);
  const climaxRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const ledger = getCostLedger(audience, field);
  const climax = getClimaxCopy();
  const scatterTiles = useMemo(() => getScatterTilesForAudience(audience), [audience]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const pin = pinRef.current;
    const fieldEl = fieldRef.current;
    const veil = veilRef.current;
    const cost = costRef.current;
    const climaxEl = climaxRef.current;
    const flash = flashRef.current;
    if (!track || !pin || !fieldEl || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const mobile = window.matchMedia("(max-width: 63.999rem)").matches;

    if (mobile) return;

    if (reduced) {
      const tiles = fieldEl.querySelectorAll<HTMLElement>("[data-scatter-tile]");
      gsap.set(tiles, { opacity: 1 });
      if (veil) gsap.set(veil, { opacity: 0 });
      if (cost) gsap.set(cost, { opacity: 0 });
      if (climaxEl) gsap.set(climaxEl, { opacity: 1 });
      if (flash) gsap.set(flash, { opacity: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tiles = Array.from(
        fieldEl.querySelectorAll<HTMLElement>("[data-scatter-tile]")
      );

      gsap.set(tiles, {
        opacity: 0,
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        rotation: 0,
        scale: 0.2,
      });
      if (veil) gsap.set(veil, { opacity: 0 });
      if (cost) gsap.set(cost, { opacity: 0 });
      if (climaxEl) gsap.set(climaxEl, { opacity: 0, y: 24, scale: 0.92 });
      if (flash) gsap.set(flash, { opacity: 0, scale: 0.4 });

      const costEyebrow = cost?.querySelector<HTMLElement>("[data-scatter-cost-eyebrow]");
      const costTitle = cost?.querySelector<HTMLElement>("[data-scatter-cost-title]");
      const costList = cost?.querySelector<HTMLElement>("[data-scatter-cost-list]");
      const costItems = costList ? Array.from(costList.querySelectorAll("li")) : [];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: track,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pin,
          anticipatePin: 1,
        },
      });

      /* Phase A — scatter emergence (fragmentation-sticky-mockup ~3007–3037) */
      tiles.forEach((tile, i) => {
        const t = tile.dataset.t ?? "50%";
        const l = tile.dataset.l ?? "50%";
        const r = Number(tile.dataset.rotate ?? "0");
        const s = Number(tile.dataset.s ?? "1");
        tl.fromTo(
          tile,
          {
            opacity: 0,
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
            scale: 0.2,
          },
          {
            opacity: 1,
            top: t,
            left: l,
            xPercent: -50,
            yPercent: -50,
            rotation: r,
            scale: s,
            ease: "power2.out",
            duration: 0.22,
          },
          (i / Math.max(tiles.length, 1)) * 0.18
        );
      });

      /* Phase C — veil + cost (mock ~3046–3095) */
      if (veil) {
        tl.fromTo(
          veil,
          { opacity: 0 },
          { opacity: 1, ease: "power1.out", duration: 0.12 },
          0.36
        );
      }
      tl.to(
        tiles,
        { opacity: 0.45, ease: "power1.out", duration: 0.12 },
        0.36
      );
      if (cost) {
        tl.fromTo(cost, { opacity: 0 }, { opacity: 1, ease: "power1.out", duration: 0.06 }, 0.38);
      }
      if (costEyebrow) {
        tl.fromTo(
          costEyebrow,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.08 },
          0.4
        );
      }
      if (costTitle) {
        tl.fromTo(
          costTitle,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, ease: "power3.out", duration: 0.1 },
          0.42
        );
      }
      costItems.forEach((li, i) => {
        tl.fromTo(
          li,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.out", duration: 0.08 },
          0.48 + i * 0.03
        );
      });

      /* Phase E — cost exits, veil lifts, tiles flash full opacity before implode (mock ~3106–3130) */
      const costOutEls = [costTitle, costList, costEyebrow].filter(Boolean) as HTMLElement[];
      if (costOutEls.length > 0) {
        tl.to(
          costOutEls,
          { y: -16, opacity: 0, ease: "power2.in", duration: 0.06 },
          0.72
        );
      }
      if (cost) tl.to(cost, { opacity: 0, ease: "power1.in", duration: 0.06 }, 0.76);
      if (veil) tl.to(veil, { opacity: 0, ease: "power1.in", duration: 0.08 }, 0.76);
      tl.to(tiles, { opacity: 1, ease: "power1.out", duration: 0.05 }, 0.76);

      /* Phase F — implosion (mock ~3134–3150) */
      tiles.forEach((tile, i) => {
        tl.to(
          tile,
          {
            top: "50%",
            left: "50%",
            scale: 0,
            rotation: (i % 2 === 0 ? 1 : -1) * 18,
            opacity: 0,
            ease: "power3.in",
            duration: 0.14,
          },
          0.78 + (i % 5) * 0.008
        );
      });

      if (flash) {
        tl.fromTo(
          flash,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1.4, ease: "power2.out", duration: 0.1 },
          0.84
        );
      }
      if (climaxEl) {
        tl.fromTo(
          climaxEl,
          { opacity: 0, scale: 0.92, y: 24 },
          { opacity: 1, scale: 1, y: 0, ease: "power3.out", duration: 0.1 },
          0.9
        );
      }
      if (flash) {
        tl.to(
          flash,
          { opacity: 0.55, scale: 1.6, ease: "power2.out", duration: 0.1 },
          0.94
        );
      }
    }, track);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      ctx.revert();
    };
  }, [audience, field]);

  return (
    <section
      id="scatter"
      className="min-w-0 bg-inverse-surface text-inverse-foreground"
      aria-label="All of it, all at once"
    >
      {/* Mobile / narrow: stacked narrative, no pin */}
      <div className="flex min-w-0 flex-col gap-12 px-4 py-16 sm:px-6 lg:hidden">
        <ScatterTilesStatic audience={audience} field={field} />
        <div className="mx-auto max-w-md text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60">
            {ledger.eyebrow}
          </span>
          <h2 className="mb-6 whitespace-pre-line text-balance text-2xl tracking-tight text-inverse-foreground">
            {ledger.title}
          </h2>
          <ul className="space-y-3 text-left text-sm leading-relaxed text-inverse-foreground/85">
            {ledger.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mx-auto max-w-md text-center">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-eyebrow text-pathway-accent">
            {climax.eyebrow}
          </span>
          <h2 className="mb-4 text-2xl tracking-tight text-inverse-foreground sm:text-3xl">
            {climax.titleBefore}
            <br />
            <em className="font-semibold not-italic text-pathway-accent">
              {climax.titleEmphasis}
            </em>
          </h2>
          <p className="text-sm leading-relaxed text-inverse-foreground/80">{climax.sub}</p>
        </div>
      </div>

      {/* Desktop: tall track + pinned viewport (fragmentation-sticky-mockup .scatter__track / .scatter__pin) */}
      <div
        ref={trackRef}
        className="relative hidden min-h-0 lg:block lg:min-h-[560vh]"
      >
        <div
          ref={pinRef}
          className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 py-16"
        >
          <div
            ref={flashRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            <div className="h-[min(80vw,28rem)] w-[min(80vw,28rem)] rounded-full bg-primary/25 blur-3xl" />
          </div>

          <div
            ref={fieldRef}
            className="relative aspect-[16/10] w-full max-w-4xl"
          >
            {scatterTiles.map((tile) => (
              <figure
                key={tile.key}
                data-scatter-tile
                data-t={tile.t}
                data-l={tile.l}
                data-rotate={String(tile.rotate)}
                data-s={String(tile.s)}
                className="absolute z-10 opacity-0 will-change-transform motion-reduce:opacity-100"
                style={{
                  width: tile.w,
                  top: tile.t,
                  left: tile.l,
                }}
              >
                <div
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
                </div>
              </figure>
            ))}
          </div>

          <div
            ref={veilRef}
            className="pointer-events-none absolute inset-0 z-[2] bg-inverse-surface/75 opacity-0 motion-reduce:opacity-0"
            aria-hidden
          />

          <div
            ref={costRef}
            className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-6 text-center opacity-0 motion-reduce:hidden"
          >
            <span
              data-scatter-cost-eyebrow
              className="mb-3 text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/60"
            >
              {ledger.eyebrow}
            </span>
            <h2
              data-scatter-cost-title
              className="mb-6 max-w-lg whitespace-pre-line text-balance text-3xl font-semibold tracking-tight text-inverse-foreground"
            >
              {ledger.title}
            </h2>
            <ul
              data-scatter-cost-list
              className="max-w-md space-y-3 text-left text-base leading-relaxed text-inverse-foreground/85"
            >
              {ledger.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div
            ref={climaxRef}
            className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-6 text-center opacity-0 motion-reduce:opacity-100"
          >
            <span className="mb-3 text-xs font-medium uppercase tracking-eyebrow text-pathway-accent">
              {climax.eyebrow}
            </span>
            <h2 className="mb-4 max-w-xl text-balance text-4xl tracking-tight text-inverse-foreground">
              {climax.titleBefore}
              <br />
              <em className="font-semibold not-italic text-pathway-accent">
                {climax.titleEmphasis}
              </em>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-inverse-foreground/80">
              {climax.sub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
