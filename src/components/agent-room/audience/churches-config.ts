import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import { AUDIENCE_NAV } from "./institutions-config";
import type { AudiencePageConfig } from "./types";

export const CHURCHES_PAGE_CONFIG: AudiencePageConfig = {
  slug: "churches",
  hero: {
    eyebrow: "For churches",
    title: "AI is already inside your church.",
    sub: "Sermon prep, pastoral drafts, admin work, nobody decided it. It just arrived. Here's what that means for trust.",
  },
  painSection: {
    title: "Here's what's already happening.",
    intro: "None of this was planned. It's just true right now.",
    cards: [
      {
        title: "Sermon prep is already AI-assisted.",
        body: "Most pastors use AI for research or drafting. Few have a policy about what that means for the pulpit.",
      },
      {
        title: "Counseling notes are in the wrong places.",
        body: "Staff paste pastoral conversations into consumer tools with no data-handling standard, and no one knows what's retained.",
      },
      {
        title: "Congregation trust is the product.",
        body: "When a member can't tell whether the pastor wrote it, voice-cloned it, or a volunteer drafted it, credibility erodes quietly.",
      },
      {
        title: "There's no disclosure standard.",
        body: "Only a handful of churches have told their people, in writing, when AI was used and how. Everyone else is guessing.",
      },
      {
        title: "Your teaching lives in unsearchable sermons.",
        body: "Years of faithful preaching sit in video archives no one can query. The church can't learn from its own voice.",
      },
      {
        title: "Scammers can clone your voice.",
        body: "Sermon footage and livestreams are enough to fake a pastor's voice and solicit emergency gifts. It's already happening.",
      },
    ],
  },
  deeperProblem: {
    title: "These aren't six problems. They're one.",
    paragraphs: [
      "Underneath all of it is fragmentation. Your teaching lives in sermons no one can search. Your hard-won wisdom lives in founders' heads, one bus accident away from being lost. You know your people in pieces and can't see your own body whole.",
      "What is true of one writer's scattered work is true of a church's scattered body. The teaching was whole in your people. It lives in video archives, bulletins, and notebooks that do not speak to each other.",
      "AI built on top of that doesn't pull the pieces together. By default it reflects the scatter back, faster, louder, wearing your name without carrying your person. That's not a tech glitch. It's what happens when the foundation is broken.",
      "And the people watching most closely are young adults. They're asking the machine the questions they used to ask the church. They're waiting to see whether you have anything true to say in this moment, or whether you'll answer with fear, or a shrug.",
    ],
  },
  theCase: {
    title: "The full case, in one letter.",
    intro:
      "Here's the whole argument in plain words, written for your elders or leadership team. Read it here, or download it to share.",
    letterAriaLabel: "Letter to a lead pastor",
    askAiPromptKey: "churchesTheCase",
  },
  foundation: {
    title: "We gather what's scattered into one place.",
    paragraphs: [
      "Movemental takes your people, your teaching, and your record and gathers them into one connected foundation, a single source of truth your church owns. Visible. Verifiable. Built from what's actually yours, not a generic chatbot trained on the open web.",
    ],
    fixRows: [
      {
        pain: "Sermons were unsearchable",
        gain: "now your teaching is findable and grounded in your own words.",
      },
      {
        pain: "Your voice could be faked",
        gain: "now there's a verified record of what's really yours.",
      },
      {
        pain: "Staff used AI without approval",
        gain: "now there's a ratified AI Charter everyone can follow.",
      },
      {
        pain: "Members couldn't tell who wrote what",
        gain: "now disclosure and authorship are clear, in writing.",
      },
    ],
    diagramCenterLabel: "CHURCH",
  },
  theBuild: {
    title: "Then we build the tools on top of it.",
    paragraphs: [
      "Once the foundation is real, we build what your church actually needs, search across your teaching archive, an assistant that speaks from your material with sources your elders can check, and pathways that help members move through your body of work instead of drifting to generic answers online.",
    ],
    toolExamples: [
      {
        label: "Teaching search",
        text: "across sermons, curricula, and pastoral resources, not the open web.",
      },
      {
        label: "Grounded assistant",
        text: "that answers from your church's own material, with citations your team can verify.",
      },
      {
        label: "Member pathways",
        text: "so formation journeys through your teaching are visible, not invisible fragments.",
      },
    ],
  },
  formation: {
    title: "But tools alone aren't the answer.",
    paragraphs: [
      "Technology without formed people isn't discipleship, it's replacement. Hand powerful tools to a staff that hasn't been formed to steward them, and you get the failure mode everyone is already living through.",
      "The tools come with formation: discernment, knowing what's wise; authorship, keeping a real human behind the words; stewardship, caring for what's been entrusted to you. For a church, this isn't an add-on. It's the work.",
      "A generation of young adults is deciding, from what they watch you do, whether the church has anything true to say in this moment. Formation is how you answer them, not with a policy PDF alone, but with people who can lead through this carefully.",
    ],
    handLine: "Formation isn't extra. It's the point.",
  },
  thePath: {
    intro: `We don't start with the tech. There's an order. Safety first, decide, in writing, what you will and won't do with AI, including pastoral care boundaries and disclosure. Then Sandbox, test against real ministry work. Then ${PATH_STAGE_LABELS.training}, form your people. Then ${PATH_STAGE_LABELS.tech}, build the tools. Your first move is Safety.`,
  },
  start: {
    title: "Start with a conversation.",
    body: "Churches don't start this with a checkout button. They start with a talk. Tell us where you are, and we'll show you the first step. The letter above is yours to share with your elders while you decide.",
    mailtoHref: "mailto:hello@movemental.ai?subject=Our%20church%20%E2%80%94%20first%20conversation",
    downloadFilename: "letter-to-a-lead-pastor.txt",
    sendToBoardSubject: "AI and our church, a letter for our elders",
    askAiPromptKey: "churchesStart",
  },
  nav: AUDIENCE_NAV,
  letterEmbedStart: "And the thing most at risk",
};
