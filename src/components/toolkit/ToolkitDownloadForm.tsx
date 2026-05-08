"use client";

import { useState, type FormEvent } from "react";

import { cn } from "@/lib/utils";

export type ToolkitDownloadFormProps = {
  /** Surface identifier persisted with the lead; e.g. "modal", "toolkit-page", "safety-page". */
  source?: string;
  /** Renders a tighter layout suitable for the modal. */
  variant?: "modal" | "page";
  /** Layout mode for the email/submit row. "stacked" → input above button; "inline" → side-by-side at sm+. */
  layout?: "stacked" | "inline";
  /** Called once the API call resolves successfully. The page variant uses this to swap to a confirmation state. */
  onSuccess?: () => void;
  className?: string;
};

type Status = "idle" | "submitting" | "success" | "error";

export function ToolkitDownloadForm({
  source = "toolkit",
  variant = "page",
  layout = "stacked",
  onSuccess,
  className,
}: ToolkitDownloadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const organization = String(data.get("organization") ?? "").trim();

    if (!email) {
      setErrorMessage("Email is required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/toolkit-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, organization: organization || undefined, source }),
      });

      if (!res.ok) {
        const payload = (await res.json().catch(() => null)) as
          | { error?: { message?: string } }
          | null;
        const message = payload?.error?.message ?? "Something went wrong. Please try again.";
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
      onSuccess?.();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  const labelClass = "block text-[11px] font-semibold uppercase tracking-eyebrow text-foreground";
  const inputClass = cn(
    "w-full border-0 border-b border-input bg-transparent px-0 py-2 text-base text-foreground transition-colors",
    "placeholder:text-muted-foreground/60 focus:border-b-2 focus:border-primary focus:outline-none focus:ring-0",
  );

  if (status === "success" && variant === "modal") {
    // Modal variant manages its own success layout; return null so the parent renders the confirmation state.
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex w-full flex-col gap-6 text-left", className)}
      noValidate
    >
      {layout === "inline" ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-3">
          <div className="flex-1">
            <label htmlFor={`toolkit-email-${source}`} className={labelClass}>
              Email address
            </label>
            <input
              id={`toolkit-email-${source}`}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@organization.org"
              className={inputClass}
              disabled={status === "submitting"}
            />
          </div>
          <button
            type="submit"
            className="btn-pill btn-pill--primary justify-center sm:w-auto"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send me the toolkit"}
          </button>
        </div>
      ) : (
        <>
          <div>
            <label htmlFor={`toolkit-email-${source}`} className={labelClass}>
              Email address
            </label>
            <input
              id={`toolkit-email-${source}`}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="name@organization.org"
              className={cn(inputClass, "mt-2")}
              disabled={status === "submitting"}
            />
          </div>
          <div>
            <label htmlFor={`toolkit-org-${source}`} className={labelClass}>
              Organization <span className="font-normal text-muted-foreground">(optional)</span>
            </label>
            <input
              id={`toolkit-org-${source}`}
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Your organization"
              className={cn(inputClass, "mt-2")}
              disabled={status === "submitting"}
            />
          </div>
          <button
            type="submit"
            className="btn-pill btn-pill--primary mt-2 w-full justify-center"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Sending…" : "Send me the toolkit"}
          </button>
        </>
      )}

      {status === "error" && errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <p className="text-xs italic text-muted-foreground">
        By submitting your email, you&apos;ll receive the toolkit immediately and a brief three-email sequence over
        the following week. Unsubscribe at any time.
      </p>
    </form>
  );
}
