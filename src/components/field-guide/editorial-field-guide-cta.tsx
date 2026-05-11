import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ToolkitCover } from "@/components/toolkit/ToolkitCover";
import {
  SAFETY_FIELD_GUIDE_COVER_IMAGE,
  SAFETY_FIELD_GUIDE_DISPLAY_TITLE,
} from "@/lib/safety-field-guide";
import {
  SANDBOX_FIELD_GUIDE_COVER_IMAGE,
  SANDBOX_FIELD_GUIDE_DISPLAY_TITLE,
} from "@/lib/sandbox-field-guide";
import { cn } from "@/lib/utils";

export type EditorialFieldGuideCtaVolume = "safety" | "sandbox";

type VolumeCopy = {
  eyebrow: string;
  title: string;
  pitch: string;
  ctaLabel: string;
  href: string;
  coverSrc: string;
  ariaTitle: string;
  stageFoot: string;
};

const COPY: Record<EditorialFieldGuideCtaVolume, VolumeCopy> = {
  safety: {
    eyebrow: "Movemental Field Guides · Volume One",
    title: "It Starts With Safety.",
    pitch: "Volume One. 33 pages. Read free.",
    ctaLabel: "Read Volume One",
    href: "/field-guides/safety",
    coverSrc: SAFETY_FIELD_GUIDE_COVER_IMAGE,
    ariaTitle: SAFETY_FIELD_GUIDE_DISPLAY_TITLE,
    stageFoot: "Vol. 01 · Safety",
  },
  sandbox: {
    eyebrow: "Movemental Field Guides · Volume Two",
    title: "It Continues With Exploration.",
    pitch: "Volume Two. 48 pages. Gated to organizations that have completed Safety.",
    ctaLabel: "See the Sandbox stage",
    href: "/pathway/sandbox",
    coverSrc: SANDBOX_FIELD_GUIDE_COVER_IMAGE,
    ariaTitle: SANDBOX_FIELD_GUIDE_DISPLAY_TITLE,
    stageFoot: "Vol. 02 · Sandbox",
  },
};

/**
 * Editorial CTA that points to the canonical Field Guide landing page rather
 * than capturing the email inline. Used on every page that previously embedded
 * a duplicate copy of the lead-magnet form — capture lives only on the
 * dedicated landing pages (`/field-guides/safety`, `/field-guides/sandbox`),
 * where the surrounding context supports the conversion.
 */
export function EditorialFieldGuideCta({
  volume,
  className,
  titleId,
}: {
  volume: EditorialFieldGuideCtaVolume;
  className?: string;
  /** Pass a stable id so the parent section's aria-labelledby still resolves. */
  titleId?: string;
}) {
  const copy = COPY[volume];

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16",
        className,
      )}
    >
      <div className="order-1 mx-auto w-full max-w-[280px] lg:order-1 lg:col-span-4 lg:mx-0 lg:max-w-none">
        <ToolkitCover
          coverSrc={copy.coverSrc}
          stageFoot={copy.stageFoot}
          ariaLabel={`"${copy.ariaTitle}" — Movemental Field Guide cover`}
        />
      </div>
      <div className="order-2 lg:order-2 lg:col-span-8">
        <p className="mb-4 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          {copy.eyebrow}
        </p>
        <h2
          id={titleId}
          className="mb-6 font-serif-display text-3xl italic tracking-tight text-foreground md:text-4xl"
        >
          {copy.title}
        </h2>
        <p className="mb-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          {copy.pitch}
        </p>
        <Link
          href={copy.href}
          className="group/arrow inline-flex items-center gap-3 rounded-sm text-base font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {copy.ctaLabel}
          <ArrowRight
            aria-hidden
            className="h-5 w-5 shrink-0 transition-transform group-hover/arrow:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
