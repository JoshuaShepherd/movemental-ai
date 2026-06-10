/**
 * Agent Room — SCENES (choreography as DATA), ported from `js/data/scenes.js`.
 *
 * Every static scene the runner can `run(name)`. The leader-aware scenes
 * (`leaderScene(i)`, `leaderWork`, `leaderConnect` override) close over the
 * runner's `currentLeader` + `getProfile`, so they're wired where that state
 * lives — the leader screens (AF-10). The static `leaderConnect` fallback below
 * is the prototype's default, overridden there.
 *
 * `SceneName` is the union of these keys; the runner looks scenes up by string
 * (chips may target a not-yet-wired scene — a harmless no-op).
 */
import type { Scene, SceneFactory } from "../acts";
import { DISCUSS_ENABLED } from "../discuss";

export const SCENES = {
  opening: [
    { show: "home" },
    { wait: 560 },
    { say: "Movemental meets leaders and organizations where they are. Let me show you how we can help." },
    { wait: 150 },
    { gesture: "underline", target: "#phrase" },
    {
      suggest: [
        { label: "Get a clear next AI step", lead: true, to: "beatIntro" },
        { label: "About Movemental", to: "whatIs" },
        { label: "What does it cost?", to: "cost" },
        { label: "Get in touch", to: "talkToUs" },
      ],
    },
  ],
  whatIs: [
    { show: "about" },
    { wait: 480 },
    { say: "Here’s the short version — the rest is on the page." },
    { wait: 160 },
    { say: "We help you meet AI without losing trust." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "See the whole path", to: "toPath" },
        { label: "What does it cost?", to: "cost" },
        { label: "Get in touch", to: "talkToUs" },
      ],
    },
  ],
  cost: [
    { show: "pricing" },
    { wait: 480 },
    { say: "Every price is on the page — and what we refuse to do." },
    { wait: 160 },
    { say: "The guides are free. Facilitation is fixed-price." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "See the whole path", to: "toPath" },
        { label: "Get in touch", to: "talkToUs" },
        { label: "Start with Safety (free)", to: "toSafety" },
      ],
    },
  ],
  toFaq: [
    { show: "faq" },
    { wait: 480 },
    { say: "Honest answers — including when we’re not the right fit." },
    { wait: 160 },
    { say: "Ten groups. Jump to what you need on the page." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "What does it cost?", to: "cost" },
        { label: "Get in touch", to: "talkToUs" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],
  whoBehind: [
    { show: "founders" },
    { wait: 480 },
    { say: "A small team builds it: Alan, Brad, and Josh." },
    { wait: 200 },
    { say: "Connected to the leaders on the home page." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "About Movemental", to: "whatIs" },
        { label: "Talk to us", to: "talkToUs" },
      ],
    },
  ],
  talkToUs: [
    { show: "contact" },
    { wait: 460 },
    { say: "Tell us a little about where you stand." },
    { wait: 160 },
    { say: "We read every message — and reply personally." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],
  // default; overridden by the leader-aware function attached in AF-10
  leaderConnect: [
    { say: "Connected to Movemental, and to each other." },
    { wait: 160 },
    { say: "That network is the point." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "Back to the leaders", to: "opening" },
      ],
    },
  ],
  // Cold home on-ramp: a calm bridge between the home's relational register and
  // the diagnostic's audit register. Deliberately renders NO `beat` screen — just
  // two spoken lines (reframe + permission) on the existing calm sheet, then a
  // single lead chip into `toBeat`. ONLY `SCENES.opening`'s diagnostic chip routes
  // here; visitors already oriented (whatIs/cost/leader/readback chips, “Map
  // where we actually stand”) still go straight to `toBeat` with no intro.
  beatIntro: [
    { clear: true },
    { say: "I’m not going to grade you. These six questions just show you where you already stand, so the next step is obvious instead of guessed." },
    { wait: 220 },
    { say: "For most of these, the honest answer is ‘no.’ That’s the point." },
    {
      suggest: [{ label: "Okay, map it", lead: true, to: "toBeat" }],
    },
  ],
  toBeat: [
    { show: "beat", qi: 0 },
    { wait: 460 },
    { say: "Let’s map where your organization actually stands." },
    { wait: 160 },
    { say: "Six honest questions. No wrong answers." },
    { wait: 140 },
    { gesture: "arrow", target: "#opts" },
  ],
  toPath: [
    { show: "path" },
    { wait: 480 },
    { say: "It starts with Safety. The rest comes after." },
    { wait: 200 },
    { say: "Almost everyone starts at the first step." },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        ...(DISCUSS_ENABLED
          ? [{ label: "Our situation is more complicated than this", to: "toDiscuss" as const }]
          : [{ label: "Show me Safety", to: "toSafety" as const }]),
        { label: "What does it cost?", to: "cost" },
      ],
    },
  ],
  toSafety: [
    { show: "safety" },
    { wait: 520 },
    { say: "Safety is your step. Here’s what it means." },
    { wait: 240 },
    { say: "You can walk it on your own, free. Or we do it with you." },
    {
      suggest: [
        { label: "Have us do it · $1,000", lead: true, to: "withUs" },
        { label: "Walk it free", to: "onOwn" },
        { label: "What’s involved?", to: "involved" },
        ...(DISCUSS_ENABLED
          ? [{ label: "I have a policy question", to: "toDiscuss" as const }]
          : [{ label: "I have a policy question", to: "talkToUs" as const }]),
      ],
    },
  ],
  charter: [
    { say: "A short, agreed document. What you will and won’t do with AI." },
    { wait: 200 },
    { say: "Five plain parts your board can ratify." },
    {
      suggest: [
        { label: "Have us do it · $1,000", lead: true, to: "withUs" },
        { label: "Walk it free", to: "onOwn" },
      ],
    },
  ],
  involved: [
    { say: "A short, agreed document. What you will and won’t do with AI." },
    { wait: 200 },
    { say: "Five plain parts your board can ratify." },
    { wait: 200 },
    { say: "Two weeks. We start by reading your whole team." },
    { wait: 200 },
    { say: "Then we draft it with you. You ratify." },
    {
      suggest: [
        { label: "Have us do it · $1,000", lead: true, to: "withUs" },
        { label: "Walk it free", to: "onOwn" },
      ],
    },
  ],
  withUs: [
    { say: "Good. Let’s get you set up." },
    { wait: 140 },
    { show: "capture", kind: "paid" },
    { gesture: "circle", target: "#capSubmit" },
    { await: "capture" },
    { show: "confirm", mode: "paid" },
    { wait: 480 },
    { say: "You’re in. Your dashboard is being set up." },
    { wait: 200 },
    { say: "Your first move is your whole team’s read." },
    {
      suggest: [
        { label: "Talk to Josh", to: "talkToUs" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],
  onOwn: [
    { say: "Done. Where should it land?" },
    { wait: 140 },
    { show: "capture", kind: "free" },
    { gesture: "circle", target: "#capSubmit" },
    { await: "capture" },
    { show: "confirm", mode: "free" },
    { wait: 480 },
    { say: "The guide is on its way. Free." },
    { wait: 200 },
    { say: "Your first move is your team’s honest read." },
    {
      suggest: [
        { label: "Have us do it instead · $1,000", to: "withUs" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],

  // INT-09 — Discuss capture gate (stub). Stub never pretends to be a live
  // multi-turn LLM; when a visitor wants to talk something through, the room
  // acknowledges it honestly and routes the intent into `capture` (`kind:'discuss'`),
  // never a dead-end notice. Same await/confirm pattern as `withUs`/`onOwn`.
  toDiscuss: [
    { clear: true },
    { say: "That deserves a real conversation — more than I can script here." },
    { wait: 180 },
    { say: "Leave your email and the team will pick it up with you." },
    { wait: 140 },
    { show: "capture", kind: "discuss" },
    { gesture: "circle", target: "#capSubmit" },
    { await: "capture" },
    { show: "confirm", mode: "discuss" },
    { wait: 460 },
    { say: "Got it. A real person will follow up — and the path stays right here." },
    { wait: 160 },
    {
      suggest: [
        { label: "Map where we actually stand", lead: true, to: "toBeat" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],

  // INT-09 — the consent offer shown when an implicit signal fires (a meta/
  // objection question, a third free-text turn, or repeated fallbacks). The room
  // OFFERS the switch; it never morphs silently. "Yes" → the capture gate; "Stay"
  // → back to the guided diagnostic.
  discussOffer: [
    { clear: true },
    { say: "This sounds specific enough to talk through properly." },
    { wait: 160 },
    { say: "Want to switch to open conversation? The path we mapped stays on the page." },
    {
      suggest: [
        { label: "Yes, talk it through", lead: true, to: "toDiscuss" },
        { label: "Stay on the guided path", to: "toBeat" },
      ],
    },
  ],
} satisfies Record<string, Scene | SceneFactory>;

/** The names the runner can `run()` (leader-aware names are added in AF-10). */
export type SceneName = keyof typeof SCENES;
