"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface CarouselVoice {
  name: string;
  title: string;
  initials: string;
  /** 4:5 portrait under `/images/voices/*.webp` */
  imageSrc: string;
}

interface VoiceCarouselProps {
  voices: readonly CarouselVoice[];
  ariaLabel: string;
}

export function VoiceCarousel({ voices, ariaLabel }: VoiceCarouselProps) {
  const railRef = useRef<HTMLUListElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateBounds = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateBounds();
    const el = railRef.current;
    if (!el) return;
    const observer = new ResizeObserver(updateBounds);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateBounds]);

  const scroll = (direction: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card
      ? card.getBoundingClientRect().width + 16
      : el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === "next" ? step : -step,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div className="mb-6 flex items-end justify-between gap-6">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-muted-foreground">
          Movement Voices
        </p>
        <div className="flex items-center gap-2">
          <CarouselButton
            onClick={() => scroll("prev")}
            disabled={!canPrev}
            label="Previous voices"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </CarouselButton>
          <CarouselButton
            onClick={() => scroll("next")}
            disabled={!canNext}
            label="Next voices"
          >
            <ChevronRight className="size-4" aria-hidden />
          </CarouselButton>
        </div>
      </div>

      <ul
        ref={railRef}
        onScroll={updateBounds}
        aria-label={ariaLabel}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-6 md:px-6"
      >
        {voices.map((voice) => (
          <li
            key={voice.name}
            className="flex w-[19rem] shrink-0 snap-start flex-col gap-4 pt-6 sm:w-[21rem]"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-xl bg-muted shadow-sm ring-1 ring-border/60">
              <Image
                src={voice.imageSrc}
                alt={`Portrait of ${voice.name}`}
                width={960}
                height={1200}
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 304px, 336px"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-xs font-semibold tracking-tight text-foreground shadow-sm backdrop-blur-sm"
              >
                {voice.initials}
              </span>
            </div>
            <div className="flex min-h-[5.5rem] flex-col gap-1.5">
              <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground break-words">
                {voice.name}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground break-words">
                {voice.title}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CarouselButton({
  onClick,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-[opacity,border-color,color] duration-200 hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-border"
    >
      {children}
    </button>
  );
}
