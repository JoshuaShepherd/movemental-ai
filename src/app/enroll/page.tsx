"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { StepSpine } from "@/components/ink-band/step-spine";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const ORG_TYPES = ["Church", "Nonprofit", "Institution", "Network / denomination", "Other"];
const TEAM_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"];
const TIMELINES = ["Now", "This quarter", "This year", "Just exploring"];

const labelClass =
  "mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground";
const sectionClass =
  "font-mono text-[0.66rem] uppercase tracking-[0.13em] text-muted-foreground";
const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)]";

/**
 * Safety-dashboard full enrollment (Ink Band utility surface). Collects name,
 * individual and organizational information, then Stripe payment for the managed
 * Safety sprint. POSTs to `/api/agent-room/enroll` and notifies the team.
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
      setErrorMsg("Fill in your name, email, organization, and a sentence of context.");
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
        <StepSpine
          step="01"
          label="Safety · With us"
          title={`Got it, ${form.contact_name.split(/\s+/)[0]}.`}
        />
        <p className="mt-8 text-lg leading-relaxed text-foreground">
          Your enrollment is in. We provision within 24 hours and a real person will be in touch to set up
          your dashboard and complete payment if needed.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <StepSpine step="01" label="Safety · With us" title="Get started with the dashboard." />

      <p className="mt-8 text-lg leading-relaxed text-foreground">
        Name, your details, your organization, then payment. We provision your private dashboard within 24
        hours of enrollment.
      </p>

      <form className="mt-10 space-y-10" onSubmit={submit} noValidate>
        <section className="space-y-4" aria-labelledby="enroll-name">
          <h2 id="enroll-name" className={sectionClass}>
            Name
          </h2>
          <label className="block">
            <span className={labelClass}>Your full name</span>
            <input
              type="text"
              autoComplete="name"
              value={form.contact_name}
              onChange={set("contact_name")}
              className={inputClass}
            />
          </label>
        </section>

        <section className="space-y-4" aria-labelledby="enroll-individual">
          <h2 id="enroll-individual" className={sectionClass}>
            Individual information
          </h2>
          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={set("email")}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className={labelClass}>When do you want to start?</span>
            <select value={form.timeline} onChange={set("timeline")} className={inputClass}>
              {TIMELINES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="space-y-4" aria-labelledby="enroll-org">
          <h2 id="enroll-org" className={sectionClass}>
            Organizational information
          </h2>
          <label className="block">
            <span className={labelClass}>Organization</span>
            <input
              type="text"
              autoComplete="organization"
              value={form.org_name}
              onChange={set("org_name")}
              className={inputClass}
            />
          </label>
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
          <label className="block">
            <span className={labelClass}>Budget range <em>(optional)</em></span>
            <input
              type="text"
              value={form.budget_range}
              onChange={set("budget_range")}
              className={inputClass}
              placeholder="Optional"
            />
          </label>
          <label className="block">
            <span className={labelClass}>Where your organization stands with AI</span>
            <textarea
              rows={4}
              value={form.message}
              onChange={set("message")}
              className={inputClass}
              placeholder="A sentence or two is plenty."
            />
          </label>
        </section>

        <section className="space-y-4 rounded-lg border border-border bg-card p-5" aria-labelledby="enroll-payment">
          <h2 id="enroll-payment" className={sectionClass}>
            Stripe payment
          </h2>
          <p className="text-base leading-relaxed text-foreground">
            <span className="font-semibold">$1,000</span>
            <span className="text-muted-foreground"> · two weeks · managed Safety sprint</span>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Secure payment is collected via Stripe. Submit your details below — our team confirms enrollment
            and sends a Stripe payment link to complete checkout.
          </p>
        </section>

        {status === "error" && errorMsg ? <p className="text-sm text-destructive">{errorMsg}</p> : null}

        <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Submitting…" : "Get started with the dashboard · $1,000"}
        </Button>
        <p className="text-sm leading-relaxed text-muted-foreground">
          No autoresponder runaround — a person on our team picks this up.
        </p>
      </form>
    </div>
  );
}
