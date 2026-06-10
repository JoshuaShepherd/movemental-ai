"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed 2px bar at the top of the viewport that fills as the reader scrolls
 * through the target element (defaults to `article`). Uses `requestAnimationFrame`
 * to keep scroll work off the main thread.
 */
export function ReadingProgress({ targetSelector = "article" }: { targetSelector?: string }) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    let ticking = false;
    const update = () => {
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${Math.min(pct, 100)}%`;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetSelector]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-[2px] bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-0 bg-linear-to-r from-primary to-primary-dim transition-[width] duration-75"
      />
    </div>
  );
}
