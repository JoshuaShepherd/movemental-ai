"use client";

import { useEffect, useRef } from "react";

import { ROSETTE_DISPLAY } from "./rosette-display";

/**
 * Direction C, the flourish: the rosette, the italic wordmark, and the line that leaves the
 * rosette and runs out under the name. It draws itself on the first time it scrolls into view.
 * Without JavaScript, or with reduced motion, it is simply drawn.
 */
export function MvFlourish({ width = 360, className }: { width?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    el.dataset.state = "armed";
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.state = "play";
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      role="img"
      aria-label="Movemental"
      width={width}
      height={(width * 150) / 560}
      viewBox="0 0 560 150"
      className={`mv-flourish ${className ?? ""}`}
      data-state="drawn"
      style={{ display: "block", overflow: "visible" }}
    >
      <g transform="translate(16 20) scale(0.92)">
        <path
          className="mv-flourish-rose"
          d={ROSETTE_DISPLAY}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={(0.9 * 560) / (width * 0.92)}
          strokeLinejoin="round"
        />
      </g>
      <path
        className="mv-flourish-tail"
        d="M88 101 C 128 133, 196 128, 290 122 S 470 112, 528 104 C 538 102.6, 546 98, 549 90"
        pathLength={1}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <text className="mv-flourish-word" x="132" y="88">
        movemental
      </text>
    </svg>
  );
}
