import type { ReactNode } from "react";

import type { AudienceKind } from "@/components/studio/segment/audience-contact";

export type PathStage = {
  num: string;
  title: string;
  description: string;
};

export type PatternBlock = {
  lead: string;
  body: string;
};

export type AudienceOfferCopy = {
  situationEyebrow: string;
  situationHeading: ReactNode;
  situationParas: string[];
  situationClosing: string;
  pathEyebrow: string;
  pathHeading: string;
  pathStages: PathStage[];
  pathFooter: string;
  caseStudyEyebrow: string;
  caseStudyTitle: string;
  caseStudyIntro: string;
  patternEyebrow: string;
  patternHeading: ReactNode;
  patterns: PatternBlock[];
  closingEyebrow: string;
  closingHeading: string;
  closingBody: string;
  closingItalic?: string;
  /** Institutions: conversation button before toolkit */
  closingConversationPrimary: boolean;
  otherPathsHeading: string;
  otherPathsIntro: string;
};

const otherPaths = {
  heading: "Other ways to engage",
  intro: "If you're not ready for facilitated work yet.",
  cards: [
    {
      num: "01",
      title: "Read the field guide",
      body: "Sixteen pages naming the seven decisions and how to draft them. Free. Read it with your team and decide together.",
      href: "/field-guides/safety",
      linkLabel: "Field guide",
    },
    {
      num: "02",
      title: "Take the AI Assessment",
      body: "Fifteen minutes. A structured intake that surfaces where your organization is and what to do next.",
      href: "/assess",
      linkLabel: "Assessment",
    },
    {
      num: "03",
      title: "See pricing",
      body: "All five offerings with what's included, what payment looks like, and how the path scales.",
      href: "/pricing",
      linkLabel: "Pricing",
    },
  ],
} as const;

const institutionsOtherPaths = {
  heading: "Other ways to engage",
  intro: "Other entry points.",
  cards: [
    {
      num: "01",
      title: "Read the field guide",
      body: "Sixteen pages naming the seven decisions and the framework. Useful as a starting point for institutional leadership teams to read together before a conversation.",
      href: "/field-guides/safety",
      linkLabel: "Field guide",
    },
    {
      num: "02",
      title: "Take the AI Assessment",
      body: "Fifteen minutes. A structured intake that produces a read-back of your institution's current posture. Designed for the senior administrator who wants concrete language before bringing the question to the board.",
      href: "/assess",
      linkLabel: "Assessment",
    },
    {
      num: "03",
      title: "See pricing",
      body: "All five offerings with what's included. Note that institutional engagements scope per conversation; pricing here is the standard tier.",
      href: "/pricing",
      linkLabel: "Pricing",
    },
  ],
} as const;

export const AUDIENCE_OFFER_OTHER_PATHS: Record<
  AudienceKind,
  typeof otherPaths | typeof institutionsOtherPaths
> = {
  churches: otherPaths,
  nonprofits: otherPaths,
  institutions: institutionsOtherPaths,
};

export const AUDIENCE_OFFER_COPY: Record<AudienceKind, AudienceOfferCopy> = {
  churches: {
    situationEyebrow: "What's actually happening",
    situationHeading: (
      <>
        Three things are converging in churches <em className="font-serif italic">right now</em>.
      </>
    ),
    situationParas: [
      "Your staff are using AI tools individually, without shared workflow or organizational guidance. Worship leaders are using AI for service planning. Communications staff are drafting newsletters with it. Associate pastors are using it for sermon prep, sometimes for pastoral correspondence. Each person has made their own decision about what's appropriate. Most of those decisions have not been discussed with anyone else.",
      "Your elder team is starting to ask. Not aggressively yet, but the question has surfaced. What's our position? Do we have a policy? Are we disclosing AI involvement in communications to the congregation? If we got blindsided by an AI-related incident — a deepfake, a data exposure, an inappropriate AI-generated communication — would we know what to do? The questions are reasonable. Most churches don't have answers.",
      "Meanwhile, the vendors selling AI tools to churches are not the people who can help leaders think through the harder questions. The category is full of companies that understand technology but not pastoral work, or that understand pastoral work but not technology. The result is that the practical decisions — what AI may and may not do in your context, how to handle the boundaries that protect pastoral relationships, what your church will refuse on principle — are getting made by individual staff members one tool at a time, with no shared framework.",
    ],
    situationClosing: "If this matches what you're seeing, the rest of this page is for you.",
    pathEyebrow: "How we help",
    pathHeading: "Four stages, in the order that makes them work.",
    pathStages: [
      {
        num: "01",
        title: "Safety",
        description: "Governance your elder team can ratify in two weeks for $1,000.",
      },
      {
        num: "02",
        title: "Sandbox",
        description: "Disciplined exploration of AI use cases against your ministry work.",
      },
      {
        num: "03",
        title: "Skills",
        description: "Formation that produces leaders, not just users, on your staff.",
      },
      {
        num: "04",
        title: "Solutions",
        description: "AI-integrated tools deployed on a foundation you can defend.",
      },
    ],
    pathFooter: "Most churches begin with Safety. Here's what that looks like in practice.",
    caseStudyEyebrow: "A case study",
    caseStudyTitle: "How a 1,400-attender multisite church walked the path.",
    caseStudyIntro:
      "This is a reconstructed case study built from common patterns we see in churches at this size. Names, locations, and details are illustrative. The process described is the Movemental process. If you recognize your church in this story, that recognition is itself meaningful.",
    patternEyebrow: "What this pattern reveals",
    patternHeading: (
      <>
        <em className="font-serif italic">A few things</em> worth noticing.
      </>
    ),
    patterns: [
      {
        lead: "The seven decisions have the same names in every engagement.",
        body: "Their content is completely specific to your church. Care Boundaries protects pastoral relationships at your church in language only your team would write. The framework is portable. The content cannot be templated.",
      },
      {
        lead: "Named Refusals is the most-cited decision across our church engagements.",
        body: "The act of publicly committing to specific refusals is the most distinctive thing Movemental customers do, and it is the decision that creates the most external visibility. Churches share their Named Refusals with their congregations. Other churches see them and ask their own pastors what their position is.",
      },
      {
        lead: "The path scales with the church.",
        body: "The church in this story spent about $26,000 over the first year. Most churches will spend a similar amount on a similar arc. Larger multisite churches and church planting networks engage at larger scope; smaller churches sometimes engage Safety only and do the rest of the work themselves with the toolkit and their own staff.",
      },
    ],
    closingEyebrow: "Where to begin",
    closingHeading: "Most churches begin with Safety.",
    closingBody:
      "Two weeks of facilitated work. $1,000. Seven decisions your elders can ratify. The cost is calibrated as a funnel-entry move — most churches don't know whether facilitation is needed until they're inside it, and Safety lets you find out without committing to the full path.",
    closingItalic:
      "Or download the free toolkit and start with the self-assessment. Sixteen pages. Read it in an evening. No commitment.",
    closingConversationPrimary: false,
    otherPathsHeading: otherPaths.heading,
    otherPathsIntro: otherPaths.intro,
  },
  nonprofits: {
    situationEyebrow: "What's actually happening",
    situationHeading: <>Three pressures are converging on nonprofit governance.</>,
    situationParas: [
      "Your program staff are using AI tools individually. Case managers using AI to draft case notes. Development staff using AI to write donor communications. Communications team using AI for newsletters and grant applications. Some of this is fine; some of it touches protected health information, donor data, or beneficiary identity in ways nobody on your team has formally evaluated. The decisions are being made one staff member at a time.",
      "Your board is reading governance literature naming AI as a fiduciary issue. Forvis Mazars and the National Council of Nonprofits have both published guidance in the last twelve months treating AI governance as a board-level responsibility. Your board chair may have read this. If they haven't yet, they will. The question of whether your organization has a documented AI posture is not theoretical — it is increasingly the question peer organizations are asking each other at sector convenings.",
      "Your donors are paying attention. Major donors increasingly ask whether mission-critical communications are AI-generated, whether beneficiaries have consented to AI involvement in their cases, and whether the organization's posture on AI matches its stated values. A small number of donors will ask these questions explicitly. Many more will form impressions silently. Your organization's AI posture is becoming part of how donor trust is built or eroded, whether you have engaged the question yet or not.",
    ],
    situationClosing: "If this matches what you're seeing, the rest of this page is for you.",
    pathEyebrow: "How we help",
    pathHeading: "Four stages, in the order that makes them work.",
    pathStages: [
      {
        num: "01",
        title: "Safety",
        description: "Governance your board can ratify in two weeks for $1,000.",
      },
      {
        num: "02",
        title: "Sandbox",
        description: "Disciplined exploration of AI use cases against your mission work.",
      },
      {
        num: "03",
        title: "Skills",
        description: "Formation that produces capable leaders on your staff.",
      },
      {
        num: "04",
        title: "Solutions",
        description: "AI-integrated tools deployed on a foundation you can defend.",
      },
    ],
    pathFooter: "Most nonprofits begin with Safety. Here's what that looks like in practice.",
    caseStudyEyebrow: "A case study",
    caseStudyTitle: "How a $5M faith-based nonprofit walked the path.",
    caseStudyIntro:
      "This is a reconstructed case study built from common patterns we see in nonprofits at this size. Names, locations, and details are illustrative. The process described is the Movemental process. If you recognize your organization in this story, that recognition is itself meaningful.",
    patternEyebrow: "What this pattern reveals",
    patternHeading: (
      <>
        <em className="font-serif italic">A few things</em> worth noticing.
      </>
    ),
    patterns: [
      {
        lead: "The Care Boundaries document is often what nonprofits are most proud of.",
        body: "For nonprofits with clinical practice, trauma-affected populations, or beneficiary populations protected by law, the Care Boundaries document does work no other governance decision does. It names — explicitly, in language the board has ratified — exactly which categories of work AI cannot touch. Donors read these documents and remark on them. Peer organizations request them as references.",
      },
      {
        lead: "The Forvis Mazars fiduciary framing converts board chairs.",
        body: "Most nonprofit ED engagements with Movemental are made possible by the board chair, not blocked by them. The Forvis Mazars framing — AI governance as fiduciary expansion of board responsibility — has shifted the conversation in many boardrooms from “Is this premature?” to “Have we discharged our governance duty here?” The seven decisions read as the operational answer.",
      },
      {
        lead: "The path scales with the organization.",
        body: "The nonprofit in this story will spend roughly $26,000 over the first year on a similar arc to many faith-based nonprofits at $5–15M budget. Larger nonprofits and federated structures engage at larger scope; smaller organizations sometimes engage Safety alone and use the toolkit to do the rest of the work themselves.",
      },
    ],
    closingEyebrow: "Where to begin",
    closingHeading: "Most nonprofits begin with Safety.",
    closingBody:
      "Two weeks of facilitated work. $1,000. Seven decisions your board can ratify, including a Care Boundaries document tuned to your specific protected populations and a Data Handling Protocol that addresses HIPAA, donor data, and beneficiary identity explicitly. Most nonprofit boards approve Safety without controversy because the cost is small and the deliverables are concrete.",
    closingItalic:
      "Or download the free toolkit and start with the self-assessment. Sixteen pages. Read it in an evening.",
    closingConversationPrimary: false,
    otherPathsHeading: otherPaths.heading,
    otherPathsIntro: otherPaths.intro,
  },
  institutions: {
    situationEyebrow: "What's actually happening",
    situationHeading: <>Institutions face a different shape of the AI problem.</>,
    situationParas: [
      "Your faculty are not a single audience. Some hold the position that AI is fundamentally incompatible with formative theological education. Others hold that teaching students to use AI well is part of preparing them for ministry. Most are between. None of these positions can be commanded into compliance through administrative policy. They have to be worked through governance the faculty senate will ratify.",
      "Your students are not a single audience either. They are taking different courses with different professors who have different unstated AI policies. Their anxiety is not primarily about whether AI use is permitted; it is about whether they will violate a policy they don't know exists. The student senate is increasingly asking for syllabus-level disclosure standards and a published institutional policy that survives changes in faculty composition.",
      "Your administration faces an operational AI problem that overlaps with FERPA, accreditation reporting, and institutional risk. Admissions teams are using AI to draft personalized outreach. Advancement teams are using AI in donor communications. Registrars are facing requests from faculty to use AI in grading. Your COO is responsible for a regulatory posture nobody has yet documented. Outside legal review is unavoidable for any institution serious about the work.",
      "And your board, your denomination, and your accreditor are all watching. Your board treats AI governance as fiduciary expansion. Your denomination wants institutional policy aligned with its theological commitments. Your accreditor — ATS, the Higher Learning Commission, or your regional body — has begun asking about AI in standards review. The institutional posture you produce has to satisfy all three audiences and your faculty senate and your student senate.",
    ],
    situationClosing: "If this matches what your institution is navigating, the rest of this page is for you.",
    pathEyebrow: "How we help",
    pathHeading: "Four stages, scoped to institutional complexity.",
    pathStages: [
      {
        num: "01",
        title: "Safety",
        description:
          "Governance ratified across faculty senate, student senate, administrative council, and the board. Six weeks. From $7,500.",
      },
      {
        num: "02",
        title: "Sandbox",
        description:
          "Disciplined exploration across faculty teaching, student academic work, and administrative operations. From $60,000.",
      },
      {
        num: "03",
        title: "Skills",
        description: "A network engagement that may include faculty from peer institutions you convene. Scoped per institution.",
      },
      {
        num: "04",
        title: "Solutions",
        description: "AI-integrated deployment scoped to the three-constituency working model. From $300,000.",
      },
    ],
    pathFooter: "Most institutions begin with an expanded Safety engagement. The case study below shows what that looks like in practice.",
    caseStudyEyebrow: "A case study",
    caseStudyTitle: "How a 380-student seminary walked the path.",
    caseStudyIntro:
      "This is a reconstructed case study built from common patterns we see in graduate institutions of this size. Names, locations, and details are illustrative. The process described is the Movemental process. If you recognize your institution in this story, the recognition is itself meaningful.",
    patternEyebrow: "What this pattern reveals",
    patternHeading: <>A few things worth noticing about institutional engagements.</>,
    patterns: [
      {
        lead: "The three-track structure is what makes institutional Safety ratifiable.",
        body: "Single-team Safety engagements work for churches and nonprofits because the leadership team can speak for the organization. Institutions cannot. The faculty senate will not ratify decisions the faculty did not draft. The student senate has its own consent expectations. The administrative council has operational realities the other two tracks may not see. Cross-track integration sessions resolve disagreements by identifying which constituency has the strongest claim on each provision, rather than by averaging positions.",
      },
      {
        lead: "Outside legal review is part of the work, not an optional add-on.",
        body: "Every institutional engagement we have run has required outside legal review of the Data Handling Protocol, typically running $5,000 in addition to the Movemental engagement. FERPA, institutional Data Processing Agreements, and accreditation reporting requirements cannot be addressed without counsel. We name this in the engagement scope from the beginning so institutions can budget for it accurately.",
      },
      {
        lead: "The Named Refusals document tends to become the institution's most-cited decision.",
        body: "Three peer-reviewed articles in theological education have cited Named Refusals documents from Movemental institutional engagements. Two ATS member institutions have adopted modified versions of a peer institution's Care Boundaries document with permission. Network effects compound across the institutional landscape in ways the individual church or nonprofit Named Refusals do not.",
      },
    ],
    closingEyebrow: "Where to begin",
    closingHeading: "Most institutions begin with an expanded Safety.",
    closingBody:
      "Six weeks. From $7,500. Seven decisions ratified across faculty senate, student senate, administrative council, and the board. The expanded scope reflects what institutions need: parallel working tracks for the three constituencies, cross-track integration sessions to reconcile differences, and sequential ratification through the institution's governance bodies. Outside legal review of the Data Handling Protocol is a separate engagement, typically $5,000.",
    closingItalic:
      "We can also start with a 30-minute conversation about your institution's specific complexity. Most institutional engagements begin there rather than with the toolkit.",
    closingConversationPrimary: true,
    otherPathsHeading: institutionsOtherPaths.heading,
    otherPathsIntro: institutionsOtherPaths.intro,
  },
};

export const AUDIENCE_HERO_COPY: Record<
  AudienceKind,
  { eyebrow: string; title: string; sub: ReactNode; finePrint?: string }
> = {
  churches: {
    eyebrow: "Movemental for churches",
    title: "AI is already inside your church. Most pastors don't have a path through it.",
    sub: (
      <>
        Your staff are using AI to draft sermons, communications, and pastoral correspondence. Your elders are starting to
        ask what your position is. The vendors offering help are either tech companies that don&apos;t understand church
        or consultants who don&apos;t understand the technology.{" "}
        We built the path that does both.
      </>
    ),
    finePrint: "Two weeks. $1,000. Seven decisions your elders can ratify.",
  },
  nonprofits: {
    eyebrow: "Movemental for nonprofits",
    title: "Your board is starting to ask about AI. Most nonprofits don't have an answer yet.",
    sub: (
      <>
        Your staff are using AI individually. Your therapists or case managers may be using AI in ways that touch
        protected information. Your donors are reading governance commentary that names AI as a fiduciary expansion.
        Your board chair has noticed.{" "}
        
          We help nonprofits build the documented posture all three audiences expect.
        
      </>
    ),
    finePrint: "Two weeks. $1,000. Seven decisions your board can ratify.",
  },
  institutions: {
    eyebrow: "Movemental for institutions",
    title: "Your institution makes AI policy one case at a time. The next case is coming.",
    sub: (
      <>
        Your faculty are setting individual classroom AI policies in their syllabi. Your administration is making
        operational decisions about admissions, advancement, and student services. Your accreditor is starting to ask
        about AI governance at standards review. The next academic-integrity case, the next FERPA-adjacent question, the
        next denominational query is coming. The seminaries, denominations, and networks who walk this path{" "}
        
          build the institutional posture that handles those cases before they arrive.
        
      </>
    ),
    finePrint:
      "Institutional engagements are scoped per conversation. Most begin with an expanded Safety engagement at $7,500 and run six weeks across three constituencies.",
  },
};
