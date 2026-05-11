import Link from "next/link";

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

  const md = sectionMarkdown(leader.movement_leader_data, section);

  if (section === "overview") {
    return (
      <div className="space-y-10">
        <header className="space-y-3">
          <Eyebrow>Author reflection</Eyebrow>
          <Display as="h1" size="md" className="text-balance">
            Reflected understanding
          </Display>
          <p className="max-w-(--prose-max) text-muted-foreground">
            A seven-section view of how Movemental reads your public corpus back to you. Stitch
            templates will replace this chrome when they land; until then, corpus sync and
            generated fields populate each section from `movement_leader_data`.
          </p>
        </header>
        <Section variant="section" spacing="sm" className="rounded-xl">
          <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground">
            Full essay
          </h2>
          <div className="mt-6">
            {md ? (
              <Prose>
                <FieldGuideMarkdown markdown={md} />
              </Prose>
            ) : (
              <Prose>
                <p>
                  No reflected essay is stored yet for your profile. After migrations, run{" "}
                  <code className="text-foreground">pnpm leader:sync-corpus</code> to pull research
                  files into structured JSON, or wait for the generation pipeline to populate this
                  field.
                </p>
              </Prose>
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
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {SECTION_COPY[key].intro}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    );
  }

  const meta = SECTION_COPY[section];

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
          <Prose>
            <p>
              No draft copy for this section yet. It will appear here once generation or manual
              authoring fills <code className="text-foreground">movement_leader_data.{String(meta.dataKey)}</code>.
            </p>
          </Prose>
        )}
      </Section>
    </div>
  );
}
