import Image from "next/image";

import { IntelNarrativeArtifact } from "@/components/intel-artifacts/intel-artifact";
import type { IntelVariant, NarrativeIntelSlug } from "@/components/intel-artifacts/types";
import { cn } from "@/lib/utils";

import { getFragmentationStoryAltForSlug } from "./fragmentation-artifact-map";
import type { AudienceId, IntelligenceField } from "./fragmentation-story-content";
import {
  fragmentationStoryWebpPath,
  isFragmentationStoryWebpSlug,
  toIntelAudience,
  toIntelField,
} from "./fragmentation-story-content";

/** `sizes` for next/image when WebP thumbs fill large scatter / stage composites (not 56px strip thumbs). */
export const FRAGMENTATION_STORY_COMPOSITE_WEBP_SIZES =
  "(min-width: 1024px) min(360px, 28vw), (min-width: 768px) min(280px, 32vw), min(240px, 55vw)";

/** Hub / spoke nodes in integration stage — medium tiles, sharper than default thumb hint. */
export const FRAGMENTATION_INTEGRATION_NODE_WEBP_SIZES =
  "(min-width: 1024px) min(220px, 22vw), (min-width: 768px) min(180px, 28vw), 32vw";

export type FragmentationIntelArtifactProps = {
  slug: NarrativeIntelSlug;
  audience: AudienceId;
  field: IntelligenceField;
  variant?: IntelVariant;
  /** Overrides `sizes` for raster WebP when the slot is larger than a true thumbnail. */
  webpSizes?: string;
  className?: string;
  embedded?: boolean;
  "aria-label"?: string;
};

function webpSizesForVariant(variant: IntelVariant | undefined): string {
  if (variant === "thumb") return "96px";
  if (variant === "tile") return "(max-width: 900px) 28vw, 280px";
  return "(min-width: 1024px) min(720px, 50vw), 92vw";
}

/** Bridges story URL state (`audience`, `field`) to visuals — raster WebP when available, else intel views. */
export function FragmentationIntelArtifact({
  slug,
  audience,
  field,
  variant = "full",
  webpSizes,
  className,
  embedded,
  "aria-label": ariaLabel,
}: FragmentationIntelArtifactProps) {
  if (isFragmentationStoryWebpSlug(slug)) {
    const explicit = ariaLabel?.trim();
    const decorative = Boolean(embedded && !explicit);
    const alt = decorative ? "" : (explicit ?? getFragmentationStoryAltForSlug(slug));
    return (
      <div className={cn("relative isolate h-full min-h-0 w-full min-w-0", className)}>
        <Image
          src={fragmentationStoryWebpPath(slug)}
          alt={alt}
          fill
          sizes={webpSizes ?? webpSizesForVariant(variant)}
          className="object-cover object-center"
          aria-hidden={decorative ? true : undefined}
        />
      </div>
    );
  }

  return (
    <IntelNarrativeArtifact
      slug={slug}
      field={toIntelField(field)}
      audience={toIntelAudience(audience)}
      variant={variant}
      className={className}
      embedded={embedded}
      aria-label={ariaLabel}
    />
  );
}
