"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const ORG_TYPES = ["Church", "Nonprofit", "Institution", "Network / denomination", "Other"];
const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];
const TIMELINES = ["Now", "This quarter", "This year", "Just exploring"];

const labelClass =
  "mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground";
const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)]";

/**
 * Safety-dashboard full enrollment (Ink Band utility surface). Collects org info
 * AND the contact person, then POSTs to `/api/agent-room/enroll`, which writes
 * `organization_inquiries` and notifies the team.
 */
export default function EnrollPage() {
  const [form, setForm] = React.useState({
    org_name: "",
    contact_name: "",
    email: "",
    org_type: ORG_TYPES[0],
    team_size: TEAM_SIZES[0],
    timeline: TIMELINES[0],
    budget_range: "",
    message: "",
  });
  const [status, setStatus] = React.useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.org_name.trim() || !form.contact_name.trim() || !EMAIL_RE.test(form.email.trim()) || !form.message.trim()) {
      setStatus("error");
      setErrorMsg("Fill in your organization, name, a valid email, and a sentence of context.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/agent-room/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          org_name: form.org_name.trim(),
          contact_name: form.contact_name.trim(),
          email: form.email.trim(),
          org_type: form.org_type,
          team_size: form.team_size,
          timeline: form.timeline,
          budget_range: form.budget_range.trim() || undefined,
          message: form.message.trim(),
        }),
      });
      if (!res.ok) {
        setStatus("error");
        setErrorMsg("Something went wrong. Try again, or email josh@movemental.ai.");
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
      <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
        <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
          Stage 01 · Safety · With us
        </p>
        <h1 className="text-4xl leading-tight md:text-5xl">Got it, {form.contact_name.split(/\s+/)[0]}.</h1>
        <p className="mt-8 text-lg leading-relaxed text-foreground">
          Your enrollment is in. We provision within 24 hours and a real person will be in touch to set up
          your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        Stage 01 · Safety · With us
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">Set up your dashboard.</h1>
      <p className="mt-8 text-lg leading-relaxed text-foreground">
        Tell us about your organization and who we’ll be working with. We provision within 24 hours.
      </p>

      <form className="mt-10 space-y-5" onSubmit={submit} noValidate>
        <label className="block">
          <span className={labelClass}>Organization</span>
          <input type="text" autoComplete="organization" value={form.org_name} onChange={set("org_name")} className={inputClass} />
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Your name</span>
            <input type="text" autoComplete="name" value={form.contact_name} onChange={set("contact_name")} className={inputClass} />
          </label>
          <label className="block">
            <span className={labelClass}>Email</span>
            <input type="email" autoComplete="email" inputMode="email" value={form.email} onChange={set("email")} className={inputClass} />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Organization type</span>
            <select value={form.org_type} onChange={set("org_type")} className={inputClass}>
              {ORG_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Team size</span>
            <select value={form.team_size} onChange={set("team_size")} className={inputClass}>
              {TEAM_SIZES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Timeline</span>
            <select value={form.timeline} onChange={set("timeline")} className={inputClass}>
              {TIMELINES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>Budget range <em>(optional)</em></span>
            <input type="text" value={form.budget_range} onChange={set("budget_range")} className={inputClass} placeholder="Optional" />
          </label>
        </div>
        <label className="block">
          <span className={labelClass}>Where your organization stands with AI</span>
          <textarea rows={4} value={form.message} onChange={set("message")} className={inputClass} placeholder="A sentence or two is plenty." />
        </label>

        {status === "error" && errorMsg ? <p className="text-sm text-destructive">{errorMsg}</p> : null}

        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting…" : "Set up my dashboard"}
        </Button>
        <p className="text-sm leading-relaxed text-muted-foreground">
          No autoresponder runaround — a person on our team picks this up.
        </p>
      </form>
    </div>
  );
}
