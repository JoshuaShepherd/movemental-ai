import contentIndexJson from "@/lib/program/data/template-content-index.json";

export type StitchContentEntry = {
  templateId: string;
  category: string;
  subgroup: string;
  screenFamily: string;
  fixturePath: string;
  htmlPath: string;
  schemaPath: string | null;
  seedUsed: boolean;
};

type ContentIndexFile = {
  entries: StitchContentEntry[];
};

const index = contentIndexJson as ContentIndexFile;

const byTemplateId = new Map<string, StitchContentEntry>(
  index.entries.map((e) => [e.templateId, e]),
);

export function getStitchScreenFamily(templateId: string): string | undefined {
  return byTemplateId.get(templateId)?.screenFamily;
}

export function getStitchContentEntry(templateId: string): StitchContentEntry | undefined {
  return byTemplateId.get(templateId);
}
