/**
 * Typed-input routing (ported verbatim from `handleInput` in `js/app.js`).
 *
 * The composer's only way to *act* is the input line; typed text is matched
 * against an ordered regex table and routed to a scene the runner can `run()`.
 * No free text reaches a network — this is a fixed local router (AF-11). The
 * order is significant (first match wins) and copied exactly from the prototype,
 * including the deliberately broad final `toBeat` catch-all; only truly
 * unmatched input falls through to the spoken fallback.
 *
 * Pure and side-effect free: the hook decides what to do with the result
 * (`run(scene)` or play the `FALLBACK_SAY` line).
 */
import type { SceneName } from "./data/scenes";
import { CONCIERGE_VOICE } from "./data/concierge-voice-lines";

/** Scenes the router can target (a subset of `SceneName`). */
type RouteTarget = Extract<
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

/** Ordered match table — first hit wins (prototype `handleInput` order). */
const ROUTES: ReadonlyArray<{ re: RegExp; to: RouteTarget }> = [
  { re: /after|whole path|how.*work|the path/, to: "toPath" },
  { re: /\bsandbox\b|exploration|future plan/, to: "toSandbox" },
  { re: /\btraining\b|formation cohort|discernment.*authorship/, to: "toTraining" },
  { re: /\btechnology\b|solutions\b|deployment|build.*ai/, to: "toTechnology" },
  { re: /safety|charter|handbook|ratif/, to: "toSafety" },
  { re: /cost|price|much|free|pay|afford/, to: "cost" },
  { re: /faq|frequently asked|common question|questions we hear/, to: "toFaq" },
  {
    re: /philosoph|approach|theolog|worldview|beliefs?|values|pro-ai|anti-ai|stance on ai/,
    to: "toFaq",
  },
  { re: /talk to|contact|human|email|reach|speak/, to: "talkToUs" },
  { re: /who|behind|leader|team|trust|network/, to: "whoBehind" },
  { re: /what('s| is| do)|movemental|about|do you do/, to: "whatIs" },
  // Diagnostic catch-all. NB: this stays `toBeat`, NOT `beatIntro` — `routeInput`
  // is a pure function with no notion of "first contact from home" vs. later
  // free-text, so it can't gate the bridging intro the way the home chip does.
  // The cold-entry bridge lives on `SCENES.opening`'s lead chip (→ `beatIntro`);
  // the typed path is secondary and goes straight to the diagnostic.
  { re: /stuck|next|simple|stand|start|begin|assess|where|find|safe|help/, to: "toSafetyFlow" },
];

/** The line spoken when nothing matches (prototype fallback `say`). */
export const FALLBACK_SAY = CONCIERGE_VOICE.refusal;

/**
 * Meta / objection / hypothetical phrasing — the **primary** implicit signal
 * that a visitor wants to think out loud rather than tap a chip (design note
 * §4.2). When this fires the room *offers* a Discuss switch (consent chips); it
 * never morphs silently. Deliberately conservative — message length is NOT a
 * trigger here (people paste); that's a weak secondary signal only.
 */
const META_OBJECTION_RE =
  /\b(our board|we tried|what would you|what if|isn'?t it|how (would|do) you|why (would|should)|but (what|how|our|we)|too (expensive|complicated|much)|doesn'?t (work|fit)|can'?t (afford|do)|more complicated|specific (policy|situation|question))\b/i;

export function isMetaOrObjection(text: string): boolean {
  return META_OBJECTION_RE.test(text.trim());
}

/**
 * Route a typed utterance to a scene name, or `"fallback"` when nothing matches.
 * Lower-cased and trimmed like the prototype; empty input returns `"fallback"`
 * (the composer already guards empty before calling, matching `handleInput`).
 */
export function routeInput(text: string): RouteTarget | "fallback" {
  const t = text.trim().toLowerCase();
  if (!t) return "fallback";
  for (const { re, to } of ROUTES) {
    if (re.test(t)) return to;
  }
  return "fallback";
}
