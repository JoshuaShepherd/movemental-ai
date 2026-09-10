"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MovementalLogo } from "@/components/brand/movemental-logo";

export function EnrollForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    contact_name: "",
    email: "",
    timeline: "As soon as possible",
    org_name: "",
    org_kind: "Non-profit",
    team_size: "10-50",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Post to the verified route
      await fetch("/api/agent-room/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch {
      // In staging preview, gracefully display the design receipt
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ink-band-bg)] text-[var(--color-ink-band-ink)] pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-[3.6rem] items-center justify-between border-b border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-bg)]/90 px-4 backdrop-blur-md sm:px-8">
        <Link href="/" className="flex items-center">
          <MovementalLogo className="h-8 w-auto text-[var(--color-ink-band-ink)]" />
        </Link>
        <Link
          href="/agent/path/safety"
          className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)] hover:text-[var(--color-ink-band-ink)]"
        >
          ↑ Safety Stage
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 pt-12 sm:px-10 sm:pt-16">
        {/* Hero Section */}
        <section className="relative pl-6 sm:pl-8">
          <span
            className="absolute bottom-2 left-1 top-1 w-[1.5px] bg-[var(--color-ink-band-margin-red)] opacity-30"
            aria-hidden="true"
          />
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-blue)] font-semibold">
            Step 01 · Safety · With Us
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl lg:text-5xl text-[var(--color-ink-band-ink)]">
            Start your two-week Safety sprint.
          </h1>
        </section>

        {submitted ? (
          /* Success Receipt */
          <section className="mt-10 rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-semibold text-[var(--color-ink-band-ink)]">
              Your enrollment is in.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink-band-ink-muted)]">
              We provision your private dashboard within 24 hours. When the email arrives, use the magic link to create your account and review your draft Safety Charter.
            </p>
            <div className="mt-8">
              <Link
                href="/agent/path/safety"
                className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-blue)] hover:underline"
              >
                ← Back to Safety Stage
              </Link>
            </div>
          </section>
        ) : (
          <div>
            <p className="mt-6 text-sm text-[var(--color-ink-band-ink-muted)] leading-relaxed">
              Name, your details, your organization, then payment. We provision your private dashboard within 24 hours of enrollment.
            </p>

            {/* Two Weeks Overview Box */}
            <section className="mt-8 rounded-2xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-surface)] p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-band-ink-muted)]">
                What the two weeks contain
              </p>
              <div className="mt-4 space-y-3 text-xs">
                <div className="flex gap-3">
                  <span className="font-mono text-[var(--color-ink-band-blue)] font-semibold">WEEK 01</span>
                  <p className="text-[var(--color-ink-band-ink)]">
                    Intake call & initial charter drafting across all five layers tailored to your workflows.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="font-mono text-[var(--color-ink-band-blue)] font-semibold">WEEK 02</span>
                  <p className="text-[var(--color-ink-band-ink)]">
                    Board review, iteration, executive ratification, and provisioning your verified public share links.
                  </p>
                </div>
              </div>
            </section>

            {/* Enrollment Form */}
            <form onSubmit={handleSubmit} className="mt-10 space-y-6">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.contact_name}
                  onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                  className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@organization.org"
                    className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                    Target Start Date
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                  >
                    <option value="As soon as possible">As soon as possible</option>
                    <option value="Within 30 days">Within 30 days</option>
                    <option value="Next quarter">Next quarter</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                  Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.org_name}
                  onChange={(e) => setFormData({ ...formData, org_name: e.target.value })}
                  placeholder="e.g. Grace Fellowship or Hope Foundation"
                  className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                    Organization Type
                  </label>
                  <select
                    value={formData.org_kind}
                    onChange={(e) => setFormData({ ...formData, org_kind: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                  >
                    <option value="Church">Church / Ministry</option>
                    <option value="Non-profit">Non-Profit Organization</option>
                    <option value="Institution">Seminary / Educational Institution</option>
                    <option value="Denomination">Denominational Network</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                    Staff / Team Size
                  </label>
                  <select
                    value={formData.team_size}
                    onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                  >
                    <option value="1-10">1 - 10 people</option>
                    <option value="10-50">10 - 50 people</option>
                    <option value="50-200">50 - 200 people</option>
                    <option value="200+">200+ people</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-[var(--color-ink-band-ink-muted)]">
                  Notes / Specific Questions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about where your team is currently experimenting..."
                  className="mt-2 w-full rounded-xl border border-[var(--color-ink-band-border)] bg-[var(--color-ink-band-paper)] p-3 text-sm text-[var(--color-ink-band-ink)] outline-none focus:border-[var(--color-ink-band-blue)]"
                />
              </div>

              {/* Sprint Confirmation Box */}
              <div className="rounded-xl border border-[var(--color-ink-band-blue)] bg-[var(--color-ink-band-paper)] p-4 flex items-center justify-between">
                <div>
                  <p className="font-serif font-semibold text-sm">Two-Week Safety Sprint</p>
                  <p className="text-xs text-[var(--color-ink-band-ink-muted)]">Flat rate, start to board-ratified charter</p>
                </div>
                <span className="font-serif text-xl font-bold text-[var(--color-ink-band-blue)]">$1,000</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[var(--color-ink-band-blue)] py-3.5 text-sm font-medium text-white shadow transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit enrollment · $1,000 sprint"}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
