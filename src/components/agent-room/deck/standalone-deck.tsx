"use client";

import { DeckStage } from "./deck-stage";
import type { DeckData } from "./deck-types";

/**
 * Full-viewport deck for the standalone route. Same `DeckData`, same renderer
 * as the embedded section — only the framing differs (fills the screen instead
 * of pinning in flow). Reduced-motion / touch fall back to stack / snap.
 */
export function StandaloneDeck({ data, foot }: { data: DeckData; foot: string }) {
  return <DeckStage data={data} foot={foot} variant="standalone" />;
}
