import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type InPageTocItem = {
  href: string;
  label: string;
};

/**
 * Sticky in-page chapter nav — anchor links only (no JS required).
 * Use on long marketing pages (methodology-style, FAQ, system).
 */
export function InPageToc({
  className,
  items,
  heading = "On this page",
  ...props
}: React.ComponentProps<"nav"> & {
  items: InPageTocItem[];
  heading?: string;
}) {
  return (
    <nav
      data-slot="in-page-toc"
      aria-label={heading}
      className={cn(
        "sticky top-20 z-10 mb-10 rounded-xl bg-card/90 p-4 shadow-ambient backdrop-blur-md supports-backdrop-filter:bg-card/75",
        className
      )}
      {...props}
    >
      <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
        {heading}
      </p>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex rounded-full bg-section px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
