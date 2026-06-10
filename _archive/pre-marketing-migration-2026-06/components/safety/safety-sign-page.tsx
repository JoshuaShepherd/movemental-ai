"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

const ORG_SUMMARY = "Acme Nonprofit";
const CONTACT_SUMMARY = "Jane Doe, Executive Director";

function TypewriterField({
  label,
  className,
  ...inputProps
}: React.ComponentProps<"input"> & { label: string }) {
  return (
    <div className="relative pt-6">
      <label className="absolute left-0 top-0 text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
        {label}
      </label>
      <input
        {...inputProps}
        className={cn(
          "w-full border-0 border-b border-border bg-transparent px-0 py-2 text-base text-foreground transition-colors",
          "placeholder:text-muted-foreground/60 focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0",
          className,
        )}
      />
    </div>
  );
}

export function SafetySignPage() {
  const signedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date()),
    [],
  );

  const [authorized, setAuthorized] = useState(false);
  const [feeAck, setFeeAck] = useState(false);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background text-foreground">
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid grid-cols-1 gap-24">
          {/* Hero */}
          <section className="mx-auto w-full max-w-2xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.05em] text-muted-foreground">BEGIN SAFETY</p>
            <h1 className="mb-8 font-serif-display text-5xl italic leading-tight tracking-tight text-foreground md:text-6xl">
              Let&apos;s get the engagement signed
            </h1>
            <p className="max-w-prose font-sans text-lg leading-relaxed text-muted-foreground">
              Summary for [Organization Name]. Review the scope, sign electronically, and your Safety Dashboard goes live
              within one business day.
            </p>
          </section>

          {/* Engagement summary */}
          <section className="mx-auto w-full max-w-4xl">
            <div className="border border-border bg-section p-8 md:p-12">
              <h2 className="mb-10 font-serif-display text-3xl italic text-foreground">Engagement summary</h2>
              <div className="flex flex-col border-t border-border">
                {(
                  [
                    ["ORGANIZATION", ORG_SUMMARY],
                    ["PRIMARY CONTACT", CONTACT_SUMMARY],
                    ["ENGAGEMENT", "Safety (Stage 01 of the Movemental Path)"],
                    ["TIMELINE", "Two weeks from Day 1 alignment"],
                    ["DELIVERABLES", "Seven decisions plus a board-ready ratification packet"],
                    ["FACILITATOR", "Brad Brisco / Alan Hirsch / Joshua Shepherd"],
                    ["FEE", "$1,000"],
                    ["PAYMENT TERMS", "Net 15 from engagement start"],
                    [
                      "REQUIREMENTS",
                      "Participation from at least two senior leaders authorized to ratify governance decisions.",
                    ],
                  ] as const
                ).map(([k, v]) => (
                  <div
                    key={k}
                    className="flex flex-col gap-4 border-b border-border py-5 md:flex-row md:gap-8"
                  >
                    <div className="w-full md:w-1/3">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                        {k}
                      </span>
                    </div>
                    <div className="w-full md:w-2/3">
                      <span className="font-sans text-base text-foreground">{v}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-4">
                <Link
                  href="/contact?interest=safety-engagement"
                  className="inline-flex items-center gap-2 font-sans text-sm text-primary transition-colors hover:text-primary-dim"
                >
                  Full engagement letter: request PDF
                  <ArrowRight className="size-4 shrink-0" aria-hidden />
                </Link>
              </div>
            </div>
          </section>

          {/* Sign */}
          <section className="mx-auto w-full max-w-2xl border-t border-border pt-12">
            <h2 className="mb-12 font-serif-display text-4xl italic text-foreground">Sign</h2>
            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
                <TypewriterField label="PRINT NAME" name="printName" placeholder="Jane Doe" autoComplete="name" />
                <TypewriterField
                  label="TITLE"
                  name="title"
                  placeholder="Executive Director"
                  autoComplete="organization-title"
                />
                <div className="relative pt-6 md:col-span-2">
                  <label className="absolute left-0 top-0 text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                    SIGNATURE
                  </label>
                  <input
                    name="signature"
                    placeholder="Type full name to sign"
                    className="w-full border-0 border-b border-border bg-transparent px-0 py-2 font-serif-display text-2xl italic text-primary placeholder:text-primary/40 focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0"
                  />
                </div>
                <TypewriterField label="DATE" name="date" readOnly value={signedDate} />
              </div>

              <div className="space-y-6 pt-6">
                <label className="flex cursor-pointer items-start gap-4">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={authorized}
                    onClick={() => setAuthorized((v) => !v)}
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center border border-outline transition-colors",
                      "hover:border-primary",
                      authorized && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {authorized ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : null}
                  </button>
                  <span className="font-sans text-sm leading-relaxed text-muted-foreground">
                    I confirm that I am authorized to enter into this agreement on behalf of [Organization Name] and that
                    we commit to the participation requirements necessary to finalize the seven decisions.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-4">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={feeAck}
                    onClick={() => setFeeAck((v) => !v)}
                    className={cn(
                      "mt-0.5 flex size-5 shrink-0 items-center justify-center border border-outline transition-colors",
                      "hover:border-primary",
                      feeAck && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {feeAck ? <Check className="size-3.5" strokeWidth={3} aria-hidden /> : null}
                  </button>
                  <span className="font-sans text-sm leading-relaxed text-muted-foreground">
                    I acknowledge the fee of $1,000 and agree to the payment terms of Net 15 from the engagement start
                    date.
                  </span>
                </label>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  className="w-full bg-inverse-surface px-8 py-4 font-sans text-base text-inverse-foreground transition-colors hover:bg-inverse-muted/30 md:w-auto"
                >
                  Sign and continue
                </button>
              </div>
            </form>
          </section>

          {/* What happens next */}
          <section className="mx-auto mb-24 w-full max-w-4xl">
            <div className="bg-elevated p-8 md:p-16">
              <h2 className="mb-12 font-serif-display text-3xl italic text-foreground">What happens next</h2>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                {(["You sign", "Dashboard goes live", "Day 1 alignment session"] as const).map((label, i) => (
                  <div key={label} className="flex flex-col gap-4">
                    <span className="font-serif-display text-4xl text-pathway-accent">{String(i + 1).padStart(2, "0")}</span>
                    <p className="font-sans text-base text-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-16 border-t border-border pt-8">
                <p className="font-serif-display text-sm italic text-muted-foreground">
                  Your facilitator will reach out directly to schedule the alignment session once the dashboard is active.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
