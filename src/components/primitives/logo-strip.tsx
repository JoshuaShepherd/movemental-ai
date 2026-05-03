import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type LogoStripItem = {
  /** Accessible name (always used as fallback label). */
  name: string;
  /** Optional logo image; when omitted, a typographic pill is shown. */
  src?: string;
  href?: string;
  alt?: string;
};

/**
 * Partner / publisher strip — consistent height, muted treatment, optional links.
 * No autoplaying marquee; reserve motion for deliberate hover only.
 */
export function LogoStrip({
  className,
  items,
  heading,
  "aria-label": ariaLabel = "Trusted by",
  ...props
}: React.ComponentProps<"div"> & {
  items: LogoStripItem[];
  heading?: string;
}) {
  return (
    <div data-slot="logo-strip" className={cn("w-full", className)} {...props}>
      {heading ? (
        <p className="mb-6 text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {heading}
        </p>
      ) : null}
      <ul
        aria-label={ariaLabel}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
      >
        {items.map((item) => {
          const inner = item.src ? (
            <Image
              src={item.src}
              alt={item.alt ?? item.name}
              width={160}
              height={40}
              className="h-8 w-auto max-w-[140px] object-contain opacity-80 grayscale transition-opacity duration-200 hover:opacity-100 hover:grayscale-0"
            />
          ) : (
            <span className="rounded-full bg-secondary px-4 py-2 text-xs font-semibold tracking-wide text-secondary-foreground">
              {item.name}
            </span>
          );

          return (
            <li key={item.name} className="flex h-10 items-center justify-center">
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
