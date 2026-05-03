"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

type SuccessKind = "pending" | "pending_no_email" | "already" | "generic";

export function NewsletterForm({ source = "footer" }: { source?: string }) {
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

  if (formState === "success") {
    if (successKind === "pending") {
      return (
        <p className="text-sm text-primary">
          Check your inbox and click <strong>Confirm subscription</strong> to finish signing up.
        </p>
      );
    }
    if (successKind === "pending_no_email") {
      return (
        <p className="text-sm text-muted-foreground">
          You&apos;re almost done — we couldn&apos;t send the confirmation email just now. Please try again shortly or{" "}
          <a href="/contact" className="font-medium text-primary underline-offset-4 hover:underline">
            contact us
          </a>
          .
        </p>
      );
    }
    if (successKind === "already") {
      return (
        <p className="text-sm text-primary">You&apos;re already confirmed. Thank you for staying close.</p>
      );
    }
    return (
      <p className="text-sm text-primary">You&apos;re in. First letter arrives next month.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        name="email"
        type="email"
        required
        placeholder="you@example.com"
        className="h-9 flex-1 border-border/40 bg-transparent text-sm placeholder:text-muted-foreground/60"
        aria-label="Email address"
      />
      <Button
        type="submit"
        disabled={formState === "submitting"}
        size="sm"
        className="h-9 shrink-0 bg-primary px-3"
      >
        <ArrowRight className="h-4 w-4" />
        <span className="sr-only">Subscribe</span>
      </Button>
      {formState === "error" && (
        <p className="absolute mt-10 text-xs text-destructive">{errorMessage}</p>
      )}
    </form>
  );
}
