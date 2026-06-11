"use client";

import Link from "next/link";
import * as React from "react";
import { useSearchParams } from "next/navigation";

import { SafetyHandbookCover } from "@/components/field-guide/safety-handbook-cover";
import { Button } from "@/components/ui/button";
import {
  FIELD_GUIDE_PAGE_COPY,
  resolveFieldGuideKind,
  type FieldGuideKind,
} from "@/lib/field-guide-page";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const labelClass =
  "mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground";
const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)]";

function MetaStrip({ items }: { items: string[] }) {
  return (
    <div
      className="my-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-border py-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground"
      aria-label="Field guide details"
    >
      {items.map((label, i) => (
        <React.Fragment key={label}>
          {i > 0 ? (
            <span className="text-muted-foreground/40" aria-hidden>
              ·
            </span>
          ) : null}
          <span>{label}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

function FieldGuideForm({ guide }: { guide: FieldGuideKind }) {
  const copy = FIELD_GUIDE_PAGE_COPY[guide];

  const [email, setEmail] = React.useState("");
  const [org, setOrg] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
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
      const data = (await res.json().catch(() => null)) as {
        error?: { message?: string };
      } | null;
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(
          data?.error?.message ??
            (res.status === 429
              ? "Too many attempts. Please wait a bit and try again."
              : "Something went wrong. Try again, or email josh@movemental.ai."),
        );
        return;
      }
      setStatus("done");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again, or email josh@movemental.ai.");
    }
  };

  if (status === "done") {
    return (
      <p className="mt-10 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-base leading-relaxed">
        {copy.success}
      </p>
    );
  }

  return (
    <form className="mt-10 space-y-5" onSubmit={submit} noValidate id="download">
      <label className="block">
        <span className={labelClass}>Email</span>
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className={inputClass}
        />
      </label>
      <label className="block">
        <span className={labelClass}>
          Organization <em className="normal-case tracking-normal">(optional)</em>
        </span>
        <input
          type="text"
          autoComplete="organization"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          className={inputClass}
        />
      </label>

      {status === "error" && errorMsg ? (
        <p className="text-sm text-destructive">{errorMsg}</p>
      ) : null}

      <Button type="submit" disabled={status === "loading"}>
        {status === "loading"
          ? "Sending…"
          : guide === "safety"
            ? "Send me the Handbook"
            : "Send me the field guide"}
      </Button>
      <p className="text-sm leading-relaxed text-muted-foreground">
        We send the PDF immediately and one follow-up email a week later. Unsubscribe anytime.
      </p>
      <p className="text-sm text-muted-foreground">
        Prefer a file right now?{" "}
        <a
          href={copy.pdfPath}
          download={copy.pdfFilename}
          className="text-[var(--color-ink-band-blue)] underline underline-offset-4"
        >
          Download the PDF
        </a>
      </p>
    </form>
  );
}

function UtilityFooter() {
  return (
    <nav
      aria-label="Field guide help"
      className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-8 text-sm text-muted-foreground"
    >
      <Link href="/agent" className="transition-colors hover:text-foreground">
        Back to the agent room
      </Link>
      <span aria-hidden className="text-muted-foreground/40">
        ·
      </span>
      <Link href="/enroll" className="transition-colors hover:text-foreground">
        Set up your dashboard
      </Link>
      <span aria-hidden className="text-muted-foreground/40">
        ·
      </span>
      <a href="mailto:josh@movemental.ai" className="transition-colors hover:text-foreground">
        Questions?
      </a>
    </nav>
  );
}

export function FieldGuidePageContent() {
  const params = useSearchParams();
  const guide = resolveFieldGuideKind(params.get("guide"));
  const copy = FIELD_GUIDE_PAGE_COPY[guide];

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        {copy.eyebrow}
      </p>
      {guide === "safety" ? (
        <SafetyHandbookCover className="mb-8" priority sizes="(max-width: 640px) 72vw, 280px" />
      ) : null}
      <h1 className="text-4xl leading-tight md:text-5xl">{copy.title}</h1>
      <p className="mt-8 text-lg leading-relaxed text-foreground">{copy.lede}</p>

      <MetaStrip items={copy.meta} />

      <section aria-labelledby="field-guide-inside-heading">
        <h2 id="field-guide-inside-heading" className="text-2xl leading-snug md:text-3xl">
          {copy.insideHeading}
        </h2>
        <ul className="mt-8 space-y-4">
          {copy.inside.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-card px-5 py-4"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-base font-medium text-foreground">{item.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <FieldGuideForm guide={guide} />

      <p className="mt-10 text-sm text-muted-foreground">
        Also available:{" "}
        <Link
          href={copy.otherGuide.href}
          className="text-[var(--color-ink-band-blue)] underline underline-offset-4"
        >
          {copy.otherGuide.label}
        </Link>
      </p>

      <UtilityFooter />
    </div>
  );
}
