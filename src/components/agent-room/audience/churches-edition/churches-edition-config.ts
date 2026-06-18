import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import type { ChurchesEditionConfig } from "./churches-edition-types";

export const CHURCHES_EDITION_NAV = [
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
    body: "What you believe about AI in the life of your church, written down so it can be agreed on, not assumed.",
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
    body: "The plain rules that govern AI use in specific areas, from sermon prep to pastoral care to donor data.",
  },
  {
    n: "05",
    title: "Response",
    body: "What you do when something goes wrong, named owners and clear steps, decided before you need them.",
  },
] as const;

export const CHURCHES_EDITION_CONFIG: ChurchesEditionConfig = {
  slug: "churches",
  mastVolume: "For Churches · Vol. 01",
  nav: CHURCHES_EDITION_NAV,
  hero: {
    eyebrow: "What's already true",
    leadClaim: "AI is already inside your church",
    intro:
      "None of this is hypothetical. It is happening in churches like yours, right now. Six things are already true, and not one of them was chosen on purpose. Tap the evidence under any card to see the source.",
    cardsNote:
      "Not one of these was decided on purpose. That is the actual problem, and it has one answer.",
  },
  evidenceCards: [
    {
      where: "In the study",
      num: "01",
      accent: "blue",
      title: "AI is in the study, with no rule about the pulpit.",
      body: "Your staff are already using it to research, draft, and edit. Almost no church has written down where the line is.",
      evidence: {
        bold: "87% of US pastors now use AI in ministry; only 13% do not.",
        detail:
          "Nearly a quarter use it to write or edit sermons, up from 12% in 2024.",
        source: "Barna, State of the Church, Dec 2025 (n=442 pastors)",
      },
    },
    {
      where: "Pastoral care",
      num: "02",
      accent: "margin",
      title: "Care is quietly being handed to a tool that cannot carry it.",
      body: "The line between using AI to prepare and letting it stand in for presence is real, and almost nowhere is it defended on purpose.",
      evidence: {
        bold: "Counseling-prep and message use is rising fast, while only ~13% of pastors abstain.",
        detail:
          "The line between preparation and substitution is moving, and most churches have not decided where it sits.",
        source: "Barna, State of the Church, Dec 2025",
      },
    },
    {
      where: "In the pew",
      num: "03",
      accent: "ink",
      title: "Your people are already asking the machine about you.",
      body: '"Look them up" now means "ask an AI." Many in your pews are uneasy about all of it, and divided on what is even acceptable.',
      evidence: {
        bold: "61% of churchgoers say they are concerned about AI's influence on Christianity.",
        detail:
          "They split almost evenly, 44% to 43%, on whether using AI in sermon prep is even right.",
        source: "Lifeway Research / Christianity Today, 2026",
      },
    },
    {
      where: "The record",
      num: "04",
      accent: "blue",
      title: "What the machine says about you may be invented.",
      body: "If your church is not legible to AI, the AI fills the gap on its own. The answer a stranger receives can be confidently wrong.",
      evidence: {
        bold: "Misinformation is pastors' single biggest concern about AI, named by 41%.",
        detail:
          "An AI describing your church can fabricate beliefs, history, and facts that were never yours.",
        source: "2025 State of AI in the Church (n=594)",
      },
    },
    {
      where: "The conviction",
      num: "05",
      accent: "margin",
      title: "It will not represent what your church actually believes.",
      body: "Without a record it can read, the model guesses your positions. Your hardest-won convictions get flattened into an average.",
      evidence: {
        bold: "For the churches we serve, credibility is not an advantage. It is the product.",
        detail:
          "When the public front door to your church is an AI summary, an inaccurate one is not a marketing problem. It is a credibility one.",
        source: "Movemental, The Four-Stage Path",
      },
    },
    {
      where: "The voice",
      num: "06",
      accent: "ink",
      title: "Your voice can be cloned, and it already is.",
      body: "A few seconds of sermon audio is enough. Scammers are using cloned pastors to ask congregations for donations and crypto.",
      evidence: {
        bold: "Scammers are cloning pastors' voices and accounts to solicit money from their own congregations.",
        detail: "Three seconds of public audio is enough to build a convincing copy.",
        source: "WIRED / FOX13 Memphis, 2026",
      },
    },
  ],
  path: {
    eyebrow: "The path",
    title: "The answer is not a tool. It is an order",
    intro:
      "Four stages, and the order is not arbitrary. Skip one and the cost compounds in the single currency your church cannot afford to lose: its credibility.",
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
      "A written and ratified five-part AI Safety Charter is the first step, and nothing else on the path works without it. Without it, what chance do you have to align, get clear, decide, or act? And AI does not go away if you decline to say, plainly, what is true and real for your church today.",
      "This is urgent because the risk is already here, carried in by AI that is already in the building. We show you how to write it yourself in the guidebook, or we walk through it with you in the dashboard.",
    ],
    marginalia: "this is the part you don't delegate",
    charterParts: CHARTER_PARTS,
  },
  solutions: {
    eyebrow: "Stage four · Tech",
    title: "Then we build the tools on top of it",
    intro:
      "The working platform sits on the desk and in your pocket. It is built on the Charter, so what it publishes and what it says about you stays inside what your church has already decided.",
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
        tag: "your teaching, shared well",
        items: ["Sermons", "Pathways", "Devotionals", "Communications"],
      },
      {
        title: "Formation",
        tag: "people, not just content",
        items: ["Cohorts", "Discipleship", "Small groups"],
      },
      {
        title: "Relationships",
        tag: "a community that knows you're here",
        items: ["Care", "Connection", "Local presence"],
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
    title: "Isn't this just an expensive church website?",
    slides: [
      {
        kind: "quote",
        quote: "A real question. And the real answer isn't the one you'd expect.",
      },
      {
        kind: "content",
        bold: "A website builder gives you the surface.",
        body: "Pages, hosting, a give button. Then it leaves the part that matters to you: sharing your teaching, reaching your community, and being represented honestly by the systems that now answer for you.",
      },
      {
        kind: "content",
        bold: "A platform gives you the system underneath.",
        body: "Your teaching found and shared well. Tools built to your church. A presence an AI can represent faithfully because it can finally read who you are.",
      },
      {
        kind: "quote",
        quote: "You are not overpaying for a website.",
        body: "You are finally able to steward the ministry the way it deserves. The platform your church always needed, now that the cost of building it has come down.",
      },
    ],
  },
  limit: {
    eyebrow: "The limit",
    title: "But tools alone aren't the answer",
    paragraphs: [
      "Tools without discipleship is just a faster way to do the wrong thing well. A church can buy powerful technology and use it to quietly hollow out the very work it was meant to serve.",
      "So the platform is never handed over on its own. It comes inside a path that forms people first. Discernment, authorship, and stewardship, in your people, before the tools are put in their hands.",
    ],
    marginalia: "formation before deployment",
  },
  start: {
    eyebrow: "Start",
    title: "Start with a conversation",
    body: "Churches don't start this with a checkout button. They start with a talk. Tell us where you are, and we'll show you the first step honestly.",
    ctas: [
      {
        label: "Talk to us",
        href: "mailto:hello@movemental.ai?subject=Our%20church%20%E2%80%94%20first%20conversation",
        variant: "solid",
      },
      {
        label: "See the path",
        href: "/agent/path/safety",
        variant: "ghost",
      },
    ],
    askAiPromptKey: "churchesStart",
  },
  dock: {
    voiceLine: "Curious where your church really stands with AI? I can map it with you.",
    highlightChipLabel: "Map where we stand",
    chips: [
      { label: "Map where we stand", action: "scene", scene: "toBeat" },
      { label: "What's the first step?", action: "scene", scene: "toSafetyFlow" },
      { label: "See the path", action: "scroll", target: "the-path" },
      { label: "Talk to us", action: "scene", scene: "talkToUs" },
    ],
  },
};
