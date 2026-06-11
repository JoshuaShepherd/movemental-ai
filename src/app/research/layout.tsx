import type { ReactNode } from "react";
import { Caveat } from "next/font/google";

import styles from "@/components/research/research.module.css";

/**
 * Caveat — the Ink Band "hand" face used by the research marginalia. The other
 * three faces (Playfair / Inter / IBM Plex Mono) are loaded on `<html>` by the
 * root layout and cascade in; only Caveat is unique here, scoped so other
 * routes never fetch it.
 */
const caveat = Caveat({
  variable: "--font-ink-hand-face",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

/**
 * `/research` — public EEAT surface (papers, findings, sources). Wraps the flow
 * in the scoped Ink Band ramp (`.ink-band-surface`) plus the research alias
 * tokens (`styles.surface`), without leaking into the rest of the app.
 */
export default function ResearchLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${caveat.variable} ink-band-surface ${styles.surface}`}>{children}</div>
  );
}
