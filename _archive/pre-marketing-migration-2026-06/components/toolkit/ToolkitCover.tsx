import Image from "next/image";
import type { ReactNode } from "react";

import {
  SAFETY_FIELD_GUIDE_COVER_IMAGE,
  SAFETY_FIELD_GUIDE_DISPLAY_TITLE,
} from "@/lib/safety-field-guide";
import { cn } from "@/lib/utils";

export type ToolkitCoverAppearance = "raster" | "typographic";

/**
 * Field guide cover — defaults to raster artwork (`appearance="raster"`).
 * Use `typographic` for design-review fixtures or when imagery must not load
 * (e.g. Sandbox Vol. 2 cover is pending NB2 generation).
 */
export function ToolkitCover({
  className,
  size = "lg",
  /** Footer strip (e.g. Stage 01 · Vol. 01). Shown only on the typographic variant. */
  stageFoot = "Stage 01",
  appearance = "raster",
  coverSrc = SAFETY_FIELD_GUIDE_COVER_IMAGE,
  /** Override the typographic title. Defaults to "It Starts With Safety". */
  title,
  /** Override the typographic subtitle. */
  subtitle = "A sixteen-page protocol for organizational leaders.",
  /** Eyebrow above the title in the typographic variant. */
  eyebrow = "Movemental Field Guide",
  /** ARIA label override for the raster variant. */
  ariaLabel,
}: {
  className?: string;
  size?: "sm" | "lg";
  stageFoot?: string;
  appearance?: ToolkitCoverAppearance;
  /** Override raster image (e.g. A/B variants under `/images/books/`). */
  coverSrc?: string;
  title?: ReactNode;
  subtitle?: string;
  eyebrow?: string;
  ariaLabel?: string;
}) {
  const titleNode: ReactNode = title ?? (
    <>
      It Starts<br />With Safety
    </>
  );
  const titleAria =
    typeof title === "string" ? title : SAFETY_FIELD_GUIDE_DISPLAY_TITLE;

  if (appearance === "typographic") {
    return (
      <div
        className={cn(
          "relative flex aspect-[3/4] w-full flex-col items-center justify-center overflow-hidden bg-section text-foreground shadow-ambient",
          className,
        )}
        role="img"
        aria-label={ariaLabel ?? `"${titleAria}" — Movemental Field Guide`}
      >
        <div className="pointer-events-none absolute inset-3 border border-border" aria-hidden />
        <div className={cn("flex w-full flex-col items-center px-6 text-center", size === "lg" ? "gap-6" : "gap-3")}>
          <span
            className={cn(
              "block font-medium uppercase tracking-eyebrow text-muted-foreground",
              size === "lg" ? "text-[11px]" : "text-[9px]",
            )}
          >
            {eyebrow}
          </span>
          <h3
            className={cn(
              "font-serif-display italic leading-[0.92] tracking-tight",
              size === "lg" ? "text-4xl md:text-[2.75rem]" : "text-2xl",
            )}
          >
            {titleNode}
          </h3>
          <span className={cn("block h-px w-10 bg-border", size === "lg" ? "my-2" : "my-1")} aria-hidden />
          <p
            className={cn(
              "max-w-[22ch] text-muted-foreground",
              size === "lg" ? "text-xs" : "text-[10px]",
            )}
          >
            {subtitle}
          </p>
        </div>
        <span
          className={cn(
            "absolute bottom-6 max-w-[90%] px-2 text-center text-[10px] font-medium uppercase tracking-eyebrow text-muted-foreground",
          )}
          aria-hidden
        >
          {stageFoot}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden shadow-ambient aspect-video",
        size === "sm" ? "rounded-lg" : "rounded-xl",
        className,
      )}
      role="img"
      aria-label={ariaLabel ?? `"${titleAria}" — Movemental Field Guide cover`}
    >
      <Image
        src={coverSrc}
        alt={`${titleAria} — Movemental Field Guide cover`}
        fill
        sizes={size === "sm" ? "128px" : "(max-width: 1024px) 90vw, 520px"}
        className="object-cover"
        priority={false}
      />
    </div>
  );
}
