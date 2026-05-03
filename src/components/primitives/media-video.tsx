import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * 16:9 embed shell + caption — transcript link optional (DESIGN.md motion / a11y).
 * Pass the embed as `children` (e.g. iframe with `title`); do not autoplay with sound.
 */
export function MediaVideo({
  className,
  title,
  description,
  transcriptHref,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  title: string;
  description?: string;
  transcriptHref?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      data-slot="media-video"
      className={cn("mx-auto w-full max-w-4xl", className)}
      {...props}
    >
      <div className="overflow-hidden rounded-xl bg-card shadow-ambient">
        <div className="aspect-video w-full">{children}</div>
      </div>
      <figcaption className="mt-4 px-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description ? (
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {transcriptHref ? (
          <p className="mt-2">
            <a
              href={transcriptHref}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Transcript
            </a>
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
