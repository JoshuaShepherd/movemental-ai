import { PATH_STAGE_LABELS, PATH_STAGE_RAIL } from "@/lib/agent-room/naming";

import type { AudiencePageConfig } from "./types";

export const AUDIENCE_NAV = [
  { id: "where-you-stand", label: "Where you stand" },
  { id: "deeper-problem", label: "The deeper problem" },
  { id: "the-case", label: "The case" },
  { id: "what-we-build", label: "The foundation" },
  { id: "the-build", label: "The build" },
  { id: "formation", label: "Formation" },
  { id: "the-path", label: "The path" },
  { id: "start", label: "Start" },
] as const;

export const PATH_STAGES = [
  { ...PATH_STAGE_RAIL[0], here: true },
  { ...PATH_STAGE_RAIL[1], here: false },
  { ...PATH_STAGE_RAIL[2], here: false },
  { ...PATH_STAGE_RAIL[3], here: false },
] as const;

export const INSTITUTIONS_PAGE_CONFIG: AudiencePageConfig = {
  slug: "institutions",
  hero: {
    eyebrow: "For seminaries & institutions",
    title: "AI is already inside your seminary.",
    sub: "No one decided that. It just arrived. Here's what it means, and what to do first.",
  },
  painSection: {
    title: "Here's what's already happening.",
    intro: "None of this was planned. It's just true right now.",
    cards: [
      {
        title: "Students are already using it.",
        body: "They draft sermons, do exegesis, and write papers with AI. Most get no guidance on how.",
      },
      {
        title: "Every professor has a different rule.",
        body: "One welcomes AI. The next calls it cheating. The student just guesses.",
      },
      {
        title: "It's not in the curriculum.",
        body: "Your graduates will lead in an AI world. Almost no seminary teaches them how to think about it.",
      },
      {
        title: "Your degree means different things.",
        body: "What it stood for in 2011, 2014, and 2023 quietly drifted. No one ever reconciled it.",
      },
      {
        title: "Your own records are lost to you.",
        body: "The files are saved, but no one can find them. The seminary can't even learn from itself.",
      },
      {
        title: "Your name can be faked.",
        body: "A professor's writing or voice can be copied in minutes. Your name no longer proves it's really you.",
      },
    ],
  },
  deeperProblem: {
    title: "These aren't six problems. They're one.",
    paragraphs: [
      "Underneath all of it is one thing: your seminary is scattered. Your people, your work, and your record sit in pieces that don't connect. What is true of one faculty member's archive is true of the institution's body of work: syllabi in one place, scholarship in another, formation pathways nowhere visible as a whole.",
      "AI built on top of that doesn't fix the mess, it makes more of it, faster.",
      "And for a seminary, the thing most at risk is the thing you can't replace. A business that makes an AI mistake loses a client. You'd lose trust in the degree itself, and that trust is the whole product.",
      "You also carry a weight other places don't. Whatever you decide about AI becomes the example every church your graduates lead will follow. Doing nothing is still a choice. It teaches them that no one needs to think about this carefully.",
    ],
  },
  theCase: {
    title: "The full case, in one letter.",
    intro:
      "Here's the whole argument in plain words, written to share with your board. Read it here, or download it to send.",
    letterAriaLabel: "Letter to a seminary president",
    askAiPromptKey: "institutionsTheCase",
  },
  foundation: {
    title: "We gather what's scattered into one place.",
    paragraphs: [
      "This is where Movemental comes in. We take your people, your work, and your record and gather them into one connected foundation, a single source of truth your seminary owns. It's visible. It's verifiable. And it's built from what's actually yours.",
    ],
    fixRows: [
      {
        pain: "Your records were lost",
        gain: "now they're in one place you can search and build on.",
      },
      {
        pain: "Your name could be faked",
        gain: "now there's a verified record of what's really yours.",
      },
      {
        pain: "Your degree drifted",
        gain: "now there's one clear, canonical account of what it means.",
      },
      {
        pain: "Your chatbot sounded generic",
        gain: "now it can answer real questions about you, because it's grounded in your own material.",
      },
    ],
    diagramCenterLabel: "CORE",
  },
  theBuild: {
    title: "Then we build the tools on top of it.",
    paragraphs: [
      "Once the foundation is real, we build the things your seminary actually needs on top of it, search that knows your work, an assistant that can speak for you accurately, and ways to make your scholarship findable for the next generation who are asking the machine instead of the library. Built on what you already have. Owned by you.",
    ],
    toolExamples: [
      {
        label: "Search",
        text: "that knows your syllabi, archives, and faculty work, not the open web.",
      },
      {
        label: "Assistant",
        text: "that speaks from your material, with sources your board can check.",
      },
      {
        label: "Discovery",
        text: "so the next generation finds your scholarship when they ask the machine, not only the library.",
      },
    ],
  },
  formation: {
    title: "But tools alone aren't the answer.",
    paragraphs: [
      "Here's the part most people skip. Technology without formed people isn't progress, it's replacement. It's also how most AI projects fail.",
      "A foundation only holds if your people can steward it. So the tools come with formation. We form a group inside your seminary in the three things AI demands: discernment, knowing what's wise; authorship, keeping a real human behind the words; and stewardship, caring for what's been entrusted to you.",
      "For a seminary, this isn't an add-on. Forming people is what you already do. It's the part you, of all places, should lead with. The technology and the training are linked on purpose. One without the other doesn't work.",
    ],
    handLine: "Formation isn't extra. It's the point.",
  },
  thePath: {
    intro: `We don't do this all at once, and we don't start with the tech. There's an order. Safety first, decide, in writing, what you will and won't do with AI. Then Sandbox, test it against real work. Then ${PATH_STAGE_LABELS.training}, form your people. Then ${PATH_STAGE_LABELS.tech}, build the tools. Each step earns the next. Your first move is Safety.`,
  },
  start: {
    title: "Start with a conversation.",
    body: "Institutions don't start this with a checkout button. They start with a talk. Tell us where your seminary is, and we'll show you the first step. The letter above is yours to share with your board while you decide.",
    mailtoHref: "mailto:hello@movemental.ai?subject=Our%20seminary%20%E2%80%94%20first%20conversation",
    downloadFilename: "letter-to-a-seminary-president.txt",
    sendToBoardSubject: "AI and our seminary, a letter for the board",
    askAiPromptKey: "institutionsStart",
  },
  nav: AUDIENCE_NAV,
  letterEmbedStart: "You carry a weight in this moment",
  dock: {
    voiceLine: "Want to see where your institution actually stands with AI? Let's map it together.",
    highlightChipLabel: "Map where we stand",
    chips: [
      { label: "Map where we stand", action: "agent", agentAsk: "Map where my institution stands with AI" },
      { label: "Read the board letter", action: "scroll", target: "the-case" },
      { label: "What's the first step?", action: "agent", agentAsk: "What's the first step for an institution?" },
      { label: "Talk to us", action: "agent", agentAsk: "I'd like to talk to someone at Movemental about our institution" },
    ],
  },
};
