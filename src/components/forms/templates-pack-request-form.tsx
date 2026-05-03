"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "submitting" | "success" | "error";

export function TemplatesPackRequestForm() {
  const [formState, setFormState] = React.useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const organization = String(fd.get("organization") ?? "").trim();
    const role = String(fd.get("role") ?? "").trim();
    const howFound = String(fd.get("how_found") ?? "").trim();

    if (!name || !email || !organization || !role) {
      setErrorMessage("Name, email, organization, and role are required.");
      setFormState("error");
      return;
    }

    const message = [
      "Request: Sandbox template pack (Season Charter, 8-Pattern Scan, Experiment Brief, Scoring Sheet, Ethical & Relational Flag paragraph, Portfolio Page template).",
      "",
      `Organization: ${organization}`,
      `Role: ${role}`,
      howFound ? `How they found Movemental: ${howFound}` : null,
      "",
      "Please reply with next steps and any verification needed.",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organization,
          audience_segment: "Organization / institution",
          message,
        }),
      });

      const data = (await res.json()) as { success?: boolean; error?: { message?: string } };

      if (!res.ok) {
        setErrorMessage(
          (typeof data.error?.message === "string" && data.error.message) ||
            "Something went wrong. You can also email hello@movemental.com.",
        );
        setFormState("error");
        return;
      }

      setFormState("success");
      form.reset();
    } catch {
      setErrorMessage("Network error. Please try again or email hello@movemental.com.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <p className="text-sm text-muted-foreground">
        Thank you. The note is in the inbox queue. A human will follow up with download instructions when the pack is
        attached to this flow. If you need something urgently, email{" "}
        <a className="font-medium text-primary underline-offset-4 hover:underline" href="mailto:hello@movemental.com">
          hello@movemental.com
        </a>{" "}
        with subject line <span className="font-medium text-foreground">Sandbox template pack</span>.
      </p>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tpl-name">Name</Label>
          <Input id="tpl-name" name="name" type="text" autoComplete="name" required maxLength={200} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tpl-email">Email</Label>
          <Input id="tpl-email" name="email" type="email" autoComplete="email" required maxLength={200} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="tpl-org">Organization</Label>
        <Input id="tpl-org" name="organization" type="text" autoComplete="organization" required maxLength={200} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tpl-role">Role</Label>
        <Input id="tpl-role" name="role" type="text" required maxLength={200} placeholder="e.g., Chief of staff" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tpl-how">How you found us (optional)</Label>
        <Textarea id="tpl-how" name="how_found" maxLength={1000} rows={3} />
      </div>
      {formState === "error" ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
      <Button type="submit" disabled={formState === "submitting"} className="rounded-full px-8">
        {formState === "submitting" ? "Sending…" : "Request the pack"}
      </Button>
    </form>
  );
}
