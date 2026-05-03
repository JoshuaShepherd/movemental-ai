import { ArrowRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type ArrowLinkSize = "sm" | "md" | "lg";
type ArrowLinkTone = "primary" | "foreground";

/**
 * Size scale for the editorial arrow-CTA. Text size scales with the arrow
 * via an `[&_svg]:` descendant selector so the icon always sits in proportion
 * with the label. The `lg` variant is reserved for section-closing "Start
 * there" moments.
 */
const sizeClassName: Record<ArrowLinkSize, string> = {
  sm: "gap-2 text-base [&_svg]:h-4 [&_svg]:w-4",
  md: "gap-3 text-lg [&_svg]:h-5 [&_svg]:w-5",
  lg: "gap-4 text-2xl md:text-3xl [&_svg]:h-7 [&_svg]:w-7 md:[&_svg]:h-9 md:[&_svg]:w-9",
};

const toneClassName: Record<ArrowLinkTone, string> = {
  primary: "text-primary",
  foreground: "text-foreground",
};

/**
 * ArrowLink — the editorial "arrow CTA" pattern used at the end of most
 * sections. Replaces the repeated
 *
 *   <Link className="group inline-flex items-center gap-3 text-lg font-bold ...">
 *     Label
 *     <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
 *   </Link>
 *
 * boilerplate with a single call site and — importantly — ships with a
 * `focus-visible` ring (the raw <Link> pattern it replaces had none,
 * flagged by design-audit).
 *
 * Uses the `group/arrow` variant so it can be nested inside other `group`
 * wrappers (e.g. a card that has its own `group-hover` effects) without
 * collision.
 */
export function ArrowLink({
  href,
  children,
  size = "md",
  tone = "primary",
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
  size?: ArrowLinkSize;
  tone?: ArrowLinkTone;
}) {
  return (
    <Link
      href={href}
      data-slot="arrow-link"
      className={cn(
        "group/arrow inline-flex items-center rounded-sm font-bold active:opacity-80",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        sizeClassName[size],
        toneClassName[tone],
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="shrink-0 transition-transform group-hover/arrow:translate-x-1"
      />
    </Link>
  );
}
