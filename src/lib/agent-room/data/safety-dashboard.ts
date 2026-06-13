/**
 * Dashboard conversion screen — ported from `docs/html/safety-scene/03-dashboard-conversion.html`.
 */
import { SAFETY_GUIDEBOOK } from "@/lib/agent-room/naming";
export type DashboardProseBlock = string | { hand: string };

export const SAFETY_DASHBOARD_COPY = {
  eyebrow: "Safety · with us",
  headline: "Even with a map, it's hard to move sometimes.",
  open: [
    `The ${SAFETY_GUIDEBOOK.fullTitle} doesn't hold back. What a Safety charter is. Why each of the five documents matters. How to build them. Exact templates. Read it and you'll know what your organization needs to decide.`,
    { hand: "But it's still a lot." },
    "The next step is clear. It is still hard to stare at a blank page. To decide who decides. To talk with stakeholders. To assess what is actually true inside your organization without making it your new full-time job.",
  ] satisfies DashboardProseBlock[],
  questionLabel: "The question we asked",
  solutionHeadline: "We built a dashboard that does everything but the discernment for you.",
  solution: [
    "We asked a simple question. What would we build for the person who read the whole guide and still could not get it done?",
    "What your organization will and won't do with AI is a decision only your leadership can make. Everything around that decision, the research, the drafting, the structure, the organizational assessment, we do for you. It lives in your private dashboard, which you keep.",
  ] satisfies DashboardProseBlock[],
  outcome:
    "In two weeks: a complete, board-ready Safety charter. Five documents, drafted in your organization's own context, ready to ratify.",
  stepsLabel: "Here's what that takes, and what we do",
  steps: [
    "We research your organization. Who you are. Who you serve. The data you hold. The trust you've built. The charter fits you, not a template.",
    "We combine that with our AI Charter guidelines, the same framework behind the Field Guide, to generate a full first draft of all five documents.",
    "We present it in a dashboard built for the work. Each document laid out in plain language, ready to read and react to.",
    "You move through it in order. You discern. You edit. In one meeting with the right people at the table, you decide.",
    "You end with a ratified charter your board can sign, share, and publish. Your people can organize around it safely.",
  ],
  cta: "Get started with the dashboard →",
  ctaHref: "/enroll",
  dock: {
    voiceLine: `The ${SAFETY_GUIDEBOOK.shortLabel.toLowerCase()} is the map. The dashboard is how you actually move.`,
    composerPlaceholder: "Ask about the dashboard or what happens next…",
  },
} as const;
