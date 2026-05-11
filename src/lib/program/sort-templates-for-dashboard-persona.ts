import type { DashboardPersona } from "@/lib/dashboard/dashboard-persona";
import type { StitchManifestTemplate } from "@/lib/program/stitch-manifest";

/** Safety subgroups surfaced first for implementation_org COO/governance workflows. */
const IMPLEMENTATION_SAFETY_SUBGROUP_PRIORITY = [
  "governance-tools",
  "ratification-recording",
  "editorial",
  "safestart-dashboard",
];

const SAFETY_SUBGROUP_RANK: Record<string, number> = Object.fromEntries(
  IMPLEMENTATION_SAFETY_SUBGROUP_PRIORITY.map((s, i) => [s, i]),
);

export function sortSafetyTemplatesForPersona(
  templates: StitchManifestTemplate[],
  persona: DashboardPersona,
): StitchManifestTemplate[] {
  if (persona !== "implementation_org") return templates;

  const rank = (subgroup: string) =>
    SAFETY_SUBGROUP_RANK[subgroup] ?? IMPLEMENTATION_SAFETY_SUBGROUP_PRIORITY.length;

  return [...templates].sort((a, b) => {
    const dr = rank(a.subgroup) - rank(b.subgroup);
    if (dr !== 0) return dr;
    return a.title.localeCompare(b.title);
  });
}

export function partitionSafetyTemplatesForImplementation(
  templates: StitchManifestTemplate[],
): { governance: StitchManifestTemplate[]; other: StitchManifestTemplate[] } {
  const governanceSubgroups = new Set(["governance-tools", "ratification-recording", "editorial"]);
  const governance: StitchManifestTemplate[] = [];
  const other: StitchManifestTemplate[] = [];
  for (const t of templates) {
    if (governanceSubgroups.has(t.subgroup)) governance.push(t);
    else other.push(t);
  }
  return { governance, other };
}
