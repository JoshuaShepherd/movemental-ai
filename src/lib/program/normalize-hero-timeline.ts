import type {
  SafeStartHeroTimelineFixture,
  SafeStartSection,
  TimelineStage,
} from "@/lib/program/types/safe-start-hero";
import type { ProgramFixtureBase } from "@/lib/program/types/stitch-screen-family";

type RawTimeline = {
  id?: string;
  kind: "timeline";
  stages?: TimelineStage[];
  milestones?: Array<{ label: string; state: TimelineStage["state"] }>;
};

type RawRoster = {
  id?: string;
  kind: "rosterColumns";
  title?: string;
  columns?: Array<{ title: string; items: Array<{ name: string; subtitle?: string }>; aside?: unknown }>;
  items?: Array<{ name: string; subtitle?: string }>;
};

type RawPrep = {
  id?: string;
  kind: "prepChecklist";
  eyebrow?: string;
  title?: string;
  intro?: string;
  bullets?: string[];
};

function normalizeTimeline(raw: RawTimeline): SafeStartSection | null {
  if (raw.stages?.length) {
    return { id: raw.id ?? "timeline", kind: "timeline", stages: raw.stages };
  }
  if (raw.milestones?.length) {
    const stages: TimelineStage[] = raw.milestones.map((m, i) => ({
      stageLabel: `Step ${i + 1}`,
      title: m.label,
      state: m.state,
    }));
    return { id: raw.id ?? "timeline", kind: "timeline", stages };
  }
  return null;
}

function normalizeRoster(raw: RawRoster): SafeStartSection | null {
  if (raw.columns?.length) {
    return { id: raw.id ?? "roster", kind: "rosterColumns", columns: raw.columns };
  }
  if (raw.items?.length) {
    return {
      id: raw.id ?? "roster",
      kind: "rosterColumns",
      columns: [{ title: raw.title ?? "Your cohort", items: raw.items }],
    };
  }
  return null;
}

export function hasFullHeroTimelineLayout(sections: SafeStartSection[]): boolean {
  const kinds = sections.map((s) => s.kind);
  return kinds.includes("timeline") && kinds.includes("rosterColumns") && kinds.includes("prepChecklist");
}

/** Builds hero-timeline sections from a raw program fixture (handles milestones + flat roster items). */
export function extractHeroTimelineSections(f: ProgramFixtureBase): SafeStartSection[] {
  const raw = (f.sections ?? []) as unknown[];
  const out: SafeStartSection[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object" || !("kind" in item)) continue;
    const k = (item as { kind: string }).kind;
    if (k === "timeline") {
      const n = normalizeTimeline(item as RawTimeline);
      if (n) out.push(n);
    } else if (k === "rosterColumns") {
      const n = normalizeRoster(item as RawRoster);
      if (n) out.push(n);
    } else if (k === "prepChecklist") {
      const p = item as RawPrep;
      out.push({
        id: p.id ?? "prep",
        kind: "prepChecklist",
        eyebrow: p.eyebrow,
        title: p.title,
        intro: p.intro,
        bullets: p.bullets,
      });
    }
  }
  return out;
}

export function toSafeStartHeroTimelineFixture(f: ProgramFixtureBase): SafeStartHeroTimelineFixture {
  const heroSections = extractHeroTimelineSections(f);
  return {
    fixtureVersion: f.fixtureVersion,
    templateId: f.templateId,
    screenFamily: "safestart-hero-timeline",
    documentTitle: f.documentTitle,
    shell: {
      brandLine: f.shell.brandLine ?? "MOVEMENTAL",
      tenantName: f.shell.tenantName,
      userInitials: f.shell.userInitials,
      footerLinks: f.shell.footerLinks ?? [],
    },
    page: {
      eyebrow: f.page.eyebrow,
      headline: f.page.headline ?? f.templateId,
      supportingCopy: f.page.supportingCopy ?? undefined,
    },
    sections: heroSections,
  };
}
