/**
 * Leader-aware choreography (ported from `leaderScene` / `leaderWork` /
 * `leaderConnectScene` in `js/data/scenes.js`).
 *
 * In the prototype these close over a `currentLeader` global attached onto
 * `SCENES`. Here they're pure factories that take the leader index `i`; the stub
 * hook holds `currentLeader` in a ref and resolves the `leaderWork` /
 * `leaderConnect` chip targets against it (matching the prototype's
 * `SCENES.leaderWork = leaderWork` / `SCENES.leaderConnect = leaderConnectScene`
 * override). `getProfile()` stays the single content seam (AF-90 swaps it for
 * RAG without touching these scenes).
 */
import type { Scene } from "./acts";
import { LEADERS } from "./data/leaders";
import { getProfile, sayScene } from "./data/profiles";

function firstName(i: number): string {
  return (LEADERS[i]?.name ?? "").split(" ")[0] ?? "";
}

/** The opening leader scene (prototype `leaderScene(i)`). */
export function leaderScene(i: number): Scene {
  const name = LEADERS[i]?.name ?? "";
  const first = firstName(i);
  const p = getProfile(i);
  if (p) {
    return [
      { show: "leader", id: i },
      { wait: 520 },
      { say: `This is ${name}.` },
      { wait: 180 },
      { say: p.lede },
      {
        suggest: [
          { label: "Map where we actually stand", lead: true, to: "toBeat" },
          { label: `What does ${first} work on?`, to: "leaderWork" },
          { label: `How is ${first} connected?`, to: "leaderConnect" },
          { label: "Back to the leaders", to: "opening" },
        ],
      },
    ];
  }
  return [
    { show: "leader", id: i },
    { wait: 520 },
    { say: `This is ${name}.` },
    { wait: 180 },
    { say: "One of the leaders behind the path. A fuller profile is coming." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: `How is ${first} connected?`, to: "leaderConnect" },
        { label: "Back to the leaders", to: "opening" },
      ],
    },
  ];
}

/** "What does {first} work on?" (prototype `leaderWork`). */
export function leaderWorkScene(i: number): Scene {
  const p = getProfile(i);
  const first = firstName(i);
  const name = LEADERS[i]?.name ?? "this leader";
  if (!p) {
    return [
      { clear: true },
      { say: `A fuller profile for ${name} is coming.` },
      {
        suggest: [
          { label: "Map where we actually stand", lead: true, to: "toBeat" },
          { label: "Back to the leaders", to: "opening" },
        ],
      },
    ];
  }
  return [
    ...sayScene(p.workSay),
    {
      suggest: [
        { label: `How is ${first} connected?`, to: "leaderConnect" },
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "Back to the leaders", to: "opening" },
      ],
    },
  ];
}

/** "How is {first} connected?" (prototype `leaderConnectScene`). */
export function leaderConnectScene(i: number): Scene {
  const p = getProfile(i);
  const first = firstName(i);
  if (!p) {
    return [
      { clear: true },
      { say: "Connected to Movemental, and to each other." },
      { wait: 160 },
      { say: "That network is the point." },
      {
        suggest: [
          { label: "Map where we actually stand", lead: true, to: "toBeat" },
          { label: "Back to the leaders", to: "opening" },
        ],
      },
    ];
  }
  return [
    ...sayScene(p.connectSay),
    {
      suggest: [
        { label: `What does ${first} work on?`, to: "leaderWork" },
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "Back to the leaders", to: "opening" },
      ],
    },
  ];
}
