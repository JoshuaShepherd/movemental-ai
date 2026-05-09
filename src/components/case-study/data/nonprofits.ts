import type { CaseStudyContent } from "../types";
import { sharedIntroBlocks, sharedClosingSection } from "./shared";

export const nonprofitsCaseStudy: CaseStudyContent = {
  audience: "nonprofits",
  hero: {
    kicker: "Case study · A nonprofit",
    title: "Movemental for Nonprofits.",
    lede: "What happens when a faith-based nonprofit serving women and children in housing instability engages the Movemental process — clinical, donor, and board considerations all in scope. Reconstructed from common patterns. The process is the actual process.",
  },
  sections: [
    {
      id: "context",
      navLabel: "About this case study",
      heading: "Three case studies — how the Movemental process actually works.",
      body: [...sharedIntroBlocks],
    },
    {
      id: "the-situation",
      navLabel: "The situation",
      heading: "The situation.",
      body: [
        {
          type: "p",
          text: "A faith-based nonprofit serving women and children experiencing housing instability. Three transitional housing facilities. A financial literacy program. A workforce development initiative. Roughly 340 women and 580 children served annually. Annual budget around $5 million. Twenty-eight staff including ten case managers and four trauma-informed therapists. The board has fifteen members, mostly local business leaders. The executive director has been in role for six years and is well-respected in her city's nonprofit community.",
        },
        {
          type: "p",
          text: "The problem surfaced at a board meeting. The board chair had read a piece in Forvis Mazars on AI as a fiduciary expansion of board responsibility. He asked the executive director what the organization's posture on AI was. She did not have a complete answer. She knew her staff were using AI tools — she had seen ChatGPT open on her communications director's screen during a meeting. She knew her case managers had access to AI through their Microsoft 365 subscription. She did not know what data was being shared, what policies governed use, or whether her therapy staff were using AI in ways that affected client confidentiality.",
        },
        {
          type: "p",
          text: "The board chair was direct. He wanted to see a documented governance posture by the next board meeting, ninety days out. The executive director asked for help.",
        },
        {
          type: "p",
          text: "She found Movemental through a recommendation. The first conversation was 45 minutes. By the end of it, she had decided to engage, but she had also identified a complication — the donor relationship.",
        },
        {
          type: "p",
          text: "The nonprofit received roughly 60% of its funding from individual donors. Three major donors had explicitly raised AI concerns in conversations during the prior year. She did not just need a governance posture for the board. She needed a posture donors would recognize as principled.",
        },
      ],
    },
    {
      id: "stage-01-safety",
      navLabel: "Stage 01 — Safety",
      heading: "Safety.",
      eyebrow: "Stage 01",
      body: [
        {
          type: "p",
          text: "The standard Safety engagement is $1,000. Because the nonprofit's situation involved client confidentiality, clinical practice, and regulatory exposure (HIPAA was at issue for the therapy staff), the engagement scoped slightly larger and included a board presentation at the end. The total was $1,000 with the Movemental facilitator joining the regular board meeting at no additional cost.",
        },
        {
          type: "p",
          text: "The working team was four — the executive director, the communications and development director, the clinical director, and the operations manager. The board chair was invited to the kickoff and the ratification but not the working sessions.",
        },
        {
          type: "h3",
          text: "Kickoff.",
        },
        {
          type: "p",
          text: "The Movemental facilitator opened with three questions adapted for the nonprofit context. What AI use is happening that you know about? What do you suspect? What are your donors and board asking that you can't currently answer?",
        },
        {
          type: "p",
          text: "The third question reframed the engagement. The team was not just developing internal policy. They were developing a public-facing governance posture donors and grant-makers could review. The artifacts would have two audiences — internal operations and external trust.",
        },
        {
          type: "p",
          text: "The team identified seventeen current AI use cases. The most sensitive were on the clinical side. The clinical director disclosed that two of her four therapists had been using AI for note-taking during sessions, with client consent. One had been using AI for treatment-planning suggestions. Both were using tools that processed protected health information through third-party servers. She was uncertain whether the practice violated HIPAA and wanted the engagement to produce a clear answer.",
        },
        {
          type: "p",
          text: "The facilitator did not give a legal opinion. She named the question for the artifact. The Data Handling Protocol would have to address PHI specifically and would require outside legal review before ratification. The executive director agreed to budget $2,000 for legal review separate from the Movemental engagement.",
        },
        {
          type: "h3",
          text: "Drafting session one.",
        },
        {
          type: "p",
          text: "The Acceptable Use Statement and the Care Boundaries.",
        },
        {
          type: "p",
          text: "The Care Boundaries document was longer than any version Movemental had produced. The nonprofit's work involved trauma-affected populations, child welfare, financial vulnerability, and clinical mental health care. The team named twelve categories where AI could not be used — trauma disclosure conversations, custody-related communications, immigration-status communications, suicide assessment and safety planning, child protective services referrals, financial counseling involving debt or bankruptcy, communications with law enforcement or attorneys or medical providers, treatment planning, group therapy facilitation, and any communication where the client had not provided specific consent for AI involvement.",
        },
        {
          type: "p",
          text: "The list was long because the work was sensitive. The team did not negotiate the length. Once they began naming categories, they could not stop until they were satisfied. The Care Boundaries document became the artifact the executive director was most proud of and the one she most wanted to share with donors.",
        },
        {
          type: "h3",
          text: "Drafting session two.",
        },
        {
          type: "p",
          text: "Disclosure Standards, the Vendor and Tool Inventory, the Data Handling Protocol.",
        },
        {
          type: "p",
          text: "Disclosure had two audiences. For clients, the standard was simple: any time AI was involved in their case file, communication with them, or any decision affecting their service, they would be informed in language they could understand, in their preferred language, before the AI involvement began. For donors, the standard was that the nonprofit would publish an annual transparency report on AI use including categories of use, vendor relationships, and any incidents.",
        },
        {
          type: "p",
          text: "The Vendor and Tool Inventory revealed fourteen AI tools in use across the organization. Six were sanctioned. Eight were not. The team suspended all eight unsanctioned tools immediately and required staff to either request authorization or stop using them.",
        },
        {
          type: "p",
          text: "The Data Handling Protocol was the artifact requiring outside legal review. PHI could not be processed by any AI tool that did not have a Business Associate Agreement in place. Client identifying information could not be shared with consumer AI tools. Donor data was treated with the same protection as PHI. Financial records were entirely off-limits.",
        },
        {
          type: "h3",
          text: "Drafting session three.",
        },
        {
          type: "p",
          text: "The Incident Response Plan and the Named Refusals.",
        },
        {
          type: "p",
          text: "The Incident Response Plan was structured around five incident categories — AI-generated content with errors that reached clients or donors, staff use of AI in violation of policy, data breach involving an AI tool, AI deepfake or impersonation targeting leadership, and any incident triggering legal disclosure requirements.",
        },
        {
          type: "p",
          text: "The Named Refusals document was where the engagement crystallized. The team named seven specific applications of AI the nonprofit committed to refuse on principle — AI used to make eligibility determinations for services, AI used to predict client outcomes for resource allocation, AI used to generate fundraising appeals in the personal voice of program staff or beneficiaries, AI used to surveil client behavior or attendance, AI used to replace clinical judgment in any treatment context, AI used to generate content depicting clients without explicit consent and review, and AI used to assess donor giving patterns in ways that would change service delivery to those donors' communities.",
        },
        {
          type: "p",
          text: "The seventh refusal came from the development director. He had been in nonprofit fundraising for two decades and had watched algorithmic donor scoring lead some organizations to subtly de-prioritize the communities of low-giving donors. The nonprofit would refuse this practice explicitly. The board would later cite this refusal as the moment they understood the engagement had been worth more than they had expected.",
        },
        {
          type: "h3",
          text: "Review, legal review, and board presentation.",
        },
        {
          type: "p",
          text: "The team reviewed all seven artifacts as a complete document. The legal review of the Data Handling Protocol came back during the review session with three suggested revisions, all incorporated. The Care Boundaries document was reviewed by the clinical director against clinical ethics literature and required no changes.",
        },
        {
          type: "p",
          text: "At the next board meeting, the executive director presented the seven artifacts as a packet. The Movemental facilitator answered three questions from board members about how the artifacts compared to peer nonprofit governance frameworks. The board voted to ratify all seven artifacts unanimously.",
        },
        {
          type: "p",
          text: "The engagement closed.",
        },
      ],
    },
    {
      id: "what-the-nonprofit-had",
      navLabel: "What the nonprofit had",
      heading: "What the nonprofit had.",
      body: [
        {
          type: "p",
          text: "Seven artifacts, all board-approved. A clinical practice that had paused unauthorized AI use and was reviewing what authorized AI use should look like. A donor-facing transparency commitment several major donors affirmed within weeks. A public Named Refusals document that would later be quoted by two peer organizations and one funder.",
        },
        {
          type: "callout",
          label: "Engagement",
          title: "Total cost: $3,000 (incl. legal review). About three weeks.",
          body: [
            "$1,000 for Movemental Safety",
            "$2,000 for outside legal review of the Data Handling Protocol",
            "Seven artifacts ratified unanimously by the board",
            "Care Boundaries adopted as a public-facing document",
          ],
        },
      ],
    },
    {
      id: "stage-02-sandbox",
      navLabel: "Stage 02 — Sandbox",
      heading: "Sandbox.",
      eyebrow: "Stage 02",
      body: [
        {
          type: "p",
          text: "Six months after Safety, the executive director engaged Movemental for Sandbox at the standard $15,000 rate. The Sandbox engagement focused on three specific use cases the Safety process had surfaced but not resolved — AI-assisted case management documentation, AI-assisted grant writing, and AI-assisted donor communication.",
        },
        {
          type: "p",
          text: "Over four weeks, the team tested each use case against the artifacts the board had ratified. Case management documentation came out green-light with three specific guardrails added. Grant writing came out green-light with disclosure standards extended. Donor communication came out yellow-light, requiring additional staff training before deployment. The Use Case Portfolio became the operational addendum to the seven artifacts.",
        },
      ],
    },
    {
      id: "stage-03-skills",
      navLabel: "Stage 03 — Skills",
      heading: "Skills.",
      eyebrow: "Stage 03",
      body: [
        {
          type: "p",
          text: "The nonprofit is currently in Skills with three staff enrolled in the cohort — the development director, a senior case manager, and the operations manager. The cohort fee is part of the broader Movemental engagement and is being treated as a staff development line item in the budget.",
        },
      ],
    },
    {
      id: "stage-04-solutions",
      navLabel: "Stage 04 — Solutions",
      heading: "Solutions (not yet decided).",
      eyebrow: "Stage 04",
      body: [
        {
          type: "p",
          text: "The nonprofit has not yet committed to Solutions. The executive director has said she wants Skills to complete before evaluating whether the organization is ready for AI-integrated deployment. The Sandbox Readiness Assessment from Safety scored 81 — strong. Movemental's working assumption is that this organization will engage Solutions within 18 months of Safety completion.",
        },
      ],
    },
    {
      id: "what-it-cost",
      navLabel: "What this cost",
      heading: "What this nonprofit has spent.",
      body: [
        {
          type: "p",
          text: "Roughly $26,000 over the first nine months — $3,000 for Safety with legal review, $15,000 for Sandbox, about $8,000 in Skills cohort fees for three staff. The Care Boundaries document has been requested by four other nonprofits in their region as a reference. The executive director has spoken about the engagement at one regional nonprofit gathering and one national funder convening. Without intending to, this organization has become a reference for the kind of work peer nonprofits are now asking for.",
        },
      ],
    },
    sharedClosingSection,
  ],
};
