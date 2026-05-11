"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function LeaderApplyForm() {
  const [pending, setPending] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      full_name: String(fd.get("full_name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      organization: String(fd.get("organization") ?? "").trim() || undefined,
      role: String(fd.get("role") ?? "").trim() || undefined,
      why_leader: String(fd.get("why_leader") ?? "").trim(),
      bio: String(fd.get("bio") ?? "").trim(),
      photo_url: String(fd.get("photo_url") ?? "").trim() || undefined,
      reference_entries: [] as Array<{ name: string; email: string; relationship: string }>,
    };

    setPending(true);
    const res = await fetch("/api/leader/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setPending(false);
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      error?: { message?: string };
    };
    if (!res.ok) {
      setError(json.error?.message ?? "Submission failed.");
      return;
    }
    setMessage("Thank you — we received your application.");
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-[var(--prose-max)] space-y-6">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full name</Label>
        <Input id="full_name" name="full_name" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="organization">Organization (optional)</Label>
        <Input id="organization" name="organization" autoComplete="organization" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="role">Role (optional)</Label>
        <Input id="role" name="role" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="why_leader">Why do you want to be recognized as a movement leader?</Label>
        <Textarea id="why_leader" name="why_leader" required rows={5} className="min-h-[120px]" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Short bio</Label>
        <Textarea id="bio" name="bio" required rows={6} className="min-h-[140px]" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo_url">Headshot URL (optional)</Label>
        <Input id="photo_url" name="photo_url" type="url" placeholder="https://…" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Submitting…" : "Submit application"}
      </Button>
      {error ? (
        <p className="text-sm text-[color:var(--destructive)]" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
