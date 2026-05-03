"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * NavScrollShadow — wraps the `<header>` and flips `data-scrolled="true"`
 * once the user scrolls past 8px, so the child header can swap from
 * transparent to glass-on-paper (DESIGN.md §6.4).
 */
export function NavScrollShadow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div data-scrolled={scrolled} className={cn(className)}>
      {children}
    </div>
  );
}
