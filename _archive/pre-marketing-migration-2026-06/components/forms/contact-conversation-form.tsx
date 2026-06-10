"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const ORG_TYPE_VALUES = ["church", "nonprofit", "institution", "other"] as const;
type OrgTypeValue = (typeof ORG_TYPE_VALUES)[number];

type AudienceSegment = "Movement leader" | "Organization / institution" | "Media / research" | "Other";

function segmentForOrgType(orgType: OrgTypeValue): AudienceSegment {
  if (orgType === "other") return "Other";
  return "Organization / institution";
}

function buildMessage(
  context: string,
  role: string | undefined,
  orgType: OrgTypeValue,
  orgName?: string,
): string {
  const typeLabel =
    orgType === "church"
      ? "Church"
      : orgType === "nonprofit"
        ? "Nonprofit"
        : orgType === "institution"
          ? "Institution"
          : "Other";
  const parts = [`Organization type: ${typeLabel}`];
  if (orgName?.trim()) parts.push(`Organization: ${orgName.trim()}`);
  if (role?.trim()) parts.push(`Role: ${role.trim()}`);
  parts.push("", context.trim());
  return parts.join("\n");
}

type FormState = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full border-0 border-b border-border bg-transparent py-2 text-foreground outline-none transition-[border-color,border-width] placeholder:text-muted-foreground focus-visible:border-b-2 focus-visible:border-primary focus-visible:ring-0 rounded-none";

export function ContactConversationForm({
  initialOrgType,
}: {
  /** When set (e.g. from `/contact?interest=churches`), pre-selects organization kind. */
  initialOrgType?: "church" | "nonprofit" | "institution";
} = {}) {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = (fd.get("name") as string)?.trim() ?? "";
    const email = (fd.get("email") as string)?.trim() ?? "";
    const organization = ((fd.get("org") as string) || "").trim() || undefined;
    const role = ((fd.get("role") as string) || "").trim() || undefined;
    const orgType = fd.get("org_type") as OrgTypeValue | "";
    const context = (fd.get("context") as string)?.trim() ?? "";

    if (!ORG_TYPE_VALUES.includes(orgType as OrgTypeValue)) {
      setErrorMessage("Please select what kind of organization you represent.");
      setFormState("error");
      return;
    }

    const message = buildMessage(context, role, orgType as OrgTypeValue, organization);
    const payload = {
      name,
      email,
      organization,
      audience_segment: segmentForOrgType(orgType as OrgTypeValue),
      message,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: { message?: string } };
        setErrorMessage(data.error?.message ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="border border-border bg-card p-8 text-center">
        <p className="text-lg font-semibold text-foreground">Thank you.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          We&apos;ve received your note. A founder will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative pt-6">
          <label className="absolute left-0 top-0 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground" htmlFor="contact-conv-name">
            Name *
          </label>
          <input id="contact-conv-name" name="name" type="text" required className={inputClass} autoComplete="name" />
        </div>
        <div className="relative pt-6">
          <label className="absolute left-0 top-0 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground" htmlFor="contact-conv-email">
            Email *
          </label>
          <input
            id="contact-conv-email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative pt-6">
          <label className="absolute left-0 top-0 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground" htmlFor="contact-conv-org">
            Organization
          </label>
          <input
            id="contact-conv-org"
            name="org"
            type="text"
            placeholder="Organization name"
            className={inputClass}
            autoComplete="organization"
          />
        </div>
        <div className="relative pt-6">
          <label className="absolute left-0 top-0 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground" htmlFor="contact-conv-role">
            Role
          </label>
          <input
            id="contact-conv-role"
            name="role"
            type="text"
            placeholder="Senior pastor, executive director, provost, etc."
            className={inputClass}
          />
        </div>
      </div>

      <div className="relative pt-6">
        <label className="absolute left-0 top-0 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground" htmlFor="contact-conv-org-type">
          What kind of organization? *
        </label>
        <div className="relative">
          <select
            id="contact-conv-org-type"
            name="org_type"
            required
            defaultValue={initialOrgType ?? ""}
            className={cn(inputClass, "cursor-pointer appearance-none pr-8")}
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="church">Church</option>
            <option value="nonprofit">Nonprofit</option>
            <option value="institution">Institution</option>
            <option value="other">Other</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        </div>
      </div>

      <div className="relative pt-6">
        <label className="absolute left-0 top-0 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground" htmlFor="contact-conv-context">
          What&apos;s on your desk? *
        </label>
        <textarea
          id="contact-conv-context"
          name="context"
          required
          minLength={10}
          rows={4}
          placeholder="Share context, where the friction is, and what you're hoping to navigate. A few sentences is enough."
          className={cn(inputClass, "resize-none")}
        />
        <p className="mt-3 font-serif text-sm italic text-muted-foreground">
          Example: &ldquo;Our board wants an AI policy but staff are split on tools. We&apos;re trying to figure out where
          to start.&rdquo;
        </p>
      </div>

      {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}

      <div className="pt-2">
        <button
          type="submit"
          disabled={formState === "submitting"}
          className="bg-primary px-12 py-4 text-sm font-semibold uppercase tracking-eyebrow text-primary-foreground transition-colors hover:bg-primary-dim disabled:opacity-60"
        >
          {formState === "submitting" ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
