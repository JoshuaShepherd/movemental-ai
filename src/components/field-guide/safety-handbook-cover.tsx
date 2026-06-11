import Image from "next/image";

import {
  SAFETY_HANDBOOK_COVER_ALT,
  SAFETY_HANDBOOK_COVER_IMAGE,
  SAFETY_HANDBOOK_COVER_HEIGHT,
  SAFETY_HANDBOOK_COVER_WIDTH,
} from "@/lib/safety-field-guide";
import { cn } from "@/lib/utils";

export type SafetyHandbookCoverProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/** Canonical raster cover for the Safety stage lead magnet (AI Safety Guidebook). */
export function SafetyHandbookCover({
  className,
  priority = false,
  sizes = "(max-width: 640px) 72vw, 280px",
}: SafetyHandbookCoverProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-765/1024 w-full max-w-70 overflow-hidden rounded-lg border border-border shadow-ambient",
        className,
      )}
    >
      <Image
        src={SAFETY_HANDBOOK_COVER_IMAGE}
        alt={SAFETY_HANDBOOK_COVER_ALT}
        width={SAFETY_HANDBOOK_COVER_WIDTH}
        height={SAFETY_HANDBOOK_COVER_HEIGHT}
        sizes={sizes}
        className="h-full w-full object-cover"
        priority={priority}
      />
    </div>
  );
}
