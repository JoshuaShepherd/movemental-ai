/**
 * Deck data contract — one source, two renderers.
 *
 * A `DeckData` object fully describes a slide deck (the "Why a platform"
 * argument). It is rendered by:
 *   - `DeckSection`   — embedded, pinned-horizontal section inside an audience
 *                       document (e.g. /agent/nonprofits).
 *   - `StandaloneDeck`— full-viewport route (e.g. /agent/nonprofits/deck).
 *
 * Both renderers consume the SAME data so the two surfaces never drift, and so
 * churches / institutions / voices are later just new `DeckData` objects.
 */

/** At most one hand-drawn gesture per slide. Exactly one `highlight` per deck. */
export type DeckGesture = {
  type: "underline" | "circle" | "highlight";
  /** The phrase, verbatim, to wrap inside the slide's heading or body copy. */
  phrase: string;
};

export type DeckPart = { n: string; title: string; desc: string };

export type DeckSlide = {
  id: string;
  eyebrow?: string;
  kind: "title" | "content" | "diagram" | "quote" | "close";
  heading?: string;
  /** Paragraphs. For `quote`, the first entry is rendered as the large quote. */
  body?: string[];
  /** One gesture per slide (matched against heading first, then body). */
  gesture?: DeckGesture;
  /** Numbered two-part list (the "two hard parts" beat). */
  parts?: DeckPart[];
};

/** The interactive "same surface / different system underneath" diagram. */
export type DeckDiagram = {
  surfaceTiles: string[];
  surfaceChips: string[];
  systemTiles: { title: string; site: string; platform: string }[];
  captions: { site: string; home: string };
  /** Toggle labels — off = "Just a site", on = "A platform". */
  toggleLabels: { off: string; on: string };
};

export type DeckData = {
  id: string;
  audience: "nonprofit" | "church" | "institution" | "voice";
  /** Left-nav / sidebar label when embedded (e.g. "Why a platform"). */
  navLabel: string;
  /** Accessible name for the deck region. */
  ariaLabel: string;
  slides: DeckSlide[];
  diagram: DeckDiagram;
};
