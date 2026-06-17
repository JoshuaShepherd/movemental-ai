"use client";

import * as React from "react";
import { LogOut, ScrollText, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { CharterDashboardPayload } from "@/lib/services/safety/charter-dashboard";

type Props = {
  payload: CharterDashboardPayload;
  userEmail?: string | null;
};

function orgShortName(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "ORG";
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function CharterDashboardShell({ payload, userEmail }: Props) {
  const [activeLayer, setActiveLayer] = React.useState(
    payload.charter.layers[0]?.artifact.slug ?? "overview",
  );

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const { organization, charter } = payload;
  const statusLabel =
    charter.overallStatus === "published"
      ? "Published"
      : `Draft, ${charter.layersComplete} of ${charter.layerCount} layers complete`;

  const active = charter.layers.find((l) => l.artifact.slug === activeLayer);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col md:flex-row">
      <aside className="flex w-full flex-col border-b border-border bg-card md:w-64 md:border-b-0 md:border-r">
        <div className="border-b border-border px-5 py-6">
          <div
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-ink-band-blue)] font-mono text-xs font-medium text-primary-foreground"
            aria-hidden
          >
            {orgShortName(organization.name)}
          </div>
          <p className="font-medium leading-snug text-foreground">{organization.name}</p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
            Safety · Charter dashboard
          </p>
        </div>

        <nav className="flex-1 px-3 py-4" aria-label="Charter layers">
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                onClick={() => setActiveLayer("overview")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  activeLayer === "overview"
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 shrink-0" aria-hidden />
                Overview
              </button>
            </li>
            {charter.layers.map((layer) => (
              <li key={layer.artifact.id}>
                <button
                  type="button"
                  onClick={() => setActiveLayer(layer.artifact.slug)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    activeLayer === layer.artifact.slug
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  <ScrollText className="h-4 w-4 shrink-0" aria-hidden />
                  {layer.artifact.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-5 py-4">
          {userEmail ? (
            <p className="mb-3 truncate text-xs text-muted-foreground">{userEmail}</p>
          ) : null}
          <Button type="button" variant="ghost" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" aria-hidden />
            Sign out
          </Button>
          <a
            href="mailto:josh@movemental.ai"
            className="mt-2 block text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            Help
          </a>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-border px-6 py-4 md:px-8">
          <h1 className="text-xl font-medium tracking-tight md:text-2xl">
            {activeLayer === "overview" ? "Overview" : active?.artifact.title ?? "Charter"}
          </h1>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
            {statusLabel}
          </p>
        </header>

        <main className="flex-1 px-6 py-8 md:px-8">
          {activeLayer === "overview" ? (
            <div className="mx-auto max-w-3xl space-y-8">
              <p className="text-lg leading-relaxed text-foreground">
                Operational status for your AI Charter, searchable, ratifiable, and ready to roll out
                to staff.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-border bg-card p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                    AI Charter
                  </p>
                  <p className="mt-2 text-lg font-medium">{statusLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Five layers · board-ratifiable document
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                    Organization
                  </p>
                  <p className="mt-2 text-lg font-medium">{organization.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Slug: {organization.slug}</p>
                </div>
              </div>
              <div className="rounded-lg border border-[var(--color-ink-band-blue)]/30 bg-[var(--color-ink-band-blue)]/5 p-5">
                <p className="font-medium">Prepare board ratification</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Review each charter layer, finalize drafts, and publish when your leadership team is
                  ready.
                </p>
                {charter.layers[0] ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setActiveLayer(charter.layers[0].artifact.slug)}
                  >
                    Open Charter
                  </Button>
                ) : null}
              </div>
            </div>
          ) : active ? (
            <article className="mx-auto max-w-3xl">
              <p className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
                {active.artifact.kind.replace(/_/g, " ")} · {active.artifact.status}
              </p>
              {active.latestVersion?.body_md ? (
                <div
                  className="prose prose-sm max-w-none text-foreground prose-headings:font-medium prose-p:leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: active.latestVersion.body_md }}
                />
              ) : (
                <p className="text-muted-foreground">No draft body yet.</p>
              )}
            </article>
          ) : (
            <p className="text-muted-foreground">Layer not found.</p>
          )}
        </main>
      </div>
    </div>
  );
}
