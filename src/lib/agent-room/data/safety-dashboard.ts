/**
 * Dashboard conversion screen — ported from `docs/html/safety-scene/03-dashboard-conversion.html`.
 */
import { SAFETY_GUIDEBOOK } from "@/lib/agent-room/naming";
export type DashboardProseBlock = string | { hand: string };

export const SAFETY_DASHBOARD_COPY = {
  eyebrow: "Safety · the vehicle",
  headline: "Even with a map, it's hard to move sometimes.",
  open: [
    `The ${SAFETY_GUIDEBOOK.fullTitle} doesn't hold back. What a Safety charter is, why each of the five documents matters, how to build them, exact templates. Read it and you'll know exactly what your organization needs to decide.`,
    { hand: "But it's still… a lot." },
    "The next step is clear, but it's still hard to stare at a blank page, to decide who decides, to communicate with stakeholders, to assess the actual reality within your organization in a way that doesn't become your new, permanent full-time position.",
  ] satisfies DashboardProseBlock[],
  questionLabel: "The question we asked",
  solutionHeadline: "We built a dashboard that does everything but the discernment for you.",
  solution: [
    "So we asked a simple question: what would we build for the person who read the whole guide and still couldn't get it done?",
    "What your organization will and won't do with AI is a decision only your leadership can make. Everything around that decision, the research, the drafting, the structure, the organizational assessment, and more, we do for you. Presented in your private organizational dashboard to which you have permanent access.",
  ] satisfies DashboardProseBlock[],
  outcome:
    "The outcome: in two weeks, a complete, board-ready Safety charter, your five documents, drafted in your organization's own context, ready to ratify.",
  stepsLabel: "Here's what that takes, and what we do",
  steps: [
    "We do deep research on your organization, who you are, who you serve, the data you hold, the trust you've built, so the charter fits you, not a template.",
    "We combine that with our own AI Charter guidelines, the same framework behind the Field Guide, to generate a full first draft of all five documents.",
    "We present it in a dashboard built for the work: each document laid out, in plain language, ready to read and react to.",
    "You move through it in order, you discern, you edit, and in a single meeting with the right folks at the table you decide.",
    "You end with a ratified charter your board can sign, share, publish, and your people can organize around safely.",
  ],
  cta: "Get started with the dashboard →",
  ctaHref: "/enroll",
  dock: {
    voiceLine: `The ${SAFETY_GUIDEBOOK.shortLabel.toLowerCase()} is the map. The dashboard is how you actually move.`,
    composerPlaceholder: "Ask about the dashboard or what happens next…",
  },
} as const;
