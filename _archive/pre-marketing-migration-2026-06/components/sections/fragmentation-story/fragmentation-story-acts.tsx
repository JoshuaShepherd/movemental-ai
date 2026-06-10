"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Container } from "@/components/primitives/container";
import { cn } from "@/lib/utils";

import {
  type AudienceId,
  CHAPTER_INLINE,
  getChaptersFor,
  type ChapterId,
  type IntelligenceField,
  splitEmphasis,
} from "./fragmentation-story-content";
import { FragmentationIntelArtifact } from "./fragmentation-story-intel-artifact";
import { FragmentationStoryStageLayers } from "./fragmentation-story-stage-layers";

type Props = {
  audience: AudienceId;
  field: IntelligenceField;
  onActiveChapterChange?: (id: ChapterId) => void;
};

/** Chapters that own a sticky-stage composite (fragmentation-sticky-mockup per-artifact scrub). */
const STAGE_SCRUB_CHAPTER_IDS = [
  "unity",
  "session",
  "first-break",
  "divergence",
  "channels",
  "misalignment",
] as const satisfies readonly ChapterId[];

export function FragmentationStoryActs({
  audience,
  field,
  onActiveChapterChange,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<ChapterId>("unity");
  const chapters = getChaptersFor(audience, field);

  const onActiveRef = useRef(onActiveChapterChange);
  useEffect(() => {
    onActiveRef.current = onActiveChapterChange;
  }, [onActiveChapterChange]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const desktop = window.matchMedia("(min-width: 64rem)").matches;
    if (reduced || !desktop) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /** Browser timer id; avoid `ReturnType<typeof setTimeout>` (Node types = `Timeout`, DOM = `number`). */
    let resizeTimer: number | undefined;
    const scheduleRefresh = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    };
    window.addEventListener("resize", scheduleRefresh, { passive: true });
    const dockEl = document.getElementById("audience-dock");
    const dockRo =
      dockEl && typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => scheduleRefresh())
        : null;
    if (dockRo && dockEl) {
      dockRo.observe(dockEl);
    }

    const ctx = gsap.context(() => {
      const articles = root.querySelectorAll<HTMLElement>("article[data-chapter]");
      articles.forEach((article) => {
        const id = article.dataset.chapter as ChapterId | undefined;
        if (!id) return;
        ScrollTrigger.create({
          trigger: article,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            setActive(id);
            onActiveRef.current?.(id);
          },
          onEnterBack: () => {
            setActive(id);
            onActiveRef.current?.(id);
          },
        });
      });

      /* Per-chapter scrubbed entrance on sticky stage (sticky mockup ~2920–2972) */
      const stageRoot = root.querySelector("[data-frag-stage-root]");
      if (stageRoot) {
        for (const id of STAGE_SCRUB_CHAPTER_IDS) {
          const chapter = root.querySelector<HTMLElement>(`article[data-chapter="${id}"]`);
          const layer = stageRoot.querySelector<HTMLElement>(`[data-chapter-artifact="${id}"]`);
          if (!chapter || !layer) continue;
          const cards = layer.querySelectorAll<HTMLElement>("[data-scrub-card]");
          const ghosts = layer.querySelectorAll<HTMLElement>("[data-scrub-ghost]");
          if (cards.length === 0 && ghosts.length === 0) continue;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: chapter,
              start: "top 75%",
              end: "top 25%",
              scrub: 0.8,
            },
          });
          cards.forEach((card) => {
            tl.fromTo(
              card,
              { y: 12, opacity: 0.85 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 1 },
              0
            );
          });
          ghosts.forEach((g, i) => {
            tl.fromTo(
              g,
              { y: 8, opacity: 0 },
              { y: 0, opacity: 0.55, ease: "power2.out", duration: 1 },
              0.15 + i * 0.1
            );
          });
        }
      }

      /* Chapter heading micro-motion (eyebrow + title only) */
      const articlesWithHead = root.querySelectorAll<HTMLElement>("article[data-chapter]");
      articlesWithHead.forEach((article) => {
        const heading = article.querySelector<HTMLElement>("[data-chapter-heading]");
        if (!heading) return;
        const id = article.dataset.chapter as ChapterId | undefined;
        if (!id) return;
        const parts = heading.querySelectorAll<HTMLElement>("[data-chapter-heading-bit]");
        if (parts.length === 0) return;
        gsap
          .timeline({
            scrollTrigger: {
              trigger: article,
              start: "top 72%",
              end: "top 48%",
              scrub: 0.65,
            },
          })
          .fromTo(
            parts,
            { opacity: 0.88, y: 5 },
            { opacity: 1, y: 0, ease: "power2.out", stagger: 0.08, duration: 0.6 },
            0
          );
      });
    }, root);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", scheduleRefresh);
      dockRo?.disconnect();
      window.clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, [audience, field]);

  /* Mobile / tablet: drive active chapter without ScrollTrigger (sticky stage hidden < lg). */
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 64rem)").matches;
    if (desktop && !reduced) return;

    const articles = root.querySelectorAll<HTMLElement>("article[data-chapter]");
    if (articles.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.35)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const id = (visible.target as HTMLElement).dataset.chapter as ChapterId | undefined;
        if (!id) return;
        setActive(id);
        onActiveRef.current?.(id);
      },
      { root: null, rootMargin: "-22% 0px -38% 0px", threshold: [0.2, 0.35, 0.5, 0.65] }
    );

    articles.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, [audience, field]);

  return (
    <section
      ref={rootRef}
      id="fragmentation"
      className="min-w-0 scroll-mt-40 bg-inverse-surface text-inverse-foreground lg:scroll-mt-44"
      aria-labelledby="fragmentation-acts-heading"
    >
      <h2 id="fragmentation-acts-heading" className="sr-only">
        How fragmentation unfolds
      </h2>
      <Container className="grid gap-0 lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:gap-8 lg:px-12">
        {/* Sticky stage — desktop (matches docs/build/fragmentation-sticky-mockup .frag__stage-wrap; top clears fixed nav) */}
        <aside
          className={cn(
            "relative hidden min-w-0 lg:sticky lg:top-[6.75rem] lg:z-1 lg:flex lg:h-[calc(100dvh-6.75rem)] lg:max-h-[calc(100dvh-6.75rem)]",
            "lg:min-h-0 lg:w-full lg:self-start lg:items-center lg:justify-center lg:py-12"
          )}
          aria-hidden
        >
          <div
            data-frag-stage-root
            className="relative mx-auto w-full min-w-0 max-w-[min(26rem,100%)]"
          >
            <FragmentationStoryStageLayers active={active} audience={audience} field={field} />
          </div>
        </aside>

        {/* Chapters + inline figures (always; mock .frag__copy rhythm) */}
        <div className="flex min-w-0 max-w-xl flex-col gap-0 px-4 py-12 sm:px-6 lg:max-w-xl lg:px-0 lg:py-48 lg:pb-56">
          {chapters.map((ch) => (
            <article
              key={ch.id}
              data-chapter={ch.id}
              id={`chapter-${ch.id}`}
              className="scroll-mt-40 py-10 first:pt-0 lg:scroll-mt-48 lg:py-14"
            >
              <div data-chapter-heading className="mb-4">
                <p
                  data-chapter-heading-bit
                  className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-eyebrow text-inverse-foreground/55"
                >
                  <span
                    className="h-0.5 w-6 shrink-0 rounded-full bg-inverse-foreground/35"
                    aria-hidden
                  />
                  {ch.meta}
                </p>
                <h3
                  data-chapter-heading-bit
                  className="mb-0 max-w-[42ch] text-balance text-2xl font-semibold tracking-tight text-inverse-foreground sm:text-3xl"
                >
                  {ch.title}
                </h3>
              </div>
              <figure
                className={cn(
                  "mb-6 lg:hidden",
                  CHAPTER_INLINE[ch.id].maxWidthClass ?? "max-w-sm"
                )}
              >
                <div
                  className="relative isolate overflow-hidden rounded-[var(--radius-md)] bg-card shadow-ambient"
                  style={{ aspectRatio: CHAPTER_INLINE[ch.id].aspectRatio.replace("/", " / ") }}
                >
                  <div className="absolute inset-0 min-h-0 min-w-0">
                    <FragmentationIntelArtifact
                      slug={CHAPTER_INLINE[ch.id].slug}
                      audience={audience}
                      field={field}
                      variant="thumb"
                      embedded
                      className="h-full w-full"
                      aria-label={CHAPTER_INLINE[ch.id].alt}
                    />
                  </div>
                </div>
                <figcaption className="mt-2 text-xs text-inverse-foreground/55">
                  {CHAPTER_INLINE[ch.id].alt}
                </figcaption>
              </figure>
              {ch.resolvedParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-4 max-w-[42ch] text-base leading-relaxed text-inverse-foreground/80 last:mb-6"
                >
                  {splitEmphasis(p).map((seg, j) =>
                    seg.emphasis ? (
                      <strong
                        key={j}
                        className="font-semibold text-inverse-foreground"
                      >
                        {seg.text}
                      </strong>
                    ) : (
                      <span key={j}>{seg.text}</span>
                    )
                  )}
                </p>
              ))}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
