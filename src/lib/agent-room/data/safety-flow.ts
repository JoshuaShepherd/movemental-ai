/**
 * Safety flow wizard — question, result copy, fork cards, and step routing.
 * Ported from docs/html/movemental-safety-flow-full.html.
 */
import { PATH_STAGE_LABELS } from "../naming";

export type SafetyFlowAnswer = "start" | "draft" | "done";

export type SafetyFlowStep =
  | "question"
  | "result"
  | "ahead"
  | "charter"
  | "fork"
  | "diy"
  | "signup"
  | "signup_sent";

export interface SafetyFlowQuestionOption {
  label: string;
  answer: SafetyFlowAnswer;
}

export const SAFETY_FLOW_QUESTION = {
  eyebrow: "Your next AI step · one question",
  title: "Let's find your simplest next step.",
  sub: "One question. Then we'll show you exactly where you stand, and what to do about it.",
  footnote:
    "The question: has your team agreed, in writing, on what you will and won't do with AI, and has your board ratified it?",
  options: [
    { label: "No, we haven't decided anything yet.", answer: "start" },
    { label: "We've talked about it, but nothing's written down.", answer: "start" },
    { label: "We have a draft, but our board hasn't ratified it.", answer: "draft" },
    { label: "Yes. It's written and our board has ratified it.", answer: "done" },
  ] satisfies SafetyFlowQuestionOption[],
} as const;

export const SAFETY_FLOW_RESULT_COPY: Record<
  "start" | "draft",
  { title: string; sub: string; body: string }
> = {
  start: {
    title: "You're at the start of the path.",
    sub: "That's true of almost everyone. The work isn't behind. It just hasn't been decided yet.",
    body: "There are four steps, and they go in order: Safety, Sandbox, Training, Tech. Your next move is the first one. Decide, in writing, what you will and won't do with AI.",
  },
  draft: {
    title: "You're closer than you think.",
    sub: "You've started. You're stuck at the part almost everyone gets stuck on.",
    body: "You're still on Safety, because Safety isn't done until it's ratified. A draft in a folder doesn't protect anyone. A signed charter does. The good news: you're close, and the last stretch is exactly what we can help you finish.",
  },
};

export const SAFETY_FLOW_AHEAD_COPY = {
  eyebrow: "Where you stand",
  title: "You've done the hardest first part.",
  sub: "Most organizations never ratify a charter. You did. Safety is behind you.",
  body: "Your next step is Sandbox: letting your team try AI on real work, safely, to learn what it's actually good for in your context.",
} as const;

export const SAFETY_FLOW_CHARTER_COPY = {
  eyebrow: "Your next step · Safety",
  title: "Write and ratify your AI Safety Charter.",
  sub: "Five plain documents that decide what your organization will and won't do with AI. Here they are, and here is what's missing until you write them.",
  charterLabel: "Your AI Charter, five layers",
  spreadHint: "Tap any document to read the full draft. The sticky notes name what's missing today.",
  cta: "Show me how to do it →",
} as const;

export const SAFETY_FLOW_FORK_COPY = {
  eyebrow: "Two ways to do it",
  title: "Do it yourself, or build your dashboard.",
  sub: "Both get you to a ratified charter. The honest question is which one you'll actually finish.",
  tuesday:
    "The hard part was never knowing what to do. It's finishing on a Tuesday, when a parent calls and the deadline hits and the blank page wins. The dashboard exists so the page is never blank.",
} as const;

export interface SafetyFlowForkCard {
  id: "diy" | "dashboard";
  tag: string;
  title: string;
  price: string;
  body: string;
  bestWhen: string;
  cta: string;
  recommended?: boolean;
  step: SafetyFlowStep;
}

export const SAFETY_FLOW_FORK_CARDS: SafetyFlowForkCard[] = [
  {
    id: "diy",
    tag: "Do it yourself",
    title: "The free Handbook",
    price: "Free. A guide and five templates.",
    body: "The complete guide, yours to keep. You start from a blank page and write all five documents at your own pace. The knowledge was never the expensive part, so we don't charge for it.",
    bestWhen: "your team has the time and the will to finish, and to get it ratified.",
    cta: "Get the free Handbook",
    step: "diy",
  },
  {
    id: "dashboard",
    tag: "Build your dashboard",
    title: "The Safety Dashboard",
    price: "Free to start. No call, no checkout.",
    body: "Sign up and we draft all five documents to your organization before you read a word. You edit instead of authoring, track every layer, and ratify them in your own dashboard. Help is one click away if you want it.",
    bestWhen: "your team is stretched, or you serve vulnerable people and can't leave this open.",
    cta: "Build your dashboard →",
    recommended: true,
    step: "signup",
  },
];

export const SAFETY_FLOW_DIY_COPY = {
  eyebrow: "The free Handbook",
  title: "Your AI Safety Handbook, free.",
  sub: "The complete guide, plus a template for each of the five documents. Start tonight. You owe us nothing.",
  emailPrompt: "Where should we send it?",
  emailPlaceholder: "you@yourorg.org",
  submit: "Send it",
  fineprint: "One email with the Handbook. No drip campaign, no sales sequence.",
  successTitle: "It's on its way.",
  successBody:
    "Check your inbox. Then open the first document tonight, with one other person, and see how it goes.",
  tuesdayBridge: "If you get two sections in and feel that Tuesday gravity, the dashboard is here. No pressure.",
  dashboardLink: "Build your dashboard instead",
} as const;

export const SAFETY_FLOW_SIGNUP_COPY = {
  eyebrow: "The Safety Dashboard",
  title: "Build your dashboard.",
  sub: "Tell us who you are. We'll draft all five documents to your organization, and you'll be inside your dashboard in under a minute. No call. No checkout.",
  orgPlaceholder: "Your organization's name",
  emailPlaceholder: "you@yourorg.org",
  submit: "Continue",
  fineprint:
    "Free to start. We draft your first version; you read, adjust, and ratify. Upgrade to a guided session anytime, or never.",
  talkFirst: "Prefer to talk first?",
  noUrgency:
    "No urgency. No scarcity. No spots filling fast. If any of that ever shows up in how we treat you, you should trust us less.",
  sentTitle: "Check your inbox.",
  sentBody:
    "We sent a sign-in link. Open it on this device and you'll land in your Safety dashboard with all five documents drafted to your organization.",
} as const;

/** Map answer → first result step after question. */
export function safetyFlowStepAfterAnswer(answer: SafetyFlowAnswer): SafetyFlowStep {
  if (answer === "done") return "ahead";
  return "result";
}

/** Stepper index (0–4) for progress dots. */
export function safetyFlowStepperIndex(step: SafetyFlowStep): number {
  switch (step) {
    case "question":
      return 0;
    case "result":
    case "ahead":
      return 1;
    case "charter":
      return 2;
    case "fork":
    case "diy":
    case "signup":
    case "signup_sent":
      return 3;
    default:
      return 0;
  }
}

/** Back navigation within the wizard. */
export function safetyFlowBackStep(step: SafetyFlowStep): SafetyFlowStep | null {
  switch (step) {
    case "result":
    case "ahead":
      return "question";
    case "charter":
      return "result";
    case "fork":
      return "charter";
    case "diy":
    case "signup":
      return "fork";
    default:
      return null;
  }
}

export const SAFETY_FLOW_PATH_STAGES = [
  { n: "01", title: PATH_STAGE_LABELS.safety },
  { n: "02", title: PATH_STAGE_LABELS.sandbox },
  { n: "03", title: PATH_STAGE_LABELS.training },
  { n: "04", title: PATH_STAGE_LABELS.tech },
] as const;
