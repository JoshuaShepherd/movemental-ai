import { PATH_STAGE_LABELS, PATH_STAGE_RAIL } from "@/lib/agent-room/naming";

import { institutionDeck } from "@/components/agent-room/deck/institution-deck";

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
    eyebrow: "A note to seminary & institution leaders",
    rhetoricalTitle: "Are you called to lead in response to AI?",
    highlightPhrase: "lead",
    framing:
      "We're about to make a bold claim. It deserves your scrutiny. And if you find that you agree with it, it asks for urgent action. So we'll be exact about what that action is.",
    claim:
      "AI is already inside your seminary. That single reality asks for one immediate move. Write and ratify your AI Safety Charter: five plain documents that set out your vision, your plans, your reality, your rules, and your response to AI. Nothing more complicated than that. Nothing less urgent.",
    segue:
      "Before you accept a claim that bold, you should see what it rests on. Here is what is already happening, in institutions like yours, right now.",
  },
  painSection: {
    title: "Here's what's already happening",
    intro: "None of this was planned. It's just true right now.",
    cards: [
      {
        title: "Your students are already using it. Almost no one is teaching them how.",
        body: "Around four in five students now use generative AI in their coursework. They draft, they do exegesis, they write with it. Most get no real guidance on how to think about it, and the graduates you send out will lead churches in an AI world they were never taught to navigate.",
        stats: [{ phrase: "Around four in five students", cite: 1 }],
        footer: { kind: "sourced" },
      },
      {
        title: "Every professor has a different rule, and the student just guesses.",
        body: "One faculty member welcomes AI. The next calls it cheating. Your institution has no shared account of what AI use means for formation, so the student improvises, and the credential quietly comes to mean different things depending on whose class they took.",
        synth: true,
        footer: { kind: "pattern", label: "A pattern leaders recognize" },
      },
      {
        title: "Your degree does not mean one thing anymore.",
        body: "What the degree stood for in 2011, in 2014, and in 2023 drifted, a little at a time, and no faculty body ever reconciled the three. A credential is a promise that the institution behind it is coherent. When formation is scattered, that promise erodes slowly, and then all at once when an accreditor, an employer, or a peer institution notices.",
        synth: true,
        footer: { kind: "pattern", label: "A pattern leaders recognize" },
      },
      {
        title: "The duty to govern this now sits with your board.",
        body: "A board's basic duties of care, loyalty, and obedience now include how the institution governs AI. This is not optional and not only a technology matter. It means naming who is accountable, requiring that vendors be accountable too, and folding AI risk into how the institution manages every other risk.",
        stats: [{ phrase: "care, loyalty, and obedience", cite: 2 }],
        footer: { kind: "sourced" },
      },
      {
        title: "Your own archive is lost to you.",
        body: "The dissertations, the curricula, the journals, the decades of scholarship are all saved somewhere, and almost none of it is findable. Doctoral students reach conclusions your faculty reached thirty years ago. The institution built to hold knowledge across generations cannot, in practice, learn from itself.",
        synth: true,
        footer: { kind: "pattern", label: "A pattern leaders recognize" },
      },
      {
        title: "Your name can be faked, and the model speaks for you by default.",
        body: "A professor's writing or voice can be copied in minutes, and your name no longer proves a thing is really yours. Worse, when someone asks a general model about your institution's position, it answers with confidence, and it is often wrong, because your actual position was never gathered into one place a model could find. You are being represented, at scale, by a tool you never authorized.",
        stats: [{ phrase: "copied in minutes", cite: 3 }],
        footer: { kind: "sourced" },
      },
    ],
    sources: [
      {
        n: 1,
        claim: "~80% of university students use generative AI in their coursework.",
        sourceIds: ["stanford-hai-2026"],
      },
      {
        n: 2,
        claim:
          "AI governance now expands the board's fiduciary duties of care, loyalty, and obedience.",
        sourceIds: ["forvis-mazars-2026"],
      },
      {
        n: 3,
        claim:
          "Voice-cloning fraud rose 400%+ year over year; $893M in AI-related scam losses in 2025.",
        sourceIds: ["fbi-ic3-2025"],
      },
    ],
    sourcesNote:
      "Three of the six points above are not statistics. They are structural patterns we see across institutions, written as scenes, never dressed up as survey numbers. Only measured claims carry a source.",
  },
  deeperProblem: {
    title: "These aren't six problems. They're one.",
    paragraphs: [
      "Underneath all of it is one thing: your seminary is scattered. Your faculty, your scholarship, and your record sit in pieces that don't connect. Syllabi in one place. Scholarship in another. Formation pathways nowhere visible as a whole.",
      "AI built on top of that doesn't fix the mess. It makes more of it, faster.",
      "For a seminary, the thing most at risk is the thing you can't replace. A business that makes an AI mistake loses a client. You'd lose trust in the credential itself. That trust is the whole product.",
      "You also carry a weight other places don't. Whatever you decide about AI becomes the example every church your graduates lead will follow. Doing nothing is still a choice. It teaches them that no one needs to think about this carefully.",
    ],
  },
  theCase: {
    title: "The full case, in one letter.",
    intro:
      "Here's the whole argument in plain words, written for your president and board. Read it here, or download it to send.",
    letterAriaLabel: "Letter to a seminary president",
    askAiPromptKey: "institutionsTheCase",
  },
  foundation: {
    title: "We gather what's scattered into one place.",
    paragraphs: [
      "Movemental takes your faculty, your scholarship, and your record and gathers them into one connected foundation, one place your seminary owns. Visible to your board. Verifiable for accreditation and governance. Built from what's actually yours.",
    ],
    fixRows: [
      {
        pain: "Your archive was lost",
        gain: "now it's in one place you can search and build on.",
      },
      {
        pain: "Your name could be faked",
        gain: "now there's a verified record of what's really yours.",
      },
      {
        pain: "Your credential drifted",
        gain: "now there's one clear account of what the degree means.",
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
    titleHighlight: "the tools",
    intro:
      "The working platform, on the desk and in your pocket. Pick a layer, open any piece.",
    footnote:
      "A seeded preview. Explore it live opens the real institution demo so you can click around.",
    bridgeQuestion:
      "Which is usually where a board member frames it as a choice: Movemental, or a website builder? For an institution, the obvious way to settle that turns out to be the wrong one.",
  },
  formation: {
    title: "But tools alone aren't the answer.",
    paragraphs: [
      "Here's the part most people skip. Tech without formed people isn't progress. It's replacement. It's also how most AI projects fail.",
      "A foundation only holds if your faculty can steward it. The tools come with formation. Discernment stays with your leaders. Authorship keeps a real human behind the words. Stewardship cares for what's been entrusted to you.",
      "For a seminary, this isn't an add-on. Forming people is what you already do. It's the part you, of all places, should lead with. The technology and the training are linked on purpose. One without the other doesn't work.",
    ],
    handLine: "Formation isn't extra. It's the point.",
  },
  thePath: {
    intro: `We don't do this all at once, and we don't start with the tech. There's an order. Safety first, decide in writing what you will and won't do with AI. Then Sandbox, test it against real work. Then ${PATH_STAGE_LABELS.training}, form your people. Then ${PATH_STAGE_LABELS.tech}, build the tools. Each step earns the next. Your first move is Safety.`,
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
  deck: institutionDeck,
  letterEmbedStart: "You carry a weight in this moment",
  dock: {
    voiceLine: "Want to see where your institution actually stands with AI? Let's map it together.",
    highlightChipLabel: "Map where we stand",
    chips: [
      { label: "Map where we stand", action: "scene", scene: "toBeat" },
      { label: "Read the board letter", action: "scroll", target: "the-case" },
      { label: "What's the first step?", action: "scene", scene: "toSafetyFlow" },
      { label: "Talk to us", action: "scene", scene: "talkToUs" },
    ],
  },
};
