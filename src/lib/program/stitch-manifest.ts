import manifestJson from "@/lib/program/data/stitch-templates.json";

export type StitchTemplateCategory = "safety" | "sandbox";

export type StitchManifestTemplate = {
  id: string;
  category: StitchTemplateCategory;
  subgroup: string;
  title: string;
  path: string;
  thumbnail?: string;
  reactRoute?: string;
};

export type StitchSubgroupLabels = Record<string, string>;

export type StitchTemplatesFile = {
  version: number;
  count: number;
  subgroupLabels: StitchSubgroupLabels;
  templates: StitchManifestTemplate[];
};

export function loadStitchTemplatesManifest(): StitchTemplatesFile {
  return manifestJson as StitchTemplatesFile;
}
