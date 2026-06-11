/**
 * Beat → readback choreography (ported from `beatStep` in `js/data/map-q.js`).
 *
 * When a reality-check answer is tapped, the host circles the chosen option,
 * voices the reply, then either advances to the next question or — on the last —
 * mirrors the org back across the ordered path (the readback), naming its
 * sharpest gaps. Pure: takes the question/answer indices + the computed
 * `MapRead`, returns a `Scene` the runner plays. Gesture targets are selectors
 * the beat/readback screens expose (`[data-oi]`, `#opts`, `#hereStage`,
 * `#rbphrase`).
 */
import type { Scene } from "./acts";
import { DISCUSS_ENABLED } from "./discuss";
import { MAP_Q, type MapRead } from "./data/map-q";
import { MAP_EMAIL_CHIP_TARGET } from "./suggest-chip-targets";

/** Post-readback chips after Q1 gate fail (most organizations). */
const GATE_FAIL_SUGGEST: Scene[number] = {
  suggest: [
    { label: "Get the free Field Guide", lead: true, to: "onOwn" },
    { label: "Have us do it · $1,000", to: "withUs" },
    { label: "↺ Start over", to: "opening" },
  ],
};

/** Post-readback chips after the full four-question path (rare). */
function fullReadbackSuggest(): Scene[number] {
  return {
    suggest: [
      { label: "See what Sandbox looks like", lead: true, to: "toPath" },
      { label: "Email me a copy", to: MAP_EMAIL_CHIP_TARGET },
      ...(DISCUSS_ENABLED
        ? [{ label: "Talk to us", to: "toDiscuss" as const }]
        : [{ label: "Talk to us", to: "talkToUs" as const }]),
      { label: "↺ Start over", to: "opening" },
    ],
  };
}

export function beatScene(qi: number, oi: number, read: MapRead): Scene {
  const opt = MAP_Q[qi].opts[oi];

  // Q1 gate fail — most orgs: straight to readback (no threat monologue).
  if (opt.gateFail) {
    return [{ clear: true }, { show: "readback" }, GATE_FAIL_SUGGEST];
  }

  // Rare org cleared Safety — advance through Q2–Q4 with no interstitial voice.
  if (qi < MAP_Q.length - 1) {
    return [{ clear: true }, { show: "beat", qi: qi + 1 }];
  }

  // Last answer (full path) — readback immediately, then chips.
  return [{ clear: true }, { show: "readback" }, fullReadbackSuggest()];
}
