"use client";

import type { ReactNode } from "react";

import { SiteNavMobileToggle } from "./site-nav-mobile-toggle";
import { ThemeToggle } from "./theme-toggle";

/**
 * Header utilities that must run on the client (theme + mobile nav state).
 * Keeps {@link SiteNav} as a server component for static link markup.
 */
export function SiteNavActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <ThemeToggle size="comfortable" />
      <SiteNavMobileToggle>{children}</SiteNavMobileToggle>
    </div>
  );
}
