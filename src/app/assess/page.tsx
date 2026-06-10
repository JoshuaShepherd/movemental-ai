"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Free assessment front door — passwordless magic-link entry.
 *
 * Enter an email → Supabase sends a magic link → `/auth/callback` exchanges the
 * code → the visitor lands in the agent room (`/agent`) authenticated, so the
 * reality map they build is tied to their identity. No password, low friction:
 * the "find out the truth about AI in your org" entry point.
 */
export default function AssessPage() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      setErrorMsg("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMsg(null);
    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/agent")}`;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: { emailRedirectTo: redirectTo, shouldCreateUser: true },
      });
      if (error) {
        setStatus("error");
        setErrorMsg("Could not send the link. Try again in a moment.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setErrorMsg("Could not send the link. Try again in a moment.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-20 md:py-28">
      <p className="mb-6 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-muted-foreground">
        Free · Map your AI reality
      </p>
      <h1 className="text-4xl leading-tight md:text-5xl">
        Find out the truth about AI in your organization.
      </h1>
      <p className="mt-8 text-lg leading-relaxed text-foreground">
        A short, honest reality check — no sales pitch. Enter your email and we’ll send a one-tap link
        into the room where you’ll map where your organization actually stands.
      </p>

      {status === "sent" ? (
        <p className="mt-10 border-l-2 border-[var(--color-ink-band-blue)] bg-card px-5 py-4 text-base leading-relaxed">
          Check your inbox — tap the link we just sent to {email.trim()} to begin.
        </p>
      ) : (
        <form className="mt-10 space-y-5" onSubmit={submit} noValidate>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-base outline-none focus:border-[var(--color-ink-band-blue)]"
            />
          </label>

          {status === "error" && errorMsg ? <p className="text-sm text-destructive">{errorMsg}</p> : null}

          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Email me the link"}
          </Button>
          <p className="text-sm leading-relaxed text-muted-foreground">
            No password. The link signs you in and drops you straight into the room.
          </p>
        </form>
      )}
    </div>
  );
}
