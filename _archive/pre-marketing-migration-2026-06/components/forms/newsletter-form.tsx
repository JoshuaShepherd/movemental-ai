"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

type SuccessKind = "pending" | "pending_no_email" | "already" | "generic";

export function NewsletterForm({
  source = "footer",
  appearance = "default",
}: {
  source?: string;
  /** Underline input + label button on midnight bands (e.g. pricing page). */
  appearance?: "default" | "inverseBand";
}) {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successKind, setSuccessKind] = React.useState<SuccessKind>("generic");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");
    setSuccessKind("generic");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = (await res.json()) as {
        success?: boolean;
        state?: string;
        emailSent?: boolean;
        error?: { message?: string };
      };

      if (!res.ok) {
        setErrorMessage(
          (typeof data.error?.message === "string" && data.error.message) ||
            "Something went wrong.",
        );
        setFormState("error");
        return;
      }

      if (data.state === "already_confirmed") {
        setFormState("success");
        setSuccessKind("already");
        return;
      }

      if (data.state === "pending_confirmation") {
        setFormState("success");
        setSuccessKind(data.emailSent === false ? "pending_no_email" : "pending");
        return;
      }

      setFormState("success");
      setSuccessKind("generic");
    } catch {
      setErrorMessage("Network error. Please try again.");
      setFormState("error");
    }
  }

  const inverse = appearance === "inverseBand";

  if (formState === "success") {
    const successClass = cn("text-sm", inverse ? "text-inverse-foreground" : "text-primary");
    const mutedClass = cn(
      "text-sm",
      inverse ? "text-inverse-muted" : "text-muted-foreground",
    );
    const linkClass = cn(
      "font-medium underline-offset-4 hover:underline",
      inverse ? "text-inverse-foreground" : "text-primary",
    );

    if (successKind === "pending") {
      return (
        <p className={successClass}>
          Check your inbox and click <strong>Confirm subscription</strong> to finish signing up.
        </p>
      );
    }
    if (successKind === "pending_no_email") {
      return (
        <p className={mutedClass}>
          You&apos;re almost done — we couldn&apos;t send the confirmation email just now. Please try again shortly or{" "}
          <a href="/contact" className={linkClass}>
            contact us
          </a>
          .
        </p>
      );
    }
    if (successKind === "already") {
      return <p className={successClass}>You&apos;re already confirmed. Thank you for staying close.</p>;
    }
    return <p className={successClass}>You&apos;re in. First letter arrives next month.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex flex-col", inverse ? "mx-auto max-w-md gap-0 sm:flex-row sm:items-end" : "gap-2")}
    >
      <div className={cn(inverse ? "contents" : "flex gap-2")}>
        <Input
          name="email"
          type="email"
          required
          placeholder={inverse ? "Email address" : "you@example.com"}
          className={cn(
            inverse
              ? "h-auto flex-1 rounded-none border-0 border-b border-inverse-border/40 bg-transparent py-3 text-base text-inverse-foreground placeholder:text-inverse-foreground/40 focus-visible:border-inverse-foreground focus-visible:ring-0"
              : "h-9 flex-1 border-border/40 bg-transparent text-sm placeholder:text-muted-foreground/60",
          )}
          aria-label="Email address"
        />
        <Button
          type="submit"
          disabled={formState === "submitting"}
          size={inverse ? "default" : "sm"}
          className={cn(
            inverse
              ? "mt-4 shrink-0 bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-eyebrow text-primary-foreground hover:bg-primary-dim sm:mt-0 sm:ml-4"
              : "h-9 shrink-0 bg-primary px-3",
          )}
        >
          {inverse ? (
            "Subscribe"
          ) : (
            <>
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Subscribe</span>
            </>
          )}
        </Button>
      </div>
      {formState === "error" ? (
        <p className={cn("text-xs text-destructive", inverse ? "mt-3 sm:mt-2" : "mt-1")}>{errorMessage}</p>
      ) : null}
    </form>
  );
}
