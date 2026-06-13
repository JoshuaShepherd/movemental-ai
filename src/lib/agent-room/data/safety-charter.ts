/**
 * Safety readback scene — hero copy, charter spread metadata, and door cards.
 * Ported from `docs/html/safety-scene/safety-scene.js`.
 */
import {
  FREE_HANDBOOK_CTA,
  SAFETY_CHARTER,
  SAFETY_HANDBOOK,
} from "@/lib/agent-room/naming";
import { SAFETY_CHARTER_DRAFTS } from "./safety-charter-drafts";

export interface SafetyCharterDocument {
  id: keyof typeof SAFETY_CHARTER_DRAFTS;
  layer: string;
  title: string;
  /** Formal document name (e.g. AI Use Statement). */
  sub: string;
  ratified: boolean;
  threat: string;
  rot: string;
  draft: string;
  /** Plain-language paragraphs for modal preview. */
  body: readonly string[];
  affTitle: string;
  aff: readonly string[];
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
  heroTitle: "AI Safety is about human trust.",
  reframe:
    "The threats to organizational credibility exist whether you adopt AI or not. They grow if you do nothing. The first move is to name reality and write a grounded response.",
  nextMove:
    "AI is already inside most organizations. The only choice left is to respond wisely and clearly. The free handbook covers every layer. Or we can sprint together with you.",
  plansPreview: "Two ways to do it.",
  doorsHonest:
    "Both get you to a ratified charter. The honest question is which one you'll actually finish.",
  spreadHint: "Tap a document to read the full draft. Sticky notes name what's missing.",
  charterLabel: `Your ${SAFETY_CHARTER.fullTitle}, five layers`,
  pathLabel: "The path",
} as const;

export const SAFETY_CHARTER_DOCUMENTS: SafetyCharterDocument[] = [
  {
    id: "statement",
    layer: "01",
    title: "Statement",
    sub: "AI Use Statement",
    ratified: false,
    threat: "No agreed position. Every hard call becomes an argument with nothing to settle it.",
    rot: "-5deg",
    draft: SAFETY_CHARTER_DRAFTS.statement,
    body: [
      "We believe artificial intelligence is a tool that can extend our mission when it is governed by human judgment, integrity, and the trust people place in our organization. AI does not replace care, formation, or the human presence our work requires.",
      "We adopt AI to steward time for deeper human work, not to make more content for its own sake. Every external-facing use of AI must preserve authenticity. Our voice remains ours, our accountability stays visible, and our people remain able to trust what they receive from us.",
    ],
    affTitle: "What we affirm",
    aff: [
      "Human authorship and review for all donor-facing and public communications.",
      "Transparency when AI materially assisted a published work.",
      "Protection of sensitive data, donor records, and case notes as non-negotiable.",
      "Board-level ownership of our AI stance, reviewed annually.",
    ],
  },
  {
    id: "policy",
    layer: "02",
    title: "Policy",
    sub: "Acceptable Use Policy",
    ratified: false,
    threat:
      "No policy, chaos where people improvise, paralysis where teams won't move. Nobody knows what's in bounds.",
    rot: "-2deg",
    draft: SAFETY_CHARTER_DRAFTS.policy,
    body: [
      "This policy names which uses of AI are permitted, which are prohibited, and who decides. It applies to every staff member, volunteer, and contractor acting for the organization.",
      "Permitted uses assist human work without replacing human judgment: drafting, summarizing, research, and admin support, always reviewed by a person before it leaves the organization. Prohibited uses put trust or data at risk: entering sensitive records into unapproved tools, publishing AI-generated work without review or disclosure, or letting AI make decisions about people.",
    ],
    affTitle: "What it sets",
    aff: [
      "An approved-tools list everyone can see.",
      "A clear owner for AI decisions.",
      "A simple request path for new tools, so people don't improvise.",
    ],
  },
  {
    id: "context",
    layer: "03",
    title: "Context",
    sub: "Organizational Context",
    ratified: false,
    threat:
      "You can't name every AI tool your staff already use, or what data each one touches. You're exposed and can't see where.",
    rot: "1deg",
    draft: SAFETY_CHARTER_DRAFTS.context,
    body: [
      "This document records what makes our situation specific: the data we hold, the people we serve, the laws and grants we are bound by, and the trust we cannot afford to lose. A generic policy ignores this. Ours cannot.",
      "We name the sensitive data in our care, the populations we are responsible for, and the obligations our funders and regulators place on us. Then we inventory the AI tools already in use across the organization, and the data each one touches.",
    ],
    affTitle: "What it captures",
    aff: [
      "An inventory of the AI tools already in use.",
      "The data each one touches.",
      "The specific risks our mission and the people we serve create.",
    ],
  },
  {
    id: "rules",
    layer: "04",
    title: "Rules",
    sub: "Operating Rules",
    ratified: false,
    threat: "Staff guess. Donor, pastoral, and member data goes into tools no one vetted.",
    rot: "4deg",
    draft: SAFETY_CHARTER_DRAFTS.rules,
    body: [
      "These are the concrete, usable rules staff follow day to day. Plain enough to hand a new hire on their first day.",
      "Never put donor, beneficiary, member, or case data into a tool that is not on the approved list. Disclose AI assistance on published work where it materially shaped the result. Always have a person review AI output before it reaches someone we serve or someone who funds us. When unsure, ask the owner named in the Policy.",
    ],
    affTitle: "What it provides",
    aff: [
      "A short, memorable do-and-don't list.",
      "A clear escalation path.",
      "Examples drawn from our actual work.",
    ],
  },
  {
    id: "responsePlans",
    layer: "05",
    title: "Response Plans",
    sub: "Incident Response",
    ratified: false,
    threat: "Something goes wrong and there's no plan. The scramble is public, and trust pays for it.",
    rot: "7deg",
    draft: SAFETY_CHARTER_DRAFTS.responsePlans,
    body: [
      "This is the plan for the day something goes wrong, written before we need it. A small problem caught early stays small. A problem met by improvising becomes a public scramble, and trust pays for it.",
      "We name how a problem is reported, who is told, how we respond, and how we make it right. We define what counts as an incident, exposed data, a harmful or false AI output, a misused tool, and the first steps for each.",
    ],
    affTitle: "What it includes",
    aff: [
      "A named responsible person.",
      "A simple reporting path.",
      "A communication plan for the people affected.",
      "A short review after, so it doesn't happen twice.",
    ],
  },
];

export const SAFETY_DOORS: SafetyDoor[] = [
  {
    id: "free",
    badge: "Do it yourself",
    priceAmount: "Free",
    pricePeriod: "A guide and five templates",
    tagline: "The free Handbook",
    body: "The complete guide, yours to keep. You start from a blank page and write all five documents at your own pace. The knowledge was never the expensive part, so we don't charge for it.",
    features: [
      "Complete handbook with templates for all five charter layers",
      "Draft and ratify at your own pace",
      "Best when your team has the time and will to finish",
    ],
    cta: FREE_HANDBOOK_CTA,
    scene: "toSafetyFlowDiy",
  },
  {
    id: "dashboard",
    featured: true,
    badge: "Build your dashboard",
    priceAmount: "Free to start",
    pricePeriod: "No call, no checkout",
    tagline: "The Safety Dashboard",
    body: "Sign up and we draft all five documents to your organization before you read a word. You edit instead of authoring, track every layer, and ratify them in your own dashboard.",
    features: [
      "All five documents drafted to your organization",
      "Edit, track, and ratify in your dashboard",
      "Best when your team is stretched or you serve vulnerable people",
    ],
    cta: "Build your dashboard →",
    scene: "toSafetyFlowSignup",
  },
];
