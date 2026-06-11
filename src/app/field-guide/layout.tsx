import type { Metadata } from "next";
import type { ReactNode } from "react";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";
import { SAFETY_FIELD_GUIDE_DISPLAY_TITLE } from "@/lib/safety-field-guide";

export const metadata: Metadata = {
  title: `${SAFETY_FIELD_GUIDE_DISPLAY_TITLE} — Field Guide`,
  description:
    "Free field guides for mission-driven leaders: govern AI safely first, then run disciplined experiments. PDF delivered by email.",
};

export default function FieldGuideLayout({ children }: { children: ReactNode }) {
  return <InkBandUtilityShell>{children}</InkBandUtilityShell>;
}
