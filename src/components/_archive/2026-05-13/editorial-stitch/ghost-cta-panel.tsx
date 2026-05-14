import * as React from "react";

import { cn } from "@/lib/utils";

const ctaBaseClassName =
  "inline-flex w-full items-center justify-center rounded-lg border border-transparent bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-dim)_100%)] px-4 py-4 text-base font-semibold text-primary-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:py-6";

export type GhostCtaPanelProps = React.ComponentProps<"div"> & {
  title: string;
  description: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  ctaHref?: string;
};

/**
 * Centered “ghost lift” CTA slab — `shadow-ambient` + primary gradient button only.
 * Translated from Stitch card gallery §5.
 */
export function GhostCtaPanel({
  title,
  description,
  ctaLabel,
  onCtaClick,
  ctaHref,
  className,
  ...props
}: GhostCtaPanelProps) {
  const cta = ctaHref ? (
    <a href={ctaHref} className={ctaBaseClassName}>
      {ctaLabel}
    </a>
  ) : (
    <button type="button" className={ctaBaseClassName} onClick={onCtaClick}>
      {ctaLabel}
    </button>
  );

  return (
    <div
      data-slot="ghost-cta-panel"
      className={cn(
        "mx-auto max-w-2xl rounded-xl bg-card p-10 text-center shadow-ambient transition-transform duration-500 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-12",
        className
      )}
      {...props}
    >
      <h3 className="mb-6 text-2xl font-medium tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mb-10 leading-[1.75] text-muted-foreground">{description}</p>
      {cta}
    </div>
  );
}
