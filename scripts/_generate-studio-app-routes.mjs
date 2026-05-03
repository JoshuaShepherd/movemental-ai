import fs from "node:fs";
import path from "node:path";

const siteRoot = path.join(process.cwd(), "src/app/(site)");

/** @type {{ rel: string; from: string; name: string; audience?: string; meta: { title: string; description: string } }[]} */
const routes = [
  {
    rel: "page.tsx",
    from: "@/components/studio/pages/HomePage",
    name: "HomePage",
    meta: {
      title: "A wiser way to navigate AI",
      description:
        "Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order.",
    },
  },
  {
    rel: "pathway/page.tsx",
    from: "@/components/studio/pages/PathwayOverviewPage",
    name: "PathwayOverviewPage",
    meta: {
      title: "The Pathway",
      description:
        "The Movemental AI Pathway — foundations, lab, training, and technology in sequence.",
    },
  },
  {
    rel: "pathway/foundations/page.tsx",
    from: "@/components/studio/pages/pathway/FoundationsPage",
    name: "FoundationsPage",
    meta: {
      title: "Safety Documentation",
      description:
        "Mile Marker 01 — AI use and trust charters, board-ready documentation.",
    },
  },
  {
    rel: "pathway/lab/page.tsx",
    from: "@/components/studio/pages/pathway/LabPage",
    name: "LabPage",
    meta: {
      title: "Sandbox Discovery",
      description:
        "Mile Marker 02 — facilitated sandbox discovery and use-case sprints.",
    },
  },
  {
    rel: "training/page.tsx",
    from: "@/components/studio/pages/TrainingPage",
    name: "TrainingPage",
    meta: {
      title: "Skills Development",
      description:
        "Mile Marker 03 — cohorts and self-paced fluency for your team.",
    },
  },
  {
    rel: "technology/page.tsx",
    from: "@/components/studio/pages/TechnologyPage",
    name: "TechnologyPage",
    meta: {
      title: "Solutions Deployment",
      description:
        "Mile Marker 04 — custom agentic CMS/LMS builds and deployment.",
    },
  },
  {
    rel: "for-churches/page.tsx",
    from: "@/components/studio/pages/AudiencePage",
    name: "AudiencePage",
    audience: "churches",
    meta: {
      title: "For Churches",
      description:
        "Lead your staff into AI without losing the mission — the pathway for churches.",
    },
  },
  {
    rel: "for-nonprofits/page.tsx",
    from: "@/components/studio/pages/AudiencePage",
    name: "AudiencePage",
    audience: "nonprofits",
    meta: {
      title: "For Nonprofits",
      description:
        "Adopt AI without losing donor trust — the pathway for nonprofits.",
    },
  },
  {
    rel: "for-institutions/page.tsx",
    from: "@/components/studio/pages/AudiencePage",
    name: "AudiencePage",
    audience: "institutions",
    meta: {
      title: "For Institutions",
      description:
        "Governance-paced adoption — the pathway for seminaries and training organizations.",
    },
  },
  {
    rel: "churches/page.tsx",
    from: "@/components/studio/pages/AudiencePage",
    name: "AudiencePage",
    audience: "churches",
    meta: {
      title: "For Churches",
      description:
        "Lead your staff into AI without losing the mission — the pathway for churches.",
    },
  },
  {
    rel: "nonprofits/page.tsx",
    from: "@/components/studio/pages/AudiencePage",
    name: "AudiencePage",
    audience: "nonprofits",
    meta: {
      title: "For Nonprofits",
      description:
        "Adopt AI without losing donor trust — the pathway for nonprofits.",
    },
  },
  {
    rel: "institutions/page.tsx",
    from: "@/components/studio/pages/AudiencePage",
    name: "AudiencePage",
    audience: "institutions",
    meta: {
      title: "For Institutions",
      description:
        "Governance-paced adoption — the pathway for seminaries and training organizations.",
    },
  },
  {
    rel: "about/page.tsx",
    from: "@/components/studio/pages/AboutPage",
    name: "AboutPage",
    meta: {
      title: "About",
      description: "Who we are and why Movemental exists.",
    },
  },
  {
    rel: "assess/page.tsx",
    from: "@/components/studio/pages/AssessPage",
    name: "AssessPage",
    meta: {
      title: "Integrity Diagnostic",
      description:
        "Where is your organization actually starting? A short diagnostic for senior leaders.",
    },
  },
  {
    rel: "movement-leaders/page.tsx",
    from: "@/components/studio/pages/MovementLeadersPage",
    name: "MovementLeadersPage",
    meta: {
      title: "Movement leaders",
      description:
        "Movement leaders as a distinct ecosystem layer — definition and fit.",
    },
  },
  {
    rel: "team/page.tsx",
    from: "@/components/studio/pages/TeamPage",
    name: "TeamPage",
    meta: {
      title: "Team",
      description: "The people behind Movemental.",
    },
  },
  {
    rel: "voices/page.tsx",
    from: "@/components/studio/pages/VoicesPage",
    name: "VoicesPage",
    meta: {
      title: "Trusted voices",
      description:
        "Leaders joining the conversation — credibility and relational proof.",
    },
  },
  {
    rel: "contact/page.tsx",
    from: "@/components/studio/pages/ContactPage",
    name: "ContactPage",
    meta: {
      title: "Talk With Us",
      description:
        "Let's talk about where your organization actually is — start the conversation.",
    },
  },
  {
    rel: "evidence/page.tsx",
    from: "@/components/studio/pages/EvidencePage",
    name: "EvidencePage",
    meta: {
      title: "Evidence",
      description: "Proof of practice, framework, and outcomes.",
    },
  },
  {
    rel: "library/page.tsx",
    from: "@/components/studio/pages/LibraryPage",
    name: "LibraryPage",
    meta: {
      title: "Library",
      description: "Articles, podcasts, video, and documents from Movemental.",
    },
  },
  {
    rel: "cookies/page.tsx",
    from: "@/components/studio/pages/CookiesPage",
    name: "CookiesPage",
    meta: {
      title: "Cookies",
      description: "How Movemental uses cookies.",
    },
  },
  {
    rel: "privacy/page.tsx",
    from: "@/components/studio/pages/PrivacyPage",
    name: "PrivacyPage",
    meta: {
      title: "Privacy",
      description: "Movemental privacy policy.",
    },
  },
  {
    rel: "terms/page.tsx",
    from: "@/components/studio/pages/TermsPage",
    name: "TermsPage",
    meta: {
      title: "Terms",
      description: "Terms of service.",
    },
  },
  {
    rel: "faq/page.tsx",
    from: "@/components/studio/pages/FaqPage",
    name: "FaqPage",
    meta: {
      title: "FAQ",
      description: "Frequently asked questions about Movemental.",
    },
  },
  {
    rel: "who-we-serve/page.tsx",
    from: "@/components/studio/pages/WhoWeServePage",
    name: "WhoWeServePage",
    meta: {
      title: "Who we serve",
      description: "Organizations and leaders Movemental is built for.",
    },
  },
  {
    rel: "field-guide/page.tsx",
    from: "@/components/studio/pages/FieldGuidePage",
    name: "FieldGuidePage",
    meta: {
      title: "Field guide",
      description: "The AI Stewardship Sequence in plain language.",
    },
  },
];

for (const r of routes) {
  const full = path.join(siteRoot, r.rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  const shortName = `Studio${r.name}`;
  const alias = `${r.name} as ${shortName}`;
  const inner =
    r.audience != null
      ? `<${shortName} audience="${r.audience}" />`
      : `<${shortName} />`;
  const body = `import type { Metadata } from "next";

import { ${alias} } from "${r.from}";

export const metadata: Metadata = {
  title: ${JSON.stringify(r.meta.title)},
  description: ${JSON.stringify(r.meta.description)},
};

export default function Page() {
  return (
    ${inner}
  );
}
`;
  fs.writeFileSync(full, body);
}

console.log("Wrote", routes.length, "routes under", siteRoot);
