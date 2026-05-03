"use client";

import * as React from "react";

export function useElementSize<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  /** Conservative mobile-first default; real size replaces in useLayoutEffect before paint. */
  const [size, setSize] = React.useState({ width: 360, height: 288 });

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize({
        width: Math.max(280, r.width),
        height: Math.max(360, r.height),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width: size.width, height: size.height };
}
