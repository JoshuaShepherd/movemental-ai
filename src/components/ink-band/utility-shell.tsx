import type { ReactNode } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  variable: "--font-ink-hand-face",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

/**
 * Ink Band utility shell — auth and staff admin surfaces. Same token ramp as
 * `/agent` without the full room chrome (mast / voice / composer).
 */
export function InkBandUtilityShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${caveat.variable} ink-band-surface min-h-dvh`}>{children}</div>
  );
}
