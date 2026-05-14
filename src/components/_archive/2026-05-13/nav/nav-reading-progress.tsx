"use client";

import * as React from "react";

/**
 * Medium-style scroll depth indicator under the fixed header (nav-01 parity).
 * Respects `prefers-reduced-motion`: bar stays hidden (0% width).
 */
export function NavReadingProgress() {
  const fillRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      if (mq.matches) {
        el.style.width = "0%";
        return;
      }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        max <= 0 ? 0 : Math.max(0, Math.min(100, (window.scrollY / max) * 100));
      el.style.width = `${pct}%`;
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    mq.addEventListener("change", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none h-[var(--site-nav-progress-height,2px)] w-full overflow-hidden bg-editorial-border/30 dark:bg-border"
      aria-hidden
    >
      <span
        ref={fillRef}
        className="block h-full w-0 bg-primary transition-[width] duration-fast ease-out motion-reduce:transition-none"
      />
    </div>
  );
}
