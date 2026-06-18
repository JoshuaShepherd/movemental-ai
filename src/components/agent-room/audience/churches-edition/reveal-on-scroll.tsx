"use client";

import { useEffect, useRef, type ReactNode } from "react";

import styles from "./churches-edition.module.css";

type RevealOnScrollProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scroll-reveal wrapper — adds `.revealIn` when the element enters the viewport.
 * Honors `prefers-reduced-motion` via CSS (elements start visible when reduced).
 */
export function RevealOnScroll({ children, className }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      el.classList.add(styles.revealIn);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealIn);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={[styles.reveal, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
