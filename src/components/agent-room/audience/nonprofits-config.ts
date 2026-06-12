import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import { nonprofitDeck } from "@/components/agent-room/deck/nonprofit-deck";

import { AUDIENCE_NAV } from "./institutions-config";
import type { AudiencePageConfig } from "./types";

export const NONPROFITS_PAGE_CONFIG: AudiencePageConfig = {
  slug: "nonprofits",
  hero: {
    eyebrow: "For nonprofits",
    title: "AI is already inside your organization.",
    sub: "Drafts, research, donor comms, the question isn't whether. It's whether anyone is governing it.",
  },
  painSection: {
    title: "Here's what's already happening.",
    intro: "None of this was planned. It's just true right now.",
    cards: [
      {
        title: "Donor data is in consumer tools.",
        body: "Staff paste beneficiary and donor records into AI with no contract, no retention policy, and no board visibility.",
      },
      {
        title: "Grant reporting runs on shadow drafts.",
        body: "Impact narratives get AI-polished without a standard for accuracy, attribution, or mission alignment.",
      },
      {
        title: "Unapproved AI is the default.",
        body: "Individual staff use personal accounts. Eighty-one percent of nonprofits use AI individually, not through shared workflows.",
      },
      {
        title: "Your board isn't ready.",
        body: "Nearly half have no AI governance policy. Fiduciary duty now includes technological oversight, whether or not harm has happened yet.",
      },
      {
        title: "Mission integrity erodes quietly.",
        body: "AI-drafted appeals and reports tend toward the statistical center, not your specific mission, voice, or community.",
      },
      {
        title: "Efficiency gains don't compound.",
        body: "Most report small time savings, but only seven percent see real gains for the whole organization without governance and shared workflow.",
      },
    ],
  },
  deeperProblem: {
    title: "These aren't six problems. They're one.",
    paragraphs: [
      "Underneath the governance gap is fragmentation. Your program knowledge lives in scattered docs. Donor relationships sit in silos. Your mission voice gets rewritten a dozen different ways by a dozen different staff, none of it connected, none of it owned as one record.",
      "What is true of one leader's scattered corpus is true of an organization's scattered record. The work was whole in the mission. It lives in pieces across grants, decks, and inboxes, and most of your people will never do the dig.",
      "AI built on that foundation doesn't fix the scatter. It amplifies it, faster drafts of the wrong story, quicker research with no shared standard, individual shortcuts that never become something the whole organization can use.",
      "The quieter harm isn't a headline breach. It's the slow erosion of mission integrity: appeals that subtly mischaracterize the program, reports that round inconvenient details, outreach lists that deprioritize the people your mission was designed to serve.",
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
      "Movemental takes your people, your program record, and your mission voice and gathers them into one connected foundation, a single source of truth your organization owns. Visible to leadership. Verifiable for donors. Built from what's actually yours.",
    ],
    fixRows: [
      {
        pain: "Donor data was exposed",
        gain: "now data handling standards are ratified and enforceable.",
      },
      {
        pain: "Reports drifted from mission",
        gain: "now drafts are grounded in your own verified record.",
      },
      {
        pain: "Staff used AI without approval",
        gain: "now there's an AI Charter the board can sign.",
      },
      {
        pain: "Capability never compounded",
        gain: "now shared workflows turn individual use into organizational strength.",
      },
    ],
    diagramCenterLabel: "MISSION",
  },
  theBuild: {
    title: "Then we build the tools on top of it.",
    paragraphs: [
      "Once the foundation is real, we build what your nonprofit actually needs, search across program and grant history, an assistant grounded in your mission materials, and reporting workflows that keep authorship and accuracy visible to leadership.",
    ],
    toolExamples: [
      {
        label: "Program search",
        text: "across grants, evaluations, and field reports, not generic templates.",
      },
      {
        label: "Mission-grounded assistant",
        text: "that drafts from your verified record, with sources your board can audit.",
      },
      {
        label: "Donor & impact workflows",
        text: "so efficiency gains compound into shared capability, not scattered shortcuts.",
      },
    ],
    bridgeQuestion:
      "Which is where a fair question usually surfaces, the one every director asks when the price comes up: isn't this just an expensive website?",
  },
  formation: {
    title: "But tools alone aren't the answer.",
    paragraphs: [
      "Technology without formed people isn't stewardship, it's replacement. Boards that buy tools without forming staff get unapproved AI at scale.",
      "The tools come with formation: discernment for leadership, authorship for anything that goes out under your name, stewardship for donor and beneficiary trust. For a nonprofit, fiduciary duty and mission integrity depend on both.",
      "Your constituents are watching whether you lead through this moment with care, or whether AI becomes one more invisible shortcut that slowly misrepresents the work you've been entrusted to do.",
    ],
    handLine: "Formation isn't extra. It's the point.",
  },
  thePath: {
    intro: `We don't start with the tech. There's an order. Safety first, a ratified AI Charter your board can sign: acceptable use, data handling, disclosure, and incident response. Then Sandbox, test against real program work. Then ${PATH_STAGE_LABELS.training}, form your team. Then ${PATH_STAGE_LABELS.tech}, build the tools. Your first move is Safety.`,
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
  letterEmbedStart: "Underneath the governance gap",
  dock: {
    voiceLine: "I can already see where your nonprofit stands with AI. Want me to walk you through it?",
    highlightChipLabel: "Map where we stand",
    chips: [
      { label: "Map where we stand", action: "agent", agentAsk: "Map where my nonprofit stands with AI" },
      { label: "Read the board letter", action: "scroll", target: "the-case" },
      { label: "What's the first step?", action: "agent", agentAsk: "What's the first step for a nonprofit?" },
      { label: "Talk to us", action: "agent", agentAsk: "I'd like to talk to someone at Movemental about our nonprofit" },
    ],
  },
};
