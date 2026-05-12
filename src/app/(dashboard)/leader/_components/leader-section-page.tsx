import Link from "next/link";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { FieldGuideMarkdown } from "@/components/field-guide/FieldGuideMarkdown";
import { Display } from "@/components/primitives/display";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Prose } from "@/components/primitives/prose";
import { Section } from "@/components/primitives/section";
import {
  editorialHome,
  editorialPreviewFromMarkdown,
  firstParagraphFromMarkdown,
} from "@/lib/authenticated/editorial-home";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import type { MovementLeaderDataJson } from "@/lib/movement-leaders/types";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

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
    const heroLede =
      firstParagraphFromMarkdown(md) ??
      "Movemental has not yet written the one-paragraph opening from your reflected understanding. When the generation pipeline fills reflected_understanding, it will appear here beneath your name.";

    return (
      <div className="flex flex-col">
        <section className={editorialHome.heroBand}>
          <p className={editorialHome.eyebrow}>Movement leader · Author reflection</p>
          <h1 className={cn(editorialHome.display, "mt-4 max-w-[min(100%,52rem)]")}>{leader.full_name}</h1>
          <p className={cn(editorialHome.lede, "mt-6")}>{heroLede}</p>
        </section>

        <div className={editorialHome.hairline} aria-hidden />

        <section className={editorialHome.bandGap}>
          <header className="flex flex-col gap-2">
            <p className={editorialHome.eyebrow}>Your reflection in seven parts</p>
            <h2 className={editorialHome.bandSubhead}>What the research surfaced</h2>
          </header>
          <ul className="list-none p-0">
            {LEADER_OVERVIEW_ROWS.map((row) => (
              <li key={row.href} className={editorialHome.rowWrap}>
                <Link href={row.href} className={cn(editorialHome.rowLink, editorialHome.rowInactive)}>
                  <span className={editorialHome.rowNum24}>{row.num}</span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className={editorialHome.rowTitle22}>{row.title}</span>
                    <span className={editorialHome.rowDesc14}>{row.previewFrom(leaderData)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className={cn(editorialHome.hairline, "mt-[clamp(2.5rem,6vw,4rem)]")} aria-hidden />

        <section className={editorialHome.bandGap}>
          <header className="flex flex-col gap-2">
            <p className={editorialHome.eyebrow}>Your public presence</p>
          </header>
          <div className="flex max-w-[42rem] flex-col gap-10">
            <div className="flex flex-col gap-3">
              <p className="font-serif text-[18px] italic leading-snug text-foreground">
                <Link href="/leader/sign-commitments" className={editorialHome.libraryLink}>
                  Sign the commitments
                </Link>
              </p>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                The commitments are the short, explicit statements Movemental asks movement leaders to sign before a
                public page goes live — a human checkpoint that keeps voice, integrity, and stewardship aligned with what
                the research surfaced about you.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-serif text-[18px] italic leading-snug text-foreground">
                <Link href="/leader/public-page" className={editorialHome.libraryLink}>
                  Your public page
                </Link>
              </p>
              <p className="text-[15px] leading-[1.7] text-muted-foreground">
                When you publish, Movemental exposes a single public profile — bio, proof, and the through-line of your
                work — so trusted voices have a canonical URL to send boards, publishers, and partners, without
                rebuilding a separate marketing site.
              </p>
            </div>
          </div>
        </section>

        <div className={cn(editorialHome.hairline, "mt-[clamp(2.5rem,6vw,4rem)]")} aria-hidden />

        <section id="reflected-essay" className={cn(editorialHome.bandGap, "pb-[clamp(3rem,8vw,5rem)]")}>
          <p className={editorialHome.eyebrow}>The full reflected essay</p>
          <div className="mt-6 max-w-[var(--prose-max)]">
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
        </section>
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
      <Section variant="section" spacing="sm" className="border-[0.5px] border-border-soft">
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
