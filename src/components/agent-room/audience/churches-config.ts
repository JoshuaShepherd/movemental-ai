import { PATH_STAGE_LABELS } from "@/lib/agent-room/naming";

import { churchDeck } from "@/components/agent-room/deck/church-deck";

import { AUDIENCE_NAV } from "./institutions-config";
import type { AudiencePageConfig } from "./types";

export const CHURCHES_PAGE_CONFIG: AudiencePageConfig = {
  slug: "churches",
  hero: {
    eyebrow: "For churches",
    title: "AI is already inside your church.",
    sub: "Sermon prep, admin drafts, ministry notes. Nobody decided it. It just arrived. Here's what that means for your congregation's trust.",
  },
  painSection: {
    title: "Here's what's already happening.",
    intro: "None of this was planned. It's just true right now.",
    cards: [
      {
        title: "AI is already in the study, with no rule about the pulpit.",
        body: "Many pastors already use AI for research or a first draft. Few have decided, in writing, what that means for teaching from the pulpit. About four in ten Protestant pastors now use AI for ministry, and only one in twenty churches has a formal policy for it. The practice arrived years ahead of the agreement.",
      },
      {
        title: "Pastoral care notes are in the wrong place.",
        body: "Staff paste counseling and care notes into consumer AI tools with no standard for what is kept or who can see it. AI does not do pastoral care, and these notes should never be in those tools. No one decided this. It is just where the work landed when there was nowhere safer to put it.",
      },
      {
        title: "People cannot always tell what is really you.",
        body: "When a member cannot tell whether you wrote it, a volunteer drafted it, or it was generated, trust erodes a little. Most people now say it matters whether something was made by a person or by AI, and most are not confident they can tell the difference. That gap is exactly where a church's credibility leaks.",
      },
      {
        title: "Your people are already asking the machine.",
        body: "Nearly one in three U.S. adults now say spiritual advice from AI is as trustworthy as advice from a pastor, and among Gen Z and Millennials it is two in five. Meanwhile only twelve percent of pastors say they feel ready to teach about AI at all. Your younger members are asking the questions they used to bring to a mentor, and getting answers from a model trained by someone else.",
      },
      {
        title: "A model does not share your church's convictions.",
        body: "The general-purpose models your members ask are not neutral on faith. Independent testing found they score lowest of all on questions of Christian worldview. When your congregation asks the machine instead of asking you, they are not getting your church's theology back. They are getting an average of the internet's.",
      },
      {
        title: "Your voice can be cloned, and it is already happening.",
        body: "A few minutes of sermon footage is enough to fake a pastor's voice and use it to solicit emergency gifts from members. This is not hypothetical. Voice-cloning fraud rose more than four hundred percent year over year, and faith leaders are being impersonated specifically because their people trust their voice.",
      },
    ],
  },
  deeperProblem: {
    title: "These aren't six problems. They're one.",
    paragraphs: [
      "Underneath all of it is fragmentation. Your teaching lives in sermons no one can search. Hard-won wisdom lives in founders' heads, one bus accident away from being lost. You know your people in pieces. You can't see your own congregation whole.",
      "What is true of one writer's scattered work is true of a church's scattered body. The teaching was whole in your people. It lives in video archives, bulletins, and notebooks that do not speak to each other.",
      "AI built on top of that doesn't pull the pieces together. By default it reflects the scatter back, faster and louder, wearing your name without carrying your person. That's not a tech glitch. It's what happens when the foundation is broken.",
      "Young adults are watching most closely. They're asking the machine the questions they used to ask the church. They're waiting to see whether you have anything true to say in this moment, or whether you'll answer with fear, or a shrug.",
    ],
  },
  theCase: {
    title: "The full case, in one letter.",
    intro:
      "Here's the whole argument in plain words, written for your pastor and elders. Read it here, or download it to share.",
    letterAriaLabel: "Letter to a lead pastor",
    askAiPromptKey: "churchesTheCase",
  },
  foundation: {
    title: "We gather what's scattered into one place.",
    paragraphs: [
      "Movemental takes your people, your teaching, and your record and gathers them into one connected foundation, one place your church owns. Visible to your elders. Verifiable for your congregation. Built from what's actually yours, not a generic chatbot trained on the open web.",
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
      "Once the foundation is real, we build what your church actually needs. Search across your teaching archive. An assistant that speaks from your material with sources your elders can check. Pathways that help members move through your body of work instead of drifting to generic answers online.",
    ],
    toolExamples: [
      {
        label: "Teaching search",
        text: "across sermons, curricula, and ministry resources, not the open web.",
      },
      {
        label: "Grounded assistant",
        text: "that answers from your church's own material, with citations your team can verify.",
      },
      {
        label: "Member pathways",
        text: "so discipleship journeys through your teaching are visible, not invisible fragments.",
      },
    ],
    bridgeQuestion:
      "Which is usually where a fair question comes up, the one every pastor asks when the price lands: so isn't this just an expensive church website?",
  },
  formation: {
    title: "But tools alone aren't the answer.",
    paragraphs: [
      "Technology without formed people isn't discipleship. It's replacement. Hand powerful tools to a staff that hasn't been formed to steward them, and you get the failure mode everyone is already living through.",
      "The tools come with formation. Discernment stays with your leaders. Authorship keeps a real human behind the words. Stewardship cares for what's been entrusted to you. AI does not do pastoral care. For a church, this isn't an add-on. It's the work.",
      "A generation of young adults is deciding, from what they watch you do, whether the church has anything true to say in this moment. Formation is how you answer them. Not with a policy PDF alone, but with people who can lead through this carefully.",
    ],
    handLine: "Formation isn't extra. It's the point.",
  },
  thePath: {
    intro: `We don't start with the tech. There's an order. Safety first, decide in writing what you will and won't do with AI, including pastoral care boundaries and disclosure. Then Sandbox, test against real ministry work. Then ${PATH_STAGE_LABELS.training}, form your people. Then ${PATH_STAGE_LABELS.tech}, build the tools. Your first move is Safety.`,
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
  deck: churchDeck,
  letterEmbedStart: "And the thing most at risk",
  dock: {
    voiceLine: "Curious where your church really stands with AI? I can map it with you.",
    highlightChipLabel: "Map where we stand",
    chips: [
      { label: "Map where we stand", action: "agent", agentAsk: "Map where my church stands with AI" },
      { label: "Read the board letter", action: "scroll", target: "the-case" },
      { label: "What's the first step?", action: "agent", agentAsk: "What's the first step for a church?" },
      { label: "Talk to us", action: "agent", agentAsk: "I'd like to talk to someone at Movemental about our church" },
    ],
  },
};
