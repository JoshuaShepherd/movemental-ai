import * as React from "react";

import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { cn } from "@/lib/utils";

export type EditorialShowcaseIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  /** Stitch galleries often use a primary overline; muted matches Eyebrow default. */
  eyebrowTone?: "primary" | "muted";
  /** Landmark element for the title (use h2 when the page already has an h1). */
  titleAs?: React.ElementType;
  className?: string;
};

/**
 * Page-level intro from the Stitch design galleries (card / nav / hero showcases).
 * Composes primitives so typography stays on the DESIGN.md scale.
 */
export function EditorialShowcaseIntro({
  eyebrow,
  title,
  description,
  align = "left",
  eyebrowTone = "primary",
  titleAs = "h1",
  className,
}: EditorialShowcaseIntroProps) {
  return (
    <header
      className={cn(
        "mb-16 md:mb-24",
        align === "center" && "text-center",
        className
      )}
    >
      <Eyebrow
        className={cn(
          "mb-4 font-bold tracking-eyebrow",
          eyebrowTone === "primary"
            ? "text-primary"
            : "text-muted-foreground"
        )}
      >
        {eyebrow}
      </Eyebrow>
      <Display
        as={titleAs}
        size="lg"
        className={cn(
          "max-w-3xl text-balance text-foreground",
          align === "center" && "mx-auto"
        )}
      >
        {title}
      </Display>
      <p
        className={cn(
          "mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:mt-8",
          align === "center" && "mx-auto"
        )}
      >
        {description}
      </p>
    </header>
  );
}
