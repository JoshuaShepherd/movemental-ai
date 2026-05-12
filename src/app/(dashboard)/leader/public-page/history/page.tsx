import type { Metadata } from "next";
import Link from "next/link";

import { EditorialEmptyState } from "@/components/authenticated/editorial-empty-state";
import { Button } from "@/components/ui/button";
import { getMovementLeaderByEmail } from "@/lib/movement-leaders/movement-leaders.server";
import { PUBLIC_PAGE_SNAPSHOT_KEYS, type PublicPageSnapshot } from "@/lib/movement-leaders/public-page-model";
import { listPublicPageVersions } from "@/lib/movement-leaders/public-page-ratification.server";
import { createClient } from "@/lib/supabase/server";

import { revertPublicPageFormAction } from "../actions";

export const metadata: Metadata = {
  title: "Public page history",
};

const FIELD_LABEL: Record<string, string> = {
  bio_short: "Bio (short)",
  bio_long: "Bio (long)",
  personal_piece: "Personal piece",
  frameworks_markdown: "Frameworks",
  organizational_footprint_markdown: "Organizational footprint",
  endorsements_markdown: "Endorsements",
};

function diffSnapshots(prev: PublicPageSnapshot | null, next: PublicPageSnapshot) {
  if (!prev) return null;
  const changes: { key: string; before: string; after: string }[] = [];
  for (const key of PUBLIC_PAGE_SNAPSHOT_KEYS) {
    const b = prev[key] ?? "";
    const a = next[key] ?? "";
    if (b !== a) {
      changes.push({ key, before: b || "—", after: a || "—" });
    }
  }
  return changes;
}

export default async function LeaderPublicPageHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const leader = await getMovementLeaderByEmail(user?.email ?? null);
  if (!leader) {
    return null;
  }

  const versions = await listPublicPageVersions(leader.id);
  const ordered = [...versions].sort((a, b) => b.version_number - a.version_number);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Trusted voices</p>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.5rem)] italic leading-tight tracking-tight text-foreground">
          Public page version history
        </h1>
        <p className="max-w-prose text-sm text-muted-foreground">
          Each save, publish, or revert creates a new row. Compare adjacent versions to see what changed, or revert a
          past version into a fresh draft on your preview workspace.
        </p>
        <Link href="/leader/public-page" className="text-sm font-medium text-foreground underline underline-offset-4">
          ← Back to public page
        </Link>
      </header>

      <ol className="flex flex-col gap-6">
        {ordered.map((v, idx) => {
          const older = ordered[idx + 1] ?? null;
          const changes = diffSnapshots(older?.snapshot ?? null, v.snapshot);
          return (
            <li key={v.id} className="border-[0.5px] border-border-soft bg-card p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    Version {v.version_number}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-medium capitalize">{v.status}</span>
                    <span className="text-muted-foreground"> · </span>
                    <time dateTime={v.created_at}>
                      {new Date(v.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                  </p>
                </div>
                <form action={revertPublicPageFormAction}>
                  <input type="hidden" name="versionId" value={v.id} />
                  <Button type="submit" variant="outline" size="sm">
                    Revert to this version
                  </Button>
                </form>
              </div>
              {changes?.length ? (
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer font-medium text-foreground">Changes vs previous version</summary>
                  <ul className="mt-3 space-y-4 border-t border-border-soft pt-4">
                    {changes.map((c) => (
                      <li key={c.key} className="grid gap-2 md:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                            {FIELD_LABEL[c.key] ?? c.key} — before
                          </p>
                          <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap bg-section p-3 text-xs text-muted-foreground">
                            {c.before}
                          </pre>
                        </div>
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                            {FIELD_LABEL[c.key] ?? c.key} — after
                          </p>
                          <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap bg-section p-3 text-xs text-muted-foreground">
                            {c.after}
                          </pre>
                        </div>
                      </li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </li>
          );
        })}
      </ol>

      {ordered.length === 0 ? (
        <EditorialEmptyState
          eyebrow="Version history"
          title="No recorded versions yet."
          tone="default"
          className="max-w-xl"
        >
          <p>
            When you record a preview on your public page, each milestone appears here so you can compare changes or
            return to an earlier shape of the work.
          </p>
        </EditorialEmptyState>
      ) : null}
    </div>
  );
}
