import Link from "next/link";

import { loadPhase03ExperimentingData } from "@/lib/sandboxlive/phase-03-experimenting.server";
import {
  RECIPE_CATALOG,
  type SandboxLiveRecipe,
} from "@/lib/sandboxlive/recipe-catalog";

function recipeBySlug(slug: string | undefined): SandboxLiveRecipe | undefined {
  if (!slug) return undefined;
  return RECIPE_CATALOG.find((r) => r.slug === slug);
}

function formatActivity(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function libraryHref(orgQuery: string, recipeSlug?: string): string {
  const base = `/sandboxlive/recipes${orgQuery}`;
  if (!recipeSlug) return base;
  const sep = orgQuery.startsWith("?") ? "&" : "?";
  return `${base}${sep}recipe=${encodeURIComponent(recipeSlug)}`;
}

export async function SandboxLivePhase03ExperimentingView({
  userId,
  orgSlug,
  orgQuery,
}: {
  userId: string;
  orgSlug: string | undefined;
  orgQuery: string;
}) {
  const data = await loadPhase03ExperimentingData(userId, orgSlug);
  if (!data) {
    return (
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-12">
        <p className="text-[15px] leading-relaxed text-safestart-muted">
          Select an organization from your dashboard context to load cohort
          experiment data.
        </p>
      </section>
    );
  }

  const suggested = RECIPE_CATALOG.slice(0, 3);
  const activeRows =
    data.recipeMilestones.length > 0
      ? data.recipeMilestones.map((m, i) => {
          const recipe = recipeBySlug(m.recipeSlug);
          return {
            key: `${m.recipeSlug ?? "row"}-${m.owner ?? ""}-${i}`,
            title: recipe?.title ?? m.recipeSlug ?? "Untitled recipe",
            slug: m.recipeSlug,
            status: m.status ?? "In testing",
            owner: m.owner ?? "Unassigned",
            lastActivity: formatActivity(m.lastActivity),
            hasRecipe: Boolean(recipe),
          };
        })
      : suggested.map((r) => ({
          key: r.slug,
          title: r.title,
          slug: r.slug,
          status: "Suggested starting point",
          owner: data.organizationName,
          lastActivity: "—",
          hasRecipe: true,
        }));

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-0 px-6 py-12 md:px-12">
      <div className="border-t border-safestart-hairline pt-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          Phase body
        </p>
        <h2 className="mt-3 font-serif text-[clamp(1.5rem,3vw,1.875rem)] italic leading-tight text-safestart-ink">
          What experimenting produces here
        </h2>
        <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-safestart-muted">
          Small, bounded trials against real work — each one named as a recipe,
          owned by someone in the cohort, and logged so the group can refuse,
          refine, or graduate it together.
        </p>
        {data.engagementSummary ? (
          <div className="mt-6 max-w-[680px] border-l-2 border-pathway-accent pl-5 text-[14px] leading-relaxed text-safestart-ink">
            <span className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
              Cohort note
            </span>
            <p className="mt-2 whitespace-pre-wrap text-safestart-muted [&>strong]:text-safestart-ink">
              {data.engagementSummary}
            </p>
          </div>
        ) : null}
      </div>

      <div className="my-10 border-t border-safestart-hairline" aria-hidden />

      <section className="flex flex-col gap-6" aria-labelledby="active-recipes-heading">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
            Active recipes
          </p>
          <h2
            id="active-recipes-heading"
            className="font-serif text-[clamp(1.35rem,2.5vw,1.5rem)] italic leading-tight text-safestart-ink"
          >
            What the cohort is testing right now
          </h2>
          <p className="max-w-[680px] text-[14px] leading-relaxed text-safestart-muted">
            {data.recipeMilestones.length > 0
              ? "Rows mirror milestones on your organization engagement record. Open any recipe in the library for the full working document."
              : "No active recipes are recorded on your engagement yet. Below are three high-leverage starting recipes your cohort can adopt first — assign an owner in your program data when you begin."}
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-safestart-hairline border border-safestart-hairline bg-safestart-bg">
          {activeRows.map((row) => (
            <li key={row.key} className="flex flex-col gap-3 px-5 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
              <div className="min-w-0 flex-1">
                <h3 className="font-serif text-[18px] italic leading-snug text-safestart-ink">
                  {row.title}
                </h3>
                <p className="mt-2 text-[12px] uppercase tracking-[0.06em] text-safestart-muted">
                  <span className="font-medium text-pathway-accent">{row.status}</span>
                  <span aria-hidden className="mx-2 text-safestart-hairline">
                    ·
                  </span>
                  Owner{" "}
                  <span className="font-medium text-safestart-ink">{row.owner}</span>
                  <span aria-hidden className="mx-2 text-safestart-hairline">
                    ·
                  </span>
                  Last activity{" "}
                  <span className="font-medium text-safestart-ink">{row.lastActivity}</span>
                </p>
              </div>
              {row.slug && row.hasRecipe ? (
                <Link
                  href={libraryHref(orgQuery, row.slug)}
                  className="shrink-0 text-[13px] font-medium text-pathway-accent underline decoration-pathway-accent/40 underline-offset-4 transition-colors hover:decoration-pathway-accent"
                >
                  Recipe detail →
                </Link>
              ) : row.slug ? (
                <span className="shrink-0 text-[12px] text-safestart-muted">
                  Slug not in catalog
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <div className="my-10 border-t border-safestart-hairline" aria-hidden />

      <section className="flex flex-col gap-4 rounded-none border border-safestart-hairline bg-section/40 p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
          Recipe library
        </p>
        <h2 className="font-serif text-[clamp(1.35rem,2.5vw,1.5rem)] italic leading-tight text-safestart-ink">
          Add a new recipe to your testing
        </h2>
        <p className="max-w-[680px] text-[14px] leading-relaxed text-safestart-muted">
          Open the full library, filter by function and sensitivity, and pull a
          recipe into the cohort&rsquo;s working set. Cohort-scoped entries appear
          alongside the public catalog as your engagement matures.
        </p>
        <Link
          href={`/sandboxlive/recipes${orgQuery}`}
          className="inline-flex w-fit items-center border border-safestart-hairline bg-card px-5 py-2.5 text-[13px] font-medium text-safestart-ink transition-colors hover:border-pathway-accent hover:text-pathway-accent"
        >
          Browse recipes for this cohort →
        </Link>
      </section>

      <div className="my-10 border-t border-safestart-hairline" aria-hidden />

      <section className="flex flex-col gap-6" aria-labelledby="recordings-heading">
        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-pathway-accent">
            Recordings
          </p>
          <h2
            id="recordings-heading"
            className="font-serif text-[clamp(1.35rem,2.5vw,1.5rem)] italic leading-tight text-safestart-ink"
          >
            Structured experiment logs
          </h2>
          <p className="max-w-[680px] text-[14px] leading-relaxed text-safestart-muted">
            Each cohort member keeps a short record of results, learnings, and
            iterations. Entries are stored on the Phase 03 engagement row as
            milestones with{" "}
            <code className="rounded bg-card px-1 text-[12px] text-safestart-ink">
              kind: &quot;experiment_recording&quot;
            </code>
            .
          </p>
        </div>

        {data.recordingMilestones.length === 0 ? (
          <p className="border border-dashed border-safestart-hairline bg-card/60 px-6 py-8 text-[14px] leading-relaxed text-safestart-muted">
            No experiment recordings yet. When leaders log attempts, they appear
            here as an editorial ledger the cohort can read before retro or
            ethics phases.
          </p>
        ) : (
          <ul className="flex flex-col gap-6">
            {data.recordingMilestones.map((rec, i) => (
              <li
                key={`${rec.author ?? "r"}-${rec.updatedAt ?? i}`}
                className="border-l-2 border-pathway-accent pl-5"
              >
                <p className="text-[12px] uppercase tracking-[0.06em] text-safestart-muted">
                  {(rec.author ?? "Author unknown")}
                  {rec.organizationName ? (
                    <>
                      <span aria-hidden> · </span>
                      {rec.organizationName}
                    </>
                  ) : null}
                  {rec.updatedAt ? (
                    <>
                      <span aria-hidden> · </span>
                      {formatActivity(rec.updatedAt)}
                    </>
                  ) : null}
                </p>
                {rec.results ? (
                  <p className="mt-2 text-[14px] leading-relaxed text-safestart-ink">
                    <span className="font-medium text-pathway-accent">Results · </span>
                    {rec.results}
                  </p>
                ) : null}
                {rec.learnings ? (
                  <p className="mt-2 text-[14px] leading-relaxed text-safestart-muted">
                    <span className="font-medium text-safestart-ink">Learnings · </span>
                    {rec.learnings}
                  </p>
                ) : null}
                {rec.iterations ? (
                  <p className="mt-2 text-[14px] leading-relaxed text-safestart-muted">
                    <span className="font-medium text-safestart-ink">Iterations · </span>
                    {rec.iterations}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}

        {data.cohortPeers.length > 1 ? (
          <div className="border-t border-safestart-hairline pt-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-safestart-muted">
              Cohort roster
            </p>
            <ul className="mt-3 flex flex-col gap-2 text-[14px] text-safestart-muted">
              {data.cohortPeers.map((p) => (
                <li key={p.organizationId}>
                  <span className="font-medium text-safestart-ink">
                    {p.leaderName ?? p.organizationName}
                  </span>
                  {p.leaderRole ? (
                    <span className="text-safestart-muted"> — {p.leaderRole}</span>
                  ) : null}
                  <span className="text-safestart-muted"> · {p.organizationName}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
    </div>
  );
}
