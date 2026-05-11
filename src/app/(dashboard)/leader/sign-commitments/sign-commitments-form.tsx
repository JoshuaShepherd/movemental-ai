"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { signVoiceCommitmentsAction } from "./actions";

export function SignCommitmentsForm({ disabled }: { disabled?: boolean }) {
  const [agreed, setAgreed] = React.useState(false);
  const [pending, setPending] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!agreed || disabled) return;
    setPending(true);
    const res = await signVoiceCommitmentsAction();
    setPending(false);
    setMessage(res.message ?? (res.ok ? "Saved." : "Something went wrong."));
    if (res.ok) setAgreed(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-start gap-3">
        <input
          id="agree-commitments"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={disabled || pending}
          className="mt-1 size-4 rounded border-border text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <Label htmlFor="agree-commitments" className="text-sm leading-relaxed text-muted-foreground">
          I have read the Movemental Voice Commitments in full and agree to honor them in my public
          voice work with Movemental.
        </Label>
      </div>
      <Button type="submit" disabled={!agreed || pending || disabled}>
        {pending ? "Saving…" : "Sign and record"}
      </Button>
      {message ? (
        <p className="text-sm text-muted-foreground" role="status">
          {message}
        </p>
      ) : null}
    </form>
  );
}
