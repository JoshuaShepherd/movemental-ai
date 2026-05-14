import type { CaseStudyConfig } from "./case-study-types";

/** Westbridge Seminary — fictional but illustrative composite case. */
export const institutionsCaseStudy: CaseStudyConfig = {
  eyebrow: "Case Study · Illustrative",
  title:
    "How a seminary approached AI without undermining formation, scholarship, or academic integrity.",
  lede: "Westbridge Seminary (fictional, but based on real patterns) is a graduate theological institution.",
  stats: [
    { num: "600", label: "Students" },
    {
      num: "3",
      label: "Faculty divisions",
      meta: "Theology, ministry, biblical studies.",
    },
    {
      num: "2",
      label: "Program tracks",
      meta: "Residential and online.",
    },
  ],
  sections: [
    {
      title: "The situation they were actually in.",
      intro: [
        { kind: "p", text: "AI didn’t arrive as a policy issue." },
        { kind: "p", text: "It arrived through students." },
        {
          kind: "list",
          items: [
            "Some were using AI to help draft papers",
            "Others used it for outlining or research summaries",
            "Faculty had mixed awareness—and mixed reactions",
          ],
        },
        { kind: "p", text: "Some professors banned it outright." },
        { kind: "p", text: "Others ignored it." },
        { kind: "p", text: "Some quietly experimented with it themselves." },
        { kind: "p", text: "From the outside, the academic year looked normal." },
        { kind: "p", text: "From the inside, a deeper question was forming:" },
        {
          kind: "pull",
          text: "What does formation look like in a world where AI can produce words faster than students can think?",
        },
      ],
    },
    {
      eyebrow: "Step 01 · Safety",
      title: "They defined their posture.",
      intro: [
        {
          kind: "p",
          text: "Instead of reacting piecemeal, Westbridge decided to clarify what they believed.",
        },
        { kind: "pull", text: "Is AI allowed?" },
        { kind: "p", text: "That was too simple a question." },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "A working group formed:" },
          {
            kind: "list",
            items: [
              "Academic dean",
              "Several faculty members",
              "One student representative",
              "IT leadership",
            ],
          },
          { kind: "p", text: "They worked through:" },
          {
            kind: "list",
            items: [
              "What counts as authorship?",
              "Where is assistance acceptable?",
              "Where does AI undermine formation?",
              "What should never be delegated?",
            ],
          },
          { kind: "p", text: "The key realization was this:" },
          {
            kind: "pull",
            text: "The goal of theological education is not just correct answers—it is formed thinkers.",
          },
          { kind: "p", text: "From that, they drew a line:" },
          {
            kind: "list",
            items: [
              "AI can assist research and structure",
              "AI cannot replace the student’s own thinking, argument, or voice",
            ],
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "Within a semester:" },
          {
            kind: "list",
            items: [
              "Clear AI guidelines existed for students and faculty",
              "Expectations were consistent across courses",
              "Faculty had language to explain decisions",
              "Students understood boundaries",
            ],
          },
          { kind: "p", text: "The goal wasn’t enforcement." },
          { kind: "emphasis", text: "It was clarity." },
        ],
      },
    },
    {
      eyebrow: "Step 02 · Sandbox",
      title: "They explored carefully.",
      intro: [
        {
          kind: "p",
          text: "Instead of banning or embracing AI wholesale, they tested it.",
        },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "Faculty and students ran controlled experiments:" },
          {
            kind: "list",
            items: [
              "Using AI to summarize dense theological texts",
              "Generating outlines before writing",
              "Comparing AI-generated arguments to student-written ones",
            ],
          },
          { kind: "p", text: "Everything was documented and discussed." },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "They learned:" },
          {
            kind: "list",
            items: [
              "AI could help with structure and clarity",
              "It struggled with theological nuance",
              "It could produce convincing but shallow arguments",
            ],
          },
          { kind: "p", text: "This gave the seminary something valuable:" },
          {
            kind: "emphasis",
            text: "A shared understanding of what AI could—and could not—do in their context.",
          },
        ],
      },
    },
    {
      eyebrow: "Step 03 · Skills",
      title: "They trained for formation, not just compliance.",
      intro: [
        { kind: "p", text: "Training wasn’t about avoiding plagiarism." },
        { kind: "p", text: "It was about understanding thinking." },
      ],
      what: {
        didLabel: "What they did",
        didBlocks: [
          { kind: "p", text: "Faculty incorporated AI into teaching conversations:" },
          {
            kind: "list",
            items: [
              "When is it helpful?",
              "When does it shortcut formation?",
              "What does it mean to “own” an argument?",
            ],
          },
          { kind: "p", text: "Students were taught:" },
          {
            kind: "list",
            items: [
              "how to use AI responsibly",
              "how to critique AI outputs",
              "how to recognize when AI replaces thinking",
            ],
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          {
            kind: "p",
            text: "Students became more aware—not just more restricted.",
          },
          { kind: "p", text: "They could:" },
          {
            kind: "list",
            items: [
              "explain when AI helped",
              "explain when it hurt their learning",
              "make intentional choices",
            ],
          },
          { kind: "p", text: "And faculty shifted too:" },
          { kind: "emphasis", text: "From policing AI to guiding its use." },
        ],
      },
    },
    {
      eyebrow: "Step 04 · Solutions",
      title: "They integrated tools thoughtfully.",
      intro: [
        {
          kind: "p",
          text: "Only after clarity and training did tools enter the system.",
        },
      ],
      what: {
        didLabel: "What they built",
        didBlocks: [
          {
            kind: "list",
            items: [
              "A research assistant for navigating approved academic sources",
              "A writing support tool focused on structure, not content",
              "A faculty resource hub for AI teaching practices",
            ],
          },
          { kind: "p", text: "What they avoided:" },
          {
            kind: "list",
            items: [
              "automated paper-writing tools",
              "anything that obscured authorship",
            ],
          },
          {
            kind: "p",
            text: "For the most formation-critical work, they didn’t build a tool at all:",
          },
          {
            kind: "pull",
            text: "They wrote a faculty guide on how to teach <em>with</em> AI—not how to detect it.",
          },
        ],
        changedLabel: "What changed",
        changedBlocks: [
          { kind: "p", text: "The seminary didn’t become more efficient." },
          { kind: "p", text: "It became more intentional." },
          {
            kind: "list",
            items: [
              "Students engaged more critically",
              "Faculty had shared expectations",
              "AI became part of the conversation—not a hidden shortcut",
            ],
          },
        ],
      },
    },
    {
      title: "What this actually produced.",
      intro: [
        { kind: "p", text: "Westbridge didn’t solve AI." },
        { kind: "p", text: "They did something more important:" },
        {
          kind: "emphasis",
          text: "They integrated it without losing the purpose of theological education.",
        },
      ],
    },
    {
      title: "Why this worked.",
      intro: [
        { kind: "p", text: "The challenge wasn’t AI itself." },
        { kind: "p", text: "It was what AI revealed:" },
        {
          kind: "list",
          items: [
            "assumptions about learning",
            "expectations about authorship",
            "the role of effort in formation",
          ],
        },
        { kind: "p", text: "And the solution wasn’t banning or embracing." },
        { kind: "p", text: "It was the order:" },
        {
          kind: "numbered",
          items: [
            "Clarify purpose",
            "Explore carefully",
            "Train for judgment",
            "Then integrate tools",
          ],
        },
      ],
    },
  ],
};
