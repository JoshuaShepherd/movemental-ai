import type { CaseStudyConfig } from "./case-study-types";

/** Northbridge Youth Mission — fictional but illustrative composite case. */
export const nonprofitsCaseStudy: CaseStudyConfig = {
  eyebrow: "Case Study · Illustrative",
  title:
    "How a mid-sized youth nonprofit brought AI under control—without losing trust.",
  lede: "Northbridge Youth Mission (fictional, but based on real patterns) is a Kansas City nonprofit serving kids and families through camps, mentorship, and counseling.",
  stats: [
    { num: "28", label: "Staff" },
    { num: "$4.5M", label: "Annual budget" },
    {
      num: "3+",
      label: "Sensitive programs",
      meta: "Youth, counseling, detention ministry.",
    },
  ],
  sections: [
    {
      title: "The situation they were actually in.",
      intro: [
        { kind: "p", text: "Before anything formal started, AI was already being used." },
        { kind: "p", text: "Not strategically. Not maliciously. Just… quietly." },
        {
          kind: "list",
          items: [
            "A development associate was using ChatGPT to help draft donor emails",
            "A program director had tried summarizing notes with Claude",
            "Someone on the communications team was experimenting with image tools",
          ],
        },
        { kind: "p", text: "No one had told them to stop." },
        { kind: "p", text: "No one had told them it was okay either." },
        { kind: "p", text: "There was no policy. No shared understanding. No visibility." },
        { kind: "p", text: "From the outside, everything looked normal." },
        { kind: "p", text: "From the inside, leadership had a growing question:" },
        {
          kind: "pull",
          text: "Is this fine—or are we about to create problems we can’t see yet?",
        },
      ],
    },
    {
      eyebrow: "Step 01 · Safety",
      title: "They stopped guessing and made a decision.",
      intro: [
        {
          kind: "p",
          text: "Instead of starting with tools, Northbridge started with a simple question:",
        },
        { kind: "pull", text: "What are we actually okay with?" },
        { kind: "p", text: "That question turned out to be harder than expected." },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "A small leadership group formed:" },
          {
            kind: "list",
            items: [
              "CEO",
              "COO",
              "Head of Development",
              "A board member responsible for governance",
            ],
          },
          { kind: "p", text: "They met to answer a few things clearly:" },
          {
            kind: "list",
            items: [
              "Where is AI appropriate here?",
              "Where is it not?",
              "What data can never be used?",
              "What needs review?",
            ],
          },
          {
            kind: "p",
            text: "The hardest moment came when they talked about their mentorship program inside juvenile detention.",
          },
          { kind: "p", text: "They realized:" },
          {
            kind: "pull",
            text: "We cannot have AI drafting or shaping communication with kids in custody.",
          },
          { kind: "p", text: "That became a line they would not cross." },
          { kind: "p", text: "They wrote it down." },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Within six weeks:" },
          {
            kind: "list",
            items: [
              "A short, readable AI policy existed",
              "Staff knew what was allowed and what wasn’t",
              "Sensitive data was clearly defined",
              "Leadership had agreed on boundaries",
            ],
          },
          { kind: "p", text: "Nothing flashy happened." },
          { kind: "p", text: "But one thing became true:" },
          {
            kind: "emphasis",
            text: "Everyone was operating from the same understanding.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 02 · Sandbox",
      title: "They experimented—but safely.",
      intro: [
        {
          kind: "p",
          text: "Once boundaries were clear, they didn’t try to “roll out AI.”",
        },
        { kind: "p", text: "They tried a few things—on purpose." },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "They approved a small number of experiments:" },
          {
            kind: "list",
            items: [
              "Drafting donor newsletter sections using anonymized content",
              "Summarizing program patterns (not real case data)",
              "Testing internal planning use cases",
            ],
          },
          { kind: "p", text: "Each experiment had:" },
          {
            kind: "list",
            items: [
              "an owner",
              "a clear boundary (no sensitive data)",
              "a place where results were recorded",
            ],
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Some things worked." },
          { kind: "p", text: "Some didn’t." },
          {
            kind: "p",
            text: "And for the first time, the organization knew the difference.",
          },
          { kind: "p", text: "Examples:" },
          {
            kind: "list",
            items: [
              "Drafting donor content saved time—but still needed human editing",
              "Some tools didn’t match their voice at all",
              "One idea looked promising but was too risky to continue",
            ],
          },
          { kind: "p", text: "Instead of random experimentation, they now had:" },
          {
            kind: "emphasis",
            text: "A shared understanding of what was useful, what wasn’t, and what wasn’t worth the risk.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 03 · Skills",
      title:
        "They trained people—but more importantly, they shaped judgment.",
      intro: [
        { kind: "p", text: "At this point, staff were already using AI." },
        { kind: "p", text: "The question wasn’t “how do we introduce it?”" },
        { kind: "p", text: "It was:" },
        { kind: "pull", text: "How do we help people use it well?" },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "Training wasn’t just “how to prompt.”" },
          { kind: "p", text: "It focused on:" },
          {
            kind: "list",
            items: [
              "When AI is appropriate",
              "When it’s not",
              "How to review outputs before using them",
              "How to protect voice and trust",
            ],
          },
          { kind: "p", text: "Leaders played a visible role." },
          {
            kind: "p",
            text: "Instead of pretending to have it figured out, they modeled decisions in real time:",
          },
          {
            kind: "list",
            items: [
              "“I used AI for this, but not for that”",
              "“This crossed a line for me”",
              "“I wasn’t sure, so I didn’t use it”",
            ],
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Over time:" },
          {
            kind: "list",
            items: [
              "Staff became more confident—but also more careful",
              "People asked better questions",
              "Teams shared practices instead of guessing individually",
            ],
          },
          { kind: "p", text: "And something subtle but important happened:" },
          {
            kind: "emphasis",
            text: "AI stopped being a private habit and became a shared discipline.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 04 · Solutions",
      title: "Then—and only then—they built tools.",
      intro: [
        {
          kind: "p",
          text: "Only after the first three steps did Northbridge start building anything custom.",
        },
      ],
      what: {
        didLabel: "What they built",
        didBlocks: [
          {
            kind: "p",
            text: "Because they understood their needs, the tools were specific:",
          },
          {
            kind: "list",
            items: [
              "A donor communication assistant that matched their voice",
              "A searchable internal knowledge tool for staff resources",
              "A reporting and grant support workflow",
            ],
          },
          {
            kind: "p",
            text: "For their most sensitive program (mentorship in detention), they didn’t build a drafting tool.",
          },
          { kind: "p", text: "They built something different:" },
          {
            kind: "pull",
            text: "A guide to help mentors learn how to think and show up—before using any tool at all.",
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "The biggest shift wasn’t speed." },
          { kind: "p", text: "It was coherence." },
          {
            kind: "list",
            items: [
              "Staff weren’t reinventing work every time",
              "Information was easier to find",
              "Decisions didn’t bottleneck around one leader",
              "The organization felt more aligned across teams",
            ],
          },
        ],
      },
    },
    {
      title: "What this actually produced.",
      intro: [
        {
          kind: "p",
          text: "Northbridge didn’t become an “AI-powered nonprofit.”",
        },
        { kind: "p", text: "They became:" },
        {
          kind: "list",
          items: [
            "clearer about their boundaries",
            "more consistent in their work",
            "more capable as a team",
          ],
        },
        { kind: "p", text: "And importantly:" },
        {
          kind: "emphasis",
          text: "They were using AI without slowly eroding the trust they had spent decades building.",
        },
      ],
    },
    {
      title: "Why this worked.",
      intro: [
        { kind: "p", text: "Nothing about Northbridge was unusual." },
        { kind: "p", text: "What changed was not the organization." },
        { kind: "p", text: "It was the order:" },
        {
          kind: "numbered",
          items: [
            "Decide what matters",
            "Experiment safely",
            "Build capability",
            "Then build tools",
          ],
        },
      ],
    },
  ],
};
