export type TimelineStageState = "complete" | "current" | "upcoming";

export type TimelineStage = {
  stageLabel: string;
  title: string;
  detail?: string;
  state: TimelineStageState;
};

export type RosterItem = { name: string; subtitle?: string };

export type RosterColumn = {
  title: string;
  items: RosterItem[];
  aside?: { lines: string[]; draftField?: string };
};

export type SafeStartSection =
  | { id: string; kind: "timeline"; stages: TimelineStage[] }
  | { id: string; kind: "rosterColumns"; columns: RosterColumn[] }
  | {
      id: string;
      kind: "prepChecklist";
      eyebrow?: string;
      title?: string;
      intro?: string;
      bullets?: string[];
    };

export type SafeStartHeroTimelineFixture = {
  fixtureVersion: number;
  templateId: string;
  screenFamily: "safestart-hero-timeline";
  documentTitle?: string;
  shell: {
    brandLine: string | null;
    tenantName?: string | null;
    userInitials?: string | null;
    footerLinks?: Array<{ label: string; href: string }>;
  };
  page: {
    eyebrow?: string;
    headline: string;
    supportingCopy?: string;
  };
  sections: SafeStartSection[];
};
