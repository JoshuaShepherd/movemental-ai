export const BUILD_CAPABILITY_ORDER = [
  "foundation",
  "publishing",
  "formation",
  "relationships",
] as const;

export type BuildCapabilityId = (typeof BUILD_CAPABILITY_ORDER)[number];
export type BuildAudienceSlug = "nonprofits" | "churches" | "institutions";

export type BuildFeature = {
  name: string;
  description: string;
  sub?: string;
  agent?: boolean;
};

export type FoundationWireframeData = {
  charterTitle: string;
  tabs: readonly string[];
};

export type PublishingWireframeData = {
  hero: string;
  cards: readonly string[];
};

export type FormationWireframeData = {
  courses: readonly (readonly [string, number])[];
};

export type RelationshipsWireframeData = {
  col: string;
  rows: readonly (readonly [string, string, string])[];
};

export type WireframeData =
  | FoundationWireframeData
  | PublishingWireframeData
  | FormationWireframeData
  | RelationshipsWireframeData;

export type BuildPhoneMock = {
  q: string;
  a: string;
};

type SharedCapability = {
  title: string;
  tag: string;
  wf: BuildCapabilityId;
  wfData: WireframeData;
  phone: BuildPhoneMock;
  feats?: readonly BuildFeature[];
};

type AudienceCapabilityOverlay = {
  path: string;
  agent: string;
  wfData?: WireframeData;
  feats?: readonly BuildFeature[];
};

export type ResolvedCapability = {
  title: string;
  tag: string;
  wf: BuildCapabilityId;
  wfData: WireframeData;
  phone: BuildPhoneMock;
  path: string;
  agent: string;
  feats: readonly BuildFeature[];
};

export const FOUNDATION_FEATURES: readonly BuildFeature[] = [
  {
    name: "Your website",
    description:
      "A complete public site, editable by you: home, about, contact, newsletter signup, and site-wide search.",
    sub: "Home · About · Contact · Newsletter signup · Search",
  },
  {
    name: "Accounts & dashboard",
    description: "Sign-in, member accounts, a staff dashboard, and roles and permissions.",
    sub: "Sign-in & invites · Member accounts · Settings & roles · Staff dashboard",
  },
  {
    name: "AI Assistant",
    agent: true,
    description:
      "A public concierge, staff assistants, and cited search across everything you've made.",
    sub: "Public assistant · Staff assistants · Smart search",
  },
  {
    name: "Library",
    description:
      "Every report, document, and recording, imported, transcribed, and searchable in one place.",
    sub: "Import & transcribe · One search box · Public index",
  },
  {
    name: "Visibility & Trust",
    description:
      "Your people and claims as entities that Google and AI get right, with every claim sourced.",
    sub: "Search & AI visibility · Sources & citations · Real profiles · Network & endorsements",
  },
  {
    name: "Governance",
    description:
      "Your AI rules live and searchable, including your AI Safety Charter, with roles and analytics.",
    sub: "AI Handbook & Safety Charter · Roles & permissions · Analytics · Readiness check",
  },
];

export const SHARED_CAPABILITIES: Record<BuildCapabilityId, SharedCapability> = {
  foundation: {
    title: "Foundation",
    tag: "The spine. Included in every platform.",
    wf: "foundation",
    wfData: {
      charterTitle: "AI Safety Charter",
      tabs: ["Vision", "Plans", "Reality", "Rules", "Response"],
    },
    phone: {
      q: "Can we use AI in donor messages?",
      a: "Yes for drafting. A human sends.",
    },
    feats: FOUNDATION_FEATURES,
  },
  publishing: {
    title: "Publishing",
    tag: "Your public face, and the tools to run it.",
    wf: "publishing",
    wfData: { hero: "", cards: [] },
    phone: {
      q: "Make a newsletter blurb from our report.",
      a: "Drafted from your report. Source linked.",
    },
  },
  formation: {
    title: "Formation",
    tag: "How you form and teach people.",
    wf: "formation",
    wfData: { courses: [] },
    phone: {
      q: "Where is this cohort stuck?",
      a: "Three learners stalled at Module 3.",
    },
  },
  relationships: {
    title: "Relationships",
    tag: "People, giving, and operations in one place.",
    wf: "relationships",
    wfData: { col: "", rows: [] },
    phone: {
      q: "Draft a thank-you for a $5,000 gift.",
      a: "Draft ready. A human reviews and sends.",
    },
  },
};

const AUDIENCE_OVERLAYS: Record<
  BuildAudienceSlug,
  { demo: string; capabilities: Record<BuildCapabilityId, AudienceCapabilityOverlay> }
> = {
  nonprofits: {
    demo: "https://nonprofits.movemental.ai",
    capabilities: {
      foundation: { path: "/app/handbook", agent: "Foundation agent" },
      publishing: {
        path: "/impact",
        agent: "Publishing agent",
        wfData: {
          hero: "Clean water reached 12 villages",
          cards: ["Field report", "Annual impact", "From the director"],
        },
        feats: [
          { name: "Stories", description: "Impact stories that show what you actually did." },
          {
            name: "Articles",
            description: "Long-form writing: pillar pieces, clusters, essays.",
          },
          { name: "Programs", description: "Your offerings, described and discoverable." },
          {
            name: "Newsletter & media",
            description:
              "Broadcasts and sequences, plus audio and video with transcripts.",
            sub: "Broadcasts · Sequences · Segments · Public archive",
          },
          {
            name: "Publishing agent",
            agent: true,
            description:
              "Drafts posts and reports from your verified corpus, always citable.",
          },
        ],
      },
      formation: {
        path: "/learn",
        agent: "Formation agent",
        wfData: {
          courses: [
            ["AI Safety Leadership", 72],
            ["Field Reporting", 40],
            ["Foundations", 100],
          ],
        },
        feats: [
          {
            name: "Pathways & courses",
            description: "Guided journeys and the real course player.",
          },
          {
            name: "Cohorts & community",
            description: "Run a group through together, with discussion and facilitation.",
          },
          {
            name: "Certificates & assessments",
            description: "Reflection, completion, and proof.",
          },
          { name: "Enroll & apply", description: "How people get in." },
          {
            name: "Formation agent",
            agent: true,
            description: "A tutor grounded in your curriculum, not the open internet.",
          },
        ],
      },
      relationships: {
        path: "/app/donors",
        agent: "Relationships agent",
        wfData: {
          col: "Donor",
          rows: [
            ["Eleanor Vance", "$5,000", "Stewardship"],
            ["Marcus Lee", "$250", "New"],
            ["Ford Foundation", "Grant", "Reporting"],
          ],
        },
        feats: [
          {
            name: "Donor CRM",
            description: "One page per donor, with segments and full history.",
          },
          {
            name: "Stewardship pipelines",
            description: "Move someone from first gift to committed.",
          },
          {
            name: "Giving & campaigns",
            description: "Donations, recurring gifts, campaigns, pledges, receipts.",
          },
          { name: "Grants", description: "Pipeline, deadlines, and agent-drafted reports." },
          {
            name: "Events & volunteers",
            description: "Registration, shifts, and hours.",
          },
          {
            name: "Relationships agent",
            agent: true,
            description:
              "Drafts donor and stewardship messages, with a human always sending.",
          },
        ],
      },
    },
  },
  churches: {
    demo: "https://church.movemental.ai",
    capabilities: {
      foundation: { path: "/app/handbook", agent: "Foundation agent" },
      publishing: {
        path: "/sermons",
        agent: "Publishing agent",
        wfData: {
          hero: "This week: The Architecture of Grace",
          cards: ["Sermon library", "Watch & listen", "From the pastor"],
        },
        feats: [
          { name: "Ministry pages", description: "Editable pages for each ministry." },
          {
            name: "Sermons & media",
            description: "Audio and video with transcripts, your teaching archive.",
          },
          { name: "Watch & listen", description: "The public media hub." },
          { name: "Newsletter", description: "Broadcasts, sequences, a public archive." },
          {
            name: "Publishing agent",
            agent: true,
            description:
              "Turns a sermon into a study, a devotional, and posts, all citable.",
          },
        ],
      },
      formation: {
        path: "/courses",
        agent: "Formation agent",
        wfData: {
          courses: [
            ["Discipleship Journey", 60],
            ["Foundations", 100],
            ["Membership", 30],
          ],
        },
        feats: [
          { name: "Discipleship pathways", description: "Guided next-steps journeys." },
          {
            name: "Courses & classes",
            description: "The course player for classes and studies.",
          },
          { name: "Groups", description: "Find and join a group." },
          { name: "Milestones", description: "Steps and celebrations along the way." },
          {
            name: "Formation agent",
            agent: true,
            description: "A guide grounded in your church's teaching.",
          },
        ],
      },
      relationships: {
        path: "/giving",
        agent: "Relationships agent",
        wfData: {
          col: "Member",
          rows: [
            ["Okafor household", "—", "Member"],
            ["Sam Reyes", "—", "New here"],
            ["Giving, June", "$42,300", "On track"],
          ],
        },
        feats: [
          {
            name: "Members & households",
            description: "Records, households, and attendance.",
          },
          {
            name: "Assimilation pipeline",
            description: "From first-time guest to belonging.",
          },
          { name: "Giving", description: "Recurring, pledges, campaigns, statements." },
          {
            name: "Care & follow-up",
            description: "Pastoral care tracking, with data guardrails.",
          },
          {
            name: "Events & groups admin",
            description: "Registration and group management.",
          },
          {
            name: "Relationships agent",
            agent: true,
            description: "Drafts follow-up and care notes, a human always sends.",
          },
        ],
      },
    },
  },
  institutions: {
    demo: "https://seminary.movemental.ai",
    capabilities: {
      foundation: { path: "/library", agent: "Foundation agent" },
      publishing: {
        path: "/scholarship",
        agent: "Publishing agent",
        wfData: {
          hero: "The Architecture of Grace, an essay",
          cards: ["Faculty scholarship", "Publications", "Public lectures"],
        },
        feats: [
          { name: "Scholarship", description: "Faculty work, cited, with provenance." },
          {
            name: "Research & publications",
            description: "The publications index and reading pages.",
          },
          { name: "Public lectures", description: "The talks archive." },
          { name: "Newsletter", description: "Broadcasts and a public archive." },
          {
            name: "Publishing agent",
            agent: true,
            description: "Drafts from the scholarly corpus, every claim sourced.",
          },
        ],
      },
      formation: {
        path: "/courses",
        agent: "Formation agent",
        wfData: {
          courses: [
            ["MDiv core", 55],
            ["Reformation History", 80],
            ["Spiritual Formation", 100],
          ],
        },
        feats: [
          {
            name: "Programs & courses",
            description: "The catalog, the course player, credentials.",
          },
          {
            name: "Cohorts & admissions",
            description: "Cohort spaces and application management.",
          },
          {
            name: "Certificates & credits",
            description: "Completion, transcripts, continuing ed.",
          },
          { name: "Enroll & apply", description: "Admissions and enrollment." },
          {
            name: "Formation agent",
            agent: true,
            description: "A tutor grounded in the course corpus.",
          },
        ],
      },
      relationships: {
        path: "/advancement",
        agent: "Relationships agent",
        wfData: {
          col: "Student / Alumni",
          rows: [
            ["Jane Mitchell", "Alumna", "Advancement"],
            ["Cohort 2026", "24", "Enrolled"],
            ["Excellence Fund", "$1.2M", "Campaign"],
          ],
        },
        feats: [
          {
            name: "Student records",
            description: "Records under academic-records guardrails.",
          },
          {
            name: "Advancement & alumni",
            description: "The alumni and advancement CRM.",
          },
          { name: "Giving & campaigns", description: "Funds, campaigns, pledges." },
          {
            name: "Events & lectures",
            description: "Registration for events and lectures.",
          },
          {
            name: "Relationships agent",
            agent: true,
            description: "Drafts advancement and alumni comms, a human in the loop.",
          },
        ],
      },
    },
  },
};

export function getAudienceDemoBase(audience: BuildAudienceSlug): string {
  return AUDIENCE_OVERLAYS[audience].demo;
}

export function getBuildLiveUrl(audience: BuildAudienceSlug, cap: BuildCapabilityId): string {
  const overlay = AUDIENCE_OVERLAYS[audience];
  return `${overlay.demo}${overlay.capabilities[cap].path}`;
}

export function getFeaturesForCapability(
  audience: BuildAudienceSlug,
  cap: BuildCapabilityId,
): readonly BuildFeature[] {
  const shared = SHARED_CAPABILITIES[cap];
  if (shared.feats) return shared.feats;
  return AUDIENCE_OVERLAYS[audience].capabilities[cap].feats ?? [];
}

/** Merges shared spine with audience overlay — mirrors prototype `cap()`. */
export function getBuildCapability(
  audience: BuildAudienceSlug,
  cap: BuildCapabilityId,
): ResolvedCapability {
  const shared = SHARED_CAPABILITIES[cap];
  const overlay = AUDIENCE_OVERLAYS[audience].capabilities[cap];
  const wfData = overlay.wfData ?? shared.wfData;

  return {
    title: shared.title,
    tag: shared.tag,
    wf: shared.wf,
    wfData,
    phone: shared.phone,
    path: overlay.path,
    agent: overlay.agent,
    feats: getFeaturesForCapability(audience, cap),
  };
}

export function wireframeAriaLabel(cap: ResolvedCapability): string {
  switch (cap.wf) {
    case "foundation":
      return `Foundation preview: ${(cap.wfData as FoundationWireframeData).charterTitle}`;
    case "publishing":
      return `Publishing preview: ${(cap.wfData as PublishingWireframeData).hero}`;
    case "formation":
      return "Formation preview: course progress";
    case "relationships": {
      const data = cap.wfData as RelationshipsWireframeData;
      return `Relationships preview: ${data.col} table`;
    }
    default:
      return "Platform preview";
  }
}
