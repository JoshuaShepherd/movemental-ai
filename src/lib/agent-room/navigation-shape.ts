/**
 * Navigation-shape classifier (G3) — single LOCAL/AGENT decision for first sends.
 *
 * A cold send routes LOCAL only when the input has *navigation shape*:
 * short (≤5 content tokens after filler strip), leading/sole route keyword,
 * and not a hedged or multi-clause question.
 */
import type { SceneName } from "./data/scenes";

/** Scenes the navigation-shape router can target. */
export type NavigationRoute = Extract<
  SceneName,
  | "toPath"
  | "toSafety"
  | "toSandbox"
  | "toTraining"
  | "toTechnology"
  | "cost"
  | "toFaq"
  | "talkToUs"
  | "whoBehind"
  | "whatIs"
  | "toBeat"
  | "toSafetyFlow"
>;

const FILLER_TOKENS = new Set([
  "what",
  "is",
  "the",
  "a",
  "an",
  "does",
  "it",
  "how",
  "much",
  "tell",
  "me",
  "show",
  "please",
  "can",
  "you",
]);

/** Hedged / deep-question phrasing → always AGENT. */
const HEDGED_RE =
  /\b(should|could|what if|how do we|how would|why would|why should|would we|if we|i'm|we're|worried|nervous|concerned|split|our board|doesn't|can't|too (expensive|complicated|much))\b/i;

/** Multi-clause / subordinate signals → AGENT. */
const MULTI_CLAUSE_RE = /\b(because|although|while|whereas|unless|whether|that we|that our)\b/i;

/** Phrase-level navigation (checked before token rules). */
const PHRASE_ROUTES: ReadonlyArray<{ re: RegExp; route: NavigationRoute }> = [
  { re: /\bwhat(?:'s| is) movemental\b/, route: "whatIs" },
  { re: /\btell me about movemental\b/, route: "whatIs" },
  { re: /\babout movemental\b/, route: "whatIs" },
  { re: /\bdo you do\b/, route: "whatIs" },
  { re: /\bwhat does it cost\b/, route: "cost" },
  { re: /\bhow much\b/, route: "cost" },
  { re: /\bget in touch\b/, route: "talkToUs" },
  { re: /\btalk to (us|you|someone)\b/, route: "talkToUs" },
  { re: /\bwhole path\b/, route: "toPath" },
  { re: /\bhow (does|do) (it|this|the path) work\b/, route: "toPath" },
  { re: /\bget a clear\b/, route: "toSafetyFlow" },
  { re: /\bmap where we\b/, route: "toSafetyFlow" },
  { re: /\bwhere should we start\b/, route: "toSafetyFlow" },
  { re: /\bwho (is )?behind\b/, route: "whoBehind" },
  { re: /\bwho runs\b/, route: "whoBehind" },
];

/** First content token (or sole token) → scene. */
const KEYWORD_ROUTES: Record<string, NavigationRoute> = {
  cost: "cost",
  price: "cost",
  pricing: "cost",
  afford: "cost",
  about: "whatIs",
  movemental: "whatIs",
  contact: "talkToUs",
  email: "talkToUs",
  path: "toPath",
  sandbox: "toSandbox",
  training: "toTraining",
  technology: "toTechnology",
  tech: "toTechnology",
  safety: "toSafety",
  charter: "toSafety",
  handbook: "toSafety",
  faq: "toFaq",
  philosophy: "toFaq",
  founders: "whoBehind",
  founder: "whoBehind",
  stuck: "toSafetyFlow",
  start: "toSafetyFlow",
  assess: "toSafetyFlow",
  help: "toSafetyFlow",
  safe: "toSafetyFlow",
};

function normalizeToken(raw: string): string {
  return raw.toLowerCase().replace(/[^\w']/g, "");
}

/** Tokens with filler words removed — the "content" of the utterance. */
export function contentTokens(text: string): string[] {
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map(normalizeToken)
    .filter((t) => t.length > 0 && !FILLER_TOKENS.has(t));
}

/**
 * Returns a LOCAL scene when the input has navigation shape; otherwise `null` (→ AGENT).
 */
export function navigationShape(text: string): NavigationRoute | null {
  const raw = text.trim();
  if (!raw) return null;
  if (HEDGED_RE.test(raw) || MULTI_CLAUSE_RE.test(raw)) return null;

  const lower = raw.toLowerCase();
  for (const { re, route } of PHRASE_ROUTES) {
    if (re.test(lower) && contentTokens(raw).length <= 5) return route;
  }

  const tokens = contentTokens(raw);
  if (tokens.length === 0 || tokens.length > 5) return null;

  const first = tokens[0]!;
  const route = KEYWORD_ROUTES[first];
  if (!route) return null;

  // Sole keyword or keyword-led short phrase only.
  if (tokens.length === 1) return route;

  // Allow a second token that refines the same route family (e.g. "cost breakdown").
  const allSameFamily = tokens.every((t) => KEYWORD_ROUTES[t] === route || t === first);
  if (allSameFamily) return route;

  // Leading keyword with ≤5 tokens total — e.g. "pricing overview".
  return route;
}

/** Visitor-facing page name for composer pre-send hint (G2). */
export function navigationShapePageLabel(route: NavigationRoute): string {
  switch (route) {
    case "cost":
      return "pricing";
    case "whatIs":
      return "about";
    case "talkToUs":
      return "contact";
    case "toPath":
      return "path";
    case "toSandbox":
      return "sandbox";
    case "toTraining":
      return "training";
    case "toTechnology":
      return "technology";
    case "toSafety":
      return "safety";
    case "toFaq":
      return "FAQ";
    case "whoBehind":
      return "founders";
    case "toSafetyFlow":
      return "safety flow";
    case "toBeat":
      return "reality check";
    default:
      return "page";
  }
}

/** Composer pre-send hint for live-typed buffer (G2). */
export function composerSendHint(text: string): string | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const route = navigationShape(trimmed);
  if (route) return `↵ opens the ${navigationShapePageLabel(route)} page`;
  return "↵ starts a chat";
}
