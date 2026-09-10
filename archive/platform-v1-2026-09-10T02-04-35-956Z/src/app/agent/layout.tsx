import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat } from "next/font/google";

import { AgentRoomProvider } from "@/components/agent-room/agent-room-context";
import { InkFilters } from "@/components/agent-room/deck/ink-filters";
import { previewRobotsMetadata } from "@/lib/site-launch";

const previewRobots = previewRobotsMetadata();

export const metadata: Metadata = previewRobots
  ? { robots: previewRobots }
  : {};

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
  // The ink/voice provider lives here (Phase 3) so a single concierge substrate
  // spans every `/agent/*` route — the room and the document surfaces alike —
  // instead of each page wrapping its own. Mast + dock stay per-surface (the
  // room's are a live runtime; the documents' are a lighter handoff).
  return (
    <div className={`${caveat.variable} ink-band-surface`}>
      {/* Hand-drawn gesture filters, referenced by deck gestures via url(#rough|#marker). */}
      <InkFilters />
      <AgentRoomProvider>{children}</AgentRoomProvider>
    </div>
  );
}
