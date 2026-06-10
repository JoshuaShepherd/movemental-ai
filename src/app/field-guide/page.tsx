"use client";

import * as React from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

const GUIDES = {
  safety: {
    eyebrow: "Field guide · It Starts With Safety",
    title: "Get safe with AI first.",
    lede: "The practical first-stage field guide for leaders who need to move on AI without eroding the trust they spent decades earning.",
    success: "Check your inbox — the Safety field guide is on its way.",
  },
  sandbox: {
    eyebrow: "Field guide · It Continues With Exploration",
    title: "Explore AI, safely.",
    lede: "The second-stage field guide: how to run real experiments with AI once your guardrails are in place.",
    success: "Check your inbox — the Exploration field guide is on its way.",
  },
} as const;

type GuideKey = keyof typeof GUIDES;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function FieldGuideForm() {
  const params = useSearchParams();
  const guide: GuideKey = params.get("guide") === "sandbox" ? "sandbox" : "safety";
  const copy = GUIDES[guide];

  const [email, setEmail] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/toolkit-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          organization: org.trim() || undefined,
          fieldGuide: guide,
          source: "field-guide-page",
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        {copy.eyebrow}
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">{copy.title}</h1>
      <p className="mt-8 text-lg leading-relaxed text-foreground">{copy.lede}</p>

      {status === "done" ? (
        <p className="mt-10 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-base leading-relaxed">
          {copy.success}
        </p>
      ) : (
        <form className="mt-10 space-y-5" onSubmit={submit} noValidate>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
              Organization <em>(optional)</em>
            </span>
            <input
              type="text"
              autoComplete="organization"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)]"
            />
          </label>

          {status === "error" ? (
            <p className="text-sm text-destructive">
              Enter a valid email and try again. If it keeps failing, email josh@movemental.ai.
            </p>
          ) : null}

          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Send me the field guide"}
          </Button>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We’ll email the PDF and an occasional follow-up. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}

export default function FieldGuidePage() {
  return (
    <Suspense fallback={null}>
      <FieldGuideForm />
    </Suspense>
  );
}
