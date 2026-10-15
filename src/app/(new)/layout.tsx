import type { Metadata } from "next";
import { Geist, Instrument_Serif, Source_Serif_4 } from "next/font/google";

import "./mv.css";

/**
 * (new) route group — the Movemental "Paper" design system.
 * Charter: docs/design/MV_DESIGN_CHARTER.md. Every page in this group uses the `-new`
 * route suffix until the migration cuts over (see docs/build/prompts/canvas-to-react-new.md).
 */

const instrumentSerif = Instrument_Serif({
  variable: "--mv-face-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--mv-face-reading",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const geist = Geist({
  variable: "--mv-face-ui",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // Parallel `-new` routes stay out of search until cutover.
  robots: { index: false, follow: false },
};

export default function NewSurfaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`mv-surface ${instrumentSerif.variable} ${sourceSerif.variable} ${geist.variable}`}
    >
      {children}
    </div>
  );
}
