import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import type { AudienceEditionConfig } from "./audience-edition-types";

export const NONPROFITS_EDITION_NAV = [
  { id: "hero", label: "What's already true" },
  { id: "the-path", label: "The path" },
  { id: "stage-one", label: "Safety" },
  { id: "stage-four", label: "The build" },
  { id: "why-a-platform", label: "A fair question" },
  { id: "the-limit", label: "The limit" },
  { id: "start", label: "Start" },
] as const;

const CHARTER_PARTS = [
  {
    n: "01",
    title: "Vision",
    body: "What you believe about AI in the life of your organization, written down so it can be agreed on, not assumed.",
  },
  {
    n: "02",
    title: "Plans",
    body: "What you intend to do with AI, and what you intend to refuse, before the first edge case arrives.",
  },
  {
    n: "03",
    title: "Reality",
    body: "What is actually true in your context: who is already using what, where the real exposure sits.",
  },
  {
    n: "04",
    title: "Rules",
    body: "The plain rules that govern AI use in specific areas, from grant reports to donor data to beneficiary records.",
  },
  {
    n: "05",
    title: "Response",
    body: "What you do when something goes wrong, named owners and clear steps, decided before you need them.",
  },
] as const;

export const NONPROFITS_EDITION_CONFIG: AudienceEditionConfig = {
  slug: "nonprofits",
  mastVolume: "For Nonprofits · Vol. 01",
  nav: NONPROFITS_EDITION_NAV,
  hero: {
    eyebrow: "What's already true",
    leadClaim: "AI is already inside your organization",
    intro:
      "None of this is hypothetical. It is happening in organizations like yours, right now. Six things are already true, and not one of them was chosen on purpose. Tap the evidence under any card to see the source.",
    cardsNote:
      "Not one of these was decided on purpose. That is the actual problem, and it has one answer.",
  },
  evidenceCards: [
    {
      where: "On staff desks",
      num: "01",
      accent: "blue",
      title: "AI is already inside your organization.",
      body: "Your staff are not waiting for a policy. Most use is one person, one personal account, one task at a time. The tools arrived before the decision did.",
      evidence: {
        bold: "92% of nonprofits already use AI in some form.",
        detail:
          "81% of that use runs through individual accounts, ad hoc, with no shared place to do it safely.",
        // SourceId: virtuous-2026
        source: "Virtuous AI Readiness Report, 2026",
      },
    },
    {
      where: "Donor records",
      num: "02",
      accent: "margin",
      title: "Donor records are sitting in tools you do not control.",
      body: "Someone pastes donor and beneficiary details into a personal AI account to clean up a list or draft an appeal. There is no contract, no retention rule, and no one ever decided this was allowed.",
      evidence: {
        bold: "81% of nonprofit AI use runs through individual accounts with no shared governance.",
        detail:
          "It is not negligence. It is what happens when the work has nowhere safe to go.",
        source: "Virtuous AI Readiness Report, 2026",
      },
    },
    {
      where: "The board",
      num: "03",
      accent: "ink",
      title: "Your board has not met its duty yet.",
      body: "Nearly half of nonprofits have no AI governance policy at all. The board's job to oversee how the organization handles risk now includes this, whether or not anything has gone wrong so far.",
      evidence: {
        bold: "47% of nonprofits have no AI governance policy; 76% have no formal strategy.",
        detail: "The duty applies before the harm, not after it.",
        // SourceIds: virtuous-2026, techsoup-2025, forvis-mazars-2026
        source: "Virtuous 2026; TechSoup 2025; Forvis Mazars 2026",
      },
    },
    {
      where: "The gain",
      num: "04",
      accent: "blue",
      title: "The time you are saving is not adding up.",
      body: "Most teams report small gains from AI and little that compounds. Individual use never adds up to organizational strength on its own.",
      evidence: {
        bold: "Only about 5–7% of organizations see real capability improvement from AI.",
        detail:
          "Almost all of them redesigned how the work flows instead of bolting AI onto the old steps.",
        // SourceIds: virtuous-2026, mckinsey-soa-2025
        source: "Virtuous 2026; McKinsey State of AI, 2025",
      },
    },
    {
      where: "The voice",
      num: "05",
      accent: "margin",
      title: "Your mission voice is drifting, quietly.",
      body: "Appeals start to sound generic. Reports round off the inconvenient detail. The specific, particular voice that made donors trust you gets sanded down a draft at a time.",
      evidence: {
        bold: "The loud risk is a data breach. The quiet one is worse, because no one notices it for a year.",
        detail:
          "When every staff member drafts with the same tool and no shared standard, your organization starts to read like every other organization.",
        source: "Movemental, pattern across nonprofit leaders",
      },
    },
    {
      where: "The memory",
      num: "06",
      accent: "ink",
      title: "Every staff departure takes memory with it.",
      body: "A mid-tier donor who gave steadily for seven years drifts away, because the only person who knew them left, and the relationship lived in that person's head and inbox, not in anything the organization kept.",
      evidence: {
        bold: "It is one donor, then another. A slow leak no dashboard catches.",
        detail: "This is not a generosity problem. It is a memory problem.",
        source: "Movemental, pattern across nonprofit leaders",
      },
    },
  ],
  path: {
    eyebrow: "The path",
    title: "The answer is not a tool. It is an order",
    intro:
      "Four stages, and the order is not arbitrary. Skip one and the cost compounds in the single currency your organization cannot afford to lose: its credibility.",
    stages: [
      {
        n: "Stage 01",
        title: PATH_STAGE_LABELS.safety,
        body: "Decide in writing first. A ratified five-part AI Charter: what you believe, what is true today, what you will and will not do, and what happens when something breaks. Everything else builds on it.",
        href: "/agent/path/safety",
        isFirst: true,
      },
      {
        n: "Stage 02",
        title: PATH_STAGE_LABELS.sandbox,
        body: "Then test it against real work. A Charter with nothing tested against it is theater. Your team tries AI on real tasks and marks each use green, yellow, or red.",
      },
      {
        n: "Stage 03",
        title: PATH_STAGE_LABELS.training,
        body: "Then form the people who carry it. Findings with no one to steward them go nowhere. An eight-week cohort builds discernment, authorship, and stewardship.",
      },
      {
        n: "Stage 04",
        title: PATH_STAGE_LABELS.tech,
        body: "Then build the tools, last. AI in the hands of people who cannot steward it is the 95% that fails. Built last, by formed people, on the working Charter, it is the part that holds.",
      },
    ],
    note: "Each stage answers the failure of the one before it. That is why we start with Safety.",
  },
  safety: {
    eyebrow: "Stage one · Safety",
    title: "The Charter is where you start",
    paragraphs: [
      "A written and ratified five-part AI Safety Charter is the first step, and nothing else on the path works without it. Without it, what chance do you have to align, get clear, decide, or act? And AI does not go away if you decline to say, plainly, what is true and real for your organization today.",
      "This is urgent because the risk is already here, carried in by AI that is already in the building. We show you how to write it yourself in the guidebook, or we walk through it with you in the dashboard.",
    ],
    marginalia: "this is the part you don't delegate",
    charterParts: CHARTER_PARTS,
  },
  solutions: {
    eyebrow: "Stage four · Tech",
    title: "Then we build the tools on top of it",
    intro:
      "The working platform sits on the desk and in your pocket. It is built on the Charter, so what it publishes and what it says about you stays inside what your board has already decided.",
    layers: [
      {
        title: "Foundation",
        tag: "built on your Charter",
        isBase: true,
        items: [
          "Your website",
          "Accounts & dashboard",
          "AI assistant",
          "Library",
          "Visibility & trust",
          "Governance",
        ],
      },
      {
        title: "Publishing",
        tag: "your impact, shared well",
        items: ["Stories", "Articles", "Programs", "Newsletter & media"],
      },
      {
        title: "Formation",
        tag: "people, not just content",
        items: ["Pathways & courses", "Cohorts & community", "Certificates"],
      },
      {
        title: "Relationships",
        tag: "donors who know you're here",
        items: ["Donor CRM", "Stewardship pipelines", "Grants & campaigns"],
      },
    ],
    charterMini: {
      rn: "The foundation",
      title: "Your AI Safety Charter",
      body: "Everything above answers to the five documents below it. The platform cannot publish, represent, or speak outside what your board has ratified.",
      pin: "nothing the tools do is off-charter",
    },
  },
  platform: {
    eyebrow: "A fair question",
    title: "Isn't this just an expensive nonprofit website?",
    slides: [
      {
        kind: "quote",
        quote: "A real question. And the real answer isn't the one you'd expect.",
      },
      {
        kind: "content",
        bold: "A website builder gives you the surface.",
        body: "Pages, hosting, a give button. Then it leaves the part that matters to you: sharing your impact, reaching your donors, and being represented honestly by the systems that now answer for you.",
      },
      {
        kind: "content",
        bold: "A platform gives you the system underneath.",
        body: "Your work found and shared well. Tools built for how your organization actually operates. A presence an AI can represent faithfully because it can finally read who you are.",
      },
      {
        kind: "quote",
        quote: "You are not overpaying for a website.",
        body: "You are finally able to steward the mission the way it deserves. The platform your organization always needed, now that the cost of building it has come down.",
      },
    ],
  },
  limit: {
    eyebrow: "The limit",
    title: "But tools alone aren't the answer",
    paragraphs: [
      "Tools without formation is just a faster way to do the wrong thing well. A board can buy powerful technology and use it to quietly hollow out the very work it was meant to serve.",
      "So the platform is never handed over on its own. It comes inside a path that forms people first. Discernment, authorship, and stewardship, in your people, before the tools are put in their hands.",
    ],
    marginalia: "formation before deployment",
  },
  start: {
    eyebrow: "Start",
    title: "Start with a conversation",
    body: "Nonprofits don't start this with a checkout button. They start with a talk. Tell us where your organization is, and we'll show you the first step honestly.",
    ctas: [
      {
        label: "Talk to us",
        href: "mailto:hello@movemental.ai?subject=Our%20nonprofit%20%E2%80%94%20first%20conversation",
        variant: "solid",
      },
      {
        label: "See the path",
        href: "/agent/path/safety",
        variant: "ghost",
      },
    ],
    askAiPromptKey: "nonprofitsStart",
  },
  dock: {
    voiceLine: "I can already see where your nonprofit stands. Want me to walk you through it?",
    highlightChipLabel: "Map where we stand",
    chips: [
      { label: "Map where we stand", action: "scene", scene: "toBeat" },
      { label: "What's the first step?", action: "scene", scene: "toSafetyFlow" },
      { label: "See the path", action: "scroll", target: "the-path" },
      { label: "Talk to us", action: "scene", scene: "talkToUs" },
    ],
  },
};
