"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay for transition-delay (seconds), matches prototype `--d` */
  delaySec?: number;
};

/**
 * IntersectionObserver reveal (homepage-concept-modern script.js parity).
 * Immediately visible when reduced motion is requested or IO unsupported.
 */
export function RevealOnScroll({
  children,
  className,
  delaySec = 0,
}: RevealOnScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-reveal ease-out motion-reduce:opacity-100 motion-reduce:translate-y-0 motion-reduce:duration-0",
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className
      )}
      style={
        delaySec > 0
          ? ({ transitionDelay: `${delaySec}s` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
