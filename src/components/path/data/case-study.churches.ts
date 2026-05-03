import type { CaseStudyConfig } from "./case-study-types";

/** Riverside Church — fictional but illustrative composite case. */
export const churchesCaseStudy: CaseStudyConfig = {
  eyebrow: "Case Study · Illustrative",
  title:
    "How a growing church introduced AI without compromising voice, pastoral care, or trust.",
  lede: "Riverside Church (fictional, but based on real patterns) is a multi-staff congregation of about 1,200 people.",
  stats: [
    { num: "1,200", label: "People" },
    {
      num: "14",
      label: "Staff",
      meta: "Ministry, communications, operations.",
    },
    {
      num: "3+",
      label: "Pastoral domains",
      meta: "Teaching, small groups, counseling.",
    },
  ],
  sections: [
    {
      title: "The situation they were actually in.",
      intro: [
        { kind: "p", text: "AI didn’t arrive through a strategy meeting." },
        { kind: "p", text: "It showed up in staff workflows." },
        {
          kind: "list",
          items: [
            "A communications staff member used ChatGPT to draft email announcements",
            "A teaching pastor experimented with summarizing research notes",
            "Someone on the youth team used AI to generate discussion questions",
          ],
        },
        { kind: "p", text: "No one had made a decision about AI." },
        { kind: "p", text: "But it was already being used." },
        { kind: "p", text: "Quietly. Individually. Differently across roles." },
        { kind: "p", text: "From the outside, ministry looked normal." },
        { kind: "p", text: "From the inside, leadership had a growing question:" },
        {
          kind: "pull",
          text: "What happens to our voice, our people, and our responsibility if we don’t lead this?",
        },
      ],
    },
    {
      eyebrow: "Step 01 · Safety",
      title: "They clarified what they believed.",
      intro: [
        {
          kind: "p",
          text: "Instead of starting with tools, Riverside started with a conversation:",
        },
        { kind: "pull", text: "What should AI never do here?" },
        { kind: "p", text: "That question anchored everything." },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "A small leadership group formed:" },
          {
            kind: "list",
            items: [
              "Lead pastor",
              "Executive pastor",
              "Communications director",
              "One elder",
            ],
          },
          { kind: "p", text: "They worked through:" },
          {
            kind: "list",
            items: [
              "What is appropriate for AI to assist with?",
              "What must remain human-led?",
              "Where is spiritual responsibility involved?",
              "Where is efficiency appropriate—and where is it not?",
            ],
          },
          {
            kind: "p",
            text: "The most important line they drew was around teaching and pastoral voice.",
          },
          { kind: "p", text: "They decided:" },
          {
            kind: "pull",
            text: "AI can assist preparation—but it cannot originate what is preached or personally spoken in pastoral care.",
          },
          { kind: "p", text: "They wrote that down." },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Within a month:" },
          {
            kind: "list",
            items: [
              "A short, clear AI guideline existed",
              "Staff understood where AI fit—and where it didn’t",
              "Sensitive areas (counseling, pastoral communication, prayer requests) were clearly off-limits",
              "Leadership had agreed on a shared posture",
            ],
          },
          { kind: "p", text: "Nothing about ministry changed externally." },
          { kind: "p", text: "But internally, something important shifted:" },
          {
            kind: "emphasis",
            text: "The church had named its responsibility before scaling its tools.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 02 · Sandbox",
      title: "They experimented intentionally.",
      intro: [
        {
          kind: "p",
          text: "With boundaries in place, Riverside didn’t “roll out AI.”",
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
              "Drafting internal communications using anonymized content",
              "Generating first-pass small group questions (with review)",
              "Summarizing research notes for sermon prep (not writing sermons)",
            ],
          },
          { kind: "p", text: "Each experiment had:" },
          {
            kind: "list",
            items: [
              "a clear boundary",
              "an owner",
              "a place where outcomes were shared",
            ],
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Some things helped." },
          { kind: "p", text: "Some didn’t." },
          { kind: "p", text: "Examples:" },
          {
            kind: "list",
            items: [
              "AI sped up internal communication drafts—but tone still needed human editing",
              "Small group questions were useful as a starting point, but required discernment",
              "Some generated content felt off—technically correct, but not pastorally appropriate",
            ],
          },
          { kind: "p", text: "The key shift was this:" },
          {
            kind: "emphasis",
            text: "Staff stopped guessing individually and started learning collectively.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 03 · Skills",
      title: "They trained for judgment, not just usage.",
      intro: [
        { kind: "p", text: "At this point, staff were already using AI." },
        { kind: "p", text: "The goal wasn’t to introduce it." },
        { kind: "p", text: "It was to help people use it wisely." },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "Training focused on:" },
          {
            kind: "list",
            items: [
              "When AI is appropriate in ministry contexts",
              "When it should not be used",
              "How to review and discern outputs",
              "How to maintain pastoral voice and integrity",
            ],
          },
          {
            kind: "p",
            text: "But the most important part wasn’t the training content.",
          },
          { kind: "p", text: "It was what leadership modeled." },
          { kind: "p", text: "The lead pastor began openly sharing decisions:" },
          {
            kind: "list",
            items: [
              "When AI was helpful",
              "When it wasn’t",
              "Where he drew the line",
            ],
          },
          {
            kind: "p",
            text: "This gave staff something more valuable than instructions:",
          },
          { kind: "pull", text: "A visible example of discernment." },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Over time:" },
          {
            kind: "list",
            items: [
              "Staff became more thoughtful, not just more efficient",
              "Conversations about AI became normal and open",
              "Teams shared practices instead of experimenting in isolation",
            ],
          },
          { kind: "p", text: "And something deeper became true:" },
          {
            kind: "emphasis",
            text: "The church was forming people who could think—not just use tools.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 04 · Solutions",
      title: "They built tools that fit their ministry.",
      intro: [
        {
          kind: "p",
          text: "Only after the first three steps did Riverside build anything custom.",
        },
      ],
      what: {
        didLabel: "What they built",
        didBlocks: [
          { kind: "p", text: "The tools reflected their context:" },
          {
            kind: "list",
            items: [
              "A communications assistant trained on their language and tone",
              "A resource search tool for sermons, small group materials, and internal documents",
              "A planning assistant for recurring ministry rhythms",
            ],
          },
          { kind: "p", text: "What they did <strong>not</strong> build:" },
          {
            kind: "list",
            items: [
              "sermon-writing tools",
              "pastoral-care automation",
              "anything that replaced relational ministry",
            ],
          },
          {
            kind: "p",
            text: "They built something different where care was at stake:",
          },
          {
            kind: "pull",
            text: "A discernment guide for staff and lay leaders—before using any tool at all.",
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "The biggest shift wasn’t speed." },
          { kind: "p", text: "It was clarity." },
          {
            kind: "list",
            items: [
              "Staff spent less time recreating resources",
              "Communication became more consistent",
              "Leaders weren’t answering the same questions repeatedly",
            ],
          },
          { kind: "p", text: "But the core of ministry didn’t change:" },
          { kind: "emphasis", text: "People still pastored people." },
        ],
      },
    },
    {
      title: "What this actually produced.",
      intro: [
        { kind: "p", text: "Riverside didn’t become an “AI church.”" },
        { kind: "p", text: "They became:" },
        {
          kind: "list",
          items: [
            "clearer about their convictions",
            "more aligned as a team",
            "more capable in their work",
          ],
        },
        { kind: "p", text: "And most importantly:" },
        {
          kind: "emphasis",
          text: "They adopted AI without quietly weakening the things that matter most in a church.",
        },
      ],
    },
    {
      title: "Why this worked.",
      intro: [
        { kind: "p", text: "Nothing about Riverside was unusual." },
        { kind: "p", text: "The difference was the order:" },
        {
          kind: "numbered",
          items: [
            "Clarify what matters",
            "Experiment carefully",
            "Form people",
            "Then build tools",
          ],
        },
      ],
    },
  ],
};
