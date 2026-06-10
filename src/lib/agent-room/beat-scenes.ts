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
import { MAP_Q, cap, type MapRead } from "./data/map-q";

export function beatScene(qi: number, oi: number, read: MapRead): Scene {
  const opt = MAP_Q[qi].opts[oi];
  const acts: Scene = [
    { clear: true },
    { gesture: "circle", target: `[data-oi="${oi}"]` },
    { wait: 140 },
    { say: opt.say },
    { wait: 240 },
  ];

  if (qi < MAP_Q.length - 1) {
    acts.push({ show: "beat", qi: qi + 1 }, { wait: 380 }, { gesture: "arrow", target: "#opts" });
    return acts;
  }

  // Last answer → mirror the organization back to itself.
  acts.push({ say: "That’s your six. Let me show you back." }, { wait: 220 }, { show: "readback" }, { wait: 540 });

  const gaps = read.gaps;
  if (gaps.length === 0) {
    acts.push(
      { say: "You’re in unusually good shape." },
      { wait: 160 },
      { say: "The path still starts with Safety — it’s what holds the rest." },
    );
  } else {
    acts.push({ say: "Here’s what your answers surface." }, { wait: 200 }, { say: cap(gaps[0].line) + "." });
    if (gaps[1]) acts.push({ wait: 140 }, { say: "And " + gaps[1].line + "." });
    acts.push({ wait: 200 }, { say: "The path is ordered. It starts with Safety." });
  }

  acts.push(
    { gesture: "circle", target: "#hereStage" },
    { wait: 120 },
    { gesture: "underline", target: "#rbphrase" },
    { wait: 160 },
    { say: "Want this map — and the next step it points to — in your inbox?" },
    { wait: 140 },
    { show: "capture", kind: "map" },
    { gesture: "circle", target: "#capSubmit" },
    { await: "capture" },
    { say: "Sent. Check your inbox." },
    { wait: 140 },
    {
      suggest: [
        { label: "Show me Safety", lead: true, to: "toSafety" },
        { label: "What comes after Safety?", to: "toPath" },
        ...(DISCUSS_ENABLED
          ? [{ label: "Talk through what this means for us", to: "toDiscuss" as const }]
          : [{ label: "Get in touch", to: "talkToUs" as const }]),
        { label: "↺ Start over", to: "opening" },
      ],
    },
  );
  return acts;
}
