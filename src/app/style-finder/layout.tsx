import type { Metadata } from "next";
import type { ReactNode } from "react";

import { InkBandUtilityShell } from "@/components/ink-band/utility-shell";

export const metadata: Metadata = {
  title: "Style Finder",
  description: "Discover typography, templates, images, and palettes for your visual direction.",
  robots: { index: false, follow: false },
};

export default function StyleFinderLayout({ children }: { children: ReactNode }) {
  return <InkBandUtilityShell>{children}</InkBandUtilityShell>;
}
