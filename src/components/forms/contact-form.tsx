"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const audienceSegments = [
  "Movement leader",
  "Organization / institution",
  "Media / research",
  "Other",
] as const;

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedSegment, setSelectedSegment] = React.useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      organization: (formData.get("organization") as string) || undefined,
      audience_segment: selectedSegment,
      message: formData.get("message") as string,
    };

    if (!payload.audience_segment) {
      setErrorMessage("Please select how you're reaching out.");
      setFormState("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error?.message ?? "Something went wrong. Please try again.");
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="rounded-xl bg-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-foreground">Thank you.</p>
        <p className="mt-2 text-sm text-muted-foreground">We&apos;ve received your message and will be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-card p-8">
      <div className="space-y-5">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <Input id="contact-name" name="name" required className="mt-1.5 h-11" placeholder="Your full name" />
        </div>
        <div>
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" name="email" type="email" required className="mt-1.5 h-11" placeholder="you@example.com" />
        </div>
        <div>
          <Label htmlFor="contact-org">Organization (optional)</Label>
          <Input id="contact-org" name="organization" className="mt-1.5 h-11" placeholder="Church, nonprofit, or institution name" />
        </div>
        <div>
          <Label>I am reaching out as</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {audienceSegments.map((seg) => (
              <button
                key={seg}
                type="button"
                onClick={() => setSelectedSegment(seg)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedSegment === seg
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="contact-message">Message</Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            minLength={10}
            className="mt-1.5 min-h-32"
            placeholder="Tell us about your work, your goals, and what led you here."
          />
        </div>
      </div>

      {errorMessage && (
        <p className="mt-4 text-sm text-destructive">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={formState === "submitting"}
        className="mt-6 h-12 w-full bg-linear-to-br from-primary to-primary-dim text-base font-semibold text-primary-foreground hover:opacity-92"
      >
        {formState === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
