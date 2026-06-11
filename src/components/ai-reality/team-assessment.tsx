"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

import { LikertScale } from "@/components/assessment/likert-scale";
import { Button } from "@/components/ui/button";
import {
  computeSsssIntegrityResult,
  SSSS_INTEGRITY_ITEMS,
} from "@/lib/ssss-integrity-assessment";
import { AI_REALITY_INSTRUMENT_NAME } from "@/lib/ai-reality/types";

const TOTAL = SSSS_INTEGRITY_ITEMS.length;

function stripBold(s: string) {
  return s.replace(/\*\*/g, "");
}

/**
 * Teammate entry to the Organizational AI Reality Assessment via a hashed team
 * invite token. No login. Submits anonymously against the invite + org; the
 * leader's dashboard aggregates the responses. Single-scroll form.
 */
export function TeamAssessment({ token, organizationName }: { token: string; organizationName: string }) {
  const [name, setName] = React.useState("");
  const [scores, setScores] = React.useState<(number | null)[]>(
    Array.from({ length: TOTAL }, () => null),
  );
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const answered = scores.filter((s) => s !== null).length;
  const complete = answered === TOTAL && name.trim().length > 0;

  const setScoreAt = (i: number, z: number) =>
    setScores((prev) => {
      const next = [...prev];
      next[i] = z + 1;
      return next;
    });

  const submit = async () => {
    if (!complete) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/ai-reality/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, scores, displayName: name.trim() }),
      });
      const json = (await res.json()) as { success?: boolean; error?: { message?: string } };
      if (!res.ok) {
        setError(json.error?.message ?? "Could not save your response.");
      } else {
        setDone(true);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    const result = computeSsssIntegrityResult(scores as number[]);
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-20">
        <h1 className="text-3xl leading-tight">Thank you — your response is in.</h1>
        <p className="mt-4 text-base text-muted-foreground">
          Your answers are now part of {organizationName}&apos;s picture. Your own quick read:
        </p>
        <ul className="mt-6 space-y-2 text-sm">
          {(["Safety", "Sandbox", "Skills", "Solutions"] as const).map((s) => (
            <li key={s} className="flex justify-between border-b border-border py-2">
              <span className="font-medium text-foreground">{s}</span>
              <span className="tabular-nums text-muted-foreground">{result.stagePercents[s]}%</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Only your leadership sees the combined dashboard. You can close this page.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12 md:py-16">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
        {AI_REALITY_INSTRUMENT_NAME}
      </p>
      <h1 className="mt-3 text-3xl leading-tight md:text-4xl">
        {organizationName} asked you to weigh in.
      </h1>
      <p className="mt-4 text-base leading-relaxed text-foreground">
        Eighteen honest statements about how your organization actually works with AI. Answer how true
        each feels — there are no right answers. About 8–12 minutes. Your individual answers stay private;
        only the combined picture is shared with your leadership.
      </p>

      <label className="mt-8 block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Your name</span>
        <input
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-(--color-ink-band-blue)"
          placeholder="So your leader knows who answered"
        />
      </label>

      <ol className="mt-10 space-y-10">
        {SSSS_INTEGRITY_ITEMS.map((item, i) => {
          const v = scores[i];
          return (
            <li key={item.id}>
              <p className="text-base font-medium leading-snug text-foreground">
                <span className="mr-2 text-muted-foreground">{i + 1}.</span>
                {stripBold(item.prompt)}
              </p>
              <div className="mt-4">
                <LikertScale
                  name={item.id}
                  value={v === null || v === undefined ? null : v - 1}
                  onChange={(z) => setScoreAt(i, z)}
                />
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-10 border-t border-border pt-6">
        <p className="mb-3 text-sm text-muted-foreground">
          {answered} of {TOTAL} answered{name.trim() ? "" : " · add your name to submit"}
        </p>
        <Button type="button" disabled={!complete || submitting} onClick={submit}>
          {submitting ? <Loader2 className="size-4 animate-spin" /> : "Submit my answers"}
        </Button>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
