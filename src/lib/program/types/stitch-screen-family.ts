/** Screen families from Stitch `docs/fixtures-screen-families.md` + generic fallback. */
export type StitchScreenFamily =
  | "safestart-hero-timeline"
  | "safestart-editorial-workspace"
  | "editorial-thread"
  | "governance-document"
  | "ratification-flow"
  | "sandboxlive-shell"
  | "phase-workspace"
  | "ethics-workspace"
  | "future-plan-editor"
  | "strategic-memo"
  | "recipe-library"
  | "oversight-modules"
  | "generic-dashboard";

export type ProgramFixtureShell = {
  brandLine?: string | null;
  tenantName?: string | null;
  userInitials?: string | null;
  modeBadge?: string | null;
  footerLinks?: Array<{ label: string; href: string }>;
};

export type ProgramFixturePage = {
  eyebrow?: string;
  headline?: string | null;
  supportingCopy?: string | null;
  statusChip?: string;
};

export type ProgramFixtureBase = {
  fixtureVersion: number;
  templateId: string;
  screenFamily: StitchScreenFamily;
  documentTitle?: string;
  shell: ProgramFixtureShell;
  page: ProgramFixturePage;
  sections?: unknown[];
  sidebar?: unknown;
  editorialThread?: { variant?: string };
};
