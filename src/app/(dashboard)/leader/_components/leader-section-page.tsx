import Link from "next/link";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { FieldGuideMarkdown } from "@/components/field-guide/FieldGuideMarkdown";
import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import type { MovementLeaderDataJson } from "@/lib/movement-leaders/types";
import { createClient } from "@/lib/supabase/server";

export type LeaderReflectionSectionId =
  | "overview"
  | "calling"
  | "work"
  | "voice"
  | "where_it_lives"
  | "network"
  | "gaps";

const LEADER_OVERVIEW_ROWS: ReadonlyArray<{
  num: string;
  title: string;
  href: string;
  previewFrom: (data: MovementLeaderDataJson) => string;
}> = [
  {
    num: "01",
    title: "Calling",
    href: "/leader/calling",
    previewFrom: (d) => editorialPreviewFromMarkdown(typeof d.calling === "string" ? d.calling : null),
  },
  {
    num: "02",
    title: "Work",
    href: "/leader/work",
    previewFrom: (d) => editorialPreviewFromMarkdown(typeof d.work === "string" ? d.work : null),
  },
  {
    num: "03",
    title: "Voice",
    href: "/leader/voice",
    previewFrom: (d) => editorialPreviewFromMarkdown(typeof d.voice === "string" ? d.voice : null),
  },
  {
    num: "04",
    title: "Where it lives",
    href: "/leader/where-it-lives",
    previewFrom: (d) =>
      editorialPreviewFromMarkdown(typeof d.where_it_lives === "string" ? d.where_it_lives : null),
  },
  {
    num: "05",
    title: "Network",
    href: "/leader/network",
    previewFrom: (d) => editorialPreviewFromMarkdown(typeof d.network === "string" ? d.network : null),
  },
  {
    num: "06",
    title: "Gaps",
    href: "/leader/gaps",
    previewFrom: (d) => editorialPreviewFromMarkdown(typeof d.gaps === "string" ? d.gaps : null),
  },
  {
    num: "07",
    title: "Reflected understanding",
    href: "/leader#reflected-essay",
    previewFrom: (d) =>
      editorialPreviewFromMarkdown(
        typeof d.reflected_understanding === "string" ? d.reflected_understanding : null,
      ),
  },
];

const SECTION_COPY: Record<
  Exclude<LeaderReflectionSectionId, "overview">,
  { title: string; intro: string; dataKey: keyof MovementLeaderDataJson }
> = {
  calling: {
    title: "Calling",
    intro: "The shape of vocation and mission as reflected in your public work.",
    dataKey: "calling",
  },
  work: {
    title: "Work",
    intro: "Bodies of work, recurring themes, and what you keep returning to.",
    dataKey: "work",
  },
  voice: {
    title: "Voice",
    intro: "Cadence, posture, and how your ideas land with audiences.",
    dataKey: "voice",
  },
  where_it_lives: {
    title: "Where it lives",
    intro: "Channels, formats, and the geography of your ideas today.",
    dataKey: "where_it_lives",
  },
  network: {
    title: "Network",
    intro: "Collaborators, institutions, and relational scaffolding.",
    dataKey: "network",
  },
  gaps: {
    title: "Gaps",
    intro: "Fragmentation risks and where continuity is still thin.",
    dataKey: "gaps",
  },
};

/** Editorial empty states when a corpus-backed section has not been written yet. */
const SECTION_EMPTY: Record<
  keyof typeof SECTION_COPY,
  { title: string; body: string }
> = {
  calling: {
    title: "Your calling reflection is being assembled.",
    body:
      "From the research we have gathered on your public work, the Movemental editorial team is shaping this section for you. You should see it here within the next few business days.",
  },
  work: {
    title: "Your work reflection is being assembled.",
    body:
      "We are distilling the bodies of work and recurring themes surfaced in research into a single narrative you can endorse. The Movemental editorial team is finishing this pass; expect it here shortly.",
  },
  voice: {
    title: "Your voice reflection is being assembled.",
    body:
      "Cadence, posture, and how your ideas land are being drafted from the corpus we have reviewed. You will find the finished reflection here once editorial shaping is complete.",
  },
  where_it_lives: {
    title: "Your channels map is being assembled.",
    body:
      "Where your ideas live today—in channels, formats, and geographies—is being written up from the research record. Check back here in the next few business days for the full section.",
  },
  network: {
    title: "Your network reflection is being assembled.",
    body:
      "Collaborators, institutions, and the relational scaffolding around your work are being summarized for you. The editorial team will place the draft here when it is ready for your review.",
  },
  gaps: {
    title: "Your gaps reflection is being assembled.",
    body:
      "Fragmentation risks and where continuity is still thin are sensitive to get right; we are drafting this carefully from the research. You will see it here once the editorial pass lands.",
  },
};

function sectionMarkdown(
  data: MovementLeaderDataJson,
  section: LeaderReflectionSectionId,
): string | null {
  if (section === "overview") {
    const ru = data.reflected_understanding;
    return typeof ru === "string" && ru.trim() ? ru : null;
  }
  const key = SECTION_COPY[section].dataKey;
  const raw = data[key];
  return typeof raw === "string" && raw.trim() ? raw : null;
}

export async function LeaderSectionPage({ section }: { section: LeaderReflectionSectionId }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  if (!leader) {
    return null;
  }

  const leaderData = leader.movement_leader_data;
  const md = sectionMarkdown(leaderData, section);

  if (section === "overview") {
    return (
      <div className="space-y-10">
        <header className="space-y-3">
          <Eyebrow>Author reflection</Eyebrow>
          <Display as="h1" size="md" className="text-balance">
            Reflected understanding
          </Display>
          <p className="max-w-(--prose-max) text-muted-foreground">
            A seven-part mirror of how Movemental reads your public work back to you. Each section is drafted from
            research and careful review; when a part is ready, it appears here—no files to manage on your side.
          </p>
        </header>
        <Section variant="section" spacing="sm" className="rounded-xl">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">Full essay</h2>
          <div className="mt-6">
            {md ? (
              <Prose>
                <FieldGuideMarkdown markdown={md} />
              </Prose>
            ) : (
              <EditorialEmptyState
                eyebrow="Author reflection"
                title="Your reflected essay is still taking shape."
                tone="default"
              >
                <p>
                  The long-form essay that gathers everything we see in your public corpus is not in your workspace
                  yet. The Movemental editorial team is assembling it from the research we have pulled together; you
                  should see the draft here within the next few business days.
                </p>
              </EditorialEmptyState>
            )}
          </div>
        </Section>
        <Section variant="default" spacing="sm">
          <Eyebrow>Sections</Eyebrow>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(SECTION_COPY) as Array<keyof typeof SECTION_COPY>).map((key) => (
              <li key={key}>
                <Link
                  href={`/leader/${key.replace(/_/g, "-")}`}
                  className="block rounded-lg bg-card px-4 py-3 text-foreground transition-colors hover:bg-elevated"
                >
                  <span className="font-medium">{SECTION_COPY[key].title}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{SECTION_COPY[key].intro}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    );
  }

  const meta = SECTION_COPY[section];
  const empty = SECTION_EMPTY[section];

  return (
    <div className="space-y-8">
      <nav className="text-sm text-muted-foreground">
        <Link href="/leader" className="hover:text-foreground">
          Reflected understanding
        </Link>
        <span aria-hidden className="px-2">
          /
        </span>
        <span className="text-foreground">{meta.title}</span>
      </nav>
      <header className="space-y-3">
        <Eyebrow>Author reflection</Eyebrow>
        <Display as="h1" size="sm" className="text-balance">
          {meta.title}
        </Display>
        <p className="max-w-(--prose-max) text-muted-foreground">{meta.intro}</p>
      </header>
      <Section variant="section" spacing="sm" className="rounded-xl">
        {md ? (
          <Prose>
            <FieldGuideMarkdown markdown={md} />
          </Prose>
        ) : (
          <EditorialEmptyState eyebrow="Section in progress" title={empty.title} tone="default">
            <p>{empty.body}</p>
          </EditorialEmptyState>
        )}
      </Section>
    </div>
  );
}
