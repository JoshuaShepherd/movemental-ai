import type { StitchManifestTemplate } from "@/lib/program/stitch-manifest";

export type SubgroupBucket = {
  subgroupKey: string;
  label: string;
  templates: StitchManifestTemplate[];
};

/**
 * Buckets ordered templates by `subgroup`, preserving template order within each bucket.
 * Subgroup order follows first appearance in `orderedTemplates`.
 */
export function groupTemplatesBySubgroup(
  orderedTemplates: StitchManifestTemplate[],
  subgroupLabels: Record<string, string>,
): SubgroupBucket[] {
  const bySubgroup = new Map<string, StitchManifestTemplate[]>();
  const subgroupOrder: string[] = [];

  for (const t of orderedTemplates) {
    if (!bySubgroup.has(t.subgroup)) {
      subgroupOrder.push(t.subgroup);
      bySubgroup.set(t.subgroup, []);
    }
    bySubgroup.get(t.subgroup)!.push(t);
  }

  return subgroupOrder.map((subgroupKey) => ({
    subgroupKey,
    label: subgroupLabels[subgroupKey] ?? subgroupKey,
    templates: bySubgroup.get(subgroupKey)!,
  }));
}
