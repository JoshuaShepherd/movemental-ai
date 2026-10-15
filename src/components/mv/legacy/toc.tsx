"use client";

import { useEffect, useState } from "react";

/** Sticky contents list with a scroll spy. Items are in-page anchors. */
export function MvToc({
  label,
  items,
}: {
  label: string;
  items: readonly { id: string; text: string; depth?: number }[];
}) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  if (!items.length) return <div />;
  return (
    <nav className="mv-rd-toc" aria-label={label}>
      <p className="mv-rd-toc-label">{label}</p>
      {items.map((i) => (
        <a
          key={i.id}
          className="mv-rd-toc-link"
          data-depth={i.depth ?? 2}
          href={`#${i.id}`}
          aria-current={active === i.id ? "true" : undefined}
        >
          {i.text}
        </a>
      ))}
    </nav>
  );
}
