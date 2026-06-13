import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import { nonprofitDeck } from "@/components/agent-room/deck/nonprofit-deck";

import { AUDIENCE_NAV } from "./institutions-config";
import type { AudiencePageConfig } from "./types";

export const NONPROFITS_PAGE_CONFIG: AudiencePageConfig = {
  slug: "nonprofits",
  hero: {
    eyebrow: "A NOTE TO NONPROFIT LEADERS",
    rhetoricalTitle: "Are you called to lead in response to AI?",
    highlightPhrase: "lead",
    framing:
      "We're about to make a bold claim. It deserves your scrutiny. And if you find that you agree with it, it asks for urgent action. So we'll be exact about what that action is.",
    claim:
      "AI is already inside your organization. That single reality asks for one immediate move. Write and ratify your AI Safety Charter: five plain documents that set out your vision, your plans, your reality, your rules, and your response to AI. Nothing more complicated than that. Nothing less urgent.",
    segue:
      "Before you accept a claim that bold, you should see what it rests on. Here is what is already happening, in organizations like yours, right now.",
  },
  painSection: {
    title: "Here's what's already happening",
    intro: "None of this was planned. It's just true right now.",
    cards: [
      {
        title: "AI is already inside your organization.",
        body: "Your staff are not waiting for a policy. Ninety-two percent of nonprofits already use AI in some form, and most of that use is one person, one personal account, one task at a time. The tools arrived before the decision did.",
        stats: [{ phrase: "Ninety-two percent", cite: 1 }],
        footer: { kind: "sourced" },
      },
      {
        title: "Donor records are sitting in tools you do not control.",
        body: "Someone on your team pastes donor and beneficiary details into a personal AI account to clean up a list or draft an appeal. There is no contract, no retention rule, and no one ever decided this was allowed. It is not negligence. It is what happens when 81% of the work runs through individual accounts with no shared place to do it safely.",
        stats: [{ phrase: "81%", cite: 1 }],
        footer: { kind: "sourced" },
      },
      {
        title: "Your board has not met its duty yet.",
        body: "Nearly half of nonprofits have no AI governance policy at all. The board's job to oversee how the organization handles risk now includes this, whether or not anything has gone wrong so far. The duty applies before the harm, not after it.",
        stats: [
          { phrase: "Nearly half", cite: 2 },
          { phrase: "includes this", cite: 3 },
        ],
        footer: { kind: "sourced" },
      },
      {
        title: "The time you are saving is not adding up.",
        body: "Most teams report small gains from AI and little that compounds. Across nonprofit, enterprise, and faith-sector studies, only five to seven percent of organizations see real capability improvement, and almost all of them have one thing in common: they redesigned how the work flows, instead of bolting AI onto the old steps. Individual use never adds up to organizational strength on its own.",
        stats: [{ phrase: "five to seven percent", cite: 4 }],
        footer: { kind: "sourced" },
      },
      {
        title: "Your mission voice is drifting, quietly.",
        body: "The loud risk is a data breach. The quiet one is worse, because no one notices it for a year. Appeals start to sound generic. Reports round off the inconvenient detail. The specific, particular voice that made donors trust you gets sanded down a draft at a time, until your organization reads like every other organization.",
        synth: true,
        footer: { kind: "pattern", label: "A pattern leaders recognize" },
      },
      {
        title: "Every staff departure takes memory with it.",
        body: "A mid-tier donor who gave steadily for seven years drifts away, because the only person who knew them left, and the relationship lived in that person's head and inbox, not in anything the organization kept. It is one donor, then another. A slow leak no dashboard catches. This is not a generosity problem. It is a memory problem.",
        synth: true,
        footer: { kind: "pattern", label: "A pattern leaders recognize" },
      },
    ],
    sources: [
      {
        n: 1,
        claim: "92% of nonprofits use AI; 81% individually and ad hoc.",
        sourceIds: ["virtuous-2026"],
      },
      {
        n: 2,
        claim: "47% of nonprofits have no AI governance policy; 76% no formal strategy.",
        sourceIds: ["virtuous-2026", "techsoup-2025"],
      },
      {
        n: 3,
        claim: "AI governance now sits inside the board's fiduciary duties.",
        sourceIds: ["forvis-mazars-2026"],
      },
      {
        n: 4,
        claim:
          "Only ~7% report major capability gains; 55% of high performers redesigned workflows vs ~20% of the field.",
        sourceIds: ["virtuous-2026", "mckinsey-soa-2025"],
      },
    ],
    sourcesNote:
      "Two of the six points above are not statistics. They are patterns we see across organizations, written as scenes, never dressed up as survey numbers. Only measured claims carry a source.",
  },
  deeperProblem: {
    title: "These aren't six problems. They're one.",
    paragraphs: [
      "Underneath the governance gap is fragmentation. Your program knowledge lives in scattered documents. Your donor relationships sit in silos. Your mission voice gets rewritten a dozen different ways by a dozen different staff. None of it is connected. None of it is owned as one record.",
      "What's true of one leader's scattered life-work is true of an organization's scattered record. The work was whole in the mission. It lives in pieces across grants, decks, and inboxes, and most of your people will never do the dig.",
      "AI built on that foundation doesn't fix the scatter. It multiplies it. Faster drafts of the wrong story. Quicker research with no shared standard. Individual shortcuts that never become something the whole organization can use.",
      "The quieter harm isn't a headline breach. It's the slow erosion of mission integrity. Appeals that subtly mischaracterize the program. Reports that round off the inconvenient detail. Outreach lists that deprioritize the very people your mission was designed to serve.",
    ],
  },
  theCase: {
    title: "The full case, in one letter.",
    intro:
      "Here's the whole argument in plain words, written for your board. Read it here, or download it to send.",
    letterAriaLabel: "Letter to an executive director",
    askAiPromptKey: "nonprofitsTheCase",
  },
  foundation: {
    title: "We gather what's scattered into one place.",
    paragraphs: [
      "Movemental takes your people, your program record, and your mission voice and gathers them into one connected foundation. A single source of truth your organization owns. It's visible to leadership. It's verifiable for donors. And it's built from what's actually yours.",
    ],
    fixRows: [
      {
        pain: "Donor data was exposed",
        gain: "now data-handling standards are ratified and enforceable.",
      },
      {
        pain: "Reports drifted from mission",
        gain: "now drafts are grounded in your own verified record.",
      },
      {
        pain: "Staff used AI without approval",
        gain: "now there's an AI Safety Charter your board can sign.",
      },
      {
        pain: "Capability never compounded",
        gain: "now shared workflows turn individual use into organizational strength.",
      },
    ],
    diagramCenterLabel: "ONE",
  },
  theBuild: {
    title: "Then we build the tools on top of it.",
    paragraphs: [
      "Once the foundation is real, we build what your nonprofit actually needs. Search across your program and grant history. An assistant grounded in your mission materials. Reporting that keeps authorship and accuracy visible to leadership.",
    ],
    toolExamples: [
      {
        label: "Program search",
        text: "across grants, evaluations, and field reports. Not generic templates.",
      },
      {
        label: "A mission-grounded assistant",
        text: "that drafts from your verified record, with sources your board can audit.",
      },
      {
        label: "Donor and impact workflows,",
        text: "so the time you save compounds into shared capability, not scattered shortcuts.",
      },
    ],
    bridgeQuestion:
      "Which is a fair question, and probably the one you're actually asking. Isn't this just an expensive website?",
  },
  formation: {
    title: "But tools alone aren't the answer.",
    paragraphs: [
      "Technology without formed people isn't progress. It's replacement. Boards that buy tools without forming staff get unapproved AI at scale, faster.",
      "So the tools come with formation. Discernment for leadership. Authorship for anything that goes out under your name. Stewardship for donor and beneficiary trust. For a nonprofit, fiduciary duty and mission integrity depend on both.",
      "Your constituents are watching whether you lead through this moment with care, or whether AI becomes one more invisible shortcut that slowly misrepresents the work you've been entrusted to do.",
    ],
    handLine: "Formation isn't extra. It's the point.",
  },
  thePath: {
    headline: "It all goes in order.",
    intro: `We don't start with the tech. There's an order. Safety first: a ratified AI Safety Charter your board can sign, covering acceptable use, data handling, disclosure, and incident response. Then Sandbox, where you test AI against real work. Then ${PATH_STAGE_LABELS.training}, where you form your team. Then ${PATH_STAGE_LABELS.tech}, where you build the tools. Your first move is Safety.`,
    closing: "Each step earns the next. Skip one, and the ones after it have nothing to stand on.",
  },
  start: {
    title: "Start with a conversation.",
    body: "Nonprofits don't start this with a checkout button. They start with a talk. Tell us where your organization is, and we'll show you the first step. The letter above is yours to share with your board while you decide.",
    mailtoHref: "mailto:hello@movemental.ai?subject=Our%20nonprofit%20%E2%80%94%20first%20conversation",
    downloadFilename: "letter-to-an-executive-director.txt",
    sendToBoardSubject: "AI and our nonprofit, a letter for the board",
    askAiPromptKey: "nonprofitsStart",
  },
  nav: AUDIENCE_NAV,
  deck: nonprofitDeck,
  letterEmbedStart: "You carry a weight",
  dock: {
    voiceLine: "I can already see where your nonprofit stands. Want me to walk you through it?",
    highlightChipLabel: null,
    chips: [
      { label: "Map where we stand", action: "agent", agentAsk: "Map where my nonprofit stands with AI" },
      { label: "Read the board letter", action: "scroll", target: "the-case" },
      { label: "What's the first step?", action: "agent", agentAsk: "What's the first step for a nonprofit?" },
      { label: "Talk to us", action: "agent", agentAsk: "I'd like to talk to someone at Movemental about our nonprofit" },
    ],
  },
};
