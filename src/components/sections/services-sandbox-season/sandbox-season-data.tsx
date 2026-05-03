/**
 * Data for /services/sandbox-season.
 *
 * Source of truth: docs/movemental-offering/03-sandbox-playbook.md and
 * docs/movemental-offering/04-engagement-design.md. When those documents change,
 * the data here changes — both kept in sync through the same planning artifacts.
 */

export type Deliverable = {
  eyebrow: string;
  title: string;
  description: string;
};

export const deliverables: readonly Deliverable[] = [
  {
    eyebrow: "Portfolio",
    title: "A validated use-case portfolio",
    description:
      "Five to ten use cases, scored across four dimensions, flagged for authorship, voice, trust, and formation, owned by named staff.",
  },
  {
    eyebrow: "Governance",
    title: "A board-ready governance one-pager",
    description:
      "Drafted mid-season, reviewed by your Safety Owner, signed by the senior sponsor. Ready for the next board agenda.",
  },
  {
    eyebrow: "Formation",
    title: "A trained internal cohort",
    description:
      "Five to six staff with formed pattern recognition, working experiment discipline, and the judgment to run the next season without us.",
  },
] as const;

export type TimelinePhase = {
  meta: string;
  title: string;
  description: string;
};

export const timelinePhases: readonly TimelinePhase[] = [
  {
    meta: "Week 1 · Orient",
    title: "Season charter and roles",
    description:
      "Senior Sponsor, Portfolio Owner, Safety Owner, and experiment team named. Out-of-scope territory written down and defended for twelve weeks.",
  },
  {
    meta: "Weeks 2–3 · Discover",
    title: "The eight-pattern scan, then the filter",
    description:
      "Your real work scanned through the canonical value patterns. Twelve to thirty candidate use cases narrowed to three or four experiment briefs.",
  },
  {
    meta: "Weeks 4–7 · Test",
    title: "Three cycles of structured experiments",
    description:
      "Five required fields per experiment: input, output, time comparison, quality judgment, risk flag. Paired peer review, not self-scoring.",
  },
  {
    meta: "Weeks 8–10 · Judge",
    title: "The ethical and relational flag",
    description:
      "Your Safety Owner asks the question the scoring cannot: what about this might cost us something humanly? Reroutes and parks happen here, not later.",
  },
  {
    meta: "Weeks 11–12 · Assemble",
    title: "Portfolio and handoff",
    description:
      "The validated portfolio takes shape. Two board-ready one-pagers. Portfolio ownership transfers to the internal Portfolio Owner. Season closes.",
  },
] as const;

export type CohortRole = {
  role: string;
  commitment: string;
  description: string;
};

export const cohortRoles: readonly CohortRole[] = [
  {
    role: "Senior Sponsor",
    commitment: "Weeks 1, 6, 12",
    description:
      "CEO or executive director. Signs the charter, defends the portfolio to the board, and holds the room when hard decisions need to be made.",
  },
  {
    role: "Portfolio Owner",
    commitment: "All twelve weeks",
    description:
      "The senior leader who will own the portfolio after handoff. Primary contact throughout. Usually a chief-of-staff or strategic operations role.",
  },
  {
    role: "Safety Owner",
    commitment: "Flag weeks (8, 10)",
    description:
      "The senior leader who already carries governance or ethics accountability. Writes the ethical and relational flag paragraphs. Non-negotiable role.",
  },
  {
    role: "Experiment operators (three seats)",
    commitment: "All twelve weeks",
    description:
      "Staff from two or three departments. Mixed seniority. Three accountable seats on the experiment work, shared document hygiene, and named candidates. One seat may rotate mid-season when the charter names it.",
  },
  {
    role: "Observer-veto",
    commitment: "As needed",
    description:
      "A senior leader with standing to say no. Stops any candidate drifting toward protected territory: formation load, pastoral care, vulnerable populations, or data classes Safety has ruled out.",
  },
] as const;

export const outOfScopeItems: readonly string[] = [
  "Tool procurement — you select and pay for any AI assistants used during the season.",
  "Implementation engineering into production systems.",
  "Any use case touching minors, vulnerable populations, or trauma-adjacent programs in season one.",
  "Any pastoral care, discipleship, or formation writing that bears the organization's theological weight.",
  "Deployments into live donor-facing or member-facing workflows.",
  "Board presentations, donor meetings, or external communications about the season.",
  "Cross-departmental work beyond the designated cohort.",
  "Ongoing facilitation past Week 12.",
] as const;

export type PricingZone = {
  zone: string;
  revenueBand: string;
  scope: string;
  fee: string;
  payment: string;
};

export const pricingZones: readonly PricingZone[] = [
  {
    zone: "Small",
    revenueBand: "Under $2M annual revenue",
    scope: "Single department, four participants",
    fee: "$18,000 fixed",
    payment: "50% kickoff · 50% Week 12",
  },
  {
    zone: "Mid",
    revenueBand: "$2M–$10M annual revenue",
    scope: "Multi-department, five to six participants",
    fee: "$32,000 fixed",
    payment: "$10K kickoff · $11K Week 6 · $11K Week 12",
  },
  {
    zone: "Large",
    revenueBand: "$10M–$50M annual revenue",
    scope: "Org-wide, six to eight participants plus observers",
    fee: "$55,000 fixed",
    payment: "$18K kickoff · $18K Week 6 · $19K Week 12",
  },
  {
    zone: "Enterprise",
    revenueBand: "$50M+ annual revenue",
    scope: "Org-wide, multiple cohorts",
    fee: "Custom fixed fee",
    payment: "Milestone structure agreed in writing",
  },
] as const;

/** Service page shows Small / Mid / Large; full pricing page includes Enterprise. */
export const pricingZonesStandard: readonly PricingZone[] = pricingZones.filter(
  (z) => z.zone !== "Enterprise",
);
