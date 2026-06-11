import type { Metadata } from "next";
import type { ReactNode } from "react";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import {
  SAFETY_FIELD_GUIDE_DISPLAY_TITLE,
  SAFETY_HANDBOOK_COVER_IMAGE,
  SAFETY_HANDBOOK_DISPLAY_TITLE,
} from "@/lib/safety-field-guide";

export const metadata: Metadata = {
  title: `${SAFETY_HANDBOOK_DISPLAY_TITLE} — ${SAFETY_FIELD_GUIDE_DISPLAY_TITLE}`,
  description:
    "Free AI Safety Handbook for mission-driven leaders: first response documentation for nonprofits, churches, and institutions. PDF delivered by email.",
  openGraph: {
    title: SAFETY_HANDBOOK_DISPLAY_TITLE,
    description:
      "First response documentation for nonprofits, churches, and institutions — five layers your board can ratify.",
    images: [{ url: SAFETY_HANDBOOK_COVER_IMAGE, width: 765, height: 1024, alt: SAFETY_HANDBOOK_DISPLAY_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SAFETY_HANDBOOK_DISPLAY_TITLE,
    images: [SAFETY_HANDBOOK_COVER_IMAGE],
  },
};

export default function FieldGuideLayout({ children }: { children: ReactNode }) {
  return <InkBandUtilityShell>{children}</InkBandUtilityShell>;
}
