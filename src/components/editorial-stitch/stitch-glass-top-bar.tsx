import * as React from "react";

import { MobileNav } from "@/components/nav/mobile-nav";
import { SiteLogo } from "@/components/nav/site-logo";
import { cn } from "@/lib/utils";

export type StitchGlassTopBarProps = {
  className?: string;
  /** Row inside the fixed bar (max width + horizontal padding). */
  innerClassName?: string;
  /** Defaults to home-linked `SiteLogo` (Stitch HTML used a text wordmark). */
  brand?: React.ReactNode;
  /**
   * Right side of the bar. Defaults to a Stitch-style ghost menu that opens
   * the same sheet as marketing `MobileNav` (full site links + CTA).
   */
  trailing?: React.ReactNode;
  /** When false and `trailing` is unset, no trailing actions render. */
  showMenu?: boolean;
};

/**
 * Minimal fixed glass top bar from Stitch assessment / flow screens.
 *
 * Sources (HTML `TopNavBar` / “Top Navigation Shell” — same pattern):
 * - `docs/build/stitch/context_selection/code.html`
 * - `docs/build/stitch/primary_question_pattern/code.html`
 * - `docs/build/stitch/bottleneck_question/code.html`
 * - `docs/build/stitch/results_overview/code.html`
 * - `docs/build/stitch/detailed_recommendation/code.html`
 *
 * Uses DESIGN.md tokens (`bg-card/80`, `backdrop-blur-xl`, no raw hex). For
 * marketing pages under `(site)/layout.tsx`, keep using `SiteNav` instead of
 * this bar to avoid double headers; this component is for focused flows,
 * previews (`EditorialPreviewWell`), or a future assess-only layout.
 */
export function StitchGlassTopBar({
  className,
  innerClassName,
  brand,
  trailing,
  showMenu = true,
}: StitchGlassTopBarProps) {
  const resolvedTrailing =
    trailing ??
    (showMenu ? (
      <MobileNav alwaysVisible triggerVariant="ghost" />
    ) : null);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-card/80 backdrop-blur-xl",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex min-h-16 w-full max-w-(--container-max) items-center justify-between gap-4 px-4 sm:px-6 lg:px-12",
          innerClassName
        )}
      >
        <div className="flex min-w-0 shrink items-center">{brand ?? <SiteLogo />}</div>
        {resolvedTrailing ? (
          <div className="flex shrink-0 items-center gap-3">{resolvedTrailing}</div>
        ) : null}
      </div>
    </header>
  );
}
