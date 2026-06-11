"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AI_REALITY_INSTRUMENT_NAME } from "@/lib/ai-reality/types";

/**
 * Leader-facing panel to mint team-invite links for the
 * {@link AI_REALITY_INSTRUMENT_NAME}. Each link is a one-time-display hashed
 * token; teammates take the assessment anonymously and the dashboard aggregates.
 */
export function InviteManager() {
  const [links, setLinks] = React.useState<string[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  const createLink = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-reality/invite", { method: "POST" });
      const json = (await res.json()) as { data?: { url?: string }; error?: { code?: string } };
      if (!res.ok || !json.data?.url) {
        setError(
          json.error?.code === "UNAUTHENTICATED"
            ? "Please sign in first."
            : "Could not create a link. Try again.",
        );
      } else {
        setLinks((prev) => [json.data!.url!, ...prev]);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const copy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        {AI_REALITY_INSTRUMENT_NAME}
      </p>
      <h1 className="mt-3 text-3xl leading-tight md:text-4xl">Invite your leadership team.</h1>
      <p className="mt-4 text-base leading-relaxed text-foreground">
        Create a link for each person you want to weigh in. They answer the same eighteen questions , 
        anonymously, no account needed, and your dashboard updates as responses arrive. The disagreement
        between you is the most useful part.
      </p>

      <div className="mt-8">
        <Button type="button" onClick={createLink} disabled={busy}>
          {busy ? <Loader2 className="size-4 animate-spin" /> : "Create an invite link"}
        </Button>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>

      {links.length > 0 && (
        <ul className="mt-8 space-y-3">
          {links.map((url) => (
            <li
              key={url}
              className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
            >
              <code className="min-w-0 truncate text-sm text-foreground">{url}</code>
              <Button type="button" variant="outline" className="shrink-0" onClick={() => copy(url)}>
                {copied === url ? "Copied" : "Copy"}
              </Button>
            </li>
          ))}
          <li className="text-xs text-muted-foreground">
            These links are shown once. Copy and send each one before leaving this page.
          </li>
        </ul>
      )}
    </div>
  );
}
