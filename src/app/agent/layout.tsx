import type { ReactNode } from "react";
import { Caveat } from "next/font/google";

/**
 * Caveat — the Ink Band "hand" face (the voice line and the readback "you are
 * here" annotation). The other three Ink Band faces — Playfair Display
 * (`--font-ink-display-face`), Inter (`--font-sans`), IBM Plex Mono
 * (`--font-ink-mono-face`) — are already loaded on `<html>` by the root layout
 * and cascade into this subtree, so only Caveat is unique to the room. Exposed
 * as `--font-ink-hand-face`, consumed by `--font-ink-hand` in globals.css.
 *
 * Scoped here (not the root layout) so utility/auth routes never fetch
 * or paint it. next/font only pulls the face when this subtree actually renders.
 */
const caveat = Caveat({
  variable: "--font-ink-hand-face",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

/**
 * Applies the Ink Band scoped surface to everything under `/agent` — the live
 * room and the SSR fallback alike — so both get the ink-band token ramp + hand
 * font without leaking into the rest of the app. Marketing nav/footer are
 * already suppressed for this route via `proxy.ts` (`x-movemental-shell: room`).
 */
export default function AgentLayout({ children }: { children: ReactNode }) {
  return <div className={`${caveat.variable} ink-band-surface`}>{children}</div>;
}
