/**
 * Safety readback scene — hero copy, charter spread metadata, and door cards.
 * Ported from `docs/html/safety-scene/safety-scene.js`.
 */
import {
  FREE_GUIDEBOOK_CTA,
  SAFETY_GUIDEBOOK,
} from "@/lib/agent-room/naming";
import { SAFETY_CHARTER_DRAFTS } from "./safety-charter-drafts";

export interface SafetyCharterDocument {
  id: keyof typeof SAFETY_CHARTER_DRAFTS;
  layer: string;
  title: string;
  ratified: boolean;
  threat: string;
  rot: string;
  draft: string;
}

export interface SafetyDoor {
  id: string;
  featured?: boolean;
  paid?: boolean;
  badge: string;
  priceAmount: string;
  pricePeriod: string;
  tagline: string;
  body: string;
  features: readonly string[];
  cta: string;
  /** Scene key (`onOwn`, `withUs`, …) — resolved by the room runner. */
  scene: string;
}

export const SAFETY_READBACK_COPY = {
  heroTitle: "AI Safety is About Human Trust.",
  reframe:
    "The threats of AI to organizational credibility exist whether you adopt AI or not, and are guaranteed if we do nothing. The first move is to name reality and a grounded, written response.",
  nextMove:
    "Now that AI is already within our organizations, the only choice is to respond wisely and clearly. Our free guide will walk you through it, or we can sprint together. Because this step is actually urgent.",
  plansPreview: `Two viable paths to the same ratified ${SAFETY_GUIDEBOOK.shortLabel}.`,
  doorsHonest:
    "Same outcome either way. Free means you hold the pen with a thorough guide; paid means we run the full process with you in the dashboard.",
  spreadHint: "Tap a document to read the full draft · sticky notes name what's missing",
  charterLabel: `Your AI ${SAFETY_GUIDEBOOK.shortLabel} — five layers`,
  pathLabel: "The path",
} as const;

export const SAFETY_CHARTER_DOCUMENTS: SafetyCharterDocument[] = [
  {
    id: "statement",
    layer: "01",
    title: "Statement",
    ratified: false,
    threat: "No agreed position. Every hard call becomes an argument with nothing to settle it.",
    rot: "-5deg",
    draft: SAFETY_CHARTER_DRAFTS.statement,
  },
  {
    id: "policy",
    layer: "02",
    title: "Policy",
    ratified: false,
    threat:
      "No policy — chaos where people improvise, paralysis where teams won't move. Nobody knows what's in bounds.",
    rot: "-2deg",
    draft: SAFETY_CHARTER_DRAFTS.policy,
  },
  {
    id: "context",
    layer: "03",
    title: "Context",
    ratified: true,
    threat:
      "You can't name every AI tool your staff already use, or what data each one touches. You're exposed and can't see where.",
    rot: "1deg",
    draft: SAFETY_CHARTER_DRAFTS.context,
  },
  {
    id: "rules",
    layer: "04",
    title: "Rules",
    ratified: false,
    threat: "Staff guess. Donor, pastoral, and member data goes into tools no one vetted.",
    rot: "4deg",
    draft: SAFETY_CHARTER_DRAFTS.rules,
  },
  {
    id: "responsePlans",
    layer: "05",
    title: "Response Plans",
    ratified: true,
    threat: "Something goes wrong and there's no plan. The scramble is public, and trust pays for it.",
    rot: "7deg",
    draft: SAFETY_CHARTER_DRAFTS.responsePlans,
  },
];

export const SAFETY_DOORS: SafetyDoor[] = [
  {
    id: "free",
    featured: true,
    badge: "Free",
    priceAmount: "$0",
    pricePeriod: "self-paced · 1–2 months",
    tagline: "A thorough, in-depth handbook — your team walks every layer.",
    body: `The ${SAFETY_GUIDEBOOK.fullTitle} is not a checklist. It is a full methodology: how to draft, stress-test, and ratify all five ${SAFETY_GUIDEBOOK.shortLabel} layers with your board and staff.`,
    features: [
      "Complete handbook — step-by-step through Statement, Policy, Context, Rules, and Response Plans",
      "Draft templates, ratification checklists, and escalation scripts you can hand to leadership",
      "Worked examples for churches, nonprofits, and institutions — not generic AI policy boilerplate",
      "Guidance when you are stuck; you hold the pen and set the pace",
    ],
    cta: FREE_GUIDEBOOK_CTA,
    scene: "focusHandbook",
  },
  {
    id: "paid",
    paid: true,
    badge: "Managed",
    priceAmount: "$1,000",
    pricePeriod: "two weeks",
    tagline: "The full managed process — in a dashboard, with every resource beside you.",
    body: "We draft all five layers customized to your organization, run working sessions with your team, and deliver a board-ready ratification package — not async email ping-pong.",
    features: [
      `Private dashboard to review, comment on, and ratify each ${SAFETY_GUIDEBOOK.shortLabel} document`,
      "Custom drafts across all five layers, fitted to your theology, governance, and data posture",
      "Live working sessions with Movemental through the sprint",
      "Full resource library: exemplars, incident templates, vendor registers, and staff briefings",
      "Board ratification package delivered at the end of two weeks",
    ],
    cta: "Have us do it · $1,000",
    scene: "toSafetyDashboard",
  },
];
