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
import { MAP_Q, SAFETY_GATE_THREAT, cap, type MapRead } from "./data/map-q";
import { MAP_EMAIL_CHIP_TARGET } from "./suggest-chip-targets";

export function beatScene(qi: number, oi: number, read: MapRead): Scene {
  const opt = MAP_Q[qi].opts[oi];
  const acts: Scene = [
    { clear: true },
    { gesture: "circle", target: `[data-oi="${oi}"]` },
    { wait: 140 },
  ];

  if (opt.say) {
    acts.push({ say: opt.say }, { wait: 240 });
  }

  // Q1 gate — anything but a full yes stops here with the threat.
  if (opt.gateFail) {
    for (const line of SAFETY_GATE_THREAT) {
      acts.push({ say: line }, { wait: 200 });
    }
    acts.push({
      suggest: [
        { label: "Get the free Field Guide", lead: true, to: "onOwn" },
        { label: "Have us do it · $1,000", to: "withUs" },
        { label: "↺ Start over", to: "opening" },
      ],
    });
    return acts;
  }

  if (qi < MAP_Q.length - 1) {
    acts.push({ show: "beat", qi: qi + 1 }, { wait: 380 }, { gesture: "arrow", target: "#opts" });
    return acts;
  }

  // Last answer → mirror the organization back (cleared Safety only).
  acts.push({ say: "Let me show you back." }, { wait: 220 }, { show: "readback" }, { wait: 540 });

  acts.push(
    { say: "You've done the part almost no one does — your Safety footing is real." },
    { wait: 180 },
    { say: "So this isn't about where to start; it's about what's next." },
    { wait: 200 },
  );

  const gaps = read.gaps.filter((g) => g.stage !== "safety");
  if (gaps.length === 0) {
    acts.push(
      { say: "Nothing sharp surfaced in Sandbox, Training, or Tech." },
      { wait: 160 },
      { say: "Your next move is still Sandbox — a bounded place to try AI against your real work and find what's worth keeping." },
    );
  } else {
    acts.push({ say: cap(gaps[0].line) + "." });
    if (gaps[1]) acts.push({ wait: 140 }, { say: "And " + gaps[1].line + "." });
    acts.push(
      { wait: 200 },
      {
        say: "Your next move is Sandbox: a bounded place to try AI against your real work and find what's worth keeping. Each step still earns the next — but you've earned the right to take it.",
      },
    );
  }

  acts.push(
    { gesture: "circle", target: "#hereStage" },
    { wait: 120 },
    { gesture: "underline", target: "#rbphrase" },
    { wait: 160 },
    {
      suggest: [
        { label: "See what Sandbox looks like", lead: true, to: "toPath" },
        { label: "Email me a copy", to: MAP_EMAIL_CHIP_TARGET },
        ...(DISCUSS_ENABLED
          ? [{ label: "Talk to us", to: "toDiscuss" as const }]
          : [{ label: "Talk to us", to: "talkToUs" as const }]),
        { label: "↺ Start over", to: "opening" },
      ],
    },
  );
  return acts;
}
