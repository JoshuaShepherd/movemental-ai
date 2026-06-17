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
import { FOUNDER_AGENT_ANSWERS } from "@/lib/founders/agent-knowledge";
import { FREE_HANDBOOK_CTA, SAFETY_CHARTER, SAFETY_HANDBOOK } from "../naming";
import { CONCIERGE_VOICE } from "./concierge-voice-lines";
import { DISCUSS_ENABLED } from "../discuss";

export const SCENES = {
  opening: [
    { show: "home" },
    { wait: 560 },
    { say: CONCIERGE_VOICE.openingGreeting },
    { wait: 150 },
    { gesture: "underline", target: "#phrase" },
    {
      suggest: [
        { label: "Get a clear next AI step", lead: true, to: "toSafetyFlow" },
        { label: "About Movemental", to: "whatIs" },
        { label: "What does it cost?", to: "cost" },
        { label: "Get in touch", to: "talkToUs" },
      ],
    },
  ],
  whatIs: [
    { show: "about" },
    { wait: 480 },
    { say: "Here’s the short version, the rest is on the page." },
    { wait: 160 },
    { say: "We help you meet AI without losing trust." },
    {
      suggest: [
        { label: "See the whole path", lead: true, to: "toPath" },
        { label: "Map where we actually stand", to: "toBeat" },
        { label: "What does it cost?", to: "cost" },
        { label: "Get in touch", to: "talkToUs" },
      ],
    },
  ],
  cost: [
    { show: "pricing" },
    { wait: 480 },
    { say: "Every price is on the page, and what we refuse to do." },
    { wait: 160 },
    { say: "The guides are free. Facilitation is fixed-price." },
    {
      suggest: [
        { label: "Start with Safety (free)", lead: true, to: "toSafety" },
        { label: "Map where we actually stand", to: "toBeat" },
        { label: "See the whole path", to: "toPath" },
      ],
    },
  ],
  toFaq: [
    { show: "faq" },
    { wait: 480 },
    { say: "Honest answers, including when we’re not the right fit." },
    { wait: 160 },
    { say: "Ten groups. Jump to what you need on the page." },
    {
      suggest: [
        { label: "Get in touch", lead: true, to: "talkToUs" },
        { label: "Map where we actually stand", to: "toBeat" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],
  whoBehind: [
    { show: "founders" },
    { wait: 480 },
    { say: FOUNDER_AGENT_ANSWERS.whoAreFounders[0] },
    { wait: 200 },
    { say: FOUNDER_AGENT_ANSWERS.whoAreFounders[1] },
    { wait: 200 },
    { say: FOUNDER_AGENT_ANSWERS.whoIsCeo[1] },
    {
      suggest: [
        { label: "Talk to us", lead: true, to: "talkToUs" },
        { label: "Map where we actually stand", to: "toBeat" },
        { label: "About Movemental", to: "whatIs" },
      ],
    },
  ],
  talkToUs: [
    { show: "contact" },
    { wait: 460 },
    { say: "Tell us a little about where you stand." },
    { wait: 160 },
    { say: "We read every message, and reply personally." },
    {
      suggest: [
        { label: "↺ Start over", lead: true, to: "opening" },
        { label: "Map where we actually stand", to: "toBeat" },
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
        { label: "Back to the leaders", lead: true, to: "opening" },
        { label: "Map where we actually stand", to: "toBeat" },
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
    { say: "This is probably a one-question assessment." },
    { wait: 200 },
    {
      say: "Most organizations answer the first question, hear the one thing they most need to hear, and stop there. So let's start with it, and answer honestly, because the honest answer is the useful one.",
    },
    {
      suggest: [{ label: "Start with Safety", lead: true, to: "toBeat" }],
    },
  ],
  toBeat: [{ show: "beat", qi: 0 }],
  // Cold home on-ramp only — screen first, then one voice line that sets expectation.
  toBeatCold: [
    { show: "beat", qi: 0, singleQuestionHint: true },
    {
      say: "This is usually just one question, answer honestly, because the honest answer is the useful one.",
    },
  ],
  toSafetyFlow: [
    { show: "safetyFlow", step: "question" },
    {
      say: "One question. Then we'll show you exactly where you stand, and what to do about it.",
    },
  ],
  toSafetyFlowDiy: [{ show: "safetyFlow", step: "diy" }],
  toSafetyFlowSignup: [{ show: "safetyFlow", step: "signup" }],
  toPath: [
    { show: "path" },
    { wait: 480 },
    { say: "It starts with Safety. The rest comes after." },
    { wait: 200 },
    { say: "Almost everyone starts at the first step." },
    {
      suggest: [
        { label: "Show me Safety", lead: true, to: "toSafety" },
        { label: "Show me Sandbox", to: "toSandbox" },
        { label: "Map where we actually stand", to: "toBeat" },
        ...(DISCUSS_ENABLED
          ? [{ label: "Our situation is more complicated than this", to: "toDiscuss" as const }]
          : []),
        { label: "What does it cost?", to: "cost" },
      ],
    },
  ],
  toSandbox: [
    { show: "sandbox" },
    { wait: 480 },
    {
      say: "Sandbox is where you try AI against real work, inside the rules you already ratified.",
    },
    { wait: 200 },
    { say: "You sort what helps from what doesn't, and leave with a Future Plan." },
    {
      suggest: [
        { label: "Have us do it · $15,000", lead: true, to: "talkToUs" },
        { label: "Start free, guided", to: "toPath" },
        { label: "Show me Safety", to: "toSafety" },
        { label: "What does it cost?", to: "cost" },
      ],
    },
  ],
  toTraining: [
    { show: "training" },
    { wait: 480 },
    {
      say: "Training forms the people who will carry AI inside your organization. Not a tool workshop.",
    },
    { wait: 200 },
    { say: "Eight weeks on discernment, authorship, and stewardship." },
    {
      suggest: [
        { label: "Talk to us about Training", lead: true, to: "talkToUs" },
        { label: "Show me Sandbox", to: "toSandbox" },
        { label: "What does it cost?", to: "cost" },
      ],
    },
  ],
  toTechnology: [
    { show: "technology" },
    { wait: 480 },
    {
      say: "Tech is scoped deployment, only after Safety, Sandbox, and Training.",
    },
    { wait: 200 },
    { say: "We would rather name a smaller first step than sell a build you are not ready to operate." },
    {
      suggest: [
        { label: "Talk to us about Tech", lead: true, to: "talkToUs" },
        { label: "See the whole path", to: "toPath" },
        { label: "What does it cost?", to: "cost" },
      ],
    },
  ],
  toSafety: [
    { show: "safety" },
    { wait: 520 },
    {
      say: "AI is already inside your organization, and nobody has ratified the rules yet. That's what Safety fixes first.",
    },
    { wait: 240 },
    { say: "Safety is your step. Here's what it means." },
    { wait: 200 },
    { say: "Complete it free with our help, or have us do it with you." },
    {
      suggest: [
        { label: "Build your dashboard", lead: true, to: "toSafetyFlowSignup" },
        { label: "Start free, guided", to: "toSafetyFlowDiy" },
        { label: "Why does this come first?", to: "whySafetyFirst" },
        { label: "What could go wrong without it?", to: "safetyWithoutIt" },
        ...(DISCUSS_ENABLED
          ? [{ label: "I have a policy question", to: "toDiscuss" as const }]
          : [{ label: "I have a policy question", to: "talkToUs" as const }]),
      ],
    },
  ],
  whySafetyFirst: [
    {
      say: "For a church, nonprofit, or seminary, an AI mistake costs trust, not just efficiency. Credibility is your product.",
    },
    { wait: 200 },
    {
      say: "Safety gives you one shared frame, answers donors and boards can trust, and a clear plan when something goes wrong. That trust pays off the day you ratify.",
    },
    {
      suggest: [
        { label: "Build your dashboard", lead: true, to: "toSafetyFlowSignup" },
        { label: "Start free, guided", to: "toSafetyFlowDiy" },
        { label: "What could go wrong without it?", to: "safetyWithoutIt" },
      ],
    },
  ],
  safetyWithoutIt: [
    {
      say: `Without a ratified ${SAFETY_CHARTER.shortLabel}, every staff member decides alone under time pressure. Donor data ends up in consumer tools. Pastoral notes get pasted into chatbots. A cloned voice can reach your people before you have a response plan.`,
    },
    { wait: 200 },
    {
      say: "None of that is hypothetical. Safety closes the gap before credibility becomes the crisis.",
    },
    {
      suggest: [
        { label: "Build your dashboard", lead: true, to: "toSafetyFlowSignup" },
        { label: "Start free, guided", to: "toSafetyFlowDiy" },
        { label: "Why does this come first?", to: "whySafetyFirst" },
      ],
    },
  ],
  charter: [
    { say: "A short, agreed document. What you will and won’t do with AI." },
    { wait: 200 },
    { say: "Five plain parts your board can ratify." },
    {
      suggest: [
        { label: "Build your dashboard", lead: true, to: "toSafetyFlowSignup" },
        { label: "Start free, guided", to: "focusHandbook" },
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
        { label: "Build your dashboard", lead: true, to: "toSafetyFlowSignup" },
        { label: "Start free, guided", to: "focusHandbook" },
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
        { label: "Talk to us", to: "talkToUs" },
        { label: "↺ Start over", to: "opening" },
      ],
    },
  ],
  focusHandbook: [
    { say: `Get your free ${SAFETY_HANDBOOK.fullTitle}, leave your email right here.` },
    { wait: 160 },
    { gesture: "circle", target: "#handbookEmail" },
  ],
  /** @deprecated alias — guidebook capture lives in the agent dock now. */
  onOwn: [
    { say: `Get your free ${SAFETY_HANDBOOK.fullTitle}, leave your email right here.` },
    { wait: 160 },
    { gesture: "circle", target: "#handbookEmail" },
  ],
  toSafetyDashboard: [
    { show: "safetyFlow", step: "signup" },
    { wait: 200 },
    {
      say: "Tell us who you are. We'll draft all five documents to your organization before you read a word.",
    },
  ],

  // INT-09 — Discuss capture gate (stub). Stub never pretends to be a live
  // multi-turn LLM; when a visitor wants to talk something through, the room
  // acknowledges it honestly and routes the intent into `capture` (`kind:'discuss'`),
  // never a dead-end notice. Same await/confirm pattern as `withUs`/`onOwn`.
  toDiscuss: [
    { clear: true },
    { say: "That deserves a real conversation, more than I can script here." },
    { wait: 180 },
    { say: "Leave your email and the team will pick it up with you." },
    { wait: 140 },
    { show: "capture", kind: "discuss" },
    { gesture: "circle", target: "#capSubmit" },
    { await: "capture" },
    { show: "confirm", mode: "discuss" },
    { wait: 460 },
    { say: "Got it. A real person will follow up, and the path stays right here." },
    { wait: 160 },
    {
      suggest: [
        { label: "Want this for your actual organization?", lead: true, to: "toOrgAssessment" },
        { label: "Map where we actually stand", to: "toBeat" },
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
