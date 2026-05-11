"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

type GatePath = "safestart" | "attestation" | "review";
type Status = "idle" | "submitting" | "success" | "error";

const ATTESTATION_ITEMS = [
  "We have a written AI policy or statement that our leadership has reviewed.",
  "We have documented data handling standards governing what data may and may not be used with AI tools.",
  "We have decided where AI must not go in our work (named refusals, care boundaries, or equivalent).",
  "We have inventoried the AI tools currently in use across our staff.",
  "We have a plan for what we would do if an AI-related incident occurred.",
] as const;

const PATHS: ReadonlyArray<{
  value: GatePath;
  label: string;
  body: string;
}> = [
  {
    value: "safestart",
    label: "We completed SafeStart with Movemental.",
    body: "Enter the email used for your SafeStart engagement. We'll match it and send the guide right away.",
  },
  {
    value: "attestation",
    label: "We did the Safety work on our own.",
    body: "Attest that your organization has substantially completed the Safety work. Three of five marks the gate as open.",
  },
  {
    value: "review",
    label: "We did the work with another partner — please review.",
    body: "Briefly describe how your organization did the Safety work. Joshua will review and respond within one business day.",
  },
];

const labelClass =
  "block text-[11px] font-semibold uppercase tracking-eyebrow text-muted-foreground";

const inputClass =
  "w-full border-0 border-b border-input bg-transparent px-0 py-2 text-base text-foreground transition-colors " +
  "placeholder:text-muted-foreground/60 focus:border-b-2 focus:border-pathway-accent focus:outline-none focus:ring-0";

export function SandboxFieldGuideGate({
  className,
}: {
  className?: string;
}) {
  const [path, setPath] = useState<GatePath>("safestart");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [checks, setChecks] = useState<boolean[]>(() => ATTESTATION_ITEMS.map(() => false));
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const checkCount = useMemo(() => checks.filter(Boolean).length, [checks]);
  const attestationCleared = checkCount >= 3;

  function toggle(i: number) {
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();

    if (!email) {
      setError("Email is required.");
      setStatus("error");
      return;
    }
    if (!organization) {
      setError("Organization is required.");
      setStatus("error");
      return;
    }

    if (path === "attestation" && !attestationCleared) {
      setError(
        "Mark at least three of the five attestations, or switch to a different path below.",
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/toolkit-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          organization,
          source: `pathway-sandbox-field-guide:${path}`,
          fieldGuide: "sandbox",
          gatePath: path,
          metadata: {
            name: name || undefined,
            role: role || undefined,
            note: note || undefined,
            attestations: path === "attestation" ? ATTESTATION_ITEMS.filter((_, i) => checks[i]) : undefined,
            attestationCount: path === "attestation" ? checkCount : undefined,
            gatePath: path,
          },
        }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        setError(payload?.error?.message ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setChecks(ATTESTATION_ITEMS.map(() => false));
      setStatus("success");
      setSuccessMessage(
        path === "review"
          ? "Thanks. Joshua will review your note and respond within one business day."
          : path === "attestation"
            ? "Thank you for the attestation. Check your email for the Sandbox field guide."
            : "If your email matches a SafeStart engagement, the guide is on its way. If we cannot verify, Joshua will follow up.",
      );
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className={cn("w-full max-w-2xl", className)}>
      <fieldset className="mb-8" aria-label="Choose a path through the gate">
        <legend className="mb-3 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
          Choose your path
        </legend>
        <div className="grid gap-2">
          {PATHS.map((p) => {
            const active = path === p.value;
            return (
              <label
                key={p.value}
                className={cn(
                  "block cursor-pointer border p-4 transition-colors",
                  active
                    ? "border-pathway-accent bg-background"
                    : "border-border/40 bg-background/60 hover:border-pathway-accent/60",
                )}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="gate-path"
                    value={p.value}
                    checked={active}
                    onChange={() => {
                      setPath(p.value);
                      setStatus("idle");
                      setError(null);
                    }}
                    className="mt-1 accent-pathway-accent"
                  />
                  <div>
                    <p className="font-serif-display text-lg italic leading-snug text-foreground">
                      {p.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </fieldset>

      {status === "success" ? (
        <div className="border border-pathway-accent/40 bg-background p-6">
          <p className="font-serif-display text-xl italic text-foreground">{successMessage}</p>
          <button
            type="button"
            onClick={() => {
              setStatus("idle");
              setSuccessMessage(null);
            }}
            className="mt-6 text-[0.7rem] font-semibold uppercase tracking-eyebrow text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="sandbox-gate-name" className={labelClass}>
                Name
              </label>
              <input
                id="sandbox-gate-name"
                name="name"
                type="text"
                autoComplete="name"
                className={cn(inputClass, "mt-2")}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="sandbox-gate-email" className={labelClass}>
                Work email
              </label>
              <input
                id="sandbox-gate-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={cn(inputClass, "mt-2")}
                placeholder="name@organization.org"
              />
            </div>
            <div>
              <label htmlFor="sandbox-gate-org" className={labelClass}>
                Organization
              </label>
              <input
                id="sandbox-gate-org"
                name="organization"
                type="text"
                autoComplete="organization"
                required
                className={cn(inputClass, "mt-2")}
                placeholder="Church, nonprofit, or institution"
              />
            </div>
            <div>
              <label htmlFor="sandbox-gate-role" className={labelClass}>
                Role <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id="sandbox-gate-role"
                name="role"
                type="text"
                className={cn(inputClass, "mt-2")}
                placeholder="Director, pastor, board chair…"
              />
            </div>
          </div>

          {path === "attestation" ? (
            <fieldset className="border border-border/40 bg-background p-5">
              <legend className="px-1 text-[0.62rem] font-semibold uppercase tracking-eyebrow text-muted-foreground">
                Attestation — mark what&apos;s true
              </legend>
              <p className="mb-4 text-sm italic leading-relaxed text-muted-foreground">
                Before I receive the Sandbox field guide, I am attesting that my organization has done substantially the
                following work. Three of five opens the gate.
              </p>
              <ul className="space-y-3">
                {ATTESTATION_ITEMS.map((item, i) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-foreground">
                    <input
                      type="checkbox"
                      checked={checks[i]}
                      onChange={() => toggle(i)}
                      className="mt-1 accent-pathway-accent"
                      aria-label={item}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className={cn(
                  "mt-4 text-[0.7rem] font-semibold uppercase tracking-eyebrow",
                  attestationCleared ? "text-pathway-accent" : "text-muted-foreground",
                )}
              >
                {checkCount} of 5 marked · {attestationCleared ? "gate open" : "three needed"}
              </p>
              {!attestationCleared && checkCount > 0 ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  If you have fewer than three, start with the{" "}
                  <Link
                    href="/pathway/safety#field-guide"
                    className="text-foreground underline decoration-pathway-accent underline-offset-4 hover:decoration-2"
                  >
                    Safety field guide
                  </Link>{" "}
                  first.
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {path === "review" ? (
            <div>
              <label htmlFor="sandbox-gate-note" className={labelClass}>
                Tell us briefly how your organization has done the Safety work
              </label>
              <textarea
                id="sandbox-gate-note"
                name="note"
                rows={5}
                required
                className={cn(inputClass, "mt-2 resize-y border")}
                placeholder="What did you produce? Who facilitated it? Where does it live?"
              />
              <p className="mt-2 text-xs italic text-muted-foreground">
                Joshua will read this personally and respond within one business day.
              </p>
            </div>
          ) : null}

          {path === "safestart" ? (
            <p className="text-sm italic leading-relaxed text-muted-foreground">
              We&apos;ll match your email against our SafeStart records. If we can&apos;t verify, Joshua will follow up
              within one business day.
            </p>
          ) : null}

          {error ? (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-pill btn-pill--primary w-full justify-center bg-inverse-surface text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {status === "submitting"
              ? "Sending…"
              : path === "review"
                ? "Send for review"
                : "Read the Sandbox Field Guide"}
          </button>

          <p className="text-xs italic leading-relaxed text-muted-foreground">
            The Sandbox field guide is sequenced after Safety because the work it describes depends on Safety being
            substantially complete. Reading it without that foundation will frustrate you. We&apos;d rather you start where
            you are.
          </p>
        </form>
      )}
    </div>
  );
}
