import type { ProseBlock, CaseStudySection } from "../types";

/**
 * Shared opening — appears at the top of every case study page so each one
 * stands alone. This is the introductory framing the user provided before
 * the three case-study bodies.
 */
export const sharedIntroBlocks: ReadonlyArray<ProseBlock> = [
  {
    type: "lede",
    text:
      "These three stories walk through what happens when a church, a nonprofit, and an institution engage Movemental's process. They are reconstructed from common patterns we see, not from a single specific customer. Names, sizes, and details are illustrative. The process they describe is the actual process. Read whichever one fits your context.",
  },
  {
    type: "p",
    text:
      "If you are not yet familiar with Movemental, here is the short version. We help mission-driven organizations adopt AI safely, build real capability, and lead their people through the work — without losing trust, credibility, or identity. We do this through a four-stage path: Safety, Sandbox, Skills, Solutions. Most organizations begin with Safety. The story below is what Safety actually looks like, and what comes after it.",
  },
];

/**
 * Shared closing — appears at the bottom of every case study page. The
 * "what these three stories share" passage from the user's source. Plus a
 * final conversation-forward note that mirrors the home page's CTA.
 */
export const sharedClosingSection: CaseStudySection = {
  id: "shared-pattern",
  navLabel: "The pattern across cases",
  heading: "What these three stories share",
  body: [
    {
      type: "p",
      text:
        "A few things worth noticing across all three.",
    },
    {
      type: "p",
      text:
        "The seven decisions have the same names in every engagement. Their content is completely specific to the organization. The Care Boundaries document protects pastoral relationships at a church, clinical relationships at a nonprofit, and formative academic relationships at a seminary. The framework is portable. The content cannot be templated.",
    },
    {
      type: "p",
      text:
        "Named Refusals is the most-cited decision across all three engagements. The act of publicly committing to specific refusals is the most distinctive thing Movemental customers do, and it is the decision that creates the most external visibility. Every Movemental customer should expect this.",
    },
    {
      type: "p",
      text:
        "The path scales with the organization. The church spent $26,000 over the first year. The nonprofit will spend a similar amount on a similar arc. The institution will spend $600,000–$800,000 over a multi-year arc. Same path. Same decisions. Different scope. Movemental's pricing scales with institutional complexity, not as a fixed menu but as a path whose cost reflects the scope of the work the organization actually needs.",
    },
    {
      type: "p",
      text:
        "Each engagement ends with a Sandbox Readiness Assessment and a clear sense of what the next stage looks like for that specific organization. The handoff is structured so the next engagement is not a new sale. It is the next step on a path the organization has already decided they want to walk.",
    },
    {
      type: "p",
      text:
        "This is what Movemental does. The path is real. The decisions are real. The seven names are not marketing categories. They are the actual deliverables of an actual engagement that produces actual ratifiable governance for organizations that need it.",
    },
    {
      type: "p",
      text:
        "If you see your situation in one of these stories, the next step is a 30-minute conversation. We will tell you honestly whether Safety is the right starting place for your organization, what the engagement would look like, and what to expect afterward. The conversation is free. The Safety toolkit is free. The Safety engagement itself is $1,000. Most organizations who walk this path begin here.",
    },
  ],
};
