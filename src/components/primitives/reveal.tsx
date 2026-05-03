"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Reveal — scroll-triggered entrance animation (MOTION.md §3.2).
 *
 * Wraps content and plays a `fade-up` entrance when it enters the viewport.
 * Uses IntersectionObserver, fires once, and fully respects
 * `prefers-reduced-motion: reduce`.
 *
 * ## Stagger
 *
 * Pass `stagger` to apply incremental `transition-delay` to each direct
 * child. Each child receives `--reveal-delay: <index * stagger-step>ms`
 * which is consumed by the CSS transition. Cap: 6 children max stagger
 * (performance budget from MOTION.md §5).
 */
export function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as: Component = "div",
  ...props
}: React.ComponentProps<"div"> & {
  /** Stagger direct children by --duration-stagger (80ms) each. */
  stagger?: boolean;
  /** Extra delay in ms before the entrance starts. */
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setPrefersReducedMotion(true);
      setIsVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // If reduced-motion is on, render children immediately with no wrapper overhead.
  if (prefersReducedMotion) {
    return (
      <Component
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-reveal ease-out",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-5 opacity-0",
        className
      )}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      {...props}
    >
      {stagger
        ? React.Children.map(children, (child, i) => {
            if (!React.isValidElement(child)) return child;
            const staggerDelay = i * 80; // --duration-stagger
            const totalDelay = delay + staggerDelay;
            return (
              <div
                className={cn(
                  "transition-[opacity,transform] duration-[500ms] ease-out",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                )}
                style={{ transitionDelay: `${totalDelay}ms` }}
              >
                {child}
              </div>
            );
          })
        : children}
    </Component>
  );
}
