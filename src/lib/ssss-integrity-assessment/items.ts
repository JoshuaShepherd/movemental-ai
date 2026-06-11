import type { SsssIntegrityItem } from "./types";

/** Canonical item bank — single source for UI + `/api/assess/ssss-integrity`. */
export const SSSS_INTEGRITY_ITEMS: readonly SsssIntegrityItem[] = [
  {
    id: "Q01",
    stage: "Safety",
    category: "boundaries_and_authority",
    weight: 1,
    prompt:
      "We can state, without notes, what is **forbidden** in external-facing work and what requires **human review**.",
  },
  {
    id: "Q02",
    stage: "Safety",
    category: "governance_artifact",
    weight: 1,
    prompt: "We have a **published** map of decision rights, not only informal habit.",
  },
  {
    id: "Q03",
    stage: "Safety",
    category: "conviction_lines",
    weight: 1,
    prompt:
      "Our deepest convictions (theological or ethical) are **explicit enough** to say no to plausible shortcuts.",
  },
  {
    id: "Q04",
    stage: "Safety",
    category: "operational_spread",
    weight: 1,
    prompt:
      "Data sensitivity tiers and escalation paths are **understood across departments**, not only legal/IT.",
  },
  {
    id: "Q05",
    stage: "Sandbox",
    category: "learning_artifact",
    weight: 1,
    prompt:
      "We keep a **shared dated log** of experiments, surprises, and failures, not only success stories.",
  },
  {
    id: "Q06",
    stage: "Sandbox",
    category: "environment_compliance",
    weight: 1,
    prompt:
      "Our experiments run in environments that **comply with Safety**, not primarily as shadow individual use.",
  },
  {
    id: "Q07",
    stage: "Sandbox",
    category: "portfolio_discipline",
    weight: 1,
    prompt: "We have a **prioritized use-case portfolio** screened by governance constraints.",
  },
  {
    id: "Q08",
    stage: "Sandbox",
    category: "evidence_quality",
    weight: 1,
    prompt:
      "We can point to **evidence** of what “good” and “not us” look like for our voice, not only opinions.",
  },
  {
    id: "Q09",
    stage: "Training",
    category: "distributed_judgment",
    weight: 1,
    prompt: "Mid-level staff can describe **good** AI-assisted work without reading policy verbatim.",
  },
  {
    id: "Q10",
    stage: "Training",
    category: "culture_of_correction",
    weight: 1,
    prompt: "We see **public self-correction** when outputs drift (voice, facts, ethics).",
  },
  {
    id: "Q11",
    stage: "Training",
    category: "verification_norms",
    weight: 1,
    prompt: "Verification habits are **social norm**, not heroics by one reviewer.",
  },
  {
    id: "Q12",
    stage: "Training",
    category: "formation_vs_training",
    weight: 1,
    prompt: "Training time is spent on **judgment**, not only buttonology.",
  },
  {
    id: "Q13",
    stage: "Technology",
    category: "workflow_infrastructure",
    weight: 1,
    prompt:
      "We deploy **workflows** with clear owners, gates, and failure modes, not tool brands as substitutes for design.",
  },
  {
    id: "Q14",
    stage: "Technology",
    category: "procurement_gates",
    weight: 1,
    prompt:
      "Procurement conversations are **shortened** by pre-baked constraints and graduated use cases.",
  },
  {
    id: "Q15",
    stage: "Technology",
    category: "measurement_legibility",
    weight: 1,
    prompt: "We measure **workflow outcomes**, not only licenses activated.",
  },
  {
    id: "Q16",
    stage: "Technology",
    category: "tool_independence",
    weight: 1,
    prompt: "We could **swap tools** without losing the practice (documentation + skill).",
  },
  {
    id: "Q17",
    stage: "Cross",
    category: "honest_location",
    weight: 2,
    prompt:
      "We know **where we are** on the Movemental Path, and where we **skipped**, without self-deception.",
  },
  {
    id: "Q18",
    stage: "Cross",
    category: "incident_posture",
    weight: 1,
    prompt:
      "When something goes wrong, we **adjust** proportionately rather than panic-freeze or ban everything.",
  },
] as const;

export const SSSS_INTEGRITY_ITEM_COUNT = SSSS_INTEGRITY_ITEMS.length;
