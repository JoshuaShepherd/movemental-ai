"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { MovementalLogo } from "@/components/brand/movemental-logo";
import type { DeckData } from "@/components/agent-room/deck/deck-types";

interface DeckPresentationViewProps {
  deck: DeckData;
  backHref: string;
}

export function DeckPresentationView({ deck, backHref }: DeckPresentationViewProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = deck.slides.length;
  const slide = deck.slides[currentSlideIndex];

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(totalSlides - 1, prev + 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)]">
      {/* Header */}
      <header className="flex h-[3.6rem] items-center justify-between border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)]/90 px-4 backdrop-blur-md sm:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <MovementalLogo className="h-8 w-auto text-[var(--color-ink-band-ink)]" />
          </Link>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
            / {deck.navLabel}
          </span>
        </div>
        <Link
          href={backHref}
          className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
        >
          ✕ Close
        </Link>
      </header>

      {/* Slide Presentation Canvas */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="relative flex min-h-[440px] w-full max-w-4xl flex-col justify-between rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-8 shadow-sm sm:p-14">
          <div>
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-blue)] font-semibold">
                {slide.eyebrow}
              </p>
              <span className="font-mono text-xs text-[var(--color-ink-band-ink-muted)]">
                {String(currentSlideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </span>
            </div>

            <h1 className="mt-4 font-serif text-2xl font-medium sm:text-4xl lg:text-5xl text-[var(--color-ink-band-ink)] leading-tight">
              {slide.heading}
            </h1>

            {slide.body && slide.body.length > 0 && (
              <div className="mt-6 space-y-4 text-base sm:text-lg text-[var(--color-ink-band-ink-muted)] leading-relaxed max-w-2xl">
                {slide.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}

            {slide.parts && slide.parts.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {slide.parts.map((part) => (
                  <div key={part.n} className="rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-4">
                    <span className="font-mono text-xs text-[var(--color-ink-band-blue)]">{part.n}</span>
                    <h4 className="font-serif text-sm font-semibold mt-1">{part.title}</h4>
                    <p className="text-xs text-[var(--color-ink-band-ink-muted)] mt-1">{part.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="mt-10 flex items-center justify-between border-t border-[var(--color-ink-band-border)] pt-6">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="rounded-full border border-[var(--color-ink-band-border)] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink)] transition hover:bg-[var(--color-ink-band-surface)] disabled:opacity-30"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={nextSlide}
                disabled={currentSlideIndex === totalSlides - 1}
                className="rounded-full border border-[var(--color-ink-band-border)] px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink)] transition hover:bg-[var(--color-ink-band-surface)] disabled:opacity-30"
              >
                Next →
              </button>
            </div>

            {/* Slide Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {deck.slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === currentSlideIndex
                      ? "w-6 bg-[var(--color-ink-band-blue)]"
                      : "w-2 bg-[var(--color-ink-band-border)] hover:bg-[var(--color-ink-band-ink-muted)]"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <p className="hidden md:block font-mono text-[10px] uppercase text-[var(--color-ink-band-ink-muted)]">
              Use arrow keys ← →
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
